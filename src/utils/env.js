const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");

const apiBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
);

const apiPrefix = trimTrailingSlash(import.meta.env.VITE_API_PREFIX || "/api");

export const buildApiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${apiPrefix}${normalizedPath}`;
};
