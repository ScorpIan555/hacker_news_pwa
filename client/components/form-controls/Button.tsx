import React from 'react';
import { ButtonProps } from '../../lib/typescript/interfaces';
import { StyledButton } from '../../lib/theme/button';

const Button = ({ buttonType, name, handleClick, theme }: ButtonProps) => {
  return (
    <StyledButton
      type={buttonType}
      name={name}
      onClick={buttonType === 'button' ? handleClick : null}
      style={theme}
    >
      {name}
    </StyledButton>
  );
};

export default Button;
