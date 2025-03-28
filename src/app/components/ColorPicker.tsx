import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FormError } from './Form';
import { SwatchIcon } from '@heroicons/react/24/outline';

interface ColorPickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helper?: string;
  onChange?: (value: string) => void;
  value?: string;
  presetColors?: string[];
}

export default forwardRef<HTMLInputElement, ColorPickerProps>(function ColorPicker(
  {
    label,
    error,
    helper,
    className,
    disabled,
    onChange,
    value = '#000000',
    presetColors = [
      '#000000',
      '#FFFFFF',
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFFF00',
      '#FF00FF',
      '#00FFFF',
      '#FFA500',
      '#800080',
      '#008000',
      '#800000',
      '#000080',
      '#808080',
      '#C0C0C0',
    ],
    ...props
  },
  ref
) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handlePresetClick = (color: string) => {
    onChange?.(color);
    setShowPicker(false);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              (onClick={() => setShowPicker( ?? (() => { throw new Error('Valor não pode ser nulo') })())showPicker)}
              className={`
                  w-10 h-10 rounded-md border border-gray-300 shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              style={{ backgroundColor: value }}
              disabled={disabled}
            >
              <span className="sr-only">Selecionar cor</span>
            </button>

            {showPicker && !disabled && (
              <div className="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="grid grid-cols-5 gap-2">
                  {presetColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handlePresetClick(color)}
                      className={`
                          w-8 h-8 rounded-md border border-gray-300
                          focus:outline-none focus:ring-2 focus:ring-primary-500
                          ${color === value ? 'ring-2 ring-primary-500' : ''}
                        `}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <input
                    ref={ref}
                    type="color"
                    value={value}
                    onChange={handleChange}
                    className={`
                        w-full h-10 rounded-md border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                        ${className}
                      `}
                    disabled={disabled}
                    {...props}
                  />
                </div>
              </div>
            )}
          </div>

          <input
            type="text"
            value={value}
            onChange={handleChange}
            className={`
                block w-full rounded-md border-gray-300 shadow-sm
                focus:border-primary-500 focus:ring-primary-500 sm:text-sm
                ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              `}
            disabled={disabled}
          />
        </div>
      </div>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});