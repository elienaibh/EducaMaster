import { useState, useCallback } from 'react';

interface Filters {
  category?: string;
  level?: string;
  [key: string]: string | undefined;
}

interface UseFiltersProps {
  initialFilters?: Filters;
  onFilterChange?: (filters: Filters) => void;
}

interface UseFiltersReturn {
  filters: Filters;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
}

export default function useFilters({
  initialFilters = {},
  onFilterChange,
}: UseFiltersProps = {}): UseFiltersReturn {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const setFilter = useCallback(
    (key: string, value: string) => {
      const newFilters = {
        ...filters,
        [key]: value || undefined,
      };
      setFilters(newFilters);
      onFilterChange?.(newFilters);
    },
    [filters, onFilterChange]
  );

  const clearFilters = useCallback(() => {
    const emptyFilters: Filters = {};
    setFilters(emptyFilters);
    onFilterChange?.(emptyFilters);
  }, [onFilterChange]);

  return {
    filters,
    setFilter,
    clearFilters,
  };
}
