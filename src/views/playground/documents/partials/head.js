import UGMLogo from './ugm-logo.js'
const vertical = [
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
    { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 3 } ], margin: [0, 4, 0, 4] }
]

const horizontal = [
    {
        columns: [
            {
                width: '*',
                image: UGMLogo,
                fit: [30, 30],
                alignment: 'center',
                margin: [0, 0, 0, 2]

            },
            [
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
            ]
        ]
    },
    { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 1 } ], margin: [0, 5, 0, 0] },
    { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 3 } ], margin: [0, 4, 0, 0] }
]

export default {
    vertical,
    horizontal
}