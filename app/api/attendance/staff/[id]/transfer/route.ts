import { requireActor, requireAdmin } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { transferStaff } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const body = await req.json()
    return jsonOk(
      await transferStaff({
        assignmentId: params.id,
        campusId: body.campusId,
        groupId: body.groupId,
        notes: body.notes,
      })
    )
  } catch (e) {
    return jsonError(e)
  }
}
