import { Heading } from '@sanity/ui';
import type { BlockStyleProps } from 'sanity';

export const EditorH2 = ({ children }: BlockStyleProps) => {
  return (
    <Heading as="h2" size={3}>
      {children}
    </Heading>
  );
};
