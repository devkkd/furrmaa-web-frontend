/**
 * Proxy: home page categories – fetches from backend so client doesn't hit CORS/wrong URL.
 * GET /api/categories → backend GET /categories or /admin/categories
 */
const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function GET() {
  try {
    const urls = [`${BACKEND}/categories`, `${BACKEND}/admin/categories`];
    for (const url of urls) {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const list = data?.categories ?? data?.data?.categories ?? (Array.isArray(data) ? data : []);
        return Response.json({ success: true, categories: Array.isArray(list) ? list : [] });
      }
    }
    return Response.json({ success: true, categories: [] });
  } catch (e) {
    return Response.json({ success: true, categories: [] });
  }
}
