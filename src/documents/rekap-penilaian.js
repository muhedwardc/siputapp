import KOP from './partials/kop'
import moment from 'moment'
import scoreBoard from './partials/score-board'

export default function (ujian, rekap_nilai) {
    moment.locale('id')
    let doc = []
    const { tanggal, penguji, skripsi } = ujian
    const formatedDate = moment(tanggal, 'DD/MM/YYYY').format('DD MMMM YYYY')
    let emptyCol = []
    let romanian = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
    let gradeCol = []
    let gradeWidth = []
    let mahasiswaGrade = []
    penguji.forEach((e, i) => {
        emptyCol.push({})
        gradeWidth.push('*')
        gradeCol.push({ text: romanian[i], alignment: 'center' })
    })
    emptyCol.pop()
    rekap_nilai.forEach((e, i) => {
        let row = new Array()
        row.push(e.mahasiswa)
        row.push(skripsi.mahasiswa[i].nim)
        e.nilai.forEach(grade => row.push({ text: grade.rerata, alignment: 'center' }))
        row.push({ text: e.jumlah_rerata, alignment: 'center' })
        row.push({ text: e.rerata_total, alignment: 'center' })
        row.push({ text: e.pass ? 'LULUS' : 'TIDAK LULUS', alignment: 'center' })
        mahasiswaGrade.push(row)
    })
    let dosenTabel = [
        [
            { text: 'NO.', alignment: 'center' },
            { text: 'PENGUJI', alignment: 'center' },
            { text: 'JABATAN', alignment: 'center' },
            { text: 'TANDA TANGAN', alignment: 'center' },
        ],
    ]
    penguji.forEach((dosen, i) => {
        dosenTabel.push([{ text: `${i+1}.`, alignment: 'center', margin: [0, 10, 0, 0] }, {text: dosen.dosen, margin: [0, 10, 0, 10]}, { text: (i == 0 ? 'Ketua' : 'Anggota'), margin: [0, 10, 0, 0]}, ''])
    })
    let kopLandscape = KOP.landscape()
    let scoreBoardTable = scoreBoard.getTable(null, [100, 80], [10, 5, 0, 0])
    doc.push(
        kopLandscape,
        {
            text: 'REKAP PENILAIAN UJIAN PENDADARAN',
            alignment: 'center',
            margin: [0, 8, 0, 20],
            fontSize: 11,
            bold: true,
            pageOrientation: 'landscape'
        },
        {
            table: {
                widths: [150, 100, ...gradeWidth, 70, 70, 100],
                body: [
                    [
                        { text: 'NAMA', alignment: 'center', rowSpan: 2, margin: [0, 10, 0, 0] },
                        { text: 'NIM', alignment: 'center', rowSpan: 2, margin: [0, 10, 0, 0] },
                        { text: 'SKOR PENILAIAN', alignment: 'center', colSpan: penguji.length},
                        ...emptyCol,
                        { text: 'JUMLAH', alignment: 'center', rowSpan: 2, margin: [0, 10, 0, 0] },
                        { text: 'RATA-RATA', alignment: 'center', rowSpan: 2, margin: [0, 10, 0, 0] },
                        { text: 'KETERANGAN', alignment: 'center', rowSpan: 2, margin: [0, 10, 0, 0] },
                    ],
                    [
                        {},{},
                        ...gradeCol,
                        {},{},{}
                    ],
                    ...mahasiswaGrade
                ]
            },
            margin: [0, 0, 0, 10]
        },
        {
            text: 'Catatan:',
            bold: true
        },
        {
            columns: [
                {
                    stack: [
                        {
                            ol: [
                                'Penilaian dengan angka dari 0 s/d 100, jika ada perbedaan nilai skor rerata dengan penguji lain lebih dari 15 maka wajib untuk dikonsolidasikan.',
                                'Kriteria konversi skor rata-rata menjadi nilai akhir.'
                            ]
                        },
                        scoreBoardTable
                    ],
                    margin: [0, 0, 20, 0]
                },
                {
                    width: 300,
                    text: [
                        `Yogyakarta, ${formatedDate}\nDosen Pembimbing I\n\n\n\n\n`,
                        { text: penguji[0].dosen, bold: true }
                    ],
                }
            ],
        },
    )

    return doc
}