# THR Lebaran Mini Challenge 5 Team-03

# Stock Management

- web API dan aplikasi manajemen stok yang berfungsi sebagai pengelola stok produk pada sebuah pusat penyedia produk yang menyediakan produk-produk pada perusahaan.
<hr>

## Database Structure

<p align="center" width="100%">
    <img width="90%" src="./public/images/ERD.png"> 
</p>

<hr>

# API Documentation

<p align='center'>
<a href="#" target="_blank" title="Postman Documentation"/>
<img style='width: 20%' src='https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white' alt='Postman Docs' title='Postman Docs'>
</p>

[READ HERE](#)

<hr>

# --- ROLE ---

### SUPERADMIN

| Resources    | Permission                      | Note                            |
| ------------ | ------------------------------- | ------------------------------- |
| users & auth | lihat, tambah, ubah, hapus data | register role superuser & admin |
| stock        | lihat, ubah, hapus data         |                                 |
| item         | lihat, tambah, ubah, hapus data |                                 |
| categoryItem | lihat, tambah, ubah, hapus data |                                 |
| company      | lihat, tambah, ubah, hapus data |                                 |

### ADMIN

| Resources    | Permission                | Note                                     |
| ------------ | ------------------------- | ---------------------------------------- |
| users & auth | lihat, tambah, hapus data | register role member, berdasar companyId |
| stock        | lihat, ubah, hapus data   |                                          |
| item         | tambah, ubah, hapus data  |                                          |
| categoryItem | tambah, ubah, hapus data  |                                          |
| company      | tambah, ubah, hapus data  |                                          |

### MEMBER

| Resources    | Permission | Note                 |
| ------------ | ---------- | -------------------- |
| users & auth | -          | register role member |
| stock        | ubah data  |                      |
| item         |            |                      |
| categoryItem |            |                      |
| company      |            |                      |

<hr>

# --- TABLE DATABASE ---

| name         | description |
| ------------ | ----------- |
| user         | -           |
| auth         | -           |
| stock        | -           |
| item         |             |
| categoryItem |             |
| company      |             |

<hr>

# Data Team 3

|                      |                           |
| -------------------- | ------------------------- |
| **Anggota Tim 03**   | _Reinanda Faris_          |
|                      | _Rizaldi Mustakim_        |
|                      | _Viery Nugroho_           |
|                      | _Asyifa Maharani Gustina_ |
|                      | _Qonita Afifah_           |
|                      |                           |
| **Kelas**            | _FSW 1_                   |
|                      |                           |
| **ID Fasil**         | _F-FSW24001086_           |
| **Nama Fasilitator** | _Imam Taufiq Hermawan_    |
|                      |                           |

<hr>

# Fullstack Web Development

### KM x Binar Academy Batch 6

|                                   |
| --------------------------------- |
| **Catatan**                       |
| Mini Challenge - Stock Management |

<hr>

# Langkah Install

- npm install
- migration
- seeding
- testing

<hr>

# TABEL DETAIL

### USER

- berisikan data umum user

### AUTH

- berisikan data autentikasi user

### CATEGORYITEMS

- berisikan data kategori item

### COMPANIES

- berisikan data perusahaan

### STOCKS

- berisikan data stok item tiap perusahaan

### ITEMS

- berisikan data produk item dan jumlah stok item

## register

- superadmin: register [superuser,admin]
- admin: register [member]

## peran tiap role

superadmin

- mengelola semua produk dan stok produk untuk semua perusahaan
- mengelola kategori produk
- mengelola daftar user dan admin

admin

- mengelola stok produk tiap perusahaan (menambah dan mengurangi produk dan stok produk)

member

- mengambil stok produk berdasarkan induk perusahaan (menambah atau mengurangi) - (sebagai sebuah mitra kerja atau bisnis cabang dari admin)
