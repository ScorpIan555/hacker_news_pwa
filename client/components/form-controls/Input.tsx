import React, { useEffect, useRef, FC } from 'react';
import { useField } from '@unform/core';
// import { TextField } from 'unform-material-ui';

interface Props {
  name: string;
  type?: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: FC<InputProps> = ({ name, type }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
    console.log('inputRef', inputRef);
  }, [fieldName, registerField]);

  const handleError = (): void => {
    console.log('error::::', error);
    // console.error(error);
  };

  useEffect(() => {
    handleError();
  }, [error]);

  return (
    <input
      id={fieldName}
      name={name}
      type={type}
      ref={inputRef}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
