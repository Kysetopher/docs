const apiBase = import.meta.env.VITE_API_BASE ?? "";

const normalizedBase = apiBase.endsWith("/") ? apiBase.slice(0, -1) : apiBase;

const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`);

const buildUrl = (path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalizedPath = normalizePath(path);
  if (!normalizedBase) return normalizedPath;
  return `${normalizedBase}${normalizedPath}`;
};

const createHeaders = (headers?: HeadersInit) => {
  const nextHeaders = new Headers(headers);
  return nextHeaders;
};


export const apiFetch = async (
  path: string,
  options: RequestInit = {}
) => {
  const { headers, ...rest } = options;

  const method = (rest.method ?? "GET").toUpperCase();

  const doFetch = () =>
    fetch(buildUrl(path), {
      credentials: "include",
      headers: createHeaders(headers),
      ...rest,
      method,
    });

  let res = await doFetch();

  return res;
};

