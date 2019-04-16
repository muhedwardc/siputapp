// import head from './partials/head.js'
import UGMLogo from './partials/ugm-logo'
import scoreBoard from './partials/score-board'

export default function (data) {
    let doc = []
    const { tanggal, hari, judul, ruang, waktu, dosen, sekretaris, mahasiswa } = data
    let dosenTabel = [
        [
            { text: 'NO.', alignment: 'center' },
            { text: 'PENGUJI', alignment: 'center' },
            { text: 'JABATAN', alignment: 'center' },
            { text: 'TANDA TANGAN', alignment: 'center' },
        ],
    ]
    dosen.forEach((dosen, i) => {
        dosenTabel.push([{ text: `${i+1}.`, alignment: 'center', margin: [0, 10, 0, 0] }, {text: dosen, margin: [0, 10, 0, 10]}, { text: (i == 0 ? 'Ketua' : 'Anggota'), margin: [0, 10, 0, 0]}, ''])
    })
    doc.push(
        {
            columns: [
                {
                    width: 'auto',
                    image: UGMLogo,
                    fit: [40, 40],
                    alignment: 'center',
                    margin: [0, 0, 0, 2],
                    pageOrientation: 'landscape'    
                },
                [
                    {
                        text: [
                            'DEPARTEMEN TEKNIK ELEKTRO DAN TEKNOLOGI INFORMASI\n',
                            'FAKULTAS TEKNIK UNIVERSITAS GADJAH MADA',
                        ],
                        alignment: 'center',
                        pageOrientation: 'landscape'
                    },
                    {
                        text: 'Jl. Grafika No. 2, Fakultas Teknik UGM, Yogyakarta 55281 telp.(0274) 6492201,6492201 fax. (0274) 552305, http://jteti.ugm.ac.id, email:akademikjteti@gm.ac.id', 
                        fontSize: 9,
                        italics: true,
                        margin: [10, 2, 10, 0],
                        alignment: 'center',
                        pageOrientation: 'landscape'
                    },
                ]
            ],
            pageBreak: 'before', 
            pageOrientation: 'landscape'
        },
        { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 802, y2: 0, lineWidth: 1 } ], margin: [0, 5, 0, 0], pageOrientation: 'landscape' },
        { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 802, y2: 0, lineWidth: 3 } ], margin: [0, 4, 0, 0], pageOrientation: 'landscape' },
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
                widths: [100, 100, '*', '*', '*', '*', 100, 100, 100],
                body: [
                    [
                        { text: 'NAMA', alignment: 'center', rowSpan: 2 },
                        { text: 'NIM', alignment: 'center', rowSpan: 2 },
                        { text: 'SKOR PENILAIAN', alignment: 'center', colSpan: 4},
                        {},{},{},
                        { text: 'JUMLAH', alignment: 'center', rowSpan: 2 },
                        { text: 'RATA-RATA', alignment: 'center', rowSpan: 2 },
                        { text: 'KETERANGAN', alignment: 'center', rowSpan: 2 },
                    ],
                    [
                        {},{},
                        { text: 'I', alignment: 'center' },
                        { text: 'II', alignment: 'center' },
                        { text: 'III', alignment: 'center' },
                        { text: 'IV', alignment: 'center' },
                        {},{},{}
                    ]
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
                                        { text: '>= 84.6', alignment: 'center' }, 
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
                                        { text: '<= 54.5', alignment: 'center' }, 
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
                        `Yogyakarta, ${tanggal}\nDosen Pembimbing I\n\n\n\n\n`,
                        { text: dosen[0], bold: true }
                    ],
                }
            ],
        },
    )

    return doc
}