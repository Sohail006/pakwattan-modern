import { requireActor } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { myHistory } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const actor = requireActor(req)
    const { searchParams } = new URL(req.url)
    const limit = Math.min(90, Math.max(7, parseInt(searchParams.get('limit') || '30', 10)))
    return jsonOk(await myHistory(actor, limit))
  } catch (e) {
    return jsonError(e)
  }
}
