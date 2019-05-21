import SB from './partials/score-board'
import SOCS from './partials/socs'
import SOCS_HEADER from './partials/socs-header'
import DOC_HEADER from './partials/head'

import BERITA_ACARA from './berita-acara'
import DAFTAR_HADIR from './daftar-hadir'
import LEMBAR_KOREKSI from './lembar-koreksi'
import LEMBAR_REVISI from './lembar-revisi'
import REKAP_PENILAIAN from './rekap-penilaian'
import RUBRIK_INDIVIDU from './rubrik-individu'
import RUBRIK_CAPSTONE from './rubrik-capstone'

export default function index(data, socHeaders) {
    var { tanggal, hari, ruang, waktu, dosen, sekretaris, mahasiswa, kadep } = data
    
    var doc = [
        ...BERITA_ACARA(data, DOC_HEADER.vertical, SB),
        ...DAFTAR_HADIR(data),
        ...RUBRIK_INDIVIDU(data, socHeaders, SOCS),
        ...RUBRIK_CAPSTONE(data),
        ...REKAP_PENILAIAN(data),
        ...LEMBAR_REVISI(data),
        ...LEMBAR_KOREKSI(data)
    ]

    return doc
}