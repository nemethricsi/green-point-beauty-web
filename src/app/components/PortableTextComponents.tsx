import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import Image from 'next/image';
import {
  PortableTextTypeComponentProps,
  type PortableTextComponents,
} from 'next-sanity';

import { urlFor } from '@/sanity/lib/image';

export const components: PortableTextComponents = {
  types: {
    image: (props: PortableTextTypeComponentProps<SanityImageObject>) => {
      const { value } = props;

      if (value == null) return null;

      return (
        <Image
          src={urlFor(value)
            .width(600)
            .height(400)
            .quality(80)
            .auto('format')
            .url()}
          alt="something"
          className="not-prose h-auto w-full rounded-lg"
          width={600}
          height={400}
        />
      );
    },
  },
};
