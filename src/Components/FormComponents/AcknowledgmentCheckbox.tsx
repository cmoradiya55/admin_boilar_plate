import React from 'react';
import { ArrowRight, Link } from 'lucide-react';
import { Control, Controller, FieldError } from 'react-hook-form';


interface AcknowledgmentCheckboxProps {
  title: string;
  name: string;
  control: Control<any>;
  error: FieldError | undefined;
  labelText: string;
  requiredMessage?: string;
  viewDetailsButton?: {
    text: string;
    onClick: () => void;
  };
}

const AcknowledgmentCheckbox: React.FC<AcknowledgmentCheckboxProps> = ({
  title,
  name,
  control,
  error,
  labelText,
  requiredMessage = 'You must acknowledge this to proceed',
  viewDetailsButton,
}) => {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold text-secondary mb-1.5">{title}</h2>
      <div className="bg-secondary/50 rounded-lg p-5 border border-border">
        <Controller
          name={name}
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field: { value, onChange, ...field } }) => (
            <div className="flex items-start gap-2.5">
              <input
                {...field}
                type="checkbox"
                id={name}
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-0.5 w-4 h-4 cursor-pointer border-2 border-primary rounded transition-all accent-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              />
              <div className="flex-1">
                <label htmlFor={name} className="cursor-pointer">
                  <p className="text-muted-foreground italic mb-2.5">
                    {labelText}
                  </p>
                  {viewDetailsButton && (
                    <button
                      type="button"
                      onClick={viewDetailsButton.onClick}
                      className="text-primary hover:text-primary/90 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200 flex items-center gap-1.5 group text-sm"
                    >
                      <Link className="w-4 h-4" />
                      {viewDetailsButton.text}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </label>
              </div>
            </div>
          )}
        />
        {error && (
          <p className="text-destructive text-xs mt-1.5 ml-7">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AcknowledgmentCheckbox;