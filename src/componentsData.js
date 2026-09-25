export const PC_COMPONENTS = {
  gpu: {
    id: 'gpu',
    name: 'Kartu Grafis (GPU)',
    subname: 'NVIDIA GeForce GTX 780',
    category: 'Pemrosesan Grafis & Visual',
    icon: '⚡',
    nodeNames: ['Empty_12'],
    // Local displacement when pulled out
    offset: { x: 0, y: 0, z: 0.85 },
    // Camera framing focus
    cameraFocus: {
      target: { x: -0.44, y: 0.65, z: 0.8 },
      position: { x: -0.2, y: 0.85, z: 1.8 }
    },
    badge: 'HIGH PERFORMANCE',
    specs: [
      { label: 'Model', val: 'GeForce GTX 780' },
      { label: 'Arsitektur', val: 'Kepler GK110 (28nm)' },
      { label: 'CUDA Cores', val: '2304 Cores' },
      { label: 'Kapasitas VRAM', val: '3GB GDDR5' },
      { label: 'Bus Width', val: '384-Bit Memory Bus' },
      { label: 'Antarmuka Bus', val: 'PCI Express 3.0 x16' },
      { label: 'Daya (TDP)', val: '250W (6-Pin + 8-Pin)' }
    ],
    summary: 'Komponen komputasi grafis berperforma tinggi dengan sistem pendingin dual-slot.',
    explanation: 'Kartu Grafis (GPU - Graphics Processing Unit) adalah komponen vital yang didedikasikan khusus untuk memproses dan merender data visual, grafika 3D, efek pencahayaan, serta animasi ke monitor. Pada unit ini terpasang NVIDIA GeForce GTX 780 berbasis arsitektur Kepler GK110 dengan 2304 CUDA cores dan 3GB memori VRAM GDDR5 384-bit. Dilengkapi pendingin dual-fan heatsink dengan sirip aluminium tebal serta pelat pelindung belakang (backplate) untuk pembuangan panas yang optimal saat menjalankan aplikasi 3D berat.'
  },

  cpu_cooler: {
    id: 'cpu_cooler',
    name: 'Pendingin Prosesor (CPU Cooler)',
    subname: 'Tower Heatpipe Heatsink & Fan PWM',
    category: 'Manajemen Termal',
    icon: '❄️',
    nodeNames: ['coolerRad_16', 'cpuHeadCooler_18', 'cuperTubes_29', 'fan2_32', 'Holder_low_33', 'Bolt_14'],
    offset: { x: 0, y: 0, z: 0.75 },
    cameraFocus: {
      target: { x: -0.46, y: 1.05, z: 0.5 },
      position: { x: -0.2, y: 1.3, z: 1.5 }
    },
    badge: 'ACTIVE COOLING',
    specs: [
      { label: 'Tipe Pendingin', val: 'Tower Air Cooler' },
      { label: 'Heatpipes', val: '4x Pipa Tembaga Murni' },
      { label: 'Kipas', val: '120mm PWM Silent Fan' },
      { label: 'Material Fin', val: 'Aluminium Radiator Fins' },
      { label: 'Kontak Dasar', val: 'Direct Contact Copper Base' },
      { label: 'Konektor', val: '4-Pin Header PWM' }
    ],
    summary: 'Sistem disipasi panas dengan pipa tembaga konduktif dan radiator sirip aluminium.',
    explanation: 'CPU Cooler berfungsi menyerap panas intens yang dihasilkan prosesor selama beroperasi dan mendisipasikannya ke udara bebas agar temperatur CPU tetap berada di batas toleransi aman (mencegah thermal throttling). Panas dihantarkan dari pelat kontak tembaga bawah melalui 4 batang pipa kapiler tembaga (heatpipes) menuju tumpukan sirip-sirip aluminium luas, yang kemudian dihembuskan keluar secara aktif oleh kipas pendingin PWM 120mm berkecepatan dinamis.'
  },

  cpu: {
    id: 'cpu',
    name: 'Prosesor (CPU)',
    subname: 'Central Processing Unit & LGA Socket',
    category: 'Unit Pemrosesan Pusat',
    icon: '🧠',
    nodeNames: ['CPU_17', 'socket_43'],
    offset: { x: 0, y: 0, z: 0.6 },
    cameraFocus: {
      target: { x: -0.46, y: 1.02, z: 0.3 },
      position: { x: -0.3, y: 1.15, z: 1.1 }
    },
    badge: 'SYSTEM BRAIN',
    specs: [
      { label: 'Komponen', val: 'Desktop Processor Chip' },
      { label: 'Soket Dudukan', val: 'LGA Socket Mechanism' },
      { label: 'Pelindung Atas', val: 'Nickel-Plated Copper IHS' },
      { label: 'Pengunci', val: 'Metal Retention Load Lever' },
      { label: 'Fungsi Utama', val: 'Instruksi Logika & Aritmatika' }
    ],
    summary: 'Otak utama komputer yang mengeksekusi instruksi dan mengontrol seluruh alur data.',
    explanation: 'Central Processing Unit (CPU) sering diibaratkan sebagai otak dari keseluruhan sistem komputer. Mikroprosesor ini mengemban tanggung jawab utama mengeksekusi instruksi program, mengolah logika biner, perhitungan matematika kompleks, serta mengoordinasikan transfer data antara RAM, kartu grafis, dan storage. Komponen ini terkunci rapat di soket LGA motherboard dengan mekanisme tuas logam presisi dan dilindungi oleh Integrated Heat Spreader (IHS) untuk perlindungan die silikon.'
  },

  ram: {
    id: 'ram',
    name: 'Memori RAM (Random Access Memory)',
    subname: 'Dual-Channel High-Speed DIMM Modules',
    category: 'Memori Kerja Utama',
    icon: '💾',
    nodeNames: ['ram_41', 'ram.001_42'],
    offset: { x: 0, y: 0.35, z: 0.55 },
    cameraFocus: {
      target: { x: -0.21, y: 1.25, z: 0.3 },
      position: { x: 0.05, y: 1.45, z: 1.15 }
    },
    badge: 'DUAL CHANNEL',
    specs: [
      { label: 'Konfigurasi', val: '2x DIMM Slots (Dual-Channel)' },
      { label: 'Tipe Memori', val: 'High-Frequency DDR SDRAM' },
      { label: 'Pendingin', val: 'Aluminium Heat Spreader' },
      { label: 'Pin Konektor', val: 'Gold-Plated Contact Fingers' },
      { label: 'Karakteristik', val: 'Volatile (Data Sementara)' }
    ],
    summary: 'Memori kerja ultra cepat untuk menampung instruksi dan data aplikasi yang sedang berjalan.',
    explanation: 'RAM (Random Access Memory) merupakan memori komputer berkecepatan tinggi yang menyimpan data sementara dan instruksi aktif yang sedang diproses oleh CPU. Berbeda dengan SSD, kecepatan transfer RAM berlipat ganda lebih cepat sehingga CPU tidak mengalami hambatan antrian instruksi (latency bottleneck). Pada sistem ini terpasang 2 keping modul RAM dalam konfigurasi dual-channel yang dilengkapi pelindung panas (heat spreader) aluminium untuk menjaga kestabilan frekuensi kerja.'
  },

  motherboard: {
    id: 'motherboard',
    name: 'Motherboard (Papan Induk / Mainboard)',
    subname: 'Standard ATX System Board',
    category: 'Platform & Bus Interkoneksi',
    icon: '🎛️',
    nodeNames: ['baseMB_13', 'northbridge_39', 'IOdevices_34', 'box_15', 'Plane_40', 'Mesh_36.002_35', 'Mesh_4_36', 'Mesh_6_37', 'Mesh_7_38', 'Cube_19', 'Cube.001_20', 'Cube.002_21', 'Cube.003_22', 'Cube.004_23', 'Cube.005_24', 'Cube.006_25', 'Cube.007_26', 'Cube.008_27', 'Cube.012_28', 'Cylinder_30', 'Cylinder.001_31'],
    offset: { x: 0, y: 0, z: 0.7 },
    cameraFocus: {
      target: { x: -0.48, y: 0.74, z: 0.4 },
      position: { x: -0.25, y: 0.9, z: 1.8 }
    },
    badge: 'CORE BACKBONE',
    specs: [
      { label: 'Faktor Bentuk', val: 'Standard ATX Form Factor' },
      { label: 'Soket CPU', val: 'Central LGA Socket' },
      { label: 'Slot Ekspansi', val: 'PCI Express x16 & x1' },
      { label: 'Slot Memori', val: '4x DDR DIMM Slots' },
      { label: 'Regulasi Daya', val: 'Multi-Phase Solid VRM' },
      { label: 'Port Belakang', val: 'Integrated I/O Shield Ports' }
    ],
    summary: 'Papan sirkuit utama sebagai fondasi integrasi seluruh komponen dan jalur komunikasi data.',
    explanation: 'Motherboard adalah tulang punggung integrasi seluruh perangkat keras komputer. Papan sirkuit multilayer (PCB) ini menyediakan jalur konduktor tembaga (traces) berkecepatan tinggi yang menghubungkan prosesor, kartu grafis, memori RAM, dan media penyimpanan. Di dalamnya terpasang rangkaian Voltage Regulator Module (VRM) untuk kestabilan tegangan listrik prosesor, heatsink pendingin chipset kontroler, serta port I/O belakang lengkap untuk konektivitas periferal eksternal.'
  },

  psu: {
    id: 'psu',
    name: 'Power Supply Unit (Catu Daya / PSU)',
    subname: 'ATX High-Efficiency Power Supply',
    category: 'Distribusi & Regulasi Daya Listrik',
    icon: '🔌',
    nodeNames: ['powerSupply_0'],
    offset: { x: 0, y: 0, z: 0.8 },
    cameraFocus: {
      target: { x: -0.69, y: 1.61, z: 0.75 },
      position: { x: -0.4, y: 1.75, z: 1.9 }
    },
    badge: 'POWER CONVERTER',
    specs: [
      { label: 'Form Factor', val: 'ATX Standard PSU' },
      { label: 'Input AC', val: '100-240V ~ 50-60Hz' },
      { label: 'Output Tegangan', val: '+12V, +5V, +3.3V, -12V' },
      { label: 'Kipas Pendingin', val: '120mm Low-Noise Fan' },
      { label: 'Konektivitas', val: '24-Pin ATX, 8-Pin EPS, PCIe' },
      { label: 'Fitur Keamanan', val: 'OVP, UVP, OCP, SCP Protection' }
    ],
    summary: 'Mengubah arus bolak-balik (AC) tegangan tinggi menjadi arus searah (DC) stabil.',
    explanation: 'Power Supply Unit (PSU) adalah jantung penyuplai energi seluruh komponen PC. PSU mengubah arus listrik bolak-balik (AC 220V) dari sumber jala-jala listrik rumah menjadi arus searah (DC) murni dengan tingkatan tegangan presisi: rel +12V untuk komponen pemakan daya besar seperti CPU dan GPU, serta rel +5V dan +3.3V untuk chipset, RAM, dan sirkuit logika kontrol. Dilengkapi sistem proteksi kelistrikan terpadu dan kipas internal untuk sirkulasi pendinginan komponen trafo.'
  },

  ssd: {
    id: 'ssd',
    name: 'Penyimpanan SSD (Solid State Drive)',
    subname: '2.5-Inch SATA III NAND Storage Drive',
    category: 'Media Penyimpanan Data Sekunder',
    icon: '⚡',
    nodeNames: ['ssd_3', 'ssd.001_4'],
    offset: { x: 0.15, y: 0, z: 0.75 },
    cameraFocus: {
      target: { x: 0.7, y: 0.4, z: 0.6 },
      position: { x: 0.9, y: 0.6, z: 1.45 }
    },
    badge: 'FLASH STORAGE',
    specs: [
      { label: 'Faktor Bentuk', val: '2.5 Inch Slim Case' },
      { label: 'Antarmuka', val: 'SATA III 6Gbps Transfer' },
      { label: 'Tipe Memori', val: 'Non-Volatile NAND Flash' },
      { label: 'Kecepatan Baca', val: 'Hingga 550 MB/detik' },
      { label: 'Karakteristik', val: 'Tahan Guncangan, Tanpa Motor' },
      { label: 'Daya Listrik', val: 'SATA 15-Pin Power Connector' }
    ],
    summary: 'Penyimpanan non-volatile berbasis chip silikon dengan kecepatan akses data seketika.',
    explanation: 'Solid State Drive (SSD) adalah media penyimpanan data modern generasi penerus hard disk drive konvensional. Menggunakan chip memori non-volatile NAND flash, SSD tidak memiliki satupun komponen mekanis yang bergerak, membuatnya hening sempurna, hemat energi, dan sangat tahan guncangan. Kecepatan baca-tulis yang tinggi membuat waktu booting sistem operasi Windows/Linux selesai dalam hitungan detik dan mempercepat proses rendering file tugas berukuran besar.'
  },

  case_fan: {
    id: 'case_fan',
    name: 'Kipas Casing (Exhaust Fan)',
    subname: '120mm Rear High-Airflow Fan & Grill',
    category: 'Sirkulasi & Ventilasi Udara',
    icon: '🌀',
    nodeNames: ['fan1_1', 'fan_grid_51'],
    offset: { x: -0.35, y: 0, z: 0.65 },
    cameraFocus: {
      target: { x: -0.97, y: 1.11, z: 0.7 },
      position: { x: -1.2, y: 1.25, z: 1.6 }
    },
    badge: 'AIRFLOW SYSTEM',
    specs: [
      { label: 'Dimensi Fan', val: '120 x 120 x 25 mm' },
      { label: 'Jumlah Bilah', val: '7 Aerodynamic Swept Blades' },
      { label: 'Tipe Aliran', val: 'Exhaust (Pembuang Panas)' },
      { label: 'Bantalan Poros', val: 'Hydraulic / Sleeve Bearing' },
      { label: 'Proteksi', val: 'Metal Mesh Safety Fan Grill' }
    ],
    summary: 'Mengalirkan udara panas internal ke luar casing demi menjaga suhu operasional tetap sejuk.',
    explanation: 'Kipas pendingin casing diposisikan di panel belakang sejajar dengan cooler CPU untuk menarik udara panas yang terkumpul di dalam kabin komputer dan membuangnya ke luar ruangan. Membentuk tekanan udara terencana (airflow cycle) bersama ventilasi depan, kipas ini menjamin pertukaran udara segar berlangsung terus menerus sehingga komponen di dalam casing tidak terperangkap dalam suhu panas berlebih.'
  },

  chassis: {
    id: 'chassis',
    name: 'Casing Komputer (PC Chassis / Enclosure)',
    subname: 'Mid-Tower Showcase PC Case',
    category: 'Rangka & Penyangga Mekanis',
    icon: '🖥️',
    nodeNames: ['casr_frontpanel_47', 'case_top_46', 'case_sideR_48', 'case_back_49', 'case_bottom_45', 'stands_2', 'case_standsDrive_52', 'case_driveSlots_53', 'case_driveSlots2_54', 'case_pciSlots_50'],
    offset: { x: 0, y: 0, z: 0 },
    cameraFocus: {
      target: { x: 0, y: 0.9, z: 0 },
      position: { x: 1.6, y: 1.3, z: 2.2 }
    },
    badge: 'CHASSIS FRAME',
    specs: [
      { label: 'Klasifikasi', val: 'Mid-Tower ATX Case' },
      { label: 'Material Rangka', val: 'Baja SPCC Logam Kuat' },
      { label: 'Panel Kanan', val: 'Solid Metal Side Panel' },
      { label: 'Kabin Internal', val: 'Open Showcase Window View' },
      { label: 'Dudukan Drive', val: 'Kandang Bracket Drive Cage 2.5/3.5"' },
      { label: 'Penyangga', val: '4x Kaki Karet Peredam Getaran' }
    ],
    summary: 'Rangka eksternal pelindung yang menyatukan dan menopang seluruh perangkat keras PC.',
    explanation: 'Casing komputer (PC Enclosure) berfungsi sebagai struktur penopang mekanis utama yang menyatukan seluruh komponen PC pada dudukannya masing-masing secara aman. Selain melindungi komponen sensitif dari kotoran debu dan benturan fisik eksternal, desain casing menyediakan tata letak lubang manajemen kabel yang rapi serta jalur terowongan udara (wind tunnel) yang terarah guna memaksimalkan efisiensi pendinginan.'
  }
};

export const INITIAL_CAMERA = {
  position: { x: 1.8, y: 1.5, z: 2.4 },
  target: { x: -0.1, y: 0.9, z: 0 }
};
