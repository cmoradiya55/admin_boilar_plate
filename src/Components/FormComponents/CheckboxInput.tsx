'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxInputProps {
  name: string;
  control: Control<any>;
  label: string;
  options: CheckboxOption[];
  required?: boolean;
  icon?: React.ReactNode;
  error?: FieldError;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  hideLabel?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  control,
  label,
  options,
  required = false,
  error,
  icon,
  className = '',
  direction = 'horizontal',
  hideLabel = false,
}) => {
  const containerClass = direction === 'horizontal' ? 'flex flex-wrap gap-3 sm:gap-4' : 'space-y-2';

  return (
    <div className={`sm:space-y-3 md:space-y-3 space-y-2 w-full ${className}`}>
      {!hideLabel && (
      <label className="flex text-xs font-semibold items-center gap-2 text-secondary uppercase tracking-wider">
        {icon}
        {label}
        {required && <span className="text-destructive ml-2">*</span>}
      </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValues = field.value || [];

          const handleCheckboxChange = (optionValue: string, isChecked: boolean) => {
            if (isChecked) {
              const newValue = [...selectedValues, optionValue];
              field.onChange(newValue);
            } else {
              const newValue = selectedValues.filter((value: string) => value !== optionValue);
              field.onChange(newValue);
            }
          };

          return (
            <div className={containerClass}>
              {options.map((option) => {
                const isChecked = selectedValues.includes(option.value);
                return (
                  <label key={option.value} className="flex items-center cursor-pointer -mt-1 sm:-mt-2 group">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                      className="w-4 h-4 cursor-pointer border-2 border-primary rounded transition-all accent-primary lg:focus:ring-2 lg:focus:ring-primary/20"
                    />
                    <span className={`ml-3 text-sm font-medium transition-colors ${isChecked
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground group-hover:text-primary'
                      }`}>
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          );
        }}
      />
      {error && (
        <p className="text-destructive text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default CheckboxInput;