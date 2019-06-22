import SB from './partials/score-board'
import SOCS from './partials/socs'
import SOCS_HEADER from './partials/socs-header'
// import DOC_HEADER from './partials/head'

import COVER from './cover'
import BERITA_ACARA from './berita-acara'
import DAFTAR_HADIR from './daftar-hadir'
import LEMBAR_KOREKSI from './lembar-koreksi'
import LEMBAR_REVISI from './lembar-revisi'
import REKAP_PENILAIAN from './rekap-penilaian'
import RUBRIK_INDIVIDU from './rubrik-individu'
import RUBRIK_CAPSTONE from './rubrik-capstone'

export default function index(data) {
    const mahasiswa = data.ujian.skripsi.mahasiswa.length
    // var { tanggal, hari, ruang, waktu, dosen, sekretaris, mahasiswa, kadep } = data
    // const RUBRIK = mahasiswa.length ? RUBRIK_CAPSTONE(data) : RUBRIK_INDIVIDU(data, SOCS_HEADER, SOCS)
    
    let doc = [...COVER(data.ujian)]
    for (let i = 0; i < mahasiswa; i ++) {
        doc.push(
            ...BERITA_ACARA(data, i),
            ...DAFTAR_HADIR(data, i),
            // ...RUBRIK,
            ...LEMBAR_REVISI(data, i),
            ...REKAP_PENILAIAN(data),
            // ...LEMBAR_KOREKSI(data, i)
        )
    }

    return doc
}