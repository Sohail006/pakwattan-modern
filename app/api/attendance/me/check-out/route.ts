import { requireActor } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { checkOut } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const actor = requireActor(req)
    const body = await req.json()
    if (
      typeof body?.latitude !== 'number' ||
      typeof body?.longitude !== 'number'
    ) {
      return jsonError(
        Object.assign(new Error('Location is required to check out.'), { status: 400 })
      )
    }
    return jsonOk(
      await checkOut(
        actor,
        { latitude: body.latitude, longitude: body.longitude },
        body.deviceInfo
      )
    )
  } catch (e) {
    return jsonError(e)
  }
}
