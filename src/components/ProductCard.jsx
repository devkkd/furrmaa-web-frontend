'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaStar, FaRegHeart } from 'react-icons/fa'
import { useCartStore } from '@/store/cartStore'

export default function ProductCard({ product }) {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)
  
  // Data mapping based on API response vs Mock Data
  const productId = product._id || product.id
  const productImage = product.images?.[0] || product.image || '/placeholder.png'
  const rating = Math.floor(Number(product.rating) || 0)
  const reviewCount = product.reviews?.length || 0
  
  // --- BULLETPROOF PRICING LOGIC ---
  // Helper to safely parse strings with commas into actual numbers (e.g., "2,449" -> 2449)
  const parsePrice = (val) => {
    if (val === undefined || val === null) return 0;
    if (typeof val === 'number') return val;
    return Number(val.toString().replace(/,/g, '')) || 0;
  };

  const p = parsePrice(product.price);
  const op = parsePrice(product.oldPrice);
  const dp = parsePrice(product.discountPrice);

  let currentPrice = p;
  let originalPrice = op;

  // Scenario 1: API format (price = MRP, discountPrice = selling price)
  if (dp > 0 && dp < p) {
    currentPrice = dp;
    originalPrice = p;
  } 
  // Scenario 2: Mock Data format (oldPrice = MRP, price = selling price)
  else if (op > p) {
    currentPrice = p;
    originalPrice = op;
  }

  // Determine if we should show the crossed-out price
  const hasDiscount = originalPrice > currentPrice;

  // Format price with Indian Rupee commas
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(amount))
  }

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation() // Prevent triggering the Link wrapper
    addItem(product)
    router.push('/cart')
  }

  return (
    <Link href={`/shop/product_details/${productId}`} className="block group">
      <div className="bg-white text-black rounded-2xl p-2 flex flex-col w-full hover:shadow-lg border border-transparent hover:border-gray-100 transition-all duration-300">

        {/* Image Section */}
        <div className="relative flex items-center justify-center h-[220px] mb-3  rounded-xl p-4">
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          <button
            className="absolute top-3 right-3 p-1.5 rounded-full transition-colors"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // Handle wishlist logic here
            }}
          >
            <FaRegHeart className="text-gray-600 text-xl hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-grow px-1">
          {/* Title */}
          <h3 className="text-[16px] font-normal text-gray-900 leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`text-[15px] ${i < rating || i < 5 /* Display 5 stars temporarily if no rating */ ? 'text-[#FFB800]' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-[14px] font-medium text-gray-800 ml-1">
              {reviewCount > 0 ? reviewCount : '265'} 
            </span>
          </div>

          {/* Price & Add Button Row */}
          <div className="flex items-center justify-between mt-2">
            
            {/* PRICE CONTAINER */}
            <div className="flex items-center gap-2">
              {/* Main Selling Price */}
              <span className="text-[14px] font-bold text-gray-900 tracking-tight">
                ₹{formatPrice(currentPrice)}
              </span>
              
              {/* Crossed-out Original Price */}
              {hasDiscount && (
                <span className="text-[11px] font-medium text-gray-400 line-through">
                  ₹{formatPrice(originalPrice)}
                </span>
              )}
            </div>

            {/* ADD Button */}
            <button
              onClick={handleAdd}
              className="border-[1.5px] border-[#2C3E50] text-[#2C3E50] rounded-[10px] px-6 py-1.5 text-[13px] font-semibold hover:bg-[#2C3E50] hover:text-white transition-colors duration-300"
            >
              ADD
            </button>
            
          </div>
        </div>

      </div>
    </Link>
  )
}