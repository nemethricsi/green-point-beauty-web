import { CopyIcon, LaunchIcon } from '@sanity/icons';
import { Button, Card, Flex, Stack, Text, Tooltip, useToast } from '@sanity/ui';
import { type SlugInputProps, useFormValue } from 'sanity';

export type SlugWithUrlInputProps = SlugInputProps & {
  basePath: string;
};

export const SlugWithUrlInput = (props: SlugWithUrlInputProps) => {
  const toast = useToast();
  const _id = useFormValue(['_id']) as string;
  const slug = props.value?.current;
  const basePath = props.basePath.replace(/^\/|\/$/g, '');
  const isPublished = _id && !_id.startsWith('drafts.');
  const url = slug ? `${window.location.origin}/${basePath}/${slug}` : '';

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.push({
          title: 'URL másolva',
          description: `${url} sikeresen másolva a vágólapra.`,
          status: 'success',
          closable: true,
        });
      })
      .catch(() => {
        toast.push({
          title: 'Hiba történt',
          description: 'URL másolása sikertelen.',
          status: 'error',
          closable: true,
        });
      });
  };

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {slug &&
        (isPublished ? (
          <Card padding={2} paddingLeft={3} tone="suggest">
            <Flex gap={2} align="center" justify="space-between">
              <Text size={1} muted>
                <Flex gap={2} align="center">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener"
                    style={{ color: 'inherit', fontWeight: 500 }}
                  >
                    {url}
                  </a>
                  <LaunchIcon style={{ width: 20, height: 20 }} />
                </Flex>
              </Text>
              <Tooltip
                content="URL másolása"
                arrow
                placement="right"
                fallbackPlacements={['bottom', 'left', 'top']}
              >
                <Button
                  icon={CopyIcon}
                  mode="bleed"
                  onClick={handleCopy}
                  aria-label="Copy URL"
                />
              </Tooltip>
            </Flex>
          </Card>
        ) : (
          <Card padding={4} paddingLeft={3} tone="caution">
            <Text size={1} muted>
              Élesítsd (Publish) a dokumentumot, hogy lásd a URL-t. Vagy vesd el
              a változtatásokat.
            </Text>
          </Card>
        ))}
    </Stack>
  );
};

/**
 * Returns a SlugWithUrlInput with a fixed basePath for use in schema definitions.
 * Use this when you want the URL preview to show a specific path prefix (e.g. "p" for /p/slug).
 */
export function createSlugWithUrlInput(basePath: string) {
  return function SlugWithUrlInputWithBasePath(props: SlugInputProps) {
    return <SlugWithUrlInput {...props} basePath={basePath} />;
  };
}
