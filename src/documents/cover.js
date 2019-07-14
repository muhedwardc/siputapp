import moment from 'moment'

export default function(data) {
    const { ruang, sesi, tanggal } = data
    const { mahasiswa } = data.skripsi
    const hari = moment(tanggal, 'DD/MM/YYYY').format('dddd')
    const formatedDate = moment(tanggal, 'DD/MM/YYYY').format('DD MMMM YYYY')
    const mahasiswaList = mahasiswa.map(mhs => { return [{text: [ { text: mhs.nama + '\n', decoration: 'underline' }, {text: mhs.nim}], alignment: 'center', fontSize: 20, margin: [0, 0, 0, 10]}] })
    let doc = [
        {
            table: {
                widths: [ '*' ],
                heights: [ 720 ],
                body: [
                    [
                        {
                            table: {
                                widths: [ '*' ],
                                body: [
                                    [ {text: 'BERKAS PENDADARAN', alignment: 'center', fontSize: 26, margin: [0, 50, 0, 50], bold: true, decoration: 'underline'} ],
                                    [
                                        {
                                            table: {
                                                widths: ['auto', 'auto', '*'],
                                                body: [
                                                    [ 'HARI', ':', hari ],
                                                    [ 'TANGGAL', ':', formatedDate ],
                                                    [ 'WAKTU', ':', sesi ],
                                                    [ 'RUANG', ':', ruang ],
                                                ],
                                            },
                                            fontSize: 20,
                                            layout: 'noBorders',
                                            margin: [40, 0, 0, 0]
                                        }
                                    ],
                                    [ {text: 'Mahasiswa: ', alignment: 'center', fontSize: 20, margin: [0, 50, 0, 15]} ],
                                    ...mahasiswaList,
                                ],
                            },
                            layout: 'noBorders',
                            margin: [0, 0, 0, 50]
                        }
                    ]
                ]
            },
            margin: [20, 40, 20, 40],
        }
    ]

    return doc
}