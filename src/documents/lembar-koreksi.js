import UGMLogo from './partials/ugm-logo'

function documentByMahasiswa(data, dosenIndex, i) {
    let doc = []
    const { tanggal, hari, ruang, waktu, dosen, sekretaris, mahasiswa, judul } = data
    const bab = ['ABSTRAK', 'BAB I\nPENDAHULUAN', 'BAB II\nDASAR TEORI', 'BAB III\nMETODE PENELITIAN', 'BAB IV\nHASIL DAN PEMBAHASAN', 'BAB V\nKESIMPULAN DAN SARAN', 'KOMENTAR UMUM/CATATAN']
    const comments = [
        [], [], [
            {
                page: 2,
                text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
            },
            {
                page: 2,
                text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
            },
            {
                page: 4,
                text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
            },
        ],
        [], []
    ]
    let corrections = [
        [
            { text: 'NO.', alignment: 'center', margin: [0, 5, 0, 0] },
            { text: 'Komentar', alignment: 'center', margin: [0, 5, 0, 0] },
            { text: 'Halaman', alignment: 'center', margin: [0, 5, 0, 0] },
            { text: 'Koreksi', alignment: 'center', margin: [0, 5, 0, 0] },
            { text: 'Halaman Baru', alignment: 'center' },
        ],
    ]
    for (let i = 0; i < bab.length; i ++) {
        if (comments[i]) {
            corrections.push([
                { border: [true, true, true, false], text: (i+1) },
                { border: [true, true, true, false], text: bab[i], bold: true },
                { border: [true, true, true, false], text: comments[i][0] ? comments[i][0].page : '', alignment: 'center' },
                { border: [true, true, true, false], text: comments[i][0] ? comments[i][0].text : '' },
                { border: [true, true, true, false], text: '' },
            ])
            if (comments[i].length > 1) {
                for (let j = 1; j < comments[i].length; j++) {
                    corrections.push([
                        { border: [true, false, true, false], text: '' },
                        { border: [true, false, true, false], text: '' },
                        { border: [true, false, true, false], text: comments[i][j] ? comments[i][j].page : '', alignment: 'center' },
                        { border: [true, false, true, false], text: comments[i][j] ? comments[i][j].text : '' },
                        { border: [true, false, true, false], text: '' },
                    ])
                }
            } 
        } else {
            corrections.push([
                i+1,
                { text: bab[i], bold: true },
                '', '', ''
            ])
        }
    }
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
                        `${mahasiswa[i].nama.toUpperCase()} - ${mahasiswa[i].nim}`
                    ],
                    [
                        'Prodi/Konsentrasi',
                        ':',
                        `${mahasiswa[i].prodi}/${mahasiswa[i].konsentrasi}`
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
                        dosen[dosenIndex]
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
                    return 40
                },
                body: corrections
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
                        { text: dosen[dosenIndex], bold: true }
                    ]
                }
            ],
        }
    )

    return doc
}

function generateDoc(data, dosenIndex) {
    let doc = []
    data.mahasiswa.forEach((e, i) => doc.push(...documentByMahasiswa(data, dosenIndex, i)))
    return doc
}

export default function (data) {
    let doc = []
    for (let i = 2; i < data.dosen.length; i ++) {
        doc.push(...generateDoc(data, i))
    }
    return doc
}

