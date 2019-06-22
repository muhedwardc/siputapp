import KOP from './partials/kop'
import moment from 'moment'

export default function (data) {
    moment.locale('id')
    let doc = []
    const { tanggal, penguji, skripsi } = data.ujian
    const { rekap_nilai } = data.result
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
    rekap_nilai.forEach((e, i) => {
        let row = new Array()
        row.push(e.mahasiswa)
        row.push(skripsi.mahasiswa[i].nim)
        e.nilai.forEach(grade => row.push({ text: grade.rerata ? Number(grade.rerata.toFixed(2)) : 0, alignment: 'center' }))
        row.push({ text: e.sum ? e.sum : 0, alignment: 'center' })
        row.push({ text: e.rerata ? e.rerata : 0, alignment: 'center' })
        row.push({ text: e.pass ? 'LULUS' : 'TIDAK LULUS', alignment: 'center' })
        mahasiswaGrade.push(row)
    })
    emptyCol.pop()
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
                widths: [150, 100, '*','*','*','*','*','*', 70, 70, 80],
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
                        {
                            table: {
                                widths: [ 100, 80 ],
                                body: [
                                    [
                                        { text: 'Skor', fillColor: '#CCCCCC', alignment: 'center' },
                                        { text: 'Nilai', fillColor: '#CCCCCC', alignment: 'center' },
                                    ],
                                    [ 
                                        { text: '≥ 84.6', alignment: 'center' }, 
                                        { text: 'A', alignment: 'center'} 
                                    ],
                                    [ 
                                        { text: '81.6 - 84.5', alignment: 'center' }, 
                                        { text: 'A-', alignment: 'center'} 
                                    ],
                                    [ 
                                        { text: '79.6 - 81.5', alignment: 'center' }, 
                                        { text: 'A/B', alignment: 'center'} 
                                    ],
                                    [ 
                                        { text: '75.6 - 79.5', alignment: 'center' }, 
                                        { text: 'B+', alignment: 'center'} 
                                    ],
                                    [ 
                                        { text: '69.6 - 75.5', alignment: 'center' }, 
                                        { text: 'B', alignment: 'center'} 
                                    ],
                                    [ 
                                        { text: '65.6 - 69.5', alignment: 'center' }, 
                                        { text: 'B-', alignment: 'center'} 
                                    ],
                                    [ 
                                        { text: '59.6 - 65.5', alignment: 'center' }, 
                                        { text: 'B/C', alignment: 'center'} 
                                    ],
                                    [ 
                                        { text: '54.6 - 59.5', alignment: 'center' }, 
                                        { text: 'C', alignment: 'center'} 
                                    ],
                                    [ 
                                        { text: '≤ 54.5', alignment: 'center' }, 
                                        { text: 'D', alignment: 'center'} 
                                    ],
                                ],
                            },
                            margin: [10, 5, 0, 0]
                        }
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