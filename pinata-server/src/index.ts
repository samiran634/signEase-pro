import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PinataSDK } from 'pinata'

const app = new Hono()
 const jwt = process.env.PINATA_JWT
  const gateway = process.env.GATEWAY_URL
app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.post('/identify_group',async(c)=>{
    const body=await c.req.parseBody();
    const orgCode=c.req.query('orgCode');
    //check if any group with orgcode exists or not if not than create one and return the group id
})
app.post('/upload_file', async (c) => {
 //upload the pdf to a group with the group id
  const body = await c.req.parseBody()

  const orgCode =  c.req.query('orgId')
  const file = body['file'] as File

  if (!jwt || !gateway) {
    return c.json({ error: 'Missing PINATA_JWT or GATEWAY_URL' }, { status: 500 })
  }

  if (!orgCode || !file) {
    return c.json({ error: 'Missing orgCode or file' }, { status: 400 })
  }

  try {
    const pinata = new PinataSDK({ pinataJwt: jwt, pinataGateway: gateway })
    const upload = await pinata.upload.public
  .file(file)
  .group(orgCode);
  console.log(upload);
  //return upload.cid;
  } catch (err) {
    console.error(err)
    return c.json({ error: 'File upload failed' }, { status: 500 })
  }
})

app.get('/identify_org', async (c) => {
  const orgCode = c.req.query('orgCode')
 

  if (!orgCode || !jwt) {
    return c.json({ error: 'Missing orgCode or JWT' }, { status: 400 })
  }

  try {
    
  } catch (err) {
    return c.json({ error: 'Failed to fetch pinned items' }, { status: 500 })
  }
})
export default app
