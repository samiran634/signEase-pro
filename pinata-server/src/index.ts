import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PinataSDK } from 'pinata'
import { handle } from 'hono/vercel'
const app = new Hono().basePath('/api')
const jwt = process.env.PINATA_JWT
const gateway = process.env.GATEWAY_URL
app.use(cors())
 export const runtime = 'edge'
app.get('/', (c) => c.text('Hello Hono!'))

// ✅ Identify or create group
app.post('/identify_group', async (c) => {
  const orgCode = c.req.query('orgCode')
  if (!orgCode || !jwt)
    return c.json({ error: 'Missing orgCode or JWT' }, { status: 400 })

  try {
    const pinata = new PinataSDK({ pinataJwt: jwt })
    const list = await pinata.groups.public.list().name(orgCode)
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

// ✅ Upload file to group
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

    // ✅ Upload to the group with given orgId
    const upload = await pinata.upload.public.file(file).group(orgId)

    return c.json({ cid: upload.cid, groupId: orgId })
  } catch (e) {
    console.error('Upload failed:', e)
    return c.json({ error: 'File upload failed' }, { status: 500 })
  }
})


// ✅ Return group metadata
app.get('/identify_org', async (c) => {
 
  const orgCode = c.req.query('orgCode')
  if (!orgCode || !jwt)
    return c.json({ error: 'Missing orgCode or JWT' }, { status: 400 })

  try {
    const pinata = new PinataSDK({ pinataJwt: jwt })
    const list = await pinata.groups.public.list().name(orgCode)
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
  if (!orgCode || !jwt) {
    return c.json({ error: 'Missing orgCode or JWT' }, { status: 400 })
  }

  try {
    const pinata = new PinataSDK({ pinataJwt: jwt })

    // Create a new group with name = orgCode
    const newGroup = await pinata.groups.public.create({
      name: orgCode
    })
    
    return c.json({ group: newGroup })
  } catch (err) {
    console.error('Failed to create group:', err)
    return c.json({ error: 'Failed to create organization' }, { status: 500 })
  }
})


app.get('/retrieve_file', async (c) => {
  const orgId = c.req.query('orgId')
  if (!orgId || !jwt) {
    return c.json({ error: 'Missing orgId or JWT' }, { status: 400 })
  }

  try {
    const pinata = new PinataSDK({ pinataJwt: jwt })

    // Directly list files in the group using the group ID
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

export const GET = handle(app)
export const POST = handle(app)
