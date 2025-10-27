# 📖 Panduan Penggunaan Aplikasi

## 🚀 Quick Start

### 1. Jalankan Development Server
```bash
npm run dev
```
Aplikasi akan berjalan di **http://localhost:3000** (atau port lain seperti 3001 jika 3000 sedang digunakan)

### 2. Navigasi Aplikasi
- **Homepage** (`/`): Halaman Manajemen Produk
- **Pokemon Page** (`/pokemon`): Halaman Data Pokemon API

---

## 📝 Cara Menggunakan Fitur

### Halaman Manajemen Produk (`/`)

#### ✅ Menambah Produk Baru
1. Isi form "Tambah Produk" di bagian atas:
   - **Nama Produk**: Masukkan nama (harus unik, case-insensitive)
   - **Harga**: Masukkan harga (harus angka positif)
   - **Stok**: Masukkan stok (harus angka positif)
2. Klik tombol **"Tambah Produk"**
3. Produk akan muncul di grid di bawah

#### ✏️ Mengedit Produk
1. Klik tombol **"Edit"** pada card produk yang ingin diedit
2. Form akan berubah menjadi "Edit Produk" dengan data terisi
3. Ubah data yang diinginkan
4. Klik **"Update Produk"** atau **"Batal"** untuk membatalkan

#### 🗑️ Menghapus Produk
1. Klik tombol **"Hapus"** (merah) pada card produk
2. Modal konfirmasi akan muncul
3. Klik **"Hapus"** untuk konfirmasi atau **"Batal"** untuk membatalkan

#### 🔍 Mencari Produk
1. Ketik nama produk di field **"Cari Produk"**
2. Pencarian adalah **case-sensitive**
3. Hasil akan muncul setelah 300ms (debounced)
4. Jika tidak ada hasil, akan muncul pesan "Produk tidak ditemukan"

#### 🔢 Mengurutkan Produk
1. Klik dropdown **"Urutkan Berdasarkan"**
2. Pilih salah satu opsi:
   - **Default**: Urutan asli
   - **Harga (Terendah ke Tertinggi)**: Sort by price ascending
   - **Harga (Tertinggi ke Terendah)**: Sort by price descending
   - **Stok (Terendah ke Tertinggi)**: Sort by stock ascending
   - **Stok (Tertinggi ke Terendah)**: Sort by stock descending

---

### Halaman Pokemon API (`/pokemon`)

#### 📊 Melihat List Pokemon Abilities
- Scroll ke section **"Daftar Pokemon Abilities"**
- Tabel menampilkan 20 abilities dari PokeAPI
- Kolom: No, Nama Ability, URL

#### 🔍 Melihat Detail Ability
- Section **"Detail Ability: Battle Armor"** di bagian atas
- Menampilkan nama ability dan effect dalam bahasa Inggris
- Data diambil dari endpoint: `https://pokeapi.co/api/v2/ability/battle-armor`

#### 🔙 Kembali ke Halaman Utama
- Klik tombol **"← Kembali ke Manajemen Produk"** di bagian atas

---

## 🎨 Fitur Responsif

### Desktop (> 768px)
- Grid produk: 4 kolom (xl), 3 kolom (lg), 2 kolom (md)
- Search dan Sort: Side by side
- Form inputs: 3 kolom horizontal

### Tablet (640px - 768px)
- Grid produk: 2 kolom
- Search dan Sort: Stacked vertical
- Form inputs: 3 kolom horizontal

### Mobile (< 640px)
- Grid produk: 1 kolom (full width)
- Search dan Sort: Stacked vertical
- Form inputs: Stacked vertical
- Buttons: Full width

---

## ✨ Validasi Form

### Validasi Nama Produk
- ❌ **Tidak boleh kosong**: "Nama produk wajib diisi"
- ❌ **Tidak boleh duplikat**: "Nama produk sudah digunakan"
  - Case-insensitive: "Laptop" sama dengan "laptop"

### Validasi Harga
- ❌ **Tidak boleh kosong**: "Harga wajib diisi"
- ❌ **Harus angka positif**: "Harga harus berupa angka positif"
  - Contoh invalid: 0, -100, "abc"

