import UGMLogo from './partials/ugm-logo'
import socsHeader from './partials/socs-header';
import socs from './partials/socs'

const SOs = [
    {
        so: 'SO(c): Engineering Design',
        lo: 'Mampu mengaplikasikan engineering design dengan mempertimbangkan berbagai Batasan nyata',
        pi: [
            ['Proses desain tidak dilakukan secara benar apabila ditinjau dari ilmu teori yang berkaitan']
        ]
    }
]

export default function (data) {
    let doc = []
    const { tanggal, hari, judul, ruang, waktu, dosen, sekretaris, mahasiswa, nilai } = data
    const headerSOC = socsHeader
    doc.push(
        { text: '', pageBreak: 'before', pageOrientation: 'portrait' },
        {
            image: UGMLogo,
            fit: [30, 30],
            alignment: 'center',
            margin: [0, 0, 0, 2]
        },
        {
            text: [
                'DEPARTEMEN TEKNIK ELEKTRO DAN TEKNOLOGI INFORMASI\n',
                'FAKULTAS TEKNIK UNIVERSITAS GADJAH MADA',
            ],
            alignment: 'center'
        },
        {
            text: 'Jl. Grafika No. 2, Fakultas Teknik UGM, Yogyakarta 55281 telp.(0274) 6492201,6492201 fax. (0274) 552305, http://jteti.ugm.ac.id, email:akademikjteti@gm.ac.id', 
            fontSize: 9,
            italics: true,
            margin: [10, 2, 10, 0],
            alignment: 'center'
        },
        { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 1 } ], margin: [0, 2, 0, 0] },
        { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 3 } ], margin: [0, 4, 0, 4] },
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
                    [ '', 'Hari, Tanggal Ujian', '', `${hari.toUpperCase()}, ${tanggal}`],
                    [ '', 'Jam', '', waktu]
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
                    [
                        {text: 'Student Outcome', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 7, 0, 0]},
                        {text: 'Learning Outcome', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 7, 0, 0]},
                        {text: 'Performance Indicator', fillColor: '#CCCCCC', alignment: 'center', colSpan: 4},
                        '', '', '',
                        {text: 'Nilai (0-\n100)', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 2, 0, 0]}
                    ],
                    [
                        '', '',
                        {text: 'Unsatisfactory (0-49)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Adequate (50-74)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Satisfactory (75-84)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Excellent (85-100)', fillColor: '#CCCCCC', alignment: 'center'},
                        ''
                    ], socs[0], socs[1]]
            },
            fontSize: 7.5,
        },
        { text: '', pageBreak: 'before', pageOrientation: 'portrait' },
        {
            table: {
                widths: [70, 70, '*', '*', '*', '*', 30],
                body: [
                    [
                        {text: 'Student Outcome', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 7, 0, 0]},
                        {text: 'Learning Outcome', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 7, 0, 0]},
                        {text: 'Performance Indicator', fillColor: '#CCCCCC', alignment: 'center', colSpan: 4},
                        '', '', '',
                        {text: 'Nilai (0-\n100)', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 2, 0, 0]}
                    ],
                    [
                        '', '',
                        {text: 'Unsatisfactory (0-49)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Adequate (50-74)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Satisfactory (75-84)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Excellent (85-100)', fillColor: '#CCCCCC', alignment: 'center'},
                        ''
                    ], socs[2], socs[3], socs[4], socs[5],
                    [
                        {text: 'Rerata', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: '', fillColor: '#CCCCCC', alignment: 'center'},
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
                    [ '', 'Nama Dosen', '', 'Ridi Ferdiana' ],
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
    )

    return doc
}