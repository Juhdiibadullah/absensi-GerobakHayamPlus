/**
 * API penghubung GitHub Pages -> Google Apps Script.
 * Tambahkan file ini sebagai Api.gs di project Apps Script yang sama.
 * Jangan menghapus fungsi bisnis yang sudah ada di Code.gs.
 */

function apiJson_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function apiGet_(e) {
  try {
    const action = String((e && e.parameter && e.parameter.api) || '');
    let data;

    if (action === 'getKaryawan') {
      data = getKaryawan();
    } else if (action === 'getDashboard') {
      const id = String((e.parameter && e.parameter.id) || '');
      if (!id) throw new Error('ID karyawan belum diisi.');
      data = getDashboard(id);
    } else if (action === 'getLandingData') {
      data = getLandingData();
    } else {
      throw new Error('Aksi API tidak dikenal.');
    }

    return apiJson_({ ok: true, data: data });
  } catch (err) {
    return apiJson_({ ok: false, error: err && err.message ? err.message : String(err) });
  }
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw) throw new Error('Data permintaan kosong.');

    const req = JSON.parse(raw);
    if (req.action !== 'submitAttendance') {
      throw new Error('Aksi POST tidak diizinkan.');
    }

    const args = Array.isArray(req.args) ? req.args : [];
    if (args.length !== 2) throw new Error('Data presensi tidak lengkap.');

    const data = submitAttendance(String(args[0]), args[1] || {});
    return apiJson_({ ok: true, data: data });
  } catch (err) {
    return apiJson_({ ok: false, error: err && err.message ? err.message : String(err) });
  }
}
