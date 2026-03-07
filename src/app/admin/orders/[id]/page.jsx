'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { adminGetOrderById, adminUpdateOrderStatus } from '@/lib/api';
import { AdminImage } from '../../components/AdminImage';

const STATUS_OPTIONS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (!id) return;
    adminGetOrderById(id)
      .then((o) => {
        setOrder(o);
        setNewStatus(o.orderStatus || 'pending');
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdateStatus = async () => {
    if (!id || !newStatus) return;
    setUpdating(true);
    try {
      const updated = await adminUpdateOrderStatus(id, { orderStatus: newStatus });
      setOrder(updated.order || order);
    } catch (e) {
      alert(e.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading order...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!order) return <p className="text-gray-500">Order not found.</p>;

  const addr = order.shippingAddress || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="text-[#1F2E46] font-medium hover:underline">← Orders</Link>
        <h1 className="text-2xl font-bold text-gray-900">Order {order._id?.slice(-8)}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-900">Status</h2>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={handleUpdateStatus}
              disabled={updating}
              className="bg-[#1F2E46] text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-70"
            >
              {updating ? 'Updating…' : 'Update Status'}
            </button>
          </div>
          <p className="text-sm text-gray-500">Amount: ₹{(order.totalAmount ?? 0).toLocaleString('en-IN')} | Payment: {order.paymentMethod} | {order.paymentStatus}</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <h2 className="font-bold text-gray-900 mb-2">Shipping Address</h2>
          <p className="text-sm text-gray-600">
            {addr.street}, {addr.city}, {addr.state} {addr.zipCode}<br />
            {addr.phone && `Phone: ${addr.phone}`}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h2 className="font-bold text-gray-900 mb-4">Order Items ({order.items?.length ?? 0})</h2>
        <ul className="space-y-4">
          {(order.items || []).map((item, i) => {
            const img = item.product?.images?.[0] || item.product?.image;
            const name = item.product?.name || (typeof item.product === 'string' ? item.product : 'Product');
            return (
              <li key={i} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  {img ? (
                    <AdminImage src={img} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{(item.price ?? 0).toLocaleString('en-IN')}</p>
                </div>
                <p className="font-semibold text-gray-900 shrink-0">₹{((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString('en-IN')}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
