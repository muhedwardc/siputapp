import KOP from './partials/kop'

function generateDoc(data, i) {
    let doc = []
    const { tanggal, hari, judul, ruang, waktu, dosen, sekretaris, mahasiswa } = data
    let kopVertical = KOP.portrait()
    doc.push(
        kopVertical,
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
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    [
                                        { 
                                            canvas: [
                                                {
                                                    type: 'rect',
                                                    x: 0, y: 0,
                                                    w: 11,
                                                    h: 11,
                                                }
                                            ] 
                                        },
                                        'Tidak' 
                                    ],
                                    [
                                        { 
                                            canvas: [
                                                {
                                                    type: 'rect',
                                                    x: 0, y: 0,
                                                    w: 11,
                                                    h: 11,
                                                },
                                                {
                                                    type: 'polyline',
                                                    points: []
                                                },
                                            ] 
                                        },
                                        'Ya, Revisi Judul:' 
                                    ],
                                ]
                            },
                            layout: 'noBorders',
                            margin: [0, 8, 0, 0]
                        },
                    ],
                    [ '', '', { table: { widths: ['*'], heights: [50], body: [['']] }, margin: [0, 0, 0, 10]} ],
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