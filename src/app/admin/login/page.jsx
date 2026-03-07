'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import { getBaseUrl, setToken } from '@/lib/api';

/**
 * Admin Login – same as app: POST /api/admin/dev-login
 * One-tap login (no OTP). Stores token + user, then redirects to account.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const base = getBaseUrl();
      const res = await fetch(`${base}/admin/dev-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || 'Admin login failed');
        return;
      }

      const { token, user } = data;
      if (token) {
        setToken(token);
        if (typeof window !== 'undefined' && user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
      router.replace('/admin');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gray-50">
      <Container>
        <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 text-sm mt-2">
              Same login as the app. One-tap access for admins.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F2E46] text-white font-bold py-3.5 px-6 rounded-xl hover:opacity-90 disabled:opacity-70 transition"
            >
              {loading ? 'Logging in…' : 'Login as Admin'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 text-xs">
            Uses the same backend as the Furrmaa app. Only users with admin role can access.
          </p>

          <div className="mt-6 text-center">
            <Link href="/" className="text-[#1F2E46] font-medium text-sm hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
