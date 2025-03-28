import { forwardRef, FormHTMLAttributes, ReactNode } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  className?: string;
}

export interface FormErrorProps {
  message: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  return (
    <p className={`mt-1 text-sm text-red-600 ${className}`} role="alert">
      {message}
    </p>
  );
}

export default forwardRef<HTMLFormElement, FormProps>(function Form(
  { children, onSubmit, isLoading = false, className, ...props },
  ref
) {
  return (
    <form ref={ref} onSubmit={onSubmit} className={`space-y-6 ${className}`} {...props}>
      {children}
    </form>
  );
});

interface FormGroupProps {
  label?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormGroup({ label, error, children, className }: FormGroupProps) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      {children}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface FormLabelProps {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export function FormLabel({ htmlFor, children, required = false, className }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

interface FormSuccessProps {
  message: string;
  className?: string;
}

export function FormSuccess({ message, className }: FormSuccessProps) {
  return <p className={`mt-1 text-sm text-green-600 ${className}`}>{message}</p>;
}

export function FormHelper({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-gray-500">{children}</p>;
}
