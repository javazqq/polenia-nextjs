import { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
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

export async function fetchCategories(): Promise<
  {
    name: string;
    productCount: number;
    sampleImage: string;
    displayName: string;
  }[]
> {
  const res = await fetch("/api/products/categories");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export async function fetchProductsByCategory(
  category: string
): Promise<Product[]> {
  const res = await fetch(`/api/products/category/${category}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products for category ${category}`);
  }
  return res.json();
}

export async function createProduct(productData: {
  name: string;
  description: string;
  image: string;
  price: number;
  countInStock: number;
  parcel: {
    length: number;
    width: number;
    height: number;
    weight: number;
    packageType: string;
    declaredValue: number;
    packageNumber: number;
    consignmentNote: string;
    packageProtected: boolean;
  };
}) {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    throw new Error("Failed to create product");
  }
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`/api/products?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete product");
  }
  return res.json();
}

export async function updateProduct(id: string, productData: Partial<Product>) {
  const res = await fetch(`/api/products`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...productData, id }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update product with id ${id}`);
  }
  return res.json();
}
