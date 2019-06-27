import socs from './partials/socs'
import KOP from './partials/kop'
import moment from 'moment'
import scoreBoard from './partials/score-board';

function generateRubrik(rekap_ujian, dosen) {
    let doc = []
    // const { tanggal, hari, judul, ruang, waktu, dosen, sekretaris, mahasiswa, nilai } = data
    const { tanggal, sesi, ruang, skripsi } = rekap_ujian
    const mahasiswa = skripsi.mahasiswa[0]
    const kopVertical = KOP.portrait()
    const socIndex = socs.index()
    const hari = moment(tanggal, 'DD/MM/YYYY').format('dddd')
    const formatedDate = moment(tanggal, 'DD/MM/YYYY').format('DD MMMM YYYY')
    socIndex.forEach((_, i) => {
        socIndex[i].push({text: dosen.detail[i] ? dosen.detail[i].nilai : 0, alignment: 'center', bold: true})
    })
    let scoreBoardTable = scoreBoard.getTable(null, [100, 80], [10, 5, 0, 0])
    doc.push(
        kopVertical,
        {
            text: 'PENILAIAN UJIAN PENDADARAN',
            alignment: 'center',
            margin: [0, 8, 0, 8],
            fontSize: 12,
            bold: true
        },
        {
            table: {
                widths: ['auto', 150, 'auto', '*'],
                body: [
                    [
                        {text: 'A.', bold: true},
                        {text: 'Data Mahasiswa', bold: true},
                        {text: ':', bold: true},
                        ''
                    ],
                    [ '', 'Nama Mahasiswa', '', mahasiswa.nama.toUpperCase() ],
                    [ '', 'NIM', '', mahasiswa.nim ],
                    [ '', 'Hari, Tanggal Ujian', '', `${hari.toUpperCase()}, ${formatedDate}`],
                    [ '', 'Jam', '', sesi]
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 10]
        },
        {
            table: {
                widths: ['auto', 150, 'auto', '*'],
                body: [
                    [
                        {text: 'B.', bold: true},
                        {text: 'Penilaian Dosen', bold: true},
                        {text: ':', bold: true},
                        ''
                    ]
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 5]
        },
        {
            table: {
                layout: {
                    paddingBottom: function(i, node) { return 5 },
                    paddingTop: function(i, node) { return 5 },
                },
                widths: [70, 70, '*', '*', '*', '*', 30],
                body: [
                    ...socs.header(), socIndex[0], socIndex[1]]
            },
            fontSize: 7.5,
        },
        { text: '', pageBreak: 'before', pageOrientation: 'portrait' },
        {
            table: {
                widths: [70, 70, '*', '*', '*', '*', 30],
                body: [
                    ...socs.header(), socIndex[2], socIndex[3], socIndex[4], socIndex[5],
                    [
                        {text: 'Rerata', fillColor: '#CCCCCC', colSpan: 6, alignment: 'left', margin: [0, 5, 0, 5]},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: dosen.rerata, fillColor: '#CCCCCC', alignment: 'center', bold: true, margin: [0, 5, 0, 5]},
                    ]
                ]
            },
            fontSize: 7.5,
        },
        { text: '', pageBreak: 'before', pageOrientation: 'portrait', margin: [0, 0, 0, 40] },
        {
            table: {
                widths: ['auto', 150, 'auto', '*'],
                body: [
                    [
                        {text: 'C.', bold: true},
                        {text: 'Identitas Dosen', bold: true},
                        {text: ':', bold: true},
                        ''
                    ],
                    [ '', 'Nama Dosen', '', dosen.penguji ],
                    [
                        '',
                        { text: 'Tanda tangan', margin: [0, 50, 0, 0] },
                        '',
                        { text: '..............................................................', margin: [0, 50, 0, 0] }
                    ]
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 15]
        },
        { text: 'Catatan', bold: true },
        {
            ol: [
                'Penilaian dengan angka dari 0 s/d 100, jika ada perbedaan nilai skor rerata dengan penguji lain lebih dari 15 maka wajib untuk dikonsolidasikan',
                'Kriteria konversi skor rata-rata menjadi nilai akhir.'
            ]
        },
        scoreBoardTable
    )

    return doc
}

export default function(rekap_ujian, rekap_nilai) {
    let doc = []
    rekap_nilai[0].nilai.forEach(dosen => {
        doc.push(...generateRubrik(rekap_ujian, dosen))
    })
    return doc
}