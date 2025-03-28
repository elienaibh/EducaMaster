import { forwardRef } from 'react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  homeIcon?: React.ReactNode;
  homeLabel?: string;
  homeHref?: string;
  className?: string;
}

export default forwardRef<HTMLDivElement, BreadcrumbProps>(function Breadcrumb(
  {
    items,
    separator = <ChevronRightIcon className="h-4 w-4 text-gray-400" />,
    showHome = true,
    homeIcon = <HomeIcon className="h-4 w-4" />,
    homeLabel = 'Início',
    homeHref = '/',
    className,
    ...props
  },
  ref
) {
  return (
    <nav
      ref={ref}
      className={`flex items-center space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb"
      {...props}
    >
      {showHome && (
        <>
          <Link href={homeHref} className="flex items-center text-gray-500 hover:text-gray-700">
            <span className="sr-only">{homeLabel}</span>
            {homeIcon}
          </Link>
          <span className="text-gray-400" aria-hidden="true">
            {separator}
          </span>
        </>
      )}

      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <Link href={item.href} className="flex items-center text-gray-500 hover:text-gray-700">
              {item.icon && <span className="mr-1 h-4 w-4">{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            <span className="flex items-center text-gray-900">
              {item.icon && <span className="mr-1 h-4 w-4">{item.icon}</span>}
              {item.label}
            </span>
          )}

          {index < items.length - 1 && (
            <span className="ml-1 text-gray-400" aria-hidden="true">
              {separator}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
});
