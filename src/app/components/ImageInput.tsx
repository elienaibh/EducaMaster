import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FormError } from './Form';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helper?: string;
  onChange?: (files: FileList | null) => void;
  maxSize?: number; // em bytes
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number;
}

export default forwardRef<HTMLInputElement, ImageInputProps>(function ImageInput(
  {
    label,
    error,
    helper,
    className,
    disabled,
    onChange,
    maxSize = 5 * 1024 * 1024, // 5MB por padrão
    maxWidth = 1920,
    maxHeight = 1080,
    aspectRatio,
    ...props
  },
  ref
) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise(resolve => {
      const img = new window.Image();
      img.onload = () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          alert(`A imagem deve ter no máximo ${maxWidth}x${maxHeight} pixels`);
          resolve(false);
          return;
        }

        if (aspectRatio) {
          const ratio = img.width / img.height;
          if (Math.abs(ratio - aspectRatio) > 0.1) {
            alert(`A imagem deve ter uma proporção de ${aspectRatio}:1`);
            resolve(false);
            return;
          }
        }

        resolve(true);
      };
      img.onerror = () => {
        alert('Arquivo inválido. Selecione uma imagem válida.');
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())files || files.length === 0) {
      setSelectedFiles(null);
      setPreviewUrls([]);
      onChange?.(null);
      return;
    }

    const oversizedFiles = Array.from(files).filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      alert(`Alguns arquivos excedem o tamanho máximo permitido de ${maxSize / 1024 / 1024}MB`);
      return;
    }

    const validFiles = await Promise.all(Array.from(files).map(file => validateImage(file)));

    if (validFiles.every(valid => valid)) {
      setSelectedFiles(files);
      setPreviewUrls(Array.from(files).map(file => URL.createObjectURL(file)));
      onChange?.(files);
    }
  };

  const handleClear = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles(null);
    setPreviewUrls([]);
    onChange?.(null);
  };

  const handleRemoveImage = (index: number) => {
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())selectedFiles) return;

    URL.revokeObjectURL(previewUrls[index]);
    const newFiles = Array.from(selectedFiles).filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);

    // Criar um novo FileList
    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => dataTransfer.items.add(file));

    setSelectedFiles(dataTransfer.files);
    setPreviewUrls(newUrls);
    onChange?.(dataTransfer.files);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <PhotoIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        <input
          ref={ref}
          type="file"
          accept="image/*"
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

      {previewUrls.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div key={url} className="relative aspect-square">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  disabled={disabled}
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {previewUrls.length} imagem(ns) selecionada(s)
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-red-600 hover:text-red-700"
              disabled={disabled}
            >
              Remover todas
            </button>
          </div>
        </div>
      )}

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});