import UGMLogo from './partials/ugm-logo'

function generateDoc(data, i) {
    let doc = []
    const { tanggal, hari, judul, ruang, waktu, dosen, sekretaris, mahasiswa } = data
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
            text: 'LEMBAR REVISI JUDUL SKRIPSI',
            alignment: 'center',
            margin: [0, 8, 0, 20],
            fontSize: 12,
            bold: true
        },
        {
            table: {
                widths: [150, 'auto', '*'],
                body: [
                    [ 'Judul Skripsi Lama', ':', { text: judul.toUpperCase(), lineHeight: 1.25 } ],
                    [ 
                        { text: 'Perubahan Judul *', margin: [0, 10, 0, 0]},
                        { text: ':', margin: [0, 10, 0, 0]},
                        { 
                            text: [
                                { text: `Ya, Revisi Judul:\n`, lineHeight: 1.25 },
                                { text: judul.toUpperCase(), lineHeight: 1.25 }
                            ],
                            margin: [0, 10, 0, 10]
                        }
                    ],
                    [ 'Nama Mahasiswa', ':', mahasiswa[i].nama ],
                    [ 'NIM', ':', mahasiswa[i].nim ],
                    [ 'Program Studi', ':', mahasiswa[i].prodi ],
                    [ 'Tempat, Tanggal Lahir', ':', `${mahasiswa[i].tl.toUpperCase()}, ${mahasiswa[i].tgl}` ],
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 15]
        },
        'Judul Skripsi di atas sudah diperiksa tata bahasa dan ejaannya oleh dosen Pembimbing I dan dosen Pembimbing II',
        {
            columns: [
                { text: '', width: '*' },
                { text: `Yogyakarta, ${tanggal}`, margin: [50, 0, 0, 0]},
            ],
            margin: [0, 10, 0, 6]
        },
        {
            columns: [
                `Pembimbing I\n\n\n\n\n${dosen[0]}`,
                { text: `Pembimbing II\n\n\n\n\n${dosen[1]}`, margin: [50, 0, 0, 0]}
            ],
            margin: [0, 0, 0, 10]
        },
        {
            text: [
                { text: 'Catatan:*) ', bold: true },
                'Centang salah satu'
            ]
        }
    )

    return doc
}

export default function (data) {
    let doc = []
    data.mahasiswa.forEach((e, i) => doc.push(...generateDoc(data, i)))
    return doc
}