import React from 'react';
// import { theme } from '../../lib/theme';
// import Button from 'unform-material-ui';
// import { Button } from '@material-ui/core';\
// import { useTheme } from 'styled-components';
import { useCustomTheme } from '../../lib/store/contexts';
import { ButtonProps } from '../../lib/typescript/interfaces';

const ButtonC = ({ buttonType, name, handleClick }: ButtonProps) => {
  console.log('buttonType:::', typeof buttonType);
  console.log('buttonType:::', buttonType);
  const { themeContext } = useCustomTheme();
  const Button = useCustomTheme();
  console.log('usedTheme:::', themeContext);
  console.log('useTheme.Button:::', Button);

  return (
    <button
      type={buttonType}
      name={name}
      onClick={buttonType === 'button' ? handleClick : null}
    >
      {name}
    </button>
  );
};

export default ButtonC;
