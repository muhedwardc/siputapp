import UGMLogo from './partials/ugm-logo'

const SOs = [
    {
        so: 'SO(c): Engineering Design',
        lo: 'Mampu mengaplikasikan engineering design dengan mempertimbangkan berbagai Batasan nyata',
        pi: [
            ['Proses desain tidak dilakukan secara benar apabila ditinjau dari ilmu teori yang berkaitan']
        ]
    }
]

export default function (data) {
    let doc = []
    const { tanggal, hari, judul, ruang, waktu, dosen, sekretaris, mahasiswa, nilai } = data
    doc.push(
        { text: '', pageBreak: 'before', pageOrientation: 'portrait' },
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
        { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 3 } ], margin: [0, 4, 0, 4] },
        {
            text: 'PENILAIAN UJIAN PENDADARAN',
            alignment: 'center',
            margin: [0, 8, 0, 8],
            fontSize: 12,
            bold: true
        },
        {
            table: {
                widths: ['auto', 150, 'auto', '*'],
                body: [
                    [
                        {text: 'A.', bold: true},
                        {text: 'Data Mahasiswa', bold: true},
                        {text: ':', bold: true},
                        ''
                    ],
                    [ '', 'Nama Mahasiswa', '', mahasiswa.nama.toUpperCase() ],
                    [ '', 'NIM', '', mahasiswa.nim ],
                    [ '', 'Hari, Tanggal Ujian', '', `${hari.toUpperCase()}, ${tanggal}`],
                    [ '', 'Jam', '', waktu]
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 10]
        },
        {
            table: {
                width: ['auto', 150, 'auto', '*'],
                body: [
                    [
                        {text: 'B.', bold: true},
                        {text: 'Penilaian Dosen', bold: true},
                        {text: ':', bold: true},
                        ''
                    ]
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 5]
        },
        {
            table: {
                width: [100, 100, '*', '*', '*', '*', 'auto'],
                body: [
                    [
                        {text: 'Student Outcome', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2},
                        {text: 'Learning Outcome', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2},
                        {text: 'Performance Indicator', fillColor: '#CCCCCC', alignment: 'center', colSpan: 4},
                        '', '', '',
                        {text: 'Nilai (0-\n100)', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2}
                    ],
                    [
                        '', '',
                        {text: 'Unsatisfactory (0-49)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Adequate (50-74)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Satisfactory (75-84)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Excellent (85-100)', fillColor: '#CCCCCC', alignment: 'center'},
                        ''
                    ],
                    [
                        'SO(c): Engineering Design',
                        'Mampu mengaplikasikan engineering design dengan memperimbangkan berbagai Batasan nyata',
                        {
                            ul: [
                                { 
                                    text: [
                                        {text: ' Proses desain tidak dilakukan secara benar ', decoration: 'underline'},
                                        'apabila ditinjau dari ilmu teori yang berkaitan.'
                                    ]
                                },
                                {
                                    text: [
                                        {text: ' Terdapat constraint-constraint penting yang sama sekali tidak dipertimbangkan.', decoration: 'underline'}
                                    ]
                                },
                                {
                                    text: [
                                        'Mahasiswa ',
                                        {text: ' tidak menguasai dan memahami proses desain', decoration: 'underline'},
                                        'yang dia lakukan sendiri.'
                                    ],
                                },
                                {
                                    text: [
                                        'Mahasiswa sama sekali ',
                                        {text: ' tidak menguasai ilmu teori yang mendasari proses desain ', decoration: 'underline'},
                                        'yang dilakukan.'
                                    ]
                                }
                            ]
                        },
                        {
                            ul: [
                                {
                                    text: ' Proses desain tidak dipaparkan secara terstruktur.'
                                },
                                {
                                    text: [
                                        'Penilai sedikit',
                                        {text: ' mendapatkan kesulitan untuk memahami bagaimana proses desain ', decoration: 'underline'},
                                        'sesungguhnya dilakukan oleh mahasiswa tugas akhir'
                                    ]
                                },
                                {
                                    text: [
                                        {text: ' Motivasi pemilihan proses desain sangat kabur.', decoration: 'underline'},
                                        'desain sangat kabur.'
                                    ]
                                },
                                {
                                    text: [
                                        {text: ' Pertimbangan akan constraint-constraint', decoration: 'underline'},
                                        'yang harus dipenuhi',
                                        {text: ' tidak tersedia ', decoration: 'underline'},
                                    ]
                                }
                            ]
                        },
                        {
                            ul: [
                                {
                                    text: [
                                        {text: ' Proses desain dipaparkan secara terstruktur ', decoration: 'underline'},
                                        ', namun tidak disertai dengan motivasi dan teori yang cukup kuat.'
                                    ],
                                },
                                {
                                    text: [
                                        'Penilai mendapatkan kesan bahwa',
                                        {text: ' proses desain yang dilakukan hanya difokuskan pada alasan operasional ', decoration: 'underline'},
                                        'semata.'
                                    ]
                                },
                                {
                                    text: [
                                        {text: ' Pemaparan yang menjelaskan bagaimana constraint-constraint ', decoration: 'underline'},
                                        'yang ada dipenuhi juga ',
                                        {text: ' tidak dikemukakan ', decoration: 'underline'},
                                        'secara jelas.'
                                    ]
                                },
                            ]
                        },
                        {
                            ul: [
                                'Pemaparan proses desain pada laporan skripsi dilakukan secara terstruktur disertai dengan motivasi kuat yang mendukung proses desain yang diusulkan.',
                                'Di samping itu, tersedia pula analisis yang berkaitan dengan pertimbangan constraint-constraint yang ada saat proses desain tersebut dilakukan.',
                                'Mahasiswa dapat mengkolerasikan yang dilakukan dengan matakuliah teori yang melandasi topik skripsi yang dikerjakan.'
                            ]
                        },
                        ''
                    ],
                    [
                        'SO(c): Engineering Design',
                        'Menuliskan dan mampu menjelaskan standar-standar keteknikan (jika tidak ditulis maka nilai poin ini adalah nol)',
                        { 
                            ul: [
                                'Tidak menjelaskan standar apa pun yang berkaitan dengan tugas akhirnya.',
                                'Atau tugas akhirnya tidak berhubungan dengan engineering design.',
                            ]
                        },
                        {
                            ul: [
                                {
                                    text: [
                                        {text:'Menuliskan standar-standar keteknikan yang berkaitan ', decoration: 'underline'},
                                        'dengan skripsinya ',
                                        {text: ' tetapi tidak tepat ', decoration: 'underline'},
                                        'dan ',
                                        {text: ' terdapat kesalahan fatal ', decoration: 'underline'}
                                    ]
                                }
                            ]
                        },
                        {
                            ul: [
                                {
                                    text: [
                                        'Menuliskan standar-standar keteknikan yang berkaitan dengan skripsinya dengan tepat dengan',
                                        {text: ' sedikit kesalahan fatal ', decoration: 'underline'}
                                    ]
                                }
                            ]
                        },
                        {
                            ul: [
                                {
                                    text: [
                                        'Menuliskan',
                                        {text: ' standar-standar keteknikan ', decoration: 'underline'},
                                        'yang berkaitan dengan skripsinya dengan tepat',
                                        {text: ' tanpa kesalahan atau sedikit kesalahan yang tidak fatal ', decoration: 'underline'}
                                    ]
                                }
                            ]
                        },
                        ''
                    ],
                    [
                        'SO(j): Engineering Awareness and Society',
                        'Mampu menjelaskan akibat dari keteknikan yang terkait terhadap lingkungan, masyarakat dan atau bidang lain',
                        {
                            ul: [
                                {
                                    text: [
                                        'Analisis mahasiswa berkaitan dengan',
                                        {text: ' aspek masyarakat tidak ada ', decoration: 'underline'}
                                    ]
                                },
                            ]
                        },
                        {
                            ul: [
                                {
                                    text: [
                                        'Analisis mengenai',
                                        {text: ' dampak dari proses desain ', decoration: 'underline'},
                                        'yang dilakukan terhadap lingkungan hidup dan masyarakat',
                                        {text: ' sangat minimal atau nyaris tidak ada ', decoration: 'underline'}
                                    ]
                                },
                            ]
                        },
                        {
                            ul: [
                                {
                                    text: [
                                        {text: ' Analisis mengenai dampak dari proses desain ', decoration: 'underline'},
                                        'yang dilakukan terhadap lingkungan hidup dan masyarakat',
                                        {text: ' kurang jelas dan implisit ', decoration: 'underline'}
                                    ],
                                },
                                'Tidak ada section/subsection terpisah mengenai paparan tersebut'
                            ]
                        },
                        {
                            ul: [
                                {
                                    text: [
                                        'Mahasiswa mampu',
                                        {text: ' menganalisis secara eksplisit dan tajam'},
                                        'mengenai dampak dari proses desain yang dilakukan',
                                        {text: ' terhadap lingkungan hidup dan masyarakat. ', decoration: 'underline'}
                                    ]
                                },
                                {
                                    text: [
                                        {text: ' Ada section/subsection terpisah ', decoration: 'underline'},
                                        'di dalam laporan tugas akhir mengenai hal ini.'
                                    ]
                                }
                            ]
                        },
                        ''
                    ],
                    [
                        'SO(g) Effective Communicaion',
                        'Mampu menyampaikan komunikasi dan presentasi secara baik dan benar',
                        {
                            ul: [
                                {text: [
                                    'Kualitas presentasi tugas akhir oleh mahasiswa sangat rendah. Penguji mendapat kesan seolah-olah',
                                    {text: ' mahasiswa tidak menguasai  materi dari tugas akhir ', decoration: 'underline'},
                                    'yang dilakukan.'
                                ]}
                            ]
                        },
                        {
                            ul: [
                                {text: ' Kualitas presentasi mahasiswa dalam merepresentasikan proses/hasil tugas akhir cukup. ', decoration: 'underline'},
                                {text: [
                                    {text: ' Namun penguji mendapatkan kesulitan untuk mendapatkan gambaran umum ', decoration: 'underline'},
                                    'mengenai tugas akhir yang dilakukan.'
                                ]},
                                {text: [
                                    {text: ' Penguji perlu menggali lebih lanjut informasi ', decoration: 'underline'},
                                    'mengenai proses/hasil tugas akhir dengan memanfaatkan forum tanya jawab.'
                                ]}
                            ]

                        },
                        {
                            ul: [
                                {text: [
                                    'Pemaparan hasil tugas akhir pada siding pendadaran',
                                    {text: ' disampaikan secara terstruktur. ', decoration: 'underline'}
                                ]},
                                {text: [
                                    'Penguji mendapatkan',
                                    {text: ' informasi mengenai gambaran umum proses tugas akhir ', decoration: 'underline'},
                                    'yang dilakukan.'
                                ]},
                                {text: [
                                    'Akan tetapi informasi',
                                    {text: ' detail mengenai proses tugas akhir implisit ', decoration: 'underline'},
                                    'akibat kualitas penyampaian informasi yang kurang sempurna'
                                ]}
                            ]
                        },
                        {
                            ul: [
                                {text: [
                                    {text: ' Pemaparan hasil tugas akhir pada siding pendadaran disampaikan secara jelas ', decoration: 'underline'},
                                    'dan stuktur yang mampu memberikan kesan kepada penguji bahwa mahasiswa sangat menguasai seluruh proses tugas akhir yang dilakukan.',
                                ]},
                                {text: [
                                    'Dari hasil presentasi tugas akhir, ',
                                    {text: ' penguji mendapat gambaran lengkap mengenai seluruh proses tugas akhir ', decoration: 'underline'},
                                    'yang dilakukan.'
                                ]},
                            ]
                        },
                        ''
                    ],
                    [
                        'SO(i) Professional and Ethical Responsibility',
                        'Mahasiswa mampu menerapkan etika yang baik untuk menjawab pertanyaan',
                        {
                            ul: [
                                {text: [
                                    'Mahasiswa menjawab pertanyaan dengan',
                                    {text: ' memotong pertanyaan penguji. ', decoration: 'underline'}
                                ]}
                            ]
                        },
                        {
                            ul: [
                                {text: [
                                    'Mahasiswa mampu',
                                    {text: ' menjawab pertanyaan secara sopan walau keliru atau tidak sesuai dengan teori yang berlaku. ', decoration: 'underline'}
                                ]}
                            ]
                        },
                        {
                            ul: [
                                {text: [
                                    'Mahasiswa',
                                    {text: ' menjawab pertanyaan baik dengan beberapa argument yang tidak tepat. ', decoration: 'underline'}
                                ]}
                            ]
                        },
                        {
                            ul: [
                                {text: [
                                    {text: ' Mahasiswa menjawab pertanyaan dengan baik dan menunjukkan aspek kritis dan argument ', decoration: 'underline'},
                                    'yang sesuai dengan tanggung jawabnya di skripsi tersebut.'
                                ]}
                            ]
                        },
                        ''
                    ],
                    [
                        'SO(k) Sustainable Learning',
                        'Mahasiswa mampu mendemonstrasikan apa yang akan mereka lakukan dan mengikuti kebaruan yang terkait dengan tesis mereka',
                        {
                            ul: [
                                {text: [
                                    {text: ' Studi literatur yang dilakukan tidak memadai dan tidak layak untuk disebut untuk studi literatur ', decoration: 'underline'},
                                    'karena analisis dari mahasiswa terhadap penelitian-penelitian yang dilakukan oleh peneliti lain tidak tersedia.'
                                ]},
                                {text: [
                                    'Bagian studi literatur hanya',
                                    {text: ' berisikan cuplikan-cuplikan dari makalah-makalah tanpa pembahasan ', decoration: 'underline'}
                                ]}
                            ]
                        },
                        {
                            ul: [
                                {text: [
                                    {text: ' Referensi yang direview tidak cukup up to date. ', decoration: 'underline'},
                                    'Banyak',
                                    {text: ' referensi terbaru yang tidak disertakan ', decoration: 'underline'},
                                    'pada proses review.'
                                ]},
                                {text: [
                                    'Ada kecenderungan bahwa mahasiswa menyediakan',
                                    {text: ' bagian studi literatur di dalam laporan skripsi hanya untuk memenuhi persyaratan format laporan ', decoration: 'underline'},
                                    'skripsi saja'
                                ]}
                            ]
                        },
                        {
                            ul: [
                                {text: [
                                    'Studi literatur',
                                    {text: ' berisikan review yang cukup lengkap mengenai penelitian-penelitian ', decoration: 'underline'},
                                    '(termasuk penelitian) terbaru yang telah dilakukan',
                                    {text: ' namun tidak disertai dengan alur dan kronologis yang memadai. ', decoration: 'underline'}
                                ]},
                                {text: [
                                    'Hubungan',
                                    {text: ' antar review pada penelitian yang berbeda tidak cukup jelas ', decoration: 'underline'},
                                    'memberi kesan bahwa mahasiswa hanya sekedar mengambil potongan-potongan dari makalah-makalah penelitian yang sudah ada.'
                                ]}
                            ]
                        },
                        {
                            ul: [
                                {text: [
                                    'Bagian dari laporan skripsi yang berkaitain dengan studi literatur (literature review) ',
                                    {text: ' direpresentasikan secara runtut dengan alur dan kronologis yang memadai, lengkap ', decoration: 'underline'},
                                    'dengan motivasi-motivasi dari setiap referensi yang direview'
                                ]},
                                {text: [
                                    'Di samping itu mahasiswa juga',
                                    {text: ' mampu memberikan prediksi atau gambaran bagaimana arah penelitian di masa mendatang ', decoration: 'underline'},
                                    'berkaitan dengan topik yang diteliti'
                                ]}
                            ]
                        },
                        ''
                    ]
                ],
            },
            fontSize: 8,
        }
    )

    return doc
}