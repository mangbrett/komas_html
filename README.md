# Komputer dan Masyarakat

Presentasi satu halaman interaktif untuk mata kuliah **Komputer dan Masyarakat**. Materi disusun menjadi 16 bagian dengan navigasi slide, keyboard control, animasi reveal, dan scene jaringan digital berbasis Three.js.

## Menjalankan

Buka `index.html` langsung di browser modern, atau jalankan server lokal sederhana:

```powershell
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

Dependency visual Three.js dimuat dari CDN. Jika membutuhkan mode tanpa internet, unduh `three.min.js` ke folder lokal lalu ganti URL script di `index.html`.

## Kontrol

- Klik nomor di navigasi kiri atau tombol panah bawah/atas.
- `Arrow Down`, `Page Down`, `Arrow Right`, dan spasi untuk maju.
- `Arrow Up`, `Page Up`, dan `Arrow Left` untuk kembali.
- `Home` dan `End` untuk menuju awal atau akhir.
