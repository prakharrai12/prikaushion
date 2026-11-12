import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  className = '',
  children,
  ...props
}) => {
  return (
    <Component
      className={`w-full max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
