'use client';

import { useState, useCallback, useEffect } from 'react';

interface UseSearchProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  debounceMs?: number;
}

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  isSearching: boolean;
}

export default function useSearch({
  initialQuery = '',
  onSearch,
  debounceMs = 300,
}: UseSearchProps = {}): UseSearchReturn {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())onSearch) return;

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      onSearch(query);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch, debounceMs]);

  const handleSetQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  return {
    query,
    setQuery: handleSetQuery,
    isSearching,
  };
}