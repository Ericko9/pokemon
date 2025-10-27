'use client';

import { useState, useMemo } from 'react';
import { Product, ProductFormData } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { ProductForm } from '@/components/ProductForm';
import { DeleteModal } from '@/components/DeleteModal';
import { SearchBar } from '@/components/SearchBar';
import { SortDropdown, SortOption } from '@/components/SortDropdown';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Laptop Gaming', price: 15000000, stock: 5 },
    { id: '2', name: 'Mouse Wireless', price: 250000, stock: 20 },
    { id: '3', name: 'Keyboard Mechanical', price: 1200000, stock: 8 },
  ]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search query dengan delay 300ms
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter dan sorting produk
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Pencarian case-sensitive
    if (debouncedSearch) {
      filtered = products.filter((p) => p.name.includes(debouncedSearch));
    }

    // Sorting
    let sorted = [...filtered];
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'stock-asc':
        sorted.sort((a, b) => a.stock - b.stock);
        break;
      case 'stock-desc':
        sorted.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    return sorted;
  }, [products, debouncedSearch, sortOption]);

  const handleSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      // Update produk
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: data.name,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
              }
            : p
        )
      );
      setEditingProduct(null);
    } else {
      // Tambah produk baru
      const newProduct: Product = {
        id: Date.now().toString(),
        name: data.name,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
      };
      setProducts([...products, newProduct]);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (product: Product) => {
    setDeletingProduct(product);
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      setProducts(products.filter((p) => p.id !== deletingProduct.id));
      setDeletingProduct(null);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Manajemen Produk
          </h1>
          <p className="text-gray-600">
            Kelola produk Anda dengan mudah dan efisien
          </p>
          <div className="mt-4">
            <Link href="/pokemon">
              <Button variant="outline">Lihat Data Pokemon API</Button>
            </Link>
          </div>
        </div>

        <ProductForm
          products={products}
          editingProduct={editingProduct}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <SortDropdown value={sortOption} onChange={setSortOption} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data...</p>
            </div>
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchQuery ? 'Produk tidak ditemukan' : 'Belum ada produk'}
              </h3>
              <p className="text-gray-500">
                {searchQuery
                  ? 'Coba kata kunci pencarian yang berbeda'
                  : 'Tambahkan produk pertama Anda menggunakan form di atas'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <DeleteModal
          product={deletingProduct}
          isOpen={!!deletingProduct}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      </div>
    </div>
  );
}

