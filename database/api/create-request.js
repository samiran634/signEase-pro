// /backend/api/create-request.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { fromOrg, toOrg, fileCid } = await req.body

    if (!fromOrg || !toOrg || !fileCid) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    const result = await prisma.contractRequest.create({
      data: { fromOrg, toOrg, fileCid },
    })

    return res.status(200).json(result)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}
