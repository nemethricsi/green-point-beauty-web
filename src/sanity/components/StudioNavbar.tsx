import { LaunchIcon } from '@sanity/icons';
import { Box, Button, Card, Flex } from '@sanity/ui';
import type { NavbarProps } from 'sanity';

export const StudioNavbar = (props: NavbarProps) => {
  return (
    <Card borderBottom>
      <Flex align="center">
        <Box flex={1}>{props.renderDefault(props)}</Box>
        <Box paddingX={2}>
          <Button
            as="a"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            text="Weboldal"
            icon={LaunchIcon}
            mode="bleed"
          />
        </Box>
      </Flex>
    </Card>
  );
};
