'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { registerAction } from '@/features/auth/actions/auth';

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(registerAction, undefined);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="card bg-base-100 shadow-2xl w-full max-w-sm md:max-w-md">
        <div className="card-body gap-4 md:gap-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Create an account</h1>
            <p className="text-base-content/60 mt-1 text-sm">Join Fight Link today</p>
          </div>

          {state?.error && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{state.error}</span>
            </div>
          )}

          <form action={action} className="flex flex-col gap-4" id="register-form">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Name</span>
              </div>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
                required
                minLength={2}
                maxLength={32}
                autoComplete="name"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Email</span>
              </div>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
                maxLength={254}
                autoComplete="email"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Password</span>
              </div>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
                minLength={8}
                maxLength={72}
                autoComplete="new-password"
              />
              <div className="label">
                <div className="bg-base-200/50 rounded-lg p-3 border-l-4 border-primary">
                  <p className="text-xs md:text-sm font-medium text-base-content mb-2">Password requirements:</p>
                  <div className="grid grid-cols-1 gap-1 text-xs md:text-sm text-base-content/70">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>1 uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>1 lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>1 number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>1 symbol</span>
                    </div>
                  </div>
                </div>
              </div>
            </label>

            <button
              id="register-submit"
              type="submit"
              className="btn btn-neutral w-full mt-2"
              disabled={isPending}
            >
              {isPending ? <span className="loading loading-spinner loading-sm" /> : 'Register'}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
