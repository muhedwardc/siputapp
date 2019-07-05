import COVER from './cover'
import BERITA_ACARA from './berita-acara'
import DAFTAR_HADIR from './daftar-hadir'
import LEMBAR_KOREKSI from './lembar-koreksi'
import LEMBAR_REVISI from './lembar-revisi'
import REKAP_PENILAIAN from './rekap-penilaian'
import RUBRIK_INDIVIDU from './rubrik-individu'
import RUBRIK_CAPSTONE from './rubrik-capstone'

export default function index(data) {
    const { rekap_komentar, rekap_nilai, rekap_ujian, revisi_judul, kadep, sekretaris } = data
    const mahasiswa = rekap_ujian.skripsi.mahasiswa.length
    function RUBRIK(capstone, i) {
        if (capstone) return RUBRIK_CAPSTONE(rekap_ujian, rekap_nilai, i)
        return RUBRIK_INDIVIDU(rekap_ujian, rekap_nilai)
    }
    
    let doc = [...COVER(rekap_ujian)]
    for (let i = 0; i < mahasiswa; i ++) {
        doc.push(
            ...BERITA_ACARA(rekap_ujian, Number(rekap_nilai[i].rerata_total), kadep, i),
            ...DAFTAR_HADIR(rekap_ujian, sekretaris, i),
            ...RUBRIK(mahasiswa > 1, i),
            ...LEMBAR_REVISI(rekap_ujian, revisi_judul, i),
            ...REKAP_PENILAIAN(rekap_ujian, rekap_nilai),
            ...LEMBAR_KOREKSI(rekap_ujian, rekap_komentar, i)
        )
    }

    return doc
}