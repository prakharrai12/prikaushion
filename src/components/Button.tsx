import React from 'react';

export type ButtonVariant = 'primary' | 'ghost' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  as = 'button',
  href,
  target,
  rel,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest rounded-pill transition-all duration-300 select-none touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-95 disabled:pointer-events-none disabled:opacity-50';

  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses =
      'min-h-[48px] px-8 bg-crimson text-ink font-semibold hover:bg-bone shadow-[0_10px_30px_rgba(224,27,36,0.3)] disabled:bg-bone/20 disabled:text-bone/40';
  } else if (variant === 'ghost') {
    variantClasses =
      'min-h-[48px] px-7 border border-bone-faint text-bone hover:border-crimson hover:text-crimson bg-transparent disabled:border-bone/20 disabled:text-bone/40';
  } else if (variant === 'icon') {
    variantClasses =
      'min-h-[48px] min-w-[48px] p-3 rounded-full border border-bone-faint text-bone hover:border-crimson hover:bg-crimson hover:text-ink disabled:opacity-40';
  }

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  if (as === 'a' && href) {
    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
        aria-disabled={disabled}
        className={combinedClasses}
        {...(props as any)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};

