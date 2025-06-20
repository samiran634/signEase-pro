import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PinataSDK } from 'pinata'
import { db } from './db'

const app = new Hono()

// ✅ Load environment variables
const jwt = process.env.PINATA_JWT
const gateway = process.env.GATEWAY_URL
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY

if (!jwt || !gateway || !CLERK_SECRET_KEY) {
  throw new Error('Missing required environment variables')
}

// ✅ Global CORS config
app.use(
  cors({
    origin: '*', // Replace with your frontend domain in production
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type']
  })
)

app.get('/', (c) => c.text('Hello Hono!'))

app.post('/identify_group', async (c) => {
  const orgCode = c.req.query('orgCode')
  if (!orgCode) {
    return c.json({ error: 'Missing orgCode' }, { status: 400 })
  }

  try {
    const pinata = new PinataSDK({ pinataJwt: jwt })
    const list = await pinata.groups.public.list()
    const existing = list.groups.find(g => g.name === orgCode)

    if (existing) {
      return c.json({ groupId: existing.id, created: false })
    }

    const created = await pinata.groups.public.create({ name: orgCode })
    return c.json({ groupId: created.id, created: true }, { status: 201 })
  } catch (e) {
    console.error(e)
    return c.json({ error: 'Failed to identify or create group' }, { status: 500 })
  }
})

app.post('/upload_file', async (c) => {
  const body = await c.req.parseBody()
  const orgId = c.req.query('orgId')
  const file = body['file'] as File

  if (!jwt || !gateway) {
    return c.json({ error: 'Missing PINATA_JWT or GATEWAY_URL' }, { status: 500 })
  }

  if (!orgId || !file) {
    return c.json({ error: 'Missing orgId or file' }, { status: 400 })
  }

  try {
    const pinata = new PinataSDK({ pinataJwt: jwt, pinataGateway: gateway })
 
    const upload = await pinata.upload.public.file(file).group(orgId)

    return c.json({ cid: upload.cid, groupId: orgId })
  } catch (e) {
    console.error('Upload failed:', e)
    return c.json({ error: 'File upload failed' }, { status: 500 })
  }
})


app.get('/identify_org', async (c) => {
  const orgCode = c.req.query('orgCode')
  if (!orgCode) {
    return c.json({ error: 'Missing orgCode' }, { status: 400 })
  }

  try {
    const pinata = new PinataSDK({ pinataJwt: jwt })
    const list = await pinata.groups.public.list()
    const group = list.groups.find(g => g.name === orgCode)
    if (!group) return c.json({ error: 'Group not found' }, { status: 404 })

    const info = await pinata.groups.public.get({ groupId: group.id })
    return c.json({ group: info })
  } catch (e) {
    console.error(e)
    return c.json({ error: 'Failed to fetch group info' }, { status: 500 })
  }
})

app.post('/create_org', async (c) => {
  const orgCode = c.req.query('orgCode')
  if (!orgCode) {
    return c.json({ error: 'Missing orgCode' }, { status: 400 })
  }

  try {
    const pinata = new PinataSDK({ pinataJwt: jwt })
    const newGroup = await pinata.groups.public.create({ name: orgCode })
    return c.json({ group: newGroup }, { status: 201 })
  } catch (err) {
    console.error('Failed to create group:', err)
    return c.json({ error: 'Failed to create organization' }, { status: 500 })
  }
})

app.get('/retrieve_file', async (c) => {
  const orgId = c.req.query('orgId')
  if (!orgId) {
    return c.json({ error: 'Missing orgId' }, { status: 400 })
  }

  try {
    const pinata = new PinataSDK({ pinataJwt: jwt })
    const filesResponse = await pinata.files.public.list().group(orgId)

    const files = filesResponse.files.map(f => ({
      id: f.id,
      cid: f.cid,
      name: f.name,
      size: f.size,
      created_at: f.created_at,
      gateway_url: `${gateway}/ipfs/${f.cid}`
    }))

    return c.json({ files })
  } catch (e) {
    console.error(e)
    return c.json({ error: 'Failed to retrieve files' }, { status: 500 })
  }
})

app.get('/list-org', async (c) => {
  const limit = 50
  const offset = 0

  try {
    const response = await fetch(`https://api.clerk.com/v1/organizations?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Error from Clerk API:', text)
      return c.json({ error: 'Clerk API returned error', detail: text }, { status: 500 })
    }

    const data = await response.json()
    return c.json(data)
  } catch (error) {
    console.error('Fetch failed:', error)
    return c.json({ error: 'Failed to retrieve organizations', detail: error }, { status: 500 })
  }
})

app.post('/create-request', async (c) => {
  try {
    const { fromOrg, toOrg, fileCid } = await c.req.json()

    if (!fromOrg || !toOrg || !fileCid) {
      return c.json({ error: 'Missing fields' }, { status: 400 })
    }

    await db.execute(
      'INSERT INTO contract_requests (fromOrg, toOrg, fileCid) VALUES (?, ?, ?)',
      [fromOrg, toOrg, fileCid]
    )

    return c.json({ success: true }, { status: 200 })
  } catch (e) {
    console.error('[CREATE ERROR]', e)
    return c.json({ error: 'Server error' }, { status: 500 })
  }
})

app.get('/get-request', async (c) => {
  try {
    const toOrg = c.req.query('toOrg')
     console.log(toOrg);
    if (!toOrg) {
      console.log(toOrg);
      return c.json({ error: 'Missing toOrg param' }, { status: 400 })
    }

    const [rows] = await db.execute(
      'SELECT * FROM contract_requests WHERE toOrg = ? ORDER BY createdAt DESC',
      [toOrg]
    )

    return c.json(rows)
  } catch (e) {
    console.error('[GET ERROR]', e)
    return c.json({ error: 'Server error' }, { status: 500 })
  }
})

export default app
