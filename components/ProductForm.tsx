'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ProductFormProps {
  products: Product[];
  editingProduct: Product | null;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

export function ProductForm({ products, editingProduct, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    stock: '',
  });
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        stock: editingProduct.stock.toString(),
      });
    } else {
      setFormData({ name: '', price: '', stock: '' });
    }
    setErrors({});
  }, [editingProduct]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    // Validasi nama
    if (!formData.name.trim()) {
      newErrors.name = 'Nama produk wajib diisi';
    } else {
      // Cek nama unik (case-insensitive)
      const isDuplicate = products.some(
        (p) =>
          p.name.toLowerCase() === formData.name.toLowerCase() &&
          p.id !== editingProduct?.id
      );
      if (isDuplicate) {
        newErrors.name = 'Nama produk sudah digunakan';
      }
    }

    // Validasi harga
    if (!formData.price.trim()) {
      newErrors.price = 'Harga wajib diisi';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        newErrors.price = 'Harga harus berupa angka positif';
      }
    }

    // Validasi stok
    if (!formData.stock.trim()) {
      newErrors.stock = 'Stok wajib diisi';
    } else {
      const stock = parseInt(formData.stock);
      if (isNaN(stock) || stock <= 0) {
        newErrors.stock = 'Stok harus berupa angka positif';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ name: '', price: '', stock: '' });
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{editingProduct ? 'Edit Produk' : 'Tambah Produk'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Produk</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama produk"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Harga</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Masukkan harga"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stok</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="Masukkan stok"
                className={errors.stock ? 'border-red-500' : ''}
              />
              {errors.stock && (
                <p className="text-sm text-red-500">{errors.stock}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1 md:flex-none">
              {editingProduct ? 'Update Produk' : 'Tambah Produk'}
            </Button>
            {editingProduct && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Batal
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
