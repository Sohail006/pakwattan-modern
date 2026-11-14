import { requireActor } from '@/lib/attendance/auth'
import { jsonError, jsonOk } from '@/lib/attendance/http'
import { checkIn } from '@/lib/attendance/service'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const actor = requireActor(req)
    const body = await req.json()
    if (
      typeof body?.latitude !== 'number' ||
      typeof body?.longitude !== 'number' ||
      !Number.isFinite(body.latitude) ||
      !Number.isFinite(body.longitude)
    ) {
      return jsonError(
        Object.assign(new Error('Location is required to mark attendance.'), { status: 400 })
      )
    }
    const result = await checkIn(
      actor,
      {
        latitude: body.latitude,
        longitude: body.longitude,
        accuracy: body.accuracy,
      },
      body.deviceInfo
    )
    return jsonOk(result)
  } catch (e) {
    return jsonError(e)
  }
}
