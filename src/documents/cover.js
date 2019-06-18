function generateDoc(data) {
    const { tanggal, hari, judul, ruang, waktu, dosen, sekretaris, mahasiswa } = data
    const mahasiswaList = mahasiswa.map(mhs => { return [{text: mhs.nama + '\n' + mhs.nim, alignment: 'center', fontSize: 20, margin: [0, 0, 0, 10]}] })
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
                                                    [ 'TANGGAL', ':', tanggal ],
                                                    [ 'WAKTU', ':', waktu ],
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

export default function (data) {
    let doc = generateDoc(data)
    return doc
}