'use client';

import React from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface TextInputProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'password' | 'tel' | 'url' | 'search';
  required?: boolean;
  error?: FieldError;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  hideLabel?: boolean;
  inputClassName?: string;
  rules?: RegisterOptions;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  required = false,
  error,
  className = '',
  icon,
  disabled = false,
  hideLabel = false,
  inputClassName = 'px-4 py-3',
  rules,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {!hideLabel && (
        <label 
          htmlFor={name} 
          className="text-xs font-semibold flex items-center gap-2 text-secondary uppercase tracking-wider"
        >
          {icon}
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules || (required ? { 
          required: `${label} is required`,
          ...(type === 'email' && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })
        } : undefined)}
        render={({ field }) => (
          <input
            {...field}
            value={field.value as string || ''}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0.5 placeholder:text-muted-foreground ${
              disabled 
                ? 'bg-secondary border-border text-muted-foreground cursor-not-allowed' 
                : error 
                  ? 'border-destructive/30 bg-destructive/5 focus:border-destructive focus:ring-destructive/10 text-foreground' 
                  : 'border-primary/20 bg-primary/5 focus:border-primary focus:ring-primary/10 focus:bg-background text-foreground'
            } ${inputClassName}`}
          />
        )}
      />
      {error && (
        <p className="text-destructive text-sm flex items-center gap-2 mt-1">
          <AlertCircle className="w-4 h-4" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TextInput;