import KOP from './partials/kop'

function generateObj(data, sb, i) {
    let doc = []
    const { judul, hari, tanggal, waktu, ruang, mahasiswa, dosen, kadep } = data
    const p = [
        `Pada hari ini ${hari}, ${tanggal} pukul ${waktu} bertempat di ${ruang} Departemen Teknik Elektro dan Teknologi Informasi, Fakultas Teknik UGM telah dilaksanakan ujian skripsi bagi mahasiswa:`
    ]
    let dosenTabel = [
        [ 
            { text: 'NO.', alignment: 'center' },
            { text: 'NAMA', alignment: 'center' },
            { text: 'JABATAN', alignment: 'center' },
            { text: 'TANDA TANGAN', alignment: 'center' },
        ]
    ]
    dosen.forEach((dosen, i) => {
        dosenTabel.push([{ text: `${i+1}.`, alignment: 'center' }, dosen, (i == 0 ? 'Ketua Tim *)' : 'Anggota'), `${i+1}.`])
    })
    let result = []
    if (mahasiswa[i].nilai < 54.6 ) {
        result = [
            { text: 'LULUS', decoration: 'lineThrough' },
            ' / ',
            { text: 'TIDAK LULUS' },
        ]
    } else {
        result = [
            { text: 'LULUS' },
            ' / ',
            { text: 'TIDAK LULUS', decoration: 'lineThrough' },
        ]
    }
    let kopVertical = KOP.portrait()
    doc.push(
        // {
        //     image: UGMLogo,
        //     fit: [30, 30],
        //     alignment: 'center',
        //     margin: [0, 0, 0, 2],
		// 	pageBreak: 'before'
        // },
        // {
        //     text: [
        //         'DEPARTEMEN TEKNIK ELEKTRO DAN TEKNOLOGI INFORMASI\n',
        //         'FAKULTAS TEKNIK UNIVERSITAS GADJAH MADA',
        //     ],
        //     alignment: 'center'
        // },
        // {
        //     text: 'Jl. Grafika No. 2, Fakultas Teknik UGM, Yogyakarta 55281 telp.(0274) 6492201,6492201 fax. (0274) 552305, http://jteti.ugm.ac.id, email:akademikjteti@gm.ac.id', 
        //     fontSize: 9,
        //     italics: true,
        //     margin: [10, 2, 10, 0],
        //     alignment: 'center'
        // },
        // { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 1 } ], margin: [0, 2, 0, 0] },
        // { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 3 } ], margin: [0, 4, 0, 4] },
        // ...head,
        kopVertical,
        { text: 'BERITA ACARA PENDADARAN', bold: true, alignment: 'center', margin: [0, 5, 0, 5] },
        { text: p[0] },
        { 
            table: {
                widths: [ 100, 15, 'auto' ],
                body: [
                    [ 'Nama', {text: ':', alignment: 'right'}, mahasiswa[i].nama ],
                    [ 'NIM', {text: ':', alignment: 'right'}, mahasiswa[i].nim ],
                    [ 'Tempat, tanggal Lahir', {text: ':', alignment: 'right'}, `${mahasiswa[i].tl.toUpperCase()}, ${mahasiswa[i].tgl}` ],
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
                    [ 'Pembimbing I', {text: ':', alignment: 'right'}, dosen[0]],
                    [ 'Pembimbing II', {text: ':', alignment: 'right'}, dosen[1] ]
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
                                        { text: mahasiswa[i].nilai, bold: true }
                                    ],
                                    margin: [0, 5, 0, 0]
                                }
                            ],
                            [ 
                                {
                                    text: result,
                                    alignment: 'center',
                                    bold: true,
                                    margin: [0, 5, 0, 0]
                                }
                            ]
                        ]
                    },
                    margin: [0, 0, 10, 0]
                },
                {
                    width: 180,
                    table: {
                        widths: [ '*', 80 ],
                        body: [
                            [
                                { text: 'Skor', fillColor: '#CCCCCC', alignment: 'center' },
                                { text: 'Nilai', fillColor: '#CCCCCC', alignment: 'center' },
                            ],
                            [ 
                                { text: '≥ 84.6', alignment: 'center' }, 
                                { text: 'A', alignment: 'center'} 
                            ],
                            [ 
                                { text: '81.6 - 84.5', alignment: 'center' }, 
                                { text: 'A-', alignment: 'center'} 
                            ],
                            [ 
                                { text: '79.6 - 81.5', alignment: 'center' }, 
                                { text: 'A/B', alignment: 'center'} 
                            ],
                            [ 
                                { text: '75.6 - 79.5', alignment: 'center' }, 
                                { text: 'B+', alignment: 'center'} 
                            ],
                            [ 
                                { text: '69.6 - 75.5', alignment: 'center' }, 
                                { text: 'B', alignment: 'center'} 
                            ],
                            [ 
                                { text: '65.6 - 69.5', alignment: 'center' }, 
                                { text: 'B-', alignment: 'center'} 
                            ],
                            [ 
                                { text: '59.6 - 65.5', alignment: 'center' }, 
                                { text: 'B/C', alignment: 'center'} 
                            ],
                            [ 
                                { text: '54.6 - 59.5', alignment: 'center' }, 
                                { text: 'C', alignment: 'center'} 
                            ],
                            [ 
                                { text: '≤ 54.5', alignment: 'center' }, 
                                { text: 'D', alignment: 'center'} 
                            ],
                        ],
                    }
                }
            ]
        },
        {
            columns: [
                {
                    width: '*',
                    text: [
                        'Ketua Tim Penguji',
                        '\n\n\n\n',
                        { text: dosen[0], bold: true }
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

export default function (data, sb) {
    console.log(data)
    let doc = []
    data.mahasiswa.forEach((e, i) => {
        doc.push(...generateObj(data, sb, i))
    })
    return doc
}