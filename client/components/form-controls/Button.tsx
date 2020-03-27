import React from 'react';
import { ButtonProps } from '../../lib/typescript/interfaces';

const Button = ({ buttonType, name, handleClick, theme }: ButtonProps) => {
  return (
    <button
      type={buttonType}
      name={name}
      onClick={buttonType === 'button' ? handleClick : null}
      style={theme}
    >
      {name}
    </button>
  );
};

export default Button;
