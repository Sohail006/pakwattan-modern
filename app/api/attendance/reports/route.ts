import { requireActor, requireAdmin } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { reports } from '@/lib/attendance/service'
import { karachiNow } from '@/lib/attendance/geo'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const { searchParams } = new URL(req.url)
    const today = karachiNow().dateKey
    const from = searchParams.get('from') || today
    const to = searchParams.get('to') || today
    return jsonOk(
      await reports({
        from,
        to,
        userId: searchParams.get('userId') || undefined,
        campusId: searchParams.get('campusId') || undefined,
        groupId: searchParams.get('groupId') || undefined,
      })
    )
  } catch (e) {
    return jsonError(e)
  }
}
