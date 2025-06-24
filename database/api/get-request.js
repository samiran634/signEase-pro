import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Set to your frontend domain in production
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (req.method !== 'GET') {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const toOrg = url.searchParams.get("toOrg")

    if (!toOrg) {
      return new Response(JSON.stringify({ error: 'Missing toOrg param' }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    const requests = await prisma.contractRequest.findMany({
      where: { toOrg },
      orderBy: { createdAt: 'desc' },
    })

    return new Response(JSON.stringify(requests), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    })
  } catch (err) {
    console.error('[GET REQUEST ERROR]', err)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: corsHeaders,
    })
  }
}
