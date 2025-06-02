import { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch('/api/products');
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch product with id ${id}`);
    }
    return res.json();
}

