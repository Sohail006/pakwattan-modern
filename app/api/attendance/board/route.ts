import { requireActor, requireAdmin } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { listTodayBoard } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const { searchParams } = new URL(req.url)
    return jsonOk(await listTodayBoard(searchParams.get('date') || undefined))
  } catch (e) {
    return jsonError(e)
  }
}
