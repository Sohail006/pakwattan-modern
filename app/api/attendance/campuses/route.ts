import { requireActor, requireAdmin } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { listCampuses, upsertCampus } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    requireActor(req)
    const { searchParams } = new URL(req.url)
    const includeInactive = searchParams.get('all') === '1'
    return jsonOk(await listCampuses(includeInactive))
  } catch (e) {
    return jsonError(e)
  }
}

export async function POST(req: Request) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const body = await req.json()
    return jsonOk(await upsertCampus(body), { status: 201 })
  } catch (e) {
    return jsonError(e)
  }
}
