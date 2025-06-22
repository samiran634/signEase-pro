 
import { handle } from 'hono/vercel'
//eslint-disable-next-line antfu/no-import-dist
//@ts-expect-error
//eslint-disable-next-line ts/ban-ts-comment
import app from "../dist";
export const runtime = 'edge'
export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)
 