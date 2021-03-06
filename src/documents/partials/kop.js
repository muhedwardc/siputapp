const logo = 'data:image/png;base64,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'

export default {
    portrait: function() {
        return [
            {
                image: logo,
                fit: [30, 30],
                alignment: 'center',
                margin: [0, 0, 0, 2],
                pageBreak: 'before',
                pageOrientation: 'portrait'
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
            { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 535, y2: 0, lineWidth: 1 } ], margin: [0, 2, 0, 0] },
            { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 535, y2: 0, lineWidth: 3 } ], margin: [0, 4, 0, 4] }
        ]
    },
    landscape: function() {
        return [
            {
                columns: [
                    {
                        width: 'auto',
                        image: logo,
                        fit: [40, 40],
                        alignment: 'center',
                        margin: [0, 0, 0, 2],   
                    },
                    [
                        {
                            text: [
                                'DEPARTEMEN TEKNIK ELEKTRO DAN TEKNOLOGI INFORMASI\n',
                                'FAKULTAS TEKNIK UNIVERSITAS GADJAH MADA',
                            ],
                            alignment: 'center',
                            pageOrientation: 'landscape'
                        },
                        {
                            text: 'Jl. Grafika No. 2, Fakultas Teknik UGM, Yogyakarta 55281 telp.(0274) 6492201,6492201 fax. (0274) 552305, http://jteti.ugm.ac.id, email:akademikjteti@gm.ac.id', 
                            fontSize: 9,
                            italics: true,
                            margin: [10, 2, 10, 0],
                            alignment: 'center',
                            pageOrientation: 'landscape'
                        },
                    ]
                ],
                pageBreak: 'before', 
                pageOrientation: 'landscape',
                pageSize: 'A4'
            },
            { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 792, y2: 0, lineWidth: 1 } ], margin: [0, 5, 0, 0], pageOrientation: 'landscape' },
            { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 792, y2: 0, lineWidth: 3 } ], margin: [0, 4, 0, 0], pageOrientation: 'landscape' },
        ]
    }
}