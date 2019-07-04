import KOP from './partials/kop'
import moment from 'moment'

export default function (data, sekretaris, i) {
    moment.locale('id')
    let doc = []
    const { tanggal, sesi, penguji, ruang, skripsi } = data
    const { mahasiswa } = skripsi
    const hari = moment(tanggal, 'DD/MM/YYYY').format('dddd')
    const formatedDate = moment(tanggal, 'DD/MM/YYYY').format('DD MMMM YYYY')

    let dosenTabel = [
        [
            { text: 'NO.', alignment: 'center' },
            { text: 'PENGUJI', alignment: 'center' },
            { text: 'JABATAN', alignment: 'center' },
            { text: 'TANDA TANGAN', alignment: 'center' },
        ],
    ]
    penguji.forEach((dosen, i) => {
        dosenTabel.push([{ text: `${i+1}.`, alignment: 'center', margin: [0, 10, 0, 0] }, {text: dosen.dosen, margin: [0, 10, 0, 10]}, { text: (dosen.is_leader ? 'Ketua' : 'Anggota'), margin: [0, 10, 0, 0]}, ''])
    })
    let kopVertical = KOP.portrait()
    doc.push(
        kopVertical,
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
                        `${hari}, ${formatedDate}`.toUpperCase()
                    ],
                    [
                        'Tempat',
                        ':',
                        ruang.toUpperCase()
                    ],
                    [
                        'Jam',
                        ':',
                        sesi.slice(0, 5).toUpperCase()
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
        `Yogyakarta, ${formatedDate}`,
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
                    text: `Mahasiswa yang diuji\n\n\n\n\n${mahasiswa[i].nama}\n${mahasiswa[i].nim}`,
                    margin: [ 40, 0, 0, 0 ]
                }
            ],
        }
    )

    return doc
}