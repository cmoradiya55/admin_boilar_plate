'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { AlertCircle, Check } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: string;
  control: Control<any>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  icon?: React.ReactNode;
  hideLabel?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  control,
  label,
  options,
  placeholder = 'Select an option',
  required = false,
  error,
  className = '',
  icon,
  hideLabel = false,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className={`space-y-2 ${className}`}>
      {!hideLabel && (
        <label htmlFor={name} className="flex text-xs font-semibold text-secondary items-center gap-2 uppercase tracking-wider">
          {icon}
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <Controller
          name={name}
          control={control}
          rules={required ? { 
            required: `${label} is required`,
            validate: (value) => value !== '' || `${label} is required`
          } : undefined}
          render={({ field }) => {
            const selectedOption = options.find(option => option.value === field.value);

            const handleSelect = (value: string) => {
              field.onChange(value);
              setIsOpen(false);
              field.onBlur();
            };

            return (
              <>
                <button
                  type="button"
                  id={`${name}-trigger`}
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(prev => !prev)}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-left flex items-center justify-between transition-all duration-200 ${
                    error
                      ? 'border-destructive/30 bg-destructive/5 focus-visible:border-destructive focus-visible:ring-2 focus-visible:ring-destructive/10'
                      : 'border-primary/20 bg-primary/5 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10'
                  }`}
                >
                  <span className="flex flex-col">
                    {/* <span className="text-[11px] uppercase tracking-wide text-gray-400">
                      {label}
                    </span> */}
                    <span className={`text-sm sm:text-sm font-normal ${selectedOption ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {selectedOption?.label || placeholder}
                    </span>
                  </span>
                  <span className=" text-foreground">
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <select
                  {...field}
                  value={field.value as string || ''}
                  id={name}
                  className="sr-only"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <option value="">{placeholder}</option>
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {isOpen && (
                  <div
                    role="listbox"
                    aria-labelledby={`${name}-trigger`}
                    className="absolute z-20 gap-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl lg:custom-scrollbar"
                  >
                    <div className="divide-y divide-border">
                      {options.map(option => {
                        const isSelected = option.value === field.value;
                        return (
                          <button
                            type="button"
                            key={option.value}
                            role="option"
                            aria-selected={isSelected}
                            className={`flex w-full items-center justify-between p-2 sm:p-2.5 mb-1 text-left text-sm transition-colors ${
                              isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-foreground'
                            }`}
                            onClick={() => handleSelect(option.value)}
                          >
                            <span className="font-medium">{option.label}</span>
                            {isSelected && <Check className="h-4 w-4" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            );
          }}
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

export default SelectInput;