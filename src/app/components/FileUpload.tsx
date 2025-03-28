import { forwardRef, useState, useRef } from 'react';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FormError } from './Form';

interface FileUploadProps {
  label?: string;
  error?: string;
  helper?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  value?: File[];
  onChange?: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, FileUploadProps>(function FileUpload(
  {
    label,
    error,
    helper,
    accept,
    multiple = false,
    maxSize = 5 * 1024 * 1024, // 5MB
    value = [],
    onChange,
    disabled = false,
    className,
    ...props
  },
  ref
) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(
          `O arquivo ${file.name} excede o tamanho máximo permitido de ${maxSize / 1024 / 1024}MB`
        );
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onChange?.(multiple ? [...value, ...validFiles] : validFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange?.(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div
        ref={ref}
        className={`
            relative rounded-lg border-2 border-dashed p-6
            ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            ${error ? 'border-red-300' : ''}
            ${className}
          `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />

        <div className="text-center">
          <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Arraste e solte arquivos aqui ou{' '}
              <span className="text-primary-600 hover:text-primary-500">
                clique para selecionar
              </span>
            </p>
            <p className="mt-1 text-xs text-gray-500">Tamanho máximo: {formatFileSize(maxSize)}</p>
          </div>
        </div>
      </div>

      {value.length > 0 && (
        <ul className="mt-4 space-y-2">
          {value.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm"
            >
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">{file.name}</span>
                <span className="text-gray-500">({formatFileSize(file.size)})</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                disabled={disabled}
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});