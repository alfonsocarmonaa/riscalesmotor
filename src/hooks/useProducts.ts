import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';

export function useProducts(first: number = 20, query?: string) {
  return useQuery({
    queryKey: ['products', first, query],
    queryFn: () => fetchProducts(first, query),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProductByHandle(handle: string) {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: () => fetchProductByHandle(handle),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}

export function useBestSellers() {
  return useQuery({
    queryKey: ['products', 'best-sellers'],
    queryFn: () => fetchProducts(8),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductsByTag(tag: string) {
  return useQuery({
    queryKey: ['products', 'tag', tag],
    queryFn: () => fetchProducts(20, `tag:${tag}`),
    staleTime: 1000 * 60 * 5,
  });
}
