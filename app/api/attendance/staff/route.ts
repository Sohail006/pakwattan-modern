import { requireActor, requireAdmin } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { assignStaff, listAssignments } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const { searchParams } = new URL(req.url)
    return jsonOk(
      await listAssignments({
        campusId: searchParams.get('campusId') || undefined,
        groupId: searchParams.get('groupId') || undefined,
        status: searchParams.get('status') || undefined,
      })
    )
  } catch (e) {
    return jsonError(e)
  }
}

export async function POST(req: Request) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const body = await req.json()
    return jsonOk(await assignStaff(body), { status: 201 })
  } catch (e) {
    return jsonError(e)
  }
}
