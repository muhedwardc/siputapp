// import head from './partials/head.js'
import UGMLogo from './partials/ugm-logo'

export default function (data) {
    let doc = []
    const { tanggal, hari, ruang, waktu, dosen, sekretaris, mahasiswa, judul } = data
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
        { text: '', pageBreak: 'before' },
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
            text: 'LEMBAR KOREKSI PENDADARAN',
            alignment: 'center',
            margin: [0, 8, 0, 8],
            fontSize: 12,
            bold: true
        },
        {
            table: {
                widths: [120, 'auto', '*'],
                body: [
                    [
                        'Nama Mahasiswa - NIM',
                        ':',
                        `${mahasiswa.nama.toUpperCase()} - ${mahasiswa.nim}`
                    ],
                    [
                        'Prodi/Konsentrasi',
                        ':',
                        `${mahasiswa.prodi}/${mahasiswa.konsentrasi}`
                    ],
                    [
                        'Judul Skripsi',
                        ':',
                        judul.toUpperCase()
                    ],
                    [
                        'Pembimbing I',
                        ':',
                        dosen[0]
                    ],
                    [
                        'Pembimbing II',
                        ':',
                        dosen[1]
                    ],
                    [
                        'Dikoreksi Oleh',
                        ':',
                        dosen[2]
                    ]
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 10]
        },
        {
            table: {
                widths: ['auto', 100 , 50, '*', 50],
                heights: function(i) {
                    if (i === 0) return
                    return 50
                },
                body: [
                    [
                        { text: 'NO.', alignment: 'center', margin: [0, 5, 0, 0] },
                        { text: 'Komentar', alignment: 'center', margin: [0, 5, 0, 0] },
                        { text: 'Halaman', alignment: 'center', margin: [0, 5, 0, 0] },
                        { text: 'Koreksi', alignment: 'center', margin: [0, 5, 0, 0] },
                        { text: 'Halaman Baru', alignment: 'center' },
                    ],
                    [
                        '1.',
                        { text: 'ABSTRAK', bold: true },
                        '', "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'", ''
                    ],
                    [
                        '2.',
                        { text: 'BAB I\nPENDAHULUAN', bold: true },
                        '', '', ''
                    ],
                    [
                        '3.',
                        { text: 'BAB II\nDASAR TEORI', bold: true },
                        '', '', ''
                    ],
                    [
                        '4.',
                        { text: 'BAB III\nMETODE PENELITIAN', bold: true },
                        '', '', ''
                    ],
                    [
                        '5.',
                        { text: 'BAB IV\nHASIL DAN PEMBAHASAN', bold: true },
                        '', '', ''
                    ],
                    [
                        '6.',
                        { text: 'BAB V\nKESIMPULAN DAN SARAN', bold: true },
                        '', '', ''
                    ],
                    [
                        '7.',
                        { text: 'KOMENTAR UMUM/CATATAN', bold: true },
                        '', '', ''
                    ],
                ]
            },
            margin: [ 0, 0, 0, 10 ]
        },
        {
            columns: [
                {
                    width: '*',
                    text: ''
                },
                {
                    width: '*',
                    text: ''
                },
                {
                    width: '*',
                    text: [
                        `Yogyakarta, ${tanggal}\nDosen Pengoreksi\n\n\n\n\n`,
                        { text: dosen[2], bold: true }
                    ]
                }
            ],
        }
    )

    return doc
}