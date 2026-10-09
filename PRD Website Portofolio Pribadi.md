# PRD: Website Portofolio Pribadi

**Versi:** 1.0  |  **Tanggal:** 9 Oktober 2026  |  **Status:** Draft  |  **Pemilik:** \[Nama Anda\]

## 1. Ringkasan Produk

Website portofolio pribadi satu halaman (single page) yang menampilkan profil, keahlian, dan karya pemilik secara profesional. Desainnya bertema **biru gelap modern minimalis**, interaktif, dan responsif di semua ukuran layar. Tujuan utamanya adalah membuat pengunjung (rekruter, klien, kolaborator) cepat memahami siapa pemilik, apa kemampuannya, dan bagaimana cara menghubunginya.

## 2. Latar Belakang dan Masalah

- CV dalam bentuk PDF bersifat statis dan sulit menampilkan proyek secara visual.
- Profil di platform pihak ketiga (LinkedIn, GitHub) terbatas dalam hal branding dan kontrol tampilan.
- Pemilik membutuhkan satu tempat terpusat yang mencerminkan identitas profesional dan mudah dibagikan lewat satu tautan.

## 3. Tujuan dan Metrik Keberhasilan

| Tujuan | Metrik | Target |
| --- | --- | --- |
| Memperkenalkan profil dengan jelas | Rata-rata durasi kunjungan | > 1,5 menit |
| Memamerkan proyek | Klik pada kartu proyek | > 30% pengunjung |
| Mendorong kontak | Pengiriman form / klik email | > 5% pengunjung |
| Performa teknis | Skor Lighthouse (Performance, Accessibility, SEO) | ≥ 90 |
| Kompatibilitas | Tampilan benar di mobile, tablet, desktop | 100% breakpoint utama |

## 4. Target Pengguna

1. **Rekruter / HRD** – ingin melihat ringkasan skill dan pengalaman dengan cepat.
2. **Klien / Pemberi proyek** – ingin menilai kualitas karya dan cara menghubungi.
3. **Sesama profesional / kolaborator** – ingin melihat bidang minat dan proyek.

**Perilaku utama:** sebagian besar akan membuka dari ponsel melalui tautan di CV, LinkedIn, atau pesan. Kesan pertama dalam 5 detik sangat menentukan.

## 5. Ruang Lingkup

**Termasuk (In Scope):** satu halaman dengan section Home, About, Skills, Projects, Contact, dan Footer; navigasi sticky; animasi interaktif; tata letak responsif; SEO dasar.

**Tidak termasuk (Out of Scope, versi 1.0):** blog, CMS/dashboard admin, sistem login, multi-bahasa, e-commerce.

## 6. Prinsip dan Arah Desain

- **Biru gelap modern minimalis:** latar gelap, aksen biru terang, banyak ruang kosong, tipografi bersih.
- **Hierarki jelas:** satu fokus utama per section, judul besar, teks pendukung ringkas.
- **Interaktif secukupnya:** animasi halus yang menambah kejelasan, bukan sekadar hiasan.
- **Mobile-first:** dirancang mulai dari layar kecil lalu diperluas.

### 6.1 Palet Warna (usulan)

| Peran | Warna | Hex |
| --- | --- | --- |
| Background utama | Navy sangat gelap | #0A1128 |
| Background section / kartu | Biru gelap | #101A3A |
| Permukaan kartu hover | Biru tua | #162449 |
| Aksen utama | Biru terang | #3B82F6 |
| Aksen sekunder (gradien) | Cyan | #22D3EE |
| Teks utama | Putih kebiruan | #E6EDF7 |
| Teks sekunder | Abu kebiruan | #94A3B8 |
| Garis / border | Biru redup | #1E2A52 |

Rasio kontras teks terhadap latar minimal 4,5:1 (standar WCAG AA).

### 6.2 Tipografi

- **Judul:** Poppins atau Space Grotesk (600–700).
- **Isi:** Inter (400–500).
- **Kode / label kecil (opsional):** JetBrains Mono.
- Skala: H1 48–64px (desktop) / 36–40px (mobile); H2 32–40px; body 16–18px; line-height 1,6.

### 6.3 Gaya Komponen

