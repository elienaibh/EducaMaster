import { forwardRef, TableHTMLAttributes } from 'react';

interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export default forwardRef<HTMLTableElement, TableProps<any>>(function Table<T>(
  { columns, data, loading = false, emptyMessage = 'Nenhum dado encontrado', className, ...props },
  ref
) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        ref={ref}
        className={`
            min-w-full divide-y divide-gray-200
            ${className}
          `}
        {...props}
      >
        <thead className="bg-gray-50">
          <tr>
            {columns.map(column => (
              <th
                key={String(column.key)}
                scope="col"
                className={`
                    px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${column.align === 'center' ? 'text-center' : ''}
                    ${column.align === 'right' ? 'text-right' : ''}
                    ${column.width ? `w-${column.width}` : ''}
                  `}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                Carregando...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map(column => (
                  <td
                    key={String(column.key)}
                    className={`
                        px-6 py-4 whitespace-nowrap text-sm text-gray-900
                        ${column.align === 'center' ? 'text-center' : ''}
                        ${column.align === 'right' ? 'text-right' : ''}
                      `}
                  >
                    {column.render ? column.render(item) : String(item[column.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});
