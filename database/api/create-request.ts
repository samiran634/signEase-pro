import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // In production, restrict this to your frontend domain
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

/**
 * @param {NextRequest} req
 * @returns {Promise<Response>}
 */
export default async function handler(req: Request): Promise<Response> {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  if (req.method !== 'POST') {
    console.log("error")
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  try {
    const { fromOrg, toOrg, fileCid }: { fromOrg: string; toOrg: string; fileCid: string } = await req.json()

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
