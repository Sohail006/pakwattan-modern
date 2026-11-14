import { requireActor, requireAdmin } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { getSettings, updateSettings } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    requireActor(req)
    const data = await getSettings()
    return jsonOk(data)
  } catch (e) {
    return jsonError(e)
  }
}

export async function PUT(req: Request) {
  try {
    const actor = requireActor(req)
    requireAdmin(actor)
    const body = await req.json()
    const settings = await updateSettings(body || {})
    return jsonOk(settings)
  } catch (e) {
    return jsonError(e)
  }
}
