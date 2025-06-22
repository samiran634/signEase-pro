"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // In production, restrict this to your frontend domain
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};
/**
 * @param {NextRequest} req
 * @returns {Promise<Response>}
 */
function handler(req) {
    return __awaiter(this, void 0, void 0, function* () {
        // Handle preflight
        if (req.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: corsHeaders,
            });
        }
        if (req.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: corsHeaders,
            });
        }
        try {
            const { fromOrg, toOrg, fileCid } = yield req.json();
            if (!fromOrg || !toOrg || !fileCid) {
                return new Response(JSON.stringify({ error: 'Missing fields' }), {
                    status: 400,
                    headers: corsHeaders,
                });
            }
            const result = yield prisma.contractRequest.create({
                data: { fromOrg, toOrg, fileCid },
            });
            return new Response(JSON.stringify(result), {
                status: 200,
                headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders),
            });
        }
        catch (err) {
            console.error('[API ERROR]', err);
            return new Response(JSON.stringify({ error: 'Server error' }), {
                status: 500,
                headers: corsHeaders,
            });
        }
    });
}
