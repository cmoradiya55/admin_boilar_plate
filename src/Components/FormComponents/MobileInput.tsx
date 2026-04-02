'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Phone, AlertCircle } from 'lucide-react';

interface MobileInputProps {
  name: string;
  control: Control<any>;
  label: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  icon?: React.ReactNode;
}

const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
];

const MobileInput: React.FC<MobileInputProps> = ({
  name,
  control,
  label,
  required = false,
  error,
  className = '',
  icon,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="flex text-xs font-semibold text-secondary items-center gap-2 uppercase tracking-wider">
        {icon || <Phone className="w-4 h-4 text-primary" />}
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      <div className="flex">
        <div className='px-1.5 lg:px-4 border-2 border-r-0 border-primary/20 bg-primary/10 rounded-l-xl text-primary'>
          <Controller
            name={`${name}CountryCode`}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={field.value as string || '+91'}
                disabled
                className={`py-3 cursor-not-allowed text-foreground`}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {/* {country.flag} */}
                    {country.code}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        <Controller
          name={name}
          control={control}
          rules={required ? {
            required: `${label} is required`,
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit mobile number'
            },
            minLength: {
              value: 10,
              message: 'Mobile number must be 10 digits'
            },
            maxLength: {
              value: 10,
              message: 'Mobile number must be 10 digits'
            }
          } : undefined}
          render={({ field }) => (
            <input
              {...field}
              value={field.value as string || ''}
              id={name}
              type="tel"
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              onKeyDown={(e) => {
                // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
                if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
                  // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                  (e.keyCode === 65 && e.ctrlKey === true) ||
                  (e.keyCode === 67 && e.ctrlKey === true) ||
                  (e.keyCode === 86 && e.ctrlKey === true) ||
                  (e.keyCode === 88 && e.ctrlKey === true)) {
                  return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                // Remove any non-numeric characters from pasted content
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[^0-9]/g, '');
                // Limit to 10 digits
                if (target.value.length > 10) {
                  target.value = target.value.substring(0, 10);
                }
                field.onChange(target.value);
              }}
              className={`flex-1 px-4 py-3 border-2 rounded-r-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/10 placeholder:text-muted-foreground text-foreground ${error
                  ? 'border-destructive/30 bg-destructive/5 focus:border-destructive focus:ring-destructive/10'
                  : 'border-primary/20 bg-primary/5 focus:border-primary focus:bg-background'
                }`}
            />
          )}
        />
      </div>
      {error && (
        <p className="text-destructive text-sm flex items-center gap-2 mt-1">
          <AlertCircle className="w-4 h-4" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default MobileInput;