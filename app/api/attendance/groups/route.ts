import { requireActor, requireAdmin } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { listGroups, upsertGroup } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    requireActor(req)
    const { searchParams } = new URL(req.url)
    return jsonOk(await listGroups(searchParams.get('all') === '1'))
  } catch (e) {
    return jsonError(e)
  }
}

export async function POST(req: Request) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const body = await req.json()
    return jsonOk(await upsertGroup(body), { status: 201 })
  } catch (e) {
    return jsonError(e)
  }
}