- Sudut membulat 12–16px, border tipis 1px berwarna biru redup.
- Efek glow lembut pada aksen biru saat hover.
- Tombol utama berisi warna solid biru, tombol sekunder berupa outline.
- Ikon konsisten menggunakan satu set (misalnya Lucide atau Feather).

## 7. Struktur Halaman dan Kebutuhan Fungsional

### 7.1 Navigasi (Navbar)

- Sticky di atas, latar transparan yang berubah menjadi biru gelap semi-blur (backdrop blur) saat di-scroll.
- Tautan: Home, About, Skills, Projects, Contact.
- **Scroll spy:** tautan aktif ter-highlight sesuai section yang terlihat.
- Smooth scroll ke setiap section.
- Mobile: menu hamburger dengan panel slide-in; tertutup otomatis setelah tautan dipilih.

### 7.2 Section Home (Hero)

**Tujuan:** kesan pertama yang kuat dan jelas.

**Konten:**

- Salam singkat, nama lengkap, dan profesi/headline (contoh: "Frontend Developer").
- Satu kalimat nilai tambah (tagline).
- Dua tombol CTA: **Lihat Proyek** (menuju Projects) dan **Hubungi Saya** (menuju Contact).
- Ikon tautan sosial (GitHub, LinkedIn, Instagram, dll.).
- Elemen visual: foto profil/ilustrasi atau bentuk geometris abstrak bergradien biru.

**Interaksi:**

- Efek mengetik (typing effect) bergantian pada peran/profesi.
- Animasi masuk (fade-up) berurutan untuk teks dan tombol.
- Latar dengan partikel/gradien lembut yang bergerak pelan (opsional, nonaktif jika pengguna memilih *reduced motion*).
- Indikator scroll di bagian bawah.

### 7.3 Section About

**Tujuan:** memperkenalkan pemilik secara personal dan profesional.

**Konten:**

- Foto profil dengan bingkai/efek aksen biru.
- Paragraf ringkas (maks. 3–4 kalimat) tentang latar belakang, fokus, dan nilai kerja.
- Statistik singkat (contoh: tahun pengalaman, jumlah proyek, sertifikasi).
- Tombol **Unduh CV** (PDF).
- Opsional: linimasa ringkas pendidikan dan pengalaman.

**Interaksi:**

- Angka statistik menghitung naik (count-up) saat section terlihat.
- Animasi reveal saat di-scroll.
- Efek hover halus pada foto.

### 7.4 Section Skills

**Tujuan:** menampilkan kompetensi secara terstruktur dan mudah dipindai.

**Konten:**

- Dikelompokkan per kategori: **Frontend, Backend, Tools & Lainnya, Soft Skills** (sesuaikan).
- Setiap skill ditampilkan dengan ikon/logo dan nama; opsional indikator level (bar progres atau label Dasar/Menengah/Mahir).

**Interaksi:**

- Tab atau filter kategori dengan transisi halus.
- Bar progres terisi animatif saat masuk viewport.
- Kartu skill naik sedikit dan bercahaya saat hover.

### 7.5 Section Projects

**Tujuan:** bukti nyata kemampuan.

**Konten per kartu proyek:**

- Thumbnail/screenshot, judul, deskripsi singkat (1–2 kalimat).
- Tag teknologi yang digunakan.
- Tombol **Live Demo** dan **Source Code** (GitHub).
- Jumlah awal: 3–6 proyek unggulan.

**Interaksi:**

- Grid responsif (3 kolom desktop, 2 tablet, 1 mobile).
- Filter berdasarkan kategori/teknologi (Semua, Web, Mobile, UI/UX, dll.).
- Efek hover: gambar sedikit membesar, overlay biru gelap, tombol aksi muncul.
- Klik kartu membuka **modal detail** (deskripsi lengkap, galeri gambar, tautan, fitur utama, teknologi). Modal dapat ditutup dengan tombol, klik di luar, atau tombol Esc.
- Tombol "Lihat Lebih Banyak" bila proyek lebih dari 6.

### 7.6 Section Contact

**Tujuan:** memudahkan pengunjung menghubungi pemilik.

**Konten:**

