import { useEffect } from 'react';
import { set, StringInputProps, useFormValue } from 'sanity';

export const createPrefilledInput = (
  sourceField: string,
  transform?: (value: string) => string,
) =>
  function PrefilledInput(props: StringInputProps) {
    const sourceValue = useFormValue([sourceField]) as string | undefined;
    const derivedValue = sourceValue
      ? transform
        ? transform(sourceValue)
        : sourceValue
      : undefined;

    useEffect(() => {
      if (!props.value && derivedValue) {
        props.onChange(set(derivedValue));
      }
    }, [derivedValue, props.value, props.onChange]);

    return props.renderDefault(props);
  };
