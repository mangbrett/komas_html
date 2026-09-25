# 🖥️ Eksplorasi Komponen PC 3D/4D Interaktif

Aplikasi web visualisasi 3D interaktif yang menyajikan anatomi dan fungsi komponen-komponen komputer (PC) secara mendalam, dibangun menggunakan **Three.js**, **GSAP**, dan **Vanilla CSS**.

---

## ✨ Fitur Utama (Sesuai Kebutuhan Tugas)

1. **Kondisi Idle Terakit Penuh**  
   - Saat awal dibuka dan dalam kondisi diam (idle), seluruh komponen PC berada dalam posisi terakit rapi di dalam casing PC.
   - Dilengkapi sistem tata cahaya cybernetic modern, bayangan dinamis, dan pedestal tech ring.

2. **Kontrol Rotasi 360 Derajat Bebas**  
   - Pengguna dapat memutar PC 360° secara horizontal maupun vertikal untuk melihat seluruh sudut bagian luar maupun dalam casing.
   - Mendukung kontrol *OrbitControls* dengan peredaman halus (*smooth damping*).
   - Tersedia tombol **"Putar 360°"** untuk mengaktifkan autorotasi sinematik otomatis.

3. **Animasi Ekstraksi Komponen & Zoom Kamera**  
   - Ketika pengguna mengklik bagian komponen PC (baik langsung pada model 3D maupun melalui menu navigasi komponen di sebelah kiri):
     - Komponen tersebut akan bergerak meluncur keluar dari casing (*pull-out/exploded view*).
     - Kamera secara otomatis melakukan *zoom in* dan berfokus penuh ke komponen yang dipilih dengan transisi sudut sinematik.

4. **Popup Statik Pojok dengan Metode Running Text**  
   - Ketika kamera berfokus pada komponen, kartu popup statik berdesain *glassmorphism* futuristik akan muncul di pojok kanan bawah.
   - Penjelasan detail mengenai fungsi, cara kerja, dan arsitektur komponen ditampilkan menggunakan **running text (efek typewriter streaming)** dengan kursor berkedip dan efek suara ketik.
   - Dilengkapi badge kategori, daftar spesifikasi teknis (CUDA Cores, VRAM, TDP, Port/Soket, dll.), tombol *Tampilkan Penuh*, serta tombol navigasi *Sebelumnya / Berikutnya*.

5. **Tombol "Rakit Penuh" & Pasang Kembali**  
   - Pengguna dapat menekan tombol **"Rakit Penuh"** di header atau **"↺ Pasang Kembali ke Casing"** pada kartu popup untuk mengembalikan komponen kembali ke posisi terakit semula di dalam casing serta mereset sudut pandang kamera ke kondisi awal.

6. **Audio FX Synthesizer (Web Audio API)**  
   - Dilengkapi efek suara interaktif bawaan (klik UI, servo motor saat komponen ditarik/dikembalikan, dan ketukan running text) tanpa memerlukan file audio eksternal. Dapat diaktifkan/dinonaktifkan melalui tombol audio di navigasi atas.

---

## 🛠️ Komponen yang Dapat Dieksplorasi

- ⚡ **Kartu Grafis (GPU):** NVIDIA GeForce GTX 780 (Dual-Fan Heatsink, 2304 CUDA Cores, 3GB VRAM)
- ❄️ **Pendingin CPU (CPU Cooler):** Tower Air Cooler dengan 4 Heatpipe Tembaga & Kipas PWM 120mm
- 🧠 **Prosesor (CPU):** Desktop Processor Chip & Mekanisme Pengunci Soket LGA
- 💾 **Memori RAM:** Dual-Channel High-Speed DIMM Modules dengan Aluminium Heat Spreader
- 🎛️ **Motherboard (Papan Induk):** Standard ATX System Board dengan VRM, Chipset Heatsink & Rear I/O Ports
- 🔌 **Power Supply Unit (PSU):** ATX Power Supply Pengubah Arus AC ke DC stabil
- ⚡ **Penyimpanan SSD:** 2.5-Inch SATA III NAND Flash Drive
- 🌀 **Kipas Casing (Exhaust Fan):** 120mm Rear High-Airflow Cooling Fan & Grill Logam
- 🖥️ **Casing PC (Chassis):** Mid-Tower ATX Open-Side Showcase Enclosure

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

1. **Buka Terminal / PowerShell di folder proyek:**
   ```bash
   npm run dev
   ```

2. **Akses melalui Browser:**
   Buka browser favorit Anda (Google Chrome, Edge, Firefox, dll.) dan buka alamat:
   ```
   http://localhost:5173/
   ```

3. **Build untuk Distribusi:**
   ```bash
   npm run build
   ```
   File hasil build produksi akan tersimpan di dalam folder `dist/`.
