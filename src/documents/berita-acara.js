import KOP from './partials/kop'
import scoreBoard from './partials/score-board'
import moment from 'moment'

export default function (data, nilai, kadep, i) {
    moment.locale('id')
    let doc = []
    const { tanggal, ruang, sesi, penguji, skripsi, ketua } = data
    const { mahasiswa, judul } = skripsi
    const hari = moment(tanggal, 'DD/MM/YYYY').format('dddd')
    const p = [
        `Pada hari ini ${hari}, ${moment(tanggal, 'DD/MM/YYYY').format('DD MMMM YYYY')} pukul ${sesi.slice(0,5)} WIB bertempat di ${ruang} Departemen Teknik Elektro dan Teknologi Informasi, Fakultas Teknik UGM telah dilaksanakan ujian skripsi bagi mahasiswa:`
    ]
    let dosenTabel = [
        [ 
            { text: 'NO.', alignment: 'center' },
            { text: 'NAMA', alignment: 'center' },
            { text: 'JABATAN', alignment: 'center' },
            { text: 'TANDA TANGAN', alignment: 'center' },
        ]
    ]
    penguji.forEach((dosen, i) => {
        dosenTabel.push([{ text: `${i+1}.`, alignment: 'center' }, dosen.dosen, (ketua.nama === dosen.dosen ? 'Ketua Tim *)' : 'Anggota'), `${i+1}.`])
    })
    let examresult = []
    if (nilai < 54.6 ) {
        examresult = [
            { text: 'LULUS', decoration: 'lineThrough' },
            ' / ',
            { text: 'TIDAK LULUS' },
        ]
    } else {
        examresult = [
            { text: 'LULUS' },
            ' / ',
            { text: 'TIDAK LULUS', decoration: 'lineThrough' },
        ]
    }
    let kopVertical = KOP.portrait()
    let scoreBoardTable = scoreBoard.getTable()
    doc.push(
        kopVertical,
        { text: 'BERITA ACARA PENDADARAN', bold: true, alignment: 'center', margin: [0, 5, 0, 5] },
        { text: p[0] },
        { 
            table: {
                widths: [ 100, 15, 'auto' ],
                body: [
                    [ 'Nama', {text: ':', alignment: 'right'}, mahasiswa[i].nama ],
                    [ 'NIM', {text: ':', alignment: 'right'}, mahasiswa[i].nim ],
                    [ 'Tempat, tanggal Lahir', {text: ':', alignment: 'right'}, `${mahasiswa[i].tempat_lahir.toUpperCase()}, ${moment(mahasiswa[i].tanggal_lahir, 'DD/MM/YYYY').format('DD MMMM YYYY')}` ],
                    [ 'Judul Skripsi', {text: ':', alignment: 'right'}, '' ],
                ]
            },
            layout: 'noBorders',
            margin: [70, 0, 0, 0]
        },
        {
            text: judul.toUpperCase(),
            alignment: 'center',
            fontSize: 12,
            margin: [0, 2, 0, 2]
        },
        {
            table: {
                widths: [ 100, 15, 'auto' ],
                body: [
                    [ 'Pembimbing I', {text: ':', alignment: 'right'}, skripsi.pembimbing_satu.nama ],
                    [ 'Pembimbing II', {text: ':', alignment: 'right'}, skripsi.pembimbing_dua.nama ]
                ]
            },
            layout: 'noBorders',
            margin: [70, 0, 0, 0]
        },
        { text: 'oleh penguji dengan susunan sebagai berikut:', alignment: 'center', margin: [0, 3, 0, 0] },
        {
            table: {
                widths: [ 'auto', '*', 80, 120 ],
                body: dosenTabel
            },
            margin: [0, 2, 0, 2]
        },
        { text: 'dengan hasil:', margin: [0, 5, 0, 0] },
        {
            columns: [
                {
                    width: '*',
                    text: ''
                },
                {
                    width: 300,
                    table: {
                        widths: [ '*' ],
                        heights: [ 20, 20 ],
                        body: [
                            [ 
                                { 
                                    text: [
                                        'NILAI ANGKA (0-100): ', 
                                        { text: nilai, bold: true }
                                    ],
                                    margin: [0, 5, 0, 0]
                                }
                            ],
                            [ 
                                {
                                    text: examresult,
                                    alignment: 'center',
                                    bold: true,
                                    margin: [0, 5, 0, 0]
                                }
                            ]
                        ]
                    },
                    margin: [0, 0, 10, 0]
                },
                scoreBoardTable
            ]
        },
        {
            columns: [
                {
                    width: '*',
                    text: [
                        'Ketua Tim Penguji',
                        '\n\n\n\n',
                        { text: ketua.nama, bold: true }
                    ]
                },
                {
                    width: 'auto',
                    text: [
                        'Mahasiswa yang diuji',
                        '\n\n\n\n',
                        { text: mahasiswa[i].nama, bold: true }
                    ]
                }
            ],
            margin: [0, 4, 0, 0],
            alignment: 'left'
        },
        {
            columns: [
                [
                    'Ketua DTETI\nFakultas Teknik UGM',
                    { text: kadep.nama + '\nNIP ' + kadep.nip, bold: true, margin: [0, 30, 0, 0] }
                ]
            ],
            margin: [0, 8, 0, 10],
            alignment: 'center'
        },
        {
            text: '*). Jika Pembimbing 1 berhalangan hadir, maka Pembimbing 2 bertindak sebagai Ketua Tim Penguji.',
        }
    )

    return doc
}