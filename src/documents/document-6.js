// import UGMLogo from './partials/ugm-logo'

export default function (data) {
    let doc = []
    const { tanggal, hari, judul, ruang, waktu, dosen, sekretaris, mahasiswa, nilai } = data
    const formatedDate = moment(tanggal, 'DD/MM/YYYY').format('DD MMMM YYYY')
    doc.push(
        { text: '', pageBreak: 'before', pageOrientation: 'portrait' },
        {
            // image: UGMLogo,
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
            text: 'PENILAIAN NASKAH SKRIPSI',
            alignment: 'center',
            margin: [0, 8, 0, 30],
            fontSize: 12,
            bold: true
        },
        {
            table: {
                widths: [150, 'auto', '*'],
                body: [
                    [ 'Judul Skripsi', ':', { text: judul.toUpperCase(), lineHeight: 1.25 } ],
                    [ 
                        { text: 'Pembimbing', margin: [0, 10, 0, 0]},
                        { text: ':', margin: [0, 10, 0, 0]},
                        { 
                            ol: [
                                { text: `${dosen[0]}\n`, lineHeight: 1.25 },
                                { text: dosen[1], lineHeight: 1.25 }
                            ],
                            margin: [0, 10, 0, 10]
                        }
                    ],
                    [ 'Nama Mahasiswa', ':', mahasiswa.nama ],
                    [ 'NIM', ':', mahasiswa.nim ],
                    [ 'Program Studi', ':', mahasiswa.prodi ],
                    [ 'Tempat, Tanggal Lahir', ':', `${mahasiswa.tempat_lahir.toUpperCase()}, ${mahasiswa.tanggal_lahir}` ],
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 10]
        },
        { text: `Karya tulis tersebut telah direvisi sesuai masukan saat Ujian Pendadaran dan telah dilakukan penilaian dengan\n angka (0-100): ${nilai}`, lineHeight: 2 },
        {
            columns: [
                { text: '', width: '*' },
                { text: `Yogyakarta, ${formatedDate}\n\nPembimbing I\n\n\n\n\n\n${dosen[0]}`, margin: [50, 0, 0, 0]},
            ],
            margin: [0, 10, 0, 10]
        },
        {
            fontSize: 9,
            table: {
                widths: [60, 50, 50, 50, 50],
                body: [
                    [
                        { text: 'Kriteria Penilaian', rowSpan: 2, alignment: 'center', bold: true, margin: [0, 2.5  , 0, 0] },
                        { text: 'Poor', italics: true, bold: true, alignment: 'center' },
                        { text: 'Fair', italics: true, bold: true, alignment: 'center' },
                        { text: 'Good', italics: true, bold: true, alignment: 'center' },
                        { text: 'Excellent', italics: true, bold: true, alignment: 'center' },
                    ],
                    [
                        {},
                        { text: '≤ 54', alignment: 'center', bold: true },
                        { text: '55-65', alignment: 'center', bold: true },
                        { text: '66-79', alignment: 'center', bold: true },
                        { text: '80-100', alignment: 'center', bold: true },
                    ],
                    [
                        { text: 'Penguasaan Materi', bold: true },
                        'Tidak Menguasai',
                        'Cukup',
                        'Baik',
                        'Sangat Baik'
                    ],
                    [
                        { text: 'Penulisan', bold: true },
                        'Tidak Baik',
                        'Cukup',
                        'Baik',
                        'Sangat Baik'
                    ],
                    [
                        { text: 'Substansi dan Kompleksitas Skripsi', bold: true },
                        'Kurang Kompleks',
                        'Cukup',
                        'Baik',
                        'Sangat Baik'
                    ],
                ],
            }
        }
    )

    return doc
}