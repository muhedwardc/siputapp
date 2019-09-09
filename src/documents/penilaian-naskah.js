import KOP from './partials/kop'
import moment from 'moment'
import departement from './partials/departement'

export default function (data, i) {
    let doc = []
    // const { tanggal, hari, judul, ruang, waktu, penguji, sekretaris, mahasiswa, nilai } = data
    const { penguji, ruang, sesi, skripsi, tanggal } = data
    const { judul, mahasiswa } = skripsi
    const formatedDate = moment(tanggal, 'DD/MM/YYYY').format('DD MMMM YYYY')
    let kopVertical = KOP.portrait()
    doc.push(
        kopVertical,
        {
            text: 'PENILAIAN NASKAH SKRIPSI',
            alignment: 'center',
            margin: [0, 8, 0, 30],
            fontSize: 12,
            bold: true
        },
        {
            table: {
                widths: [150, 'auto', '*'],
                body: [
                    [ 'Judul Skripsi', ':', { text: judul.toUpperCase(), lineHeight: 1.25 } ],
                    [ 
                        { text: 'Pembimbing', margin: [0, 10, 0, 0]},
                        { text: ':', margin: [0, 10, 0, 0]},
                        { 
                            ol: [
                                { text: skripsi.pembimbing_satu.nama, lineHeight: 1.25 },
                                { text: skripsi.pembimbing_dua.nama, lineHeight: 1.25 }
                            ],
                            margin: [0, 10, 0, 10]
                        }
                    ],
                    [ 'Nama Mahasiswa', ':', mahasiswa[i].nama ],
                    [ 'NIM', ':', mahasiswa[i].nim ],
                    [ 'Program Studi', ':', departement.getName(mahasiswa[i].prodi) ],
                    [ 'Tempat, Tanggal Lahir', ':', `${mahasiswa[i].tempat_lahir.toUpperCase()}, ${moment(mahasiswa[i].tanggal_lahir, 'DD/MM/YYYY').format('DD MMMM YYYY')}` ],
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 10]
        },
        { text: `Karya tulis tersebut telah direvisi sesuai masukan saat Ujian Pendadaran dan telah dilakukan penilaian dengan\n angka (0-100): ........................`, lineHeight: 2 },
        {
            columns: [
                { text: '', width: '*' },
                { text: `Yogyakarta, ${formatedDate}\n\nPembimbing I\n\n\n\n\n\n${skripsi.pembimbing_satu.nama}`, margin: [50, 0, 0, 0]},
            ],
            margin: [0, 10, 0, 10]
        },
        {
            fontSize: 9,
            table: {
                widths: [60, 50, 50, 50, 50],
                body: [
                    [
                        { text: 'Kriteria Penilaian', rowSpan: 2, alignment: 'center', bold: true, margin: [0, 2.5  , 0, 0] },
                        { text: 'Poor', italics: true, bold: true, alignment: 'center' },
                        { text: 'Fair', italics: true, bold: true, alignment: 'center' },
                        { text: 'Good', italics: true, bold: true, alignment: 'center' },
                        { text: 'Excellent', italics: true, bold: true, alignment: 'center' },
                    ],
                    [
                        {},
                        { text: '≤ 54', alignment: 'center', bold: true },
                        { text: '55-65', alignment: 'center', bold: true },
                        { text: '66-79', alignment: 'center', bold: true },
                        { text: '80-100', alignment: 'center', bold: true },
                    ],
                    [
                        { text: 'Penguasaan Materi', bold: true },
                        'Tidak Menguasai',
                        'Cukup',
                        'Baik',
                        'Sangat Baik'
                    ],
                    [
                        { text: 'Penulisan', bold: true },
                        'Tidak Baik',
                        'Cukup',
                        'Baik',
                        'Sangat Baik'
                    ],
                    [
                        { text: 'Substansi dan Kompleksitas Skripsi', bold: true },
                        'Kurang Kompleks',
                        'Cukup',
                        'Baik',
                        'Sangat Baik'
                    ],
                ],
            }
        }
    )

    return doc
}