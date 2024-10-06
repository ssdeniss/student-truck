import React, { SVGProps } from 'react';
import sprite from '../assets/icons/sprite.svg';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = '', ...rest }) => {
  return (
    <svg className={`icon ${className}`} {...rest}>
      <use href={`${sprite}#${name}`} />
    </svg>
  );
};

export default Icon;
