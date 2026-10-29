import { Heading } from '@sanity/ui';
import type { BlockStyleProps } from 'sanity';

export const EditorH3 = ({ children }: BlockStyleProps) => {
  return (
    <Heading as="h3" size={2}>
      {children}
    </Heading>
  );
};
