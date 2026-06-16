import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Green Point Beauty';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        {slug}
      </div>
    ),
    { ...size },
  );
}
