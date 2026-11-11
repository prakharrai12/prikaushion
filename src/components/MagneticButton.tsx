import React, { useRef } from 'react';
import { gsap } from '../lib/gsap';
import { isTouchDevice } from '../lib/utils';

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  'aria-label'?: string;
  'data-cursor'?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  as = 'button',
  href,
  target,
  rel,
  strength = 0.35,
  className = '',
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  'data-cursor': dataCursor,
  ...rest
}) => {
  const elRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled || isTouchDevice() || !elRef.current) return;

    const bounds = elRef.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(elRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (disabled || !elRef.current) return;

    gsap.to(elRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const commonProps = {
    ref: (el: HTMLElement | null) => {
      elRef.current = el;
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    className: `inline-flex items-center justify-center transition-colors ${className}`,
    'aria-label': ariaLabel,
    'data-cursor': dataCursor,
    ...rest,
  };

  if (as === 'a') {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      {...commonProps}
    >
      {children}
    </button>
  );
};

