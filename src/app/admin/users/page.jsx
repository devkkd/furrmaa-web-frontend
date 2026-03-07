'use client';

import { useState, useEffect } from 'react';
import { adminGetUsers } from '@/lib/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminGetUsers()
      .then((d) => setUsers(d.users || d || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const list = Array.isArray(users) ? users : [];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left p-3 font-semibold text-gray-700">Name</th>
              <th className="text-left p-3 font-semibold text-gray-700">Email / Phone</th>
              <th className="text-left p-3 font-semibold text-gray-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={3} className="p-6 text-center text-gray-500">No users.</td></tr>
            ) : (
              list.map((u) => (
                <tr key={u._id} className="border-b border-gray-50">
                  <td className="p-3 font-medium text-gray-900">{u.name || '–'}</td>
                  <td className="p-3 text-gray-600">{u.email || u.phone || '–'}</td>
                  <td className="p-3 text-gray-600">{u.role || 'user'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
