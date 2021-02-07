import { useField } from '@unform/core';
import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { Container } from './styles';

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  values: string[];
  name: string;
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
}
const SelectInput: React.FC<SelectInputProps> = ({
  values,
  select,
  name,
  setSelect,
  ...rest
}) => {
  const inputRef = useRef<HTMLSelectElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <select
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        value={select}
        onChange={e => setSelect(e.target.value)}
      >
        {values.map(value => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </Container>
  );
};

export default SelectInput;
