import { ImageResponse } from 'next/og'

export const alt = 'Pak Wattan School & College of Sciences — Best School in Havelian'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0f3d2e 0%, #24744f 48%, #1a5c3f 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            opacity: 0.92,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#f5c542',
            }}
          />
          Havelian, Khyber Pakhtunkhwa
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: 980,
            }}
          >
            Pak Wattan School &amp; College of Sciences
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#f5e6b8',
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            SSC &amp; HSSC Havelian Circle toppers · Montessori to FSc · Quality education since 2020
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
            opacity: 0.95,
          }}
        >
          <span>pakwattan.edu.pk</span>
          <span style={{ color: '#f5c542', fontWeight: 700 }}>Best School in Havelian</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
