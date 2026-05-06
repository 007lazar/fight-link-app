import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BASE = process.env.API_URL ?? 'http://localhost:4000';

type FetchOptions = Omit<RequestInit, 'body'> & { body?: unknown };

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function apiFetch<T = unknown>(
  path: string,
  { body, headers, ...options }: FetchOptions = {},
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 401) {
      // Redirect to login. Cookie deletion is intentionally NOT done here
      // because cookies() is read-only in Server Components — mutation is
      // only allowed in Server Actions and Route Handlers. The expired/invalid
      // token will be naturally cleared when the user logs in again or via
      // getUser() detecting expiry in auth.ts.
      redirect('/login');
    }

    const err = await res.json().catch(() => ({}));
    const message = Array.isArray(err.message)
      ? err.message.join(', ')
      : (err.message ?? `HTTP ${res.status}`);
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, opts?: FetchOptions) =>
    apiFetch<T>(path, { method: 'GET', ...opts }),

  post: <T>(path: string, body?: unknown, opts?: FetchOptions) =>
    apiFetch<T>(path, { method: 'POST', body, ...opts }),

  patch: <T>(path: string, body?: unknown, opts?: FetchOptions) =>
    apiFetch<T>(path, { method: 'PATCH', body, ...opts }),

  delete: <T>(path: string, opts?: FetchOptions) =>
    apiFetch<T>(path, { method: 'DELETE', ...opts }),
};
