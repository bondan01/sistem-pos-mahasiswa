# LAPORAN TUGAS BESAR: SISTEM POINT OF SALE (POS) MAHASISWA

**Mata Kuliah:** Manajemen Basis Data / Rekayasa Perangkat Lunak  
**Role:** System Analyst, DB Engineer, UI/UX, Security, Fullstack Dev  
**Teknologi:** PHP Native, MySQL, JavaScript, Bootstrap/Tailwind (Simulation)

---

## 1. COVER
*   **Judul:** Rancang Bangun Sistem Informasi Kasir (POS) Berbasis Web
*   **Penyusun:** Bondan Sampurno (bondansampurno123jk1@gmail.com)
*   **Institusi:** Universitas Teknologi Mahasiswa
*   **Tahun:** 2026

---

## 2. LATAR BELAKANG
Banyak UMKM di lingkungan kampus masih menggunakan pencatatan manual. Hal ini menyebabkan ketidakefisienan dalam manajemen stok dan risiko kehilangan data. Aplikasi POS ini dirancang untuk mendigitalisasi proses transaksi dengan fokus pada kemudahan penggunaan (mahasiswa-friendly) dan keamanan data.

---

## 3. RUMUSAN MASALAH
1. Bagaimana mengelola ribuan stok produk secara real-time?
2. Bagaimana membatasi hak akses antara kasir, admin, dan owner?
3. Bagaimana mengamankan data transaksi dari serangan SQL Injection?

---

## 4. TUJUAN SISTEM
*   Mempermudah kasir dalam menghitung total belanja secara otomatis.
*   Memberikan laporan berkala kepada owner tanpa harus ke toko.
*   Menjamin akurasi data stok barang.

---

## 5. ANALISIS SISTEM
Sistem ini menggunakan arsitektur Client-Server. Database MySQL menyimpan data relasional, sementara PHP (UI simulated in React) menangani logika bisnis. Keamanan diperketat dengan enkripsi AES untuk data pelanggan dan hashing BCRYPT untuk password.

---

## 6. INPUT - PROSES - OUTPUT

### 5 INPUT SISTEM
1.  **Input Data Produk:** Nama, Kategori, Harga, Stok.
2.  **Input Data Pelanggan:** Nama, Kontak, Alamat.
3.  **Input Transaksi Penjualan:** Produk pilihan, Jumlah, Diskon.
4.  **Input Supplier:** Detail vendor pemasok barang.
5.  **Input Stok Barang:** Penambahan stok secara manual (restock).

### 5 PROSES SISTEM
1.  **Validasi Login & Role:** Pengecekan kredensial (BCRYPT).
2.  **Calculation Engine:** Perhitungan subtotal, pajak, dan kembalian.
3.  **Real-time Stock Update:** Pengurangan stok otomatis saat transaksi *commit*.
4.  **Atomic Transaction:** Penyimpanan data ke tabel transaksi dan detail transaksi secara atomik.
5.  **AI Best Seller Analysis:** Algoritma sederhana untuk meranking penjualan tertinggi.

### 5 OUTPUT SISTEM
1.  **Struk Digital:** Bukti transaksi untuk pelanggan.
2.  **Laporan Harian:** Ringkasan pendapatan per hari.
3.  **Laporan Stok Kritis:** Notifikasi barang yang hampir habis.
4.  **Grafik Penjualan:** Visualisasi tren harian menggunakan Recharts.
5.  **Data Analitis:** Ranking produk terlaris untuk strategi promo.

---

## 7. ERD DAN DATABASE

### Struktur Tabel
1.  **users:** `id_user, username, password (hashed), role, nama`
2.  **produk:** `id_produk, nama, harga, stok, id_supplier`
3.  **transaksi:** `id_transaksi, tgl, id_user, id_pelanggan, total`
4.  **pelanggan:** `id_pelanggan, nama, kontak, alamat (encrypted)`
5.  **supplier:** `id_supplier, nama, kontak, alamat`

### SQL Sample
```sql
CREATE TABLE produk (
    id_produk VARCHAR(10) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga INT NOT NULL,
    stok INT DEFAULT 0
);
```

---

## 8. SISTEM KEAMANAN
*   **Hashing:** Menggunakan `password_hash($pass, PASSWORD_BCRYPT)`.
*   **Decryption:** Data alamat pelanggan disimpan terenkripsi (AES-256).
*   **Prepared Statement:** Mencegah SQL Injection dengan PDO.
*   **Session Guard:** Pengecekan `$_SESSION['role']` di setiap header halaman.

---

## 9. KESIMPULAN
Aplikasi POS ini telah memenuhi kriteria tugas besar mahasiswa dengan implementasi 5 input, 5 proses, dan 5 output, serta fitur keamanan standar industri. Sistem siap dijalankan pada lingkungan localhost XAMPP.
