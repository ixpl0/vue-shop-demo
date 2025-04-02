import { fetchJson } from './http';
import type { EcwidProduct, EcwidCategory } from '@/types/ecwid';

type ProductsResult = {
  items: EcwidProduct[];
};

type CategoriesResult = {
  items: EcwidCategory[];
};

const BASE_URL = 'https://app.ecwid.com/api/v3';
const STORE_ID = '108362264';

const buildUrl = (path: string) => `${BASE_URL}/${STORE_ID}${path}`;

export const getAllProducts = async (): Promise<EcwidProduct[]> => {
  const { items } = await fetchJson<ProductsResult>(buildUrl('/products'));

  return items;
};

export const getProductById = (id: number): Promise<EcwidProduct> => {
  return fetchJson<EcwidProduct>(buildUrl(`/products/${id}`));
};

export const getAllCategories = async (): Promise<EcwidCategory[]> => {
  const { items } = await fetchJson<CategoriesResult>(buildUrl('/categories'));

  return items;
};

export const getProductsByCategory = async (categoryId: number): Promise<EcwidProduct[]> => {
  const { items } = await fetchJson<ProductsResult>(buildUrl(`/products?category=${categoryId}`));

  return items;
};
