import KOP from './partials/kop'
import getDepName from './partials/departement'
import moment from 'moment'

export default function (data, revisi_judul, i) {
    moment.locale('id')
    let doc = []
    const { tanggal, skripsi, penguji } = data
    const { mahasiswa, judul } = skripsi
    const formatedDate = moment(tanggal, 'DD/MM/YYYY').format('DD MMMM YYYY')
    let kopVertical = KOP.portrait()
    const departement = getDepName.getName(mahasiswa[i].prodi, null)
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
                                                },
                                                {
                                                    type: 'polyline',
                                                    points: revisi_judul ? [] : [{x: 2, y: 6}, {x: 5, y: 9}, {x: 12, y: -2}]
                                                },
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
                                                    points: revisi_judul ? [{x: 2, y: 6}, {x: 5, y: 9}, {x: 12, y: -2}] : []
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
                    [ '', '', { table: { widths: ['*'], heights: [50], body: [[revisi_judul ? revisi_judul : '']] }, margin: [0, 0, 0, 10]} ],
                    [ 'Nama Mahasiswa', ':', mahasiswa[i].nama ],
                    [ 'NIM', ':', mahasiswa[i].nim ],
                    [ 'Program Studi', ':', departement[0] ],
                    [ 'Tempat, Tanggal Lahir', ':', `${mahasiswa[i].tempat_lahir.toUpperCase()}, ${moment(mahasiswa[i].tanggal_lahir, 'DD/MM/YYYY').format('DD MMMM YYYY')}` ],
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 15]
        },
        'Judul Skripsi di atas sudah diperiksa tata bahasa dan ejaannya oleh dosen Pembimbing I dan dosen Pembimbing II',
        {
            columns: [
                { text: '', width: '*' },
                { text: `Yogyakarta, ${formatedDate}`, margin: [50, 0, 0, 0]},
            ],
            margin: [0, 10, 0, 6]
        },
        {
            columns: [
                `Pembimbing I\n\n\n\n\n${skripsi.pembimbing_satu.nama}`,
                { text: `Pembimbing II\n\n\n\n\n${skripsi.pembimbing_dua.nama}`, margin: [50, 0, 0, 0]}
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