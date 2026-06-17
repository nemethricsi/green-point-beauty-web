import { ImageResponse } from 'next/og';

import { urlFor } from '@/sanity/lib/image';
import { fetchHomePage } from '@/sanity/lib/queries';
import { SITE_NAME } from '@/lib/constants';

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const { data } = await fetchHomePage();

  const imageUrl = data?.defaultOgImage
    ? urlFor(data.defaultOgImage).width(1200).height(630).fit('crop').url()
    : null;

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
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt=""
          />
        ) : (
          <span>{SITE_NAME}</span>
        )}
      </div>
    ),
    { ...size },
  );
}
