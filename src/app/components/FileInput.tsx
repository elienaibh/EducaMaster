import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FormError } from './Form';
import { PaperClipIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helper?: string;
  onChange?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // em bytes
}

export default forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  {
    label,
    error,
    helper,
    className,
    disabled,
    onChange,
    accept,
    multiple = false,
    maxSize,
    ...props
  },
  ref
) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && maxSize) {
      const oversizedFiles = Array.from(files).filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        alert(`Alguns arquivos excedem o tamanho máximo permitido de ${maxSize / 1024 / 1024}MB`);
        return;
      }
    }

    setSelectedFiles(files);
    onChange?.(files);
  };

  const handleClear = () => {
    setSelectedFiles(null);
    onChange?.(null);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <PaperClipIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        <input
          ref={ref}
          type="file"
          className={`
              block w-full rounded-md border-gray-300 shadow-sm
              pl-10
              focus:border-primary-500 focus:ring-primary-500 sm:text-sm
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          {...props}
        />
      </div>

      {selectedFiles && selectedFiles.length > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {selectedFiles.length} arquivo(s) selecionado(s)
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-500"
            disabled={disabled}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});
