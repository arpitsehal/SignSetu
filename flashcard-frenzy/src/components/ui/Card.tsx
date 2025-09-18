import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card = ({ // Added 'export' here
  children,
  className = '',
  hoverEffect = false,
  onClick,
  variant = 'default',
  ...props
}: CardProps) => {
  const baseStyles = 'rounded-xl overflow-hidden transition-all duration-200';
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 shadow-md',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg',
    outlined: 'bg-transparent border border-gray-200 dark:border-gray-700',
  };

  const hoverStyles = hoverEffect 
    ? 'hover:shadow-xl hover:-translate-y-0.5' 
    : '';

  const content = (
    <div 
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );

  if (onClick) {
    return (
      <motion.div 
        whileHover={hoverEffect ? { scale: 1.01 } : {}}
        whileTap={hoverEffect ? { scale: 0.99 } : {}}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h2 className={`text-xl font-semibold ${className}`}>
    {children}
  </h2>
);

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export default Card;
