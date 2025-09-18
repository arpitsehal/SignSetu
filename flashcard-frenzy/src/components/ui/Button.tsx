import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'success'; // Added 'success' variant
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      outline: 'bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500', // Added success variant styles
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : 'w-auto';

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin border-t-transparent" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
