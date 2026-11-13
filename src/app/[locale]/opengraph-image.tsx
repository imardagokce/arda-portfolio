import { ImageResponse } from 'next/og';

// Sosyal medya paylaşımlarında görünen varsayılan görsel (og:image).
// Renkler globals.css'teki koyu temadan alınmıştır.
export const alt = 'Arda | Digital Workspace';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 96,
          background: '#0B1020',
          color: '#DCCB92',
        }}
      >
        <div style={{ fontSize: 144, fontWeight: 700, letterSpacing: -4 }}>Arda</div>
        <div style={{ fontSize: 48, color: '#B3A573', marginTop: 8 }}>Digital Workspace</div>
        <div style={{ width: 160, height: 6, background: '#D6C68D', marginTop: 48 }} />
      </div>
    ),
    { ...size }
  );
}
