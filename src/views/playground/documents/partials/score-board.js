const scoreBoard = [
    [
        { text: 'Skor', fillColor: '#CCCCCC', alignment: 'center' },
        { text: 'Nilai', fillColor: '#CCCCCC', alignment: 'center' },
    ],
    [ 
        { text: '>= 84.6', alignment: 'center' }, 
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
        { text: '<= 54.5', alignment: 'center' }, 
        { text: 'D', alignment: 'center'} 
    ],
]

export default {
    width: 180,
    table: {
        widths: [ '*', 80 ],
        body: scoreBoard,
    }
}