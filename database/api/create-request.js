import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

 

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Change to your frontend URL in production
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

/** @param {Request} req */
export default async function handler(req) {
  // Handle preflight (OPTIONS) request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  try {
    const { fromOrg, toOrg, fileCid } = await req.json()

    if (!fromOrg || !toOrg || !fileCid) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    const result = await prisma.contractRequest.create({
      data: { fromOrg, toOrg, fileCid },
    })

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    })
  } catch (err) {
    console.error('[API ERROR]', err)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}
