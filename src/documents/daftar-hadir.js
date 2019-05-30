// import head from './partials/head.js'
import UGMLogo from './partials/ugm-logo'

function generateDoc(data, i) {
    let doc = []
    const { tanggal, hari, ruang, waktu, dosen, sekretaris, mahasiswa } = data
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
            image: UGMLogo,
            fit: [30, 30],
            alignment: 'center',
            margin: [0, 0, 0, 2],
            pageBreak: 'before'
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
            text: 'DAFTAR HADIR PENDADARAN',
            alignment: 'center',
            margin: [0, 8, 0, 8],
            fontSize: 12,
            bold: true
        },
        {
            table: {
                body: [
                    [
                        'Hari, Tanggal',
                        ':',
                        `${hari}, ${tanggal}`.toUpperCase()
                    ],
                    [
                        'Tempat',
                        ':',
                        ruang.toUpperCase()
                    ],
                    [
                        'Jam',
                        ':',
                        waktu.toUpperCase()
                    ]
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 10]
        },
        {
            table: {
                widths: ['auto', '*' , 100, 160],
                body: dosenTabel
            },
            margin: [ 0, 0, 0, 10 ]
        },
        `Yogyakarta, ${tanggal}`,
        {
            text: 'Sekretaris DTETI',
            margin: [0, 15, 0, 0]
        },
        {
            columns: [
                {
                    width: '*',
                    text: `Fakultas Teknik UGM\n\n\n\n\n${sekretaris.nama}\nNIP ${sekretaris.nip}`
                },
                {
                    width: '*',
                    text: `Mahasiswa yang diuji\n\n\n\n\n${mahasiswa[i].nama}\nNIP ${mahasiswa[i].nim}`,
                    margin: [ 40, 0, 0, 0 ]
                }
            ],
        }
    )

    return doc
}

export default function (data) {
    let doc = []
    data.mahasiswa.forEach((e, i) => {
        doc.push(...generateDoc(data, i))
    })
    return doc
}