- Judul ajakan (contoh: "Mari Berkolaborasi") dan teks singkat.
- Informasi kontak: email, nomor WhatsApp (opsional), lokasi, tautan sosial.
- **Form kontak:** Nama, Email, Subjek (opsional), Pesan, tombol Kirim.

**Validasi dan perilaku form:**

- Semua kolom wajib kecuali subjek; format email divalidasi.
- Pesan kesalahan inline dalam bahasa yang jelas.
- State tombol: normal, loading, berhasil, gagal.
- Notifikasi (toast) setelah kirim berhasil/gagal.
- Perlindungan spam: honeypot field atau reCAPTCHA.
- Pengiriman melalui layanan pihak ketiga (EmailJS, Formspree, atau Web3Forms) agar tidak memerlukan backend sendiri.

### 7.7 Footer

**Konten:**

- Logo/nama singkat pemilik.
- Tautan navigasi cepat ke seluruh section.
- Ikon sosial media.
- Teks hak cipta (© 2026 \[Nama\]. All rights reserved.).
- Tombol **Back to Top** yang muncul setelah scroll tertentu.

## 8. Kebutuhan Interaktivitas Global

- Animasi *scroll reveal* di semua section (fade/slide-up, durasi 300–600ms).
- Transisi hover dan fokus konsisten di seluruh komponen (150–250ms).
- Progress bar scroll tipis di bagian atas halaman (opsional).
- Kursor kustom (opsional, hanya desktop).
- Hormati preferensi `prefers-reduced-motion`: animasi dikurangi atau dimatikan.
- Semua animasi tidak boleh menurunkan performa (gunakan `transform` dan `opacity`).

## 9. Kebutuhan Responsif

| Breakpoint | Lebar | Penyesuaian utama |
| --- | --- | --- |
| Mobile kecil | < 480px | 1 kolom, hamburger menu, font diperkecil, tombol lebar penuh |
| Mobile | 480–767px | 1 kolom, spasi section lebih rapat |
| Tablet | 768–1023px | Grid 2 kolom, layout hero bertumpuk/semi-sejajar |
| Desktop | 1024–1439px | Layout penuh, hero 2 kolom, grid proyek 3 kolom |
| Desktop besar | ≥ 1440px | Kontainer maks. 1200–1280px terpusat |

- Pendekatan **mobile-first** dengan media query `min-width`.
- Area sentuh minimal 44×44px.
- Tidak ada scroll horizontal pada ukuran layar apa pun.
- Gambar responsif (`srcset`/`loading="lazy"`).

## 10. Kebutuhan Non-Fungsional

**Performa**

- Skor Lighthouse ≥ 90 pada semua kategori.
- Largest Contentful Paint < 2,5 detik; CLS < 0,1.
- Gambar dikompres dan memakai format WebP/AVIF; font dimuat dengan `font-display: swap`.

**Aksesibilitas**

- HTML semantik (`header`, `nav`, `main`, `section`, `footer`).
- Teks alternatif pada semua gambar bermakna.
- Navigasi penuh via keyboard dengan indikator fokus yang jelas.
- Atribut ARIA pada menu mobile, modal, dan form.

**SEO**

- Title dan meta description unik, tag Open Graph dan Twitter Card.
- Favicon, `sitemap.xml`, dan `robots.txt`.
- Data terstruktur `Person` (JSON-LD).

**Kompatibilitas browser:** dua versi terbaru Chrome, Edge, Firefox, Safari (desktop dan mobile).

**Keamanan:** HTTPS, tidak menyimpan data sensitif di klien, kunci API form dibatasi domain.

## 11. Rekomendasi Teknologi

| Lapisan | Opsi A (ringan) | Opsi B (modern) |
| --- | --- | --- |
| Markup & Style | HTML5, CSS3 / Tailwind CSS | Tailwind CSS |
| Logika | JavaScript (vanilla) | React / Next.js atau Astro |
| Animasi | CSS animations, IntersectionObserver | Framer Motion / GSAP |
| Form | Formspree / EmailJS | EmailJS / Next.js API route |
| Hosting | GitHub Pages, Netlify | Vercel, Netlify |
| Analitik | Google Analytics / Plausible | Vercel Analytics / Plausible |

Rekomendasi: **Opsi A** bila ingin cepat dan sederhana; **Opsi B** bila ingin skalabilitas dan kemudahan menambah fitur ke depan.

