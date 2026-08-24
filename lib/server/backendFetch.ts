import http from 'node:http'
import https from 'node:https'
import { getApiBaseUrl } from '@/lib/config'

/**
 * Shared hosting (*.rtempurl.com) often presents a certificate Node/Vercel
 * cannot verify. Without this, homepage marquee/featured proxies return empty
 * results even though the ASP.NET API has data.
 */
const INSECURE_TLS_HOST_MARKERS = ['rtempurl.com']

function shouldAllowInsecureTls(url: string): boolean {
  if (process.env.BACKEND_TLS_INSECURE === 'true') return true
  if (process.env.BACKEND_TLS_INSECURE === 'false') return false

  try {
    const { hostname } = new URL(url)
    return INSECURE_TLS_HOST_MARKERS.some(
      (marker) => hostname === marker || hostname.endsWith(`.${marker}`)
    )
  } catch {
    return false
  }
}

function headersToObject(headers?: HeadersInit): Record<string, string> {
  const out: Record<string, string> = {}
  if (!headers) return out

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      out[key] = value
    })
    return out
  }

  if (Array.isArray(headers)) {
    headers.forEach(([key, value]) => {
      out[key] = value
    })
    return out
  }

  Object.assign(out, headers)
  return out
}

export type BackendFetchInit = {
  method?: string
  headers?: HeadersInit
  body?: string | Buffer | null
  /** Default true — bypass Next.js fetch caching for API proxies. */
  noStore?: boolean
}

/**
 * Server-only fetch to the ASP.NET backend.
 * Uses Node http(s) so we can relax TLS verification for known shared hosts.
 */
export function backendFetch(
  pathOrUrl: string,
  init: BackendFetchInit = {}
): Promise<Response> {
  const base = getApiBaseUrl().replace(/\/$/, '')
  const url = pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')
    ? pathOrUrl
    : `${base}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`

  const target = new URL(url)
  const isHttps = target.protocol === 'https:'
  const allowInsecure = isHttps && shouldAllowInsecureTls(url)
  const method = (init.method || 'GET').toUpperCase()
  const headers = headersToObject(init.headers)

  if (init.body && !headers['Content-Type'] && !headers['content-type']) {
    headers['Content-Type'] = 'application/json'
  }

  const agent =
    allowInsecure
      ? new https.Agent({ rejectUnauthorized: false })
      : undefined

  const transport = isHttps ? https : http

  return new Promise<Response>((resolve, reject) => {
    const req = transport.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || (isHttps ? 443 : 80),
        path: `${target.pathname}${target.search}`,
        method,
        headers,
        agent,
        timeout: 25000,
      },
      (res) => {
        const chunks: Buffer[] = []
        res.on('data', (chunk: Buffer) => chunks.push(chunk))
        res.on('end', () => {
          const body = Buffer.concat(chunks)
          const responseHeaders = new Headers()
          for (const [key, value] of Object.entries(res.headers)) {
            if (value === undefined) continue
            if (Array.isArray(value)) {
              value.forEach((v) => responseHeaders.append(key, v))
            } else {
              responseHeaders.set(key, value)
            }
          }

          if (init.noStore !== false) {
            responseHeaders.set('Cache-Control', 'no-store')
          }

          resolve(
            new Response(body, {
              status: res.statusCode || 500,
              statusText: res.statusMessage || '',
              headers: responseHeaders,
            })
          )
        })
      }
    )

    req.on('timeout', () => {
      req.destroy(new Error(`Backend request timed out: ${url}`))
    })
    req.on('error', reject)

    if (init.body) {
      req.write(init.body)
    }
    req.end()
  })
}
