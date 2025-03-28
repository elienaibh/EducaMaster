interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

export function parseQueryString(queryString: string): QueryParams {
  const searchParams = new URLSearchParams(queryString);
  const params: QueryParams = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export function updateQueryString(currentQuery: string, updates: QueryParams): string {
  const currentParams = parseQueryString(currentQuery);
  const newParams = { ...currentParams, ...updates };
  return buildQueryString(newParams);
}

export function removeQueryParam(currentQuery: string, param: string): string {
  const currentParams = parseQueryString(currentQuery);
  delete currentParams[param];
  return buildQueryString(currentParams);
}

export function getQueryParam(queryString: string, param: string): string | undefined {
  const searchParams = new URLSearchParams(queryString);
  return searchParams.get(param) || undefined;
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

export function normalizeUrl(url: string): string {
  // Remove trailing slash
  url = url.replace(/\/$/, '');

  // Ensure protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  return url;
}
