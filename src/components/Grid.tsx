import React from 'react';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({
  as: Component = 'div',
  className = '',
  children,
  ...props
}) => {
  return (
    <Component
      className={`grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-[clamp(16px,2vw,32px)] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
