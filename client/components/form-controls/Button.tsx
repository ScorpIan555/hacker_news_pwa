import React from 'react';
import { Button } from '../../lib/theme';
// import Button from 'unform-material-ui';
// import { Button } from '@material-ui/core';

interface ButtonProps {
  buttonType?: any;
  name: string;
  theme?: any;
  onClick?: any;
  className?: any;
  // onSubmit()?: Promise<any>;
}

const ButtonC = ({ buttonType, name, theme }: ButtonProps) => {
  console.log('buttonType:::', typeof buttonType);
  console.log('buttonType:::', buttonType);
  return (
    <Button type="submit" name={name} theme={theme}>
      {name}
    </Button>
  );
};

export default ButtonC;
