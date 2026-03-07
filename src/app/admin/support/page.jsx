'use client';

import { useState, useEffect } from 'react';
import { adminGetSupport } from '@/lib/api';

export default function AdminSupportPage() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminGetSupport()
      .then((d) => setChats(d.chats || d || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const list = Array.isArray(chats) ? chats : [];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Support Chats</h1>
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left p-3 font-semibold text-gray-700">User</th>
              <th className="text-left p-3 font-semibold text-gray-700">Status</th>
              <th className="text-left p-3 font-semibold text-gray-700">Updated</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={3} className="p-6 text-center text-gray-500">No support chats.</td></tr>
            ) : (
              list.map((c) => (
                <tr key={c._id} className="border-b border-gray-50">
                  <td className="p-3 text-gray-700">{c.user?.name || c.userId || '–'}</td>
                  <td className="p-3 text-gray-600">{c.status || 'open'}</td>
                  <td className="p-3 text-gray-500">{c.updatedAt ? new Date(c.updatedAt).toLocaleString() : '–'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
