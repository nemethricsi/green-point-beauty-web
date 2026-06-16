import { useEffect } from 'react';
import { set, StringInputProps, useFormValue } from 'sanity';

export const createPrefilledInput = (sourceField: string) =>
  function PrefilledInput(props: StringInputProps) {
    const sourceValue = useFormValue([sourceField]) as string | undefined;

    useEffect(() => {
      if (!props.value && sourceValue) {
        props.onChange(set(sourceValue));
      }
    }, [sourceValue, props.value, props.onChange]);

    return props.renderDefault(props);
  };
