PANDUAN MIGRASI FRONTEND KE GITHUB PAGES

ISI PAKET
- index.html: halaman publik utama (landing), sudah mengganti google.script.run menjadi fetch API.
- presensi.html: halaman presensi, sudah mengganti google.script.run menjadi fetch API.
- Api.gs: endpoint API baru untuk dipasang di project Apps Script yang sekarang.
- INTEGRASI_LANDING_GS.txt: perubahan kecil yang harus dilakukan pada doGet lama.

LANGKAH 1 — JANGAN HAPUS SISTEM LAMA
Simpan salinan project Apps Script dan jangan menghapus deployment lama.
Code.gs dan Setup.gs yang sudah ada tetap dipakai; jangan jalankan setup() ulang.

LANGKAH 2 — PASANG API
1. Buka project Apps Script yang sama.
2. Tambahkan file baru bernama Api.gs.
3. Salin isi Api.gs dari paket ini.
4. Buka Landing.gs. Pada awal fungsi doGet(e) yang sudah ada, tambahkan:
     if (e && e.parameter && e.parameter.api) return apiGet_(e);
   Letakkan sebelum kode yang memilih/menampilkan landing.html atau index.html.
5. Pastikan hanya ada SATU fungsi doGet(e) di seluruh project.
6. Jangan menghapus getLandingData() yang sudah ada.

LANGKAH 3 — DEPLOY APPS SCRIPT
Deploy > Manage deployments > Edit deployment Web app.
Pastikan Execute as: Me. Akses harus sesuai kebutuhan sistem dan kebijakan data.
Klik Deploy, lalu salin URL Web app yang berakhiran /exec.
Jika deployment memakai versi baru, pilih New version.

LANGKAH 4 — ISI URL API DI DUA HTML
Di index.html dan landing.html, cari:
  TEMPEL_URL_WEB_APP_APPS_SCRIPT_DI_SINI
Ganti dengan URL /exec dari deployment Apps Script, di antara tanda kutip.
Contoh format (bukan URL milik Anda):
  const API_URL = 'https://script.google.com/macros/s/ID_DEPLOYMENT/exec';

LANGKAH 5 — UPLOAD KE GITHUB
Unggah index.html dan presensi.html ke root repository GitHub Pages. index.html adalah halaman publik utama; tombol presensi membuka presensi.html.

CATATAN PENTING
- Endpoint ini memakai GET untuk data dan POST text/plain untuk presensi agar menghindari preflight OPTIONS.
- Browser masih dapat menolak akses lintas domain/CORS atau redirect Apps Script pada konfigurasi tertentu. Uji dari domain GitHub Pages sebelum mengalihkan pengguna.
- Fungsi getKaryawan() dan getDashboard(id) mengirim data ke browser. Pastikan data yang dikembalikan memang aman untuk diakses dari publik.
- ID karyawan bukan autentikasi kuat. Jangan menganggapnya sebagai perlindungan data pribadi.
- Jangan memasukkan password, token rahasia, atau kredensial Google ke HTML GitHub.
- Jangan hapus deployment Apps Script lama sampai semua tes berhasil: daftar karyawan, dashboard, lokasi, selfie, absen masuk, dan absen pulang.
