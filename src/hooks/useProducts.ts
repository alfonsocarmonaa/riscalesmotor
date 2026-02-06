import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductByHandle, ShopifyProduct, LocaleContext } from '@/lib/shopify';
import { useLocaleStore } from '@/stores/localeStore';

// Hook to get current locale context for Shopify API
function useLocaleContext(): LocaleContext {
  const country = useLocaleStore(state => state.country);
  const language = useLocaleStore(state => state.language);
  return { country, language };
}

export function useProducts(first: number = 20, query?: string) {
  const locale = useLocaleContext();
  
  return useQuery({
    queryKey: ['products', first, query, locale.country, locale.language],
    queryFn: () => fetchProducts(first, query, locale),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProductByHandle(handle: string) {
  const locale = useLocaleContext();
  
  return useQuery({
    queryKey: ['product', handle, locale.country, locale.language],
    queryFn: () => fetchProductByHandle(handle, locale),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}

export function useBestSellers() {
  const locale = useLocaleContext();
  
  return useQuery({
    queryKey: ['products', 'best-sellers', locale.country, locale.language],
    queryFn: () => fetchProducts(8, undefined, locale),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductsByTag(tag: string) {
  const locale = useLocaleContext();
  
  return useQuery({
    queryKey: ['products', 'tag', tag, locale.country, locale.language],
    queryFn: () => fetchProducts(20, `tag:${tag}`, locale),
    staleTime: 1000 * 60 * 5,
  });
}
