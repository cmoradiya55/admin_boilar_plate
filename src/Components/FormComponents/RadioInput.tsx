'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioInputProps {
  name: string;
  control: Control<any>;
  label: string;
  options: RadioOption[];
  required?: boolean;
  error?: FieldError;
  icon?: React.ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  control,
  label,
  options,
  required = false,
  error,
  icon,
  className = '',
  direction = 'horizontal',
}) => {
  const containerClass = direction === 'horizontal' ? 'flex flex-wrap gap-3 sm:gap-4' : 'space-y-2';

  return (
    <div className={`space-y-2 w-full ${className}`}>
      <label 
          htmlFor={name} 
          className="flex text-xs font-semibold items-center gap-2 text-secondary uppercase tracking-wider">
          {icon}
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} is required` } : undefined}
        render={({ field }) => (
          <div className={containerClass}>
            {options.map((option: RadioOption) => (
              <label key={option.value} className="flex items-center cursor-pointer -mt-2 sm:mt-2 group">
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  name={field.name}
                  ref={field.ref}
                  className="w-5 h-5 cursor-pointer border-2 border-primary transition-all accent-primary focus:ring-2 focus:ring-primary/20"
                />
                <span className={`ml-3 text-sm font-medium transition-colors ${field.value === option.value
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground group-hover:text-primary'
                  }`}>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      />
      {error && (
        <p className="text-destructive text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default RadioInput;