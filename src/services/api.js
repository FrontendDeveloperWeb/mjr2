/**
 * Central API service layer.
 *
 * All network access for the app goes through this module so that pages and
 * partials stay free of transport concerns (base URL, headers, error shaping).
 * Swap the internals for axios later without touching call sites.
 *
 * Usage:
 *   import { api } from '../services/api.js';
 *   const journals = await api.get('/journals', { params: { page: 1 } });
 */

const BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? '/api';

function buildUrl(path, params) {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function request(path, { method = 'GET', params, body, headers, signal } = {}) {
  const response = await fetch(buildUrl(path, params), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body != null ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    const error = new Error(`API ${method} ${path} failed with ${response.status}`);
    error.status = response.status;
    throw error;
  }

  // Gracefully handle empty (204) responses.
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};

export default api;
