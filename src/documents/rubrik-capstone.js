export default function (data) {
    const mahasiswa = [
        {
            name: 'Muhammad Edward Chakim',
            grade: [98, 96, 95, 89, 90, 97]
        },
        {
            name: 'Muhammad Ashil Al Latief',
            grade: [94, 98, 95, 87, 91, 91]
        },
        {
            name: 'Muhammad Steven Amadeus Uyanto',
            grade: [94, 92, 90, 92, 88, 92]
        }
    ]
    let socs = [
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
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
            },
            {
                ul: [
                    'Pemaparan proses desain pada laporan skripsi dilakukan secara terstruktur disertai dengan motivasi kuat yang mendukung proses desain yang diusulkan.',
                    'Di samping itu, tersedia pula analisis yang berkaitan dengan pertimbangan constraint-constraint yang ada saat proses desain tersebut dilakukan.',
                    'Mahasiswa dapat mengkolerasikan yang dilakukan dengan matakuliah teori yang melandasi topik skripsi yang dikerjakan.'
                ],
                margin: [0, 0, 0, 10]
            }
        ],
        [
            'SO(c): Engineering Design',
            'Menuliskan dan mampu menjelaskan standar-standar keteknikan (jika tidak ditulis maka nilai poin ini adalah nol)',
            { 
                ul: [
                    'Tidak menjelaskan standar apa pun yang berkaitan dengan tugas akhirnya.',
                    'Atau tugas akhirnya tidak berhubungan dengan engineering design.',
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
            },
            {
                ul: [
                    {
                        text: [
                            'Menuliskan standar-standar keteknikan yang berkaitan dengan skripsinya dengan tepat dengan',
                            {text: ' sedikit kesalahan fatal ', decoration: 'underline'}
                        ]
                    }
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
            }
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
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
            }
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
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]

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
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
            }
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
                ],
                margin: [0, 0, 0, 10]
            },
            {
                ul: [
                    {text: [
                        'Mahasiswa mampu',
                        {text: ' menjawab pertanyaan secara sopan walau keliru atau tidak sesuai dengan teori yang berlaku. ', decoration: 'underline'}
                    ]}
                ],
                margin: [0, 0, 0, 10]
            },
            {
                ul: [
                    {text: [
                        'Mahasiswa',
                        {text: ' menjawab pertanyaan baik dengan beberapa argument yang tidak tepat. ', decoration: 'underline'}
                    ]}
                ],
                margin: [0, 0, 0, 10]
            },
            {
                ul: [
                    {text: [
                        {text: ' Mahasiswa menjawab pertanyaan dengan baik dan menunjukkan aspek kritis dan argument ', decoration: 'underline'},
                        'yang sesuai dengan tanggung jawabnya di skripsi tersebut.'
                    ]}
                ],
                margin: [0, 0, 0, 10]
            }
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
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
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
                ],
                margin: [0, 0, 0, 10]
            },
        ]
    ]
    let mhsGrade = []
    let averages = []
    mahasiswa.forEach((e, i) => averages.push(
        { text: 'Mhs ' + (i+1) + ': ' + (e.grade.reduce((total, num) => total + num)/e.grade.length).toFixed(2), margin: [0, 8, 0, 8], fontSize: 12, bold: true }
    ))
    for (let i = 0; i <= 7 - averages.length; i ++) averages.push('')
    socs.forEach((s, i) => {
        mahasiswa.forEach((m, j) => {
            mhsGrade.push('Mhs ' + (j+1) + ':\n')
            mhsGrade.push({text: m.grade[i] + '\n', bold: true, lineHeight: 1.5, decoration: 'underline'})
        })
        socs[i].push({
            text: [...mhsGrade],
            fontSize: 10
        })
        mhsGrade = []
    })
    const doc = [
        { text: '', pageBreak: 'before', pageOrientation: 'landscape', margin: [0, 0, 0, 20], pageSize: 'A4' },
        {
            text: 'Rubrik Penilaian Sidang Skripsi',
            alignment: 'center',
            fontSize: 20,
            bold: true
        },
        {
            text: 'Dimohon Penguji untuk menggali aspek-aspek berikut ini',
            alignment: 'center',
            margin: [0, 2, 0, 10],
            fontSize: 14,
        },
        {
            table: {
                widths: [70, 100, '*', '*', '*', '*', 30],
                body: [
                    [
                        {text: 'Student Outcome', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 7, 0, 0]},
                        {text: 'Learning Outcome', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 7, 0, 0]},
                        {text: 'Performance Indicator', fillColor: '#CCCCCC', alignment: 'center', colSpan: 4},
                        '', '', '',
                        {text: 'Nilai (0-\n100)', fillColor: '#CCCCCC', alignment: 'center', rowSpan: 2, margin: [0, 2, 0, 0]}
                    ],
                    [
                        '', '',
                        {text: 'Unsatisfactory (0-49)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Adequate (50-74)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Satisfactory (75-84)', fillColor: '#CCCCCC', alignment: 'center'},
                        {text: 'Excellent (85-100)', fillColor: '#CCCCCC', alignment: 'center'},
                        ''
                    ], 
                    ...socs,
                    [
                        {text: 'Total Rerata', margin: [0, 10, 0, 8]},
                        ...averages
                    ]
                ]
            },
            fontSize: 7.8,
        },
        { text: 'Keterangan:', margin: [0, 10, 0, 10] },
        {
            table: {
                body: [
                    [{ text: 'Mhs 1', margin: [0, 0, 4, 0] }, { text: 'MUHAMMAD EDWARD CHAKIM', margin: [2, 0, 2, 0] }],
                    [{ text: 'Mhs 2', margin: [0, 0, 4, 0] }, { text: 'MUHAMMAD ASHIL AL LATIEF', margin: [2, 0, 2, 0] }],
                    [{ text: 'Mhs 3', margin: [0, 0, 4, 0] }, { text: 'STEVEN AMADEUS UYANTO', margin: [2, 0, 2, 0] }]
                ]
            }
        },
        { text: 'Semua Dosen menguji semua mahasiswa\nNilai Akhir adalah nilai rata-rata', margin: [0, 10, 0, 0]},
    ]

    return doc
}