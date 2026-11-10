import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary:
    'bg-[var(--glass-a)] text-ink shadow-[inset_0_1px_0_var(--rim),inset_0_0_0_1px_var(--line),0_8px_20px_-12px_rgb(0_0_0/.35)] backdrop-blur-xl hover:bg-[var(--glass-b)] hover:text-accent',
  ghost: 'text-muted hover:bg-chip hover:text-ink',
  danger:
    'bg-gradient-to-br from-[#ff9db4] via-[#f43f6b] to-[#be123c] text-white shadow-[0_12px_30px_-10px_rgb(244_63_107/.8),inset_0_1px_0_rgb(255_255_255/.5)] hover:brightness-105',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-11 w-11 p-0',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-bold transition duration-300 ease-soft active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
