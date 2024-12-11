import React, { useState, useEffect } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface PhoneInputProps {
  register: UseFormRegister<any>;
  name: string;
  error?: string;
  className?: string;
}

export function PhoneInput({ register, name, error, className = '' }: PhoneInputProps) {
  const [value, setValue] = useState('+7 ');

  // Format phone number as user types
  const formatPhoneNumber = (input: string) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');
    
    // Ensure the number starts with 7
    if (digits.length === 0) return '+7 ';
    if (digits[0] !== '7') return '+7 ';

    // Format the rest of the number
    let formatted = '+7 ';
    if (digits.length > 1) formatted += digits.slice(1, 4);
    if (digits.length > 4) formatted += ' ' + digits.slice(4, 7);
    if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);
    if (digits.length > 9) formatted += ' ' + digits.slice(9, 11);

    return formatted;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    setValue(formatted);
  };

  // Prevent deletion of +7 prefix
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && value === '+7 ') {
      e.preventDefault();
    }
  };

  // Register the input with react-hook-form
  const { onChange, ...rest } = register(name);

  return (
    <input
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      value={value}
      onChange={(e) => {
        handleInput(e);
        // Convert formatted number to raw format for form submission
        const rawValue = e.target.value.replace(/\D/g, '');
        onChange({
          target: {
            value: rawValue.startsWith('7') ? '+' + rawValue : value,
            name,
          },
        });
      }}
      onKeyDown={handleKeyDown}
      className={`block w-full rounded-md border-gray-300 shadow-sm 
        focus:border-green-500 focus:ring-green-500 
        text-base font-normal
        ${error ? 'border-red-300' : ''}
        ${className}`}
      {...rest}
    />
  );
}