### Validasi Stok
- ❌ **Tidak boleh kosong**: "Stok wajib diisi"
- ❌ **Harus angka positif**: "Stok harus berupa angka positif"
  - Contoh invalid: 0, -5, "xyz"

### Contoh Valid
```
Nama: Laptop Gaming
Harga: 15000000
Stok: 5
```

### Contoh Invalid
```
Nama: (kosong) ❌
Harga: -1000 ❌
Stok: 0 ❌
```

---

## 🎯 Testing Checklist

### Test Tambah Produk
- [ ] Tambah produk dengan semua field valid
- [ ] Coba tambah produk dengan nama kosong → Error
- [ ] Coba tambah produk dengan harga 0 atau negatif → Error
- [ ] Coba tambah produk dengan stok 0 atau negatif → Error
- [ ] Coba tambah produk dengan nama yang sudah ada (case-insensitive) → Error

### Test Edit Produk
- [ ] Edit produk dan ubah semua field → Sukses
- [ ] Edit produk dengan nama yang sudah dipakai produk lain → Error
- [ ] Edit produk dengan validasi yang sama seperti tambah
- [ ] Klik "Batal" saat edit → Form kembali ke mode tambah

### Test Hapus Produk
- [ ] Klik tombol "Hapus" → Modal muncul
- [ ] Klik "Batal" di modal → Produk tidak terhapus
- [ ] Klik "Hapus" di modal → Produk terhapus

### Test Pencarian
- [ ] Ketik nama produk case-sensitive → Hasil sesuai
- [ ] Ketik dengan case berbeda → Hasil berbeda (case-sensitive)
- [ ] Ketik nama yang tidak ada → "Produk tidak ditemukan"
- [ ] Hapus teks pencarian → Semua produk muncul lagi
- [ ] Cek debounce: Hasil muncul setelah 300ms stop typing

### Test Sorting
- [ ] Pilih "Harga (Terendah ke Tertinggi)" → Urut ascending
- [ ] Pilih "Harga (Tertinggi ke Terendah)" → Urut descending
- [ ] Pilih "Stok (Terendah ke Tertinggi)" → Urut ascending
- [ ] Pilih "Stok (Tertinggi ke Terendah)" → Urut descending
- [ ] Pilih "Default" → Urutan asli

### Test Responsif
- [ ] Buka di desktop (>1280px) → 4 kolom grid
- [ ] Resize ke tablet (768-1024px) → 2-3 kolom grid
- [ ] Resize ke mobile (<640px) → 1 kolom grid
- [ ] Cek semua buttons, forms, dan components tetap accessible

### Test Pokemon API
- [ ] Buka halaman `/pokemon` → Loading kemudian data muncul
- [ ] Cek tabel abilities → 20 rows muncul
- [ ] Cek detail Battle Armor → Name dan Effect muncul
- [ ] Cek jika API down → Error message muncul

---

## 🐛 Troubleshooting

### Port sudah digunakan?
```bash
# Jika port 3000 digunakan, Next.js otomatis menggunakan port lain
# Lihat terminal untuk port yang digunakan
✓ Ready on http://localhost:3001
```

### Error saat install dependencies?
```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json
npm install
```

### Styling tidak muncul?
```bash
# Restart dev server
# Ctrl+C untuk stop
npm run dev
```

### TypeScript errors?
```bash
# Check TypeScript
npm run build
```

---

## 📚 Referensi

### Dependencies
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com

### API References
- **PokeAPI**: https://pokeapi.co/docs/v2
- **Abilities List**: https://pokeapi.co/api/v2/ability
- **Battle Armor Detail**: https://pokeapi.co/api/v2/ability/battle-armor

---

## 💡 Tips

1. **Gunakan Dev Tools**: Browser DevTools untuk inspect responsive design
2. **Test di Multiple Devices**: Chrome DevTools → Toggle device toolbar
3. **Check Network Tab**: Lihat API calls ke PokeAPI
4. **Watch Console**: Error messages muncul di browser console
5. **Hot Reload**: Perubahan code otomatis ter-reload

---

**Happy Testing! 🎉**
