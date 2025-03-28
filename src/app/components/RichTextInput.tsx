import { forwardRef, TextareaHTMLAttributes, useState } from 'react';
import { FormError } from './Form';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListBulletIcon,
  QueueListIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  LinkIcon,
  PhotoIcon,
  TableCellsIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

interface RichTextInputProps extends Omit<TextareaHTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: string;
  error?: string;
  helper?: string;
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  maxLength?: number;
}

export default forwardRef<HTMLDivElement, RichTextInputProps>(function RichTextInput(
  {
    label,
    error,
    helper,
    className,
    disabled,
    onChange,
    value = '',
    placeholder,
    maxLength,
    ...props
  },
  ref
) {
  const [content, setContent] = useState(value);

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.innerHTML;
    setContent(newValue);
    onChange?.(newValue);
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="border border-gray-300 rounded-md shadow-sm">
        <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleFormat('bold')}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Negrito"
          >
            <BoldIcon className="h-4 w-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('italic')}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Itálico"
          >
            <ItalicIcon className="h-4 w-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('underline')}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Sublinhado"
          >
            <UnderlineIcon className="h-4 w-4 text-gray-600" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => handleFormat('insertUnorderedList')}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Lista não ordenada"
          >
            <ListBulletIcon className="h-4 w-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('insertOrderedList')}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Lista ordenada"
          >
            <QueueListIcon className="h-4 w-4 text-gray-600" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => handleFormat('justifyLeft')}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Alinhar à esquerda"
          >
            <ArrowLeftIcon className="h-4 w-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('justifyCenter')}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Centralizar"
          >
            <ArrowPathIcon className="h-4 w-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('justifyRight')}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Alinhar à direita"
          >
            <ArrowRightIcon className="h-4 w-4 text-gray-600" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => {
              const url = prompt('Digite a URL do link:');
              if (url) handleFormat('createLink', url);
            }}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Inserir link"
          >
            <LinkIcon className="h-4 w-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = prompt('Digite a URL da imagem:');
              if (url) handleFormat('insertImage', url);
            }}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Inserir imagem"
          >
            <PhotoIcon className="h-4 w-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('insertTable')}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Inserir tabela"
          >
            <TableCellsIcon className="h-4 w-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('code')}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            title="Código"
          >
            <CodeBracketIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div
          contentEditable
          suppressContentEditableWarning
          className={`
              min-h-[200px] p-4 focus:outline-none
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
              ${error ? 'border-red-300' : ''}
              ${className}
            `}
          onInput={handleChange}
          dangerouslySetInnerHTML={{ __html: content }}
          ref={ref}
          {...props}
        />
      </div>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});
