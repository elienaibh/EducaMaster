import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FormError } from './Form';
import { DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface DocumentInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helper?: string;
  onChange?: (files: FileList | null) => void;
  maxSize?: number; // em bytes
  accept?: string;
}

export default forwardRef<HTMLInputElement, DocumentInputProps>(function DocumentInput(
  {
    label,
    error,
    helper,
    className,
    disabled,
    onChange,
    maxSize = 10 * 1024 * 1024, // 10MB por padrão
    accept = '.pdf,.doc,.docx,.txt,.rtf,.odt',
    ...props
  },
  ref
) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())files || files.length === 0) {
      setSelectedFiles(null);
      onChange?.(null);
      return;
    }

    const oversizedFiles = Array.from(files).filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      alert(`Alguns arquivos excedem o tamanho máximo permitido de ${maxSize / 1024 / 1024}MB`);
      return;
    }

    setSelectedFiles(files);
    onChange?.(files);
  };

  const handleClear = () => {
    setSelectedFiles(null);
    onChange?.(null);
  };

  const handleRemoveDocument = (index: number) => {
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())selectedFiles) return;

    const newFiles = Array.from(selectedFiles).filter((_, i) => i !== index);

    // Criar um novo FileList
    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => dataTransfer.items.add(file));

    setSelectedFiles(dataTransfer.files);
    onChange?.(dataTransfer.files);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <DocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        <input
          ref={ref}
          type="file"
          accept={accept}
          className={`
              block w-full rounded-md border-gray-300 shadow-sm
              pl-10
              focus:border-primary-500 focus:ring-primary-500 sm:text-sm
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
      </div>

      {selectedFiles && selectedFiles.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-2">
            {Array.from(selectedFiles).map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <DocumentIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDocument(index)}
                  className="p-1 text-red-500 hover:text-red-600"
                  disabled={disabled}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {selectedFiles.length} documento(s) selecionado(s)
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-red-600 hover:text-red-700"
              disabled={disabled}
            >
              Remover todos
            </button>
          </div>
        </div>
      )}

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});