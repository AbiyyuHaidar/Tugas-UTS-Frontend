Tugas UTS Frontend Aplikasi Toko Sparepart (Admin + Customer)

Project ini merupakan implementasi frontend sederhana untuk **toko sparepart** lengkap dengan halaman customer (katalog & checkout) dan halaman admin untuk manajemen produk. Proyek dibuat sebagai tugas UTS mata kuliah IF220 — Pemrograman Web / Front-End.

## 📌 Halaman yang ada

* `index.html` — Halaman utama / katalog produk (customer view)
* `checkout.html` — Halaman proses checkout / ringkasan pesanan
* `login.html` — Halaman login (untuk akses admin)
* `admin.html` — Halaman admin (manajemen produk / mock admin panel)
* `success.html` — Halaman sukses setelah checkout
* `css/` — file stylesheet
* `js/` — file JavaScript (logika UI / interaksi)

## 🎯 Fitur Utama

* Tampilan katalog produk (grid) dengan informasi dasar (nama, harga, stok)
* Form login sederhana (client-side) untuk mengakses halaman admin
* Halaman admin untuk menambah/ubah/hapus produk (mock, client-side)
* Proses checkout sederhana (mengumpulkan produk yang dipilih dan menampilkan ringkasan)
* Halaman sukses setelah pembayaran
* Desain responsif agar tampilan rapi di desktop dan mobile

> Catatan: semua fungsi bersifat **client-side (front-end)**. Tidak ada backend / database server — data contoh disimpan sementara via JavaScript (atau `localStorage` jika diimplementasikan).

## 🛠 Teknologi yang digunakan

* HTML5
* CSS3
* JavaScript (vanilla)
* Git & GitHub (untuk version control dan deployment via GitHub Pages)

## 📂 Struktur Folder (singkat)

/ (root)
├─ index.html
├─ checkout.html
├─ login.html
├─ admin.html
├─ success.html
├─ css/
│  └─ style.css
└─ js/
   └─ main.js

## ▶️ Cara Menjalankan (lokal)

1. Clone repository atau download ZIP
2. Buka folder project
3. Buka file `index.html` di browser (double-click atau `Open With → Browser`)

Atau jalankan live server di VS Code untuk pengalaman yang lebih baik:

* Install ekstensi Live Server → klik `Go Live` → buka `http://127.0.0.1:5500/index.html`

## 🌐 Deploy di GitHub Pages

Jika ingin agar site bisa diakses publik (demo):

1. Pastikan repository telah di-push ke GitHub (branch `main`)
2. GitHub → Settings → Pages → Source: `main` branch, folder `/ (root)` → Save
3. Tunggu 1–2 menit, lalu akses: `https://USERNAME.github.io/NAMA-REPO/`
   (Ganti `USERNAME` dan `NAMA-REPO` sesuai akunmu.)

## 🧾 Dokumentasi Singkat Kode

* `index.html` — markup katalog, tombol "Tambah ke Keranjang" akan memanggil fungsi JS untuk menambah item ke cart
* `admin.html` — form untuk menambah produk (fields: nama, harga, stok, deskripsi). Data baru akan langsung tampil pada halaman (client-side)
* `checkout.html` — mengambil data cart dari session/local state dan menampilkan ringkasan pesanan

## 👨‍💻 Pembuat

Nama: **Abiyyu Haidar**
NIM: *1002240055*
Mata Kuliah : Pemrograman Web / Front-End
* menambahkan screenshot otomatis dan badge GitHub Pages.

Mau mana yan
