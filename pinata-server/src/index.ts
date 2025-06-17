import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PinataSDK } from 'pinata'

const app = new Hono()
const jwt = process.env.PINATA_JWT
const gateway = process.env.GATEWAY_URL
 const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
app.use(cors())

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
app.get('/list-org', async (c) => {
  console.log("from pinata", CLERK_SECRET_KEY);

  const limit = 50;
  const offset = 0;

  try {
    const response = await fetch(`https://api.clerk.com/v1/organizations?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Error from Clerk API:", text);
      return c.json({ error: "Clerk API returned error", detail: text }, { status: 500 });
    }

    const data = await response.json();

    console.log("Organizations:", data);
    return c.json(data);  // ✅ This will send the actual organizations to the client
  } catch (error) {
    console.error("Fetch failed:", error);
    return c.json({ error: 'Failed to retrieve organizations', detail: error  }, { status: 500 });
  }
});

export default app
