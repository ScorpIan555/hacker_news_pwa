import React from 'react';
// import Button from 'unform-material-ui';
import { Button } from '@material-ui/core';

interface ButtonProps {
  buttonType: any;
  name: string;
  // onSubmit()?: Promise<any>;
}

const ButtonC = ({ buttonType, name }: ButtonProps) => {
  console.log('buttonType:::', typeof buttonType);
  console.log('buttonType:::', buttonType);
  return (
    <Button type="submit" name={name}>
      submit
    </Button>
  );
};

export default ButtonC;
