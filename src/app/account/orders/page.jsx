'use client';

import { statusMap } from '@/data/dummyOrders'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { HiOutlineSearch, HiOutlineAdjustments } from 'react-icons/hi'
import { fetchOrders } from '@/lib/api'

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 6

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetchOrders()
      .then((data) => {
        console.log("ORDERS DATA:", data)

        if (!cancelled) {
          setOrders(data || [])
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Error fetching orders:', err)
          setOrders([])
          setError('Failed to load orders. Please try again later.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

  const totalPages = Math.ceil(orders.length / ordersPerPage)

  return (
    <div className="bg-white border border-gray-100 md:rounded-[32px] md:p-8 pb-6 shadow-sm">

      <h2 className="text-2xl font-extrabold text-gray-900 mb-3 pt-3 pl-3">
        My Orders
      </h2>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-8 px-3">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search your order here"
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm"
          />
        </div>

        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">
          Filters <HiOutlineAdjustments />
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="py-12 text-center text-gray-500">Loading orders...</div>

      ) : error ? (
        <div className="py-12 text-center">
          <p className="text-red-600 mb-2">{error}</p>
        </div>

      ) : orders.length === 0 ? (
        <div className="py-12 text-center text-gray-500 font-medium">
          <p>No order history.</p>
        </div>

      ) : (
        <>
          <div className="space-y-6">

            {currentOrders.map(order => {
              const product = order?.items?.[0]?.product

              const imageUrl =
                product?.images && product.images.length > 0
                  ? product.images[0]
                  : "/placeholder.png"

              return (
                <Link
                  key={order._id}
                  href={`/account/orders/order-details/${order._id}`}
                >

                  <div className="flex md:flex-row gap-6 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/30 rounded-2xl transition">

                    {/* Product Image */}
                    <div className="w-24 h-24 shrink-0 rounded-xl bg-gray-50 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={product?.name || "Product"}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Order Info */}
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 leading-tight mb-1">
                        {product?.name || "Product not available"}
                      </h4>

                      <p className="text-sm font-medium text-gray-900 mb-4">
                        Order ID: {order._id}
                      </p>

                      <div className="flex items-center justify-between">

                        <span className="text-sm font-extrabold text-gray-900">
                          {statusMap[order.orderStatus] || order.orderStatus}
                        </span>

                        <span className="text-sm font-bold text-gray-500">
                          On {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>

                      </div>
                    </div>

                  </div>
                </Link>
              )
            })}

          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">

              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg text-sm font-medium disabled:opacity-40"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    currentPage === i + 1
                      ? "bg-[#1a2b48] text-white"
                      : "border"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg text-sm font-medium disabled:opacity-40"
              >
                Next
              </button>

            </div>
          )}

        </>
      )}

    </div>
  )
}

export default MyOrders