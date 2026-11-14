import { requireActor } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { getMyToday } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const actor = requireActor(req)
    return jsonOk(await getMyToday(actor))
  } catch (e) {
    return jsonError(e)
  }
}
