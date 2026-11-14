import { requireActor, requireAdmin } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { removeStaff } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const body = await req.json().catch(() => ({}))
    return jsonOk(await removeStaff(params.id, body?.notes))
  } catch (e) {
    return jsonError(e)
  }
}
