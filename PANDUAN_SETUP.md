# PANDUAN SETUP APLIKASI POS (LOCALHOST XAMPP)

## 1. Persiapan Environment
*   Download dan Install **XAMPP** (versi mendukung PHP 8.0+).
*   Pastikan Service **Apache** dan **MySQL** berstatus "Running".

## 2. Setup Database (phpMyAdmin)
1.  Buka Browser: `http://localhost/phpmyadmin`.
2.  Buat Database Baru: Klik "New", beri nama `db_pos_mahasiswa`.
3.  Import SQL:
    *   Klik tab **Import**.
    *   Pilih file `/database/db_pos.sql` dari folder project ini.
    *   Klik **Go**.

## 3. Menjalankan Aplikasi
1.  Pindahkan Folder Project: Copy ke dalam `C:/xampp/htdocs/pos-mahasiswa`.
2.  Konfigurasi Koneksi:
    *   Buka `config/database.php`.
    *   Sesuaikan `host`, `user`, `pass`, dan `dbname`.
3.  Akses Browser: `http://localhost/pos-mahasiswa`.

## 4. Akun Login Default
*   **Admin:** `admin_pos` / `password123`
*   **Kasir:** `kasir_01` / `password123`
*   **Owner:** `owner_toko` / `password123`

## 5. Cara Deploy ke Hosting Gratis (InfinityFree / 000webhost)
1.  Daftar akun di hosting gratis.
2.  Upload file via **FTP** atau **File Manager** (ke folder `public_html`).
3.  Buat Database MySQL di panel hosting.
4.  Update file `config/database.php` dengan host, user, dan password database dari hosting.

---
*Dikembangkan untuk kebutuhan edukasi mahasiswa.*
