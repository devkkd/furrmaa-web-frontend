'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaStar, FaRegHeart } from 'react-icons/fa'
import { useCartStore } from '@/store/cartStore'

export default function ProductCard({ product }) {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)
  const rating = Math.floor(Number(product.rating) || 0)

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product)
    router.push('/cart')
  }

  return (
    <Link href={`/shop/product_details/${product.id}`} className="block">
      <div className="bg-white text-black border border-gray-200 rounded-xl p-3 flex flex-col h-[340px] hover:shadow-md transition cursor-pointer">

        <div className="relative flex items-center justify-center h-[180px] mb-2">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
          <button
            className="absolute top-2 right-2"
            onClick={(e) => e.preventDefault()}
          >
            <FaRegHeart className="text-gray-500 text-sm" />
          </button>
        </div>

        <p className="text-sm font-medium leading-snug line-clamp-2 h-[40px] mb-1">
          {product.name}
        </p>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-xs" />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews?.length || 0})
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-base font-semibold">₹{product.price}</span>
          {product.oldPrice != null && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <button
          className="mt-auto w-full border border-gray-300 rounded-xl py-2 text-sm font-medium hover:bg-black hover:text-white transition"
          onClick={handleAdd}
        >
          ADD
        </button>

      </div>
    </Link>
  )
}
