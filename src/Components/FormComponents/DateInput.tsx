'use client';

import React from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface DateInputProps {
  name: string;
  control: Control<any>;
  label: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  min?: string;
  max?: string;
  icon?: React.ReactNode;
  rules?: RegisterOptions;
}

const DateInput: React.FC<DateInputProps> = ({
  name,
  control,
  label,
  required = false,
  error,
  className = '',
  min,
  max,
  icon,
  rules,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="flex text-xs font-semibold text-secondary items-center gap-2 uppercase tracking-wider">
        {icon}
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules || (required ? { required: `${label} is required` } : undefined)}
        render={({ field }) => (
          <input
            {...field}
            value={(field.value as string) || ''}
            id={name}
            type="date"
            min={min}
            max={max}
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/10 placeholder:text-muted-foreground text-foreground ${
              error 
                ? 'border-destructive/30 bg-destructive/5 focus:border-destructive focus:ring-destructive/10' 
                : 'border-primary/20 bg-primary/5 focus:border-primary focus:bg-background'
            }`}
          />
        )}
      />
      {error && (
        <p className="text-destructive text-sm flex items-center gap-2 mt-1" role="alert">
          <AlertCircle className="w-4 h-4" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default DateInput;