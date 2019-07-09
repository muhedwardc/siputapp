import KOP from './partials/kop'
import getDepName from './partials/departement'
import moment from 'moment'
moment.locale('id')

function documentByMahasiswa(rekap_ujian, komentar_dosen, i) {
    let doc = []
    const { komentar, penguji } = komentar_dosen
    const { tanggal, skripsi } = rekap_ujian
    const dosen = rekap_ujian.penguji
    const { judul, mahasiswa } = skripsi
    const formatedDate = moment(tanggal, 'DD/MM/YYYY').format('DD MMMM YYYY')
    const bab = ['ABSTRAK', 'BAB I\nPENDAHULUAN', 'BAB II\nDASAR TEORI', 'BAB III\nMETODE PENELITIAN', 'BAB IV\nHASIL DAN PEMBAHASAN', 'BAB V\nKESIMPULAN DAN SARAN', 'KOMENTAR UMUM/CATATAN']
    const comments = komentar.map(e => e.daftar_komentar)
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
        let border = [true, true, true, false]
        if (comments[i][0]) {
            if (comments[i].length == 1) border = [true, true, true, true]
            corrections.push([
                { border, text: (i+1), alignment: 'center' },
                { border, text: bab[i], bold: true },
                { border, text: comments[i][0] ? comments[i][0].halaman : '', alignment: 'center' },
                { border, text: comments[i][0] ? comments[i][0].koreksi : '', noWrap: false },
                { border, text: '' },
            ])
            if (comments[i].length > 1) {
                border = [true, false, true, false]
                for (let j = 1; j < comments[i].length; j++) {
                    if (j == comments[i].length - 1) border = [true, false, true, true]
                    corrections.push([
                        { border, text: '' },
                        { border, text: '' },
                        { border, text: comments[i][j] ? comments[i][j].halaman : '', alignment: 'center' },
                        { border, text: comments[i][j] ? comments[i][j].koreksi : '', noWrap: false },
                        { border, text: '' },
                    ])
                }
            } 
        } else {
            corrections.push([
                { text: i+1, alignment: 'center' },
                { text: bab[i], bold: true },
                '', '', ''
            ])
        }
    }
    const departement = getDepName.getName(mahasiswa[i].prodi, mahasiswa[i].konsentrasi)
    let kopVertical = KOP.portrait()
    doc.push(
        kopVertical,
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
                        `${departement[0]}/${departement[1]}`
                    ],
                    [
                        'Judul Skripsi',
                        ':',
                        judul.toUpperCase()
                    ],
                    [
                        'Pembimbing I',
                        ':',
                        dosen[0].dosen
                    ],
                    [
                        'Pembimbing II',
                        ':',
                        dosen[1].dosen
                    ],
                    [
                        'Dikoreksi Oleh',
                        ':',
                        penguji
                    ]
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 10]
        },
        {
            table: {
                widths: [25, 100 , 50, 260, 50],
                heights: function(i) {
                    if (i === 0) return
                    return 20
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
                        `Yogyakarta, ${formatedDate}\nDosen Pengoreksi\n\n\n\n\n`,
                        { text: penguji, bold: true }
                    ]
                }
            ],
        }
    )

    return doc
}

export default function (rekap_ujian, rekap_komentar, i) {
    let doc = []
    for (let j = 0; j < rekap_komentar.length; j ++) {
        doc.push(...documentByMahasiswa(rekap_ujian, rekap_komentar[j], i))
    }
    return doc
}

