import { requireActor, requireAdmin } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { adminAction } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const body = await req.json()
    if (!body?.action) {
      return jsonError(Object.assign(new Error('Action is required.'), { status: 400 }))
    }
    return jsonOk(
      await adminAction(actor, {
        recordId: body.recordId,
        assignmentId: body.assignmentId,
        date: body.date,
        action: body.action,
        note: body.note,
      })
    )
  } catch (e) {
    return jsonError(e)
  }
}