## 12. Kebutuhan Konten (Disiapkan Pemilik)

- Nama lengkap, profesi/headline, tagline.
- Foto profil berkualitas baik (rasio 1:1 atau 4:5).
- Teks "About" dan data statistik.
- Daftar skill dan tingkat penguasaan.
- 3–6 proyek: screenshot, deskripsi, teknologi, tautan demo dan repositori.
- File CV (PDF).
- Email, tautan sosial media, dan kredensial layanan form.

## 13. User Stories

1. Sebagai rekruter, saya ingin melihat ringkasan profil dan skill dengan cepat agar bisa menilai kecocokan kandidat.
2. Sebagai klien, saya ingin melihat proyek beserta demonya agar yakin dengan kualitas karya.
3. Sebagai pengunjung mobile, saya ingin navigasi yang mudah dengan satu tangan agar nyaman menjelajah.
4. Sebagai pengunjung, saya ingin mengirim pesan langsung dari halaman tanpa membuka aplikasi lain.
5. Sebagai pengguna keyboard/pembaca layar, saya ingin dapat mengakses semua konten dan fungsi dengan setara.

## 14. Kriteria Penerimaan (Acceptance Criteria)

- [ ] Seluruh enam bagian (Home, About, Skills, Projects, Contact, Footer) tampil sesuai urutan dan konten.
- [ ] Navbar sticky dengan scroll spy dan smooth scroll berfungsi di semua browser target.
- [ ] Menu hamburger berfungsi pada layar < 768px.
- [ ] Animasi scroll reveal, typing effect, count-up, dan hover bekerja halus dan dapat dimatikan melalui *reduced motion*.
- [ ] Filter proyek dan modal detail berfungsi, termasuk penutupan via Esc.
- [ ] Form kontak memvalidasi input dan berhasil mengirim pesan ke email pemilik.
- [ ] Tidak ada scroll horizontal pada lebar 320px hingga 1920px.
- [ ] Skor Lighthouse ≥ 90 pada Performance, Accessibility, Best Practices, dan SEO.
- [ ] Kontras warna memenuhi WCAG AA.

## 15. Rencana Rilis dan Timeline

| Fase | Aktivitas | Estimasi |
| --- | --- | --- |
| 1. Persiapan | Finalisasi konten, aset, dan referensi desain | 2–3 hari |
| 2. Desain | Wireframe, UI mockup (desktop dan mobile), design token | 3–5 hari |
| 3. Pengembangan | Setup proyek, bangun section, interaksi, form | 5–7 hari |
| 4. Pengujian | Uji responsif, lintas browser, aksesibilitas, performa | 2–3 hari |
| 5. Peluncuran | Deploy, domain, SEO, analitik | 1–2 hari |
| **Total** |  | **± 2–3 minggu** |

## 16. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Animasi berlebihan memperlambat halaman | Tinggi | Gunakan animasi ringan, uji performa, sediakan mode *reduced motion* |
| Konten belum siap tepat waktu | Sedang | Gunakan placeholder, siapkan konten paralel dengan desain |
| Kontras teks rendah pada tema gelap | Sedang | Cek kontras dengan alat WCAG sejak tahap desain |
| Spam pada form kontak | Rendah | Honeypot atau reCAPTCHA, batas pengiriman |
| Gambar proyek berukuran besar | Sedang | Kompres, lazy loading, format modern |

## 17. Pengembangan Lanjutan (Future Scope)

- Mode terang/gelap dengan toggle.
- Section Testimoni dan Pengalaman Kerja.
- Blog atau catatan teknis.
- Dukungan dua bahasa (Indonesia dan Inggris).
- Integrasi CMS agar proyek mudah diperbarui tanpa mengubah kode.

## 18. Pertanyaan Terbuka

1. Apa profesi/bidang utama yang ingin ditonjolkan (developer, desainer, data, dll.)?
2. Apakah akan memakai teknologi sederhana (HTML/CSS/JS) atau framework (React/Next.js)?
3. Berapa jumlah proyek yang akan ditampilkan saat peluncuran?
4. Apakah sudah memiliki domain sendiri?
5. Apakah diperlukan dukungan bahasa Inggris sejak versi pertama?
