import { requireActor, requireAdmin } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { deleteCampus, upsertCampus } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const body = await req.json()
    return jsonOk(await upsertCampus({ ...body, id: params.id }))
  } catch (e) {
    return jsonError(e)
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    return jsonOk(await deleteCampus(params.id))
  } catch (e) {
    return jsonError(e)
  }
}
