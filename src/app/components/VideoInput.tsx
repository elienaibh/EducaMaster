import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FormError } from './Form';
import { VideoCameraIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface VideoInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helper?: string;
  onChange?: (files: FileList | null) => void;
  maxSize?: number; // em bytes
  maxDuration?: number; // em segundos
  accept?: string;
}

export default forwardRef<HTMLInputElement, VideoInputProps>(function VideoInput(
  {
    label,
    error,
    helper,
    className,
    disabled,
    onChange,
    maxSize = 100 * 1024 * 1024, // 100MB por padrão
    maxDuration = 300, // 5 minutos por padrão
    accept = 'video/*',
    ...props
  },
  ref
) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const validateVideo = (file: File): Promise<boolean> => {
    return new Promise(resolve => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        if (video.duration > maxDuration) {
          alert(`O vídeo deve ter no máximo ${maxDuration / 60} minutos`);
          resolve(false);
          return;
        }
        resolve(true);
      };

      video.onerror = () => {
        alert('Arquivo inválido. Selecione um vídeo válido.');
        resolve(false);
      };

      video.src = URL.createObjectURL(file);
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

    const validFiles = await Promise.all(Array.from(files).map(file => validateVideo(file)));

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

  const handleRemoveVideo = (index: number) => {
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
          <VideoCameraIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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

      {previewUrls.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {previewUrls.map((url, index) => (
              <div
                key={url}
                className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
              >
                <video src={url} className="w-full h-full object-cover" controls />
                <button
                  type="button"
                  onClick={() => handleRemoveVideo(index)}
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
              {previewUrls.length} vídeo(s) selecionado(s)
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