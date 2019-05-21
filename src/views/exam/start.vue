<template>
    <div class="full" v-if="this.exam.ujian">
        <v-navigation-drawer 
            v-model="drawer" 
            :width="drawerWidth" 
            app
            right
            clipped
            persistent
            mobile-break-point="991" 
            class="correction-section pb-4"
            fixed>
            <v-toolbar dark color="primary">
                <v-toolbar-side-icon @click="toggleCorrectionSection"></v-toolbar-side-icon>
                <v-toolbar-title class="white--text" v-text="title"></v-toolbar-title>
            </v-toolbar>
            <v-layout column v-if="step == 1">
                <v-layout column class="pa-2 pt-4 pl-4 pr-4" style="position: relative;">
                    <v-slide-y-reverse-transition>
                        <v-layout column class="pa-4" v-show="creating" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: white; z-index: 4">
                            <v-form ref="add-correction-form" v-model="valid" lazy-validation></v-form>
                            <v-layout row justify-space-between>
                                <v-select
                                    v-model="selectedBab"
                                    :items="bab"
                                    solo
                                    placeholder="Pilih Bab"
                                    class="mr-2"></v-select>
                                <v-text-field style="width: 80px; flex-shrink: 0; flex-grow: 0" solo v-model="newCorrection.page" placeholder="hal" type="number" min="0"></v-text-field>
                            </v-layout>
                            <v-textarea rows="3" solo v-model="newCorrection.text" placeholder="Masukkan koreksi"></v-textarea>
                            <v-layout>
                                <v-spacer></v-spacer>
                                <v-btn class="error ma-0 mb-2 mr-2" @click="resetNewCorrection">Batal</v-btn>
                                <v-btn v-if="temp.edit" class="success ma-0 mb-2" @click="saveChanges">Edit</v-btn>
                                <v-btn v-else class="success ma-0 mb-2" @click="addCorrection">Simpan</v-btn>
                            </v-layout>
                        </v-layout>
                    </v-slide-y-reverse-transition>
                    <v-layout column v-show="!creating">
                        <v-layout v-if="correctionFilled">
                            <v-layout column v-for="(correction, section) in corrections" :key="section">
                                <template v-if="correction.items.length > 0">
                                    <h3 class="mb-1" v-text="bab[section]"></h3>
                                    <v-layout class="correction-item mb-2 pa-2" column v-for="(item, index) in correction.items" :key="index">
                                        <p class="mb-0" v-text="item.text"></p>
                                        <v-layout row align-center>
                                            <span class="font-weight-bold">Halaman {{item.page}}</span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat :ripple="false" @click="editCorrection(section, index)">
                                                <v-icon class="warning--text" small>edit</v-icon>
                                                <span class="primary--text ml-1">edit</span>
                                            </v-btn>
                                            <v-btn flat :ripple="false" @click="showDialog(section, index)">
                                                <v-icon class="error--text" small>delete</v-icon>
                                                <span class="primary--text ml-1">hapus</span>
                                            </v-btn>
                                        </v-layout>
                                    </v-layout>
                                </template>
                            </v-layout>
                        </v-layout>
                        <v-layout justify-center v-else>
                            Anda belum memberikan koreksi.
                        </v-layout>
                    </v-layout>
                    <v-btn class="primary ma-0 mt-2 mb-2" @click="creating = true" v-if="!creating">Tambah Koreksi</v-btn>
                </v-layout>
            </v-layout>
            <v-layout column v-if="step == 2" class="pa-2 pl-4 pr-4" style="position: relative;">
                <template v-show="!addingGrade">
                    <template v-if="exam.ujian && exam.ujian.skripsi.mahasiswa.length > 1">
                        <p class="mb-0"><b>Mahasiswa</b></p>
                        <ol class="mb-3">
                            <li v-for="mhs in exam.ujian.skripsi.mahasiswa" :key="mhs.nim" v-text="mhs.nama"></li>
                        </ol>
                    </template>
                    <v-layout column v-if="exam.ujian">
                        <v-layout align-start v-for="(so, index) in sos" :key="index">
                            <v-chip label class="mr-3">{{index + 1}}</v-chip>
                            <v-layout row>
                                <v-layout column>
                                    <b v-text="so.name"></b>
                                    <b v-if="filledGrades(index)" class="success--text">Nilai: {{ filledGrades(index) }}</b>
                                    <b v-else class="error--text">Nilai belum lengkap</b>
                                </v-layout>
                                <v-btn class="primary ml-3" @click="addGrades(index)">beri nilai</v-btn>
                            </v-layout>
                        </v-layout>
                    </v-layout>
                </template>
                <v-layout column class="pa-4" v-show="addingGrade" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: white; z-index: 10">
                    <v-layout column>
                        <b>{{ sos[gradeTemp.so].name }}</b>
                        <p class="mb-1">{{ sos[gradeTemp.so].description }}</p>
                        <table v-if="exam.ujian" class="mt-2 grade-list">
                            <tr v-for="(mahasiswa, index) in exam.ujian.skripsi.mahasiswa" :key="mahasiswa.nim">
                                <td class="pb-4">Mhs {{index + 1}}</td>
                                <td><v-text-field class="grade" min="0" max="100" placeholder="contoh: 85" solo v-model="gradeTemp.grades[index]"></v-text-field></td>
                                <td class="pb-4"><b>Excellent</b></td>
                            </tr>
                        </table>
                        <v-layout>
                            <v-spacer></v-spacer>
                            <v-btn class="error" @click="discardGrades">Batal</v-btn>
                            <v-btn class="success" @click="saveGrades">simpan</v-btn>
                        </v-layout>
                    </v-layout>
                    <b>Keterangan</b>
                    <v-layout column v-for="(list, i) in sos[selectedSO].indicators" :key="i">
                        <b>{{ gradeIndicators[i] }}</b>
                        <ul>
                            <li v-for="(indicator, index) in list" :key="index" v-text="indicator"></li>
                        </ul>
                    </v-layout>
                </v-layout>
            </v-layout>
            <v-layout row>
                <v-spacer></v-spacer>
                <v-btn v-if="!creating && !addingGrade" color="primary" class="ma-0 mr-4" @click="step = 1">Sebelumnya</v-btn>
                <v-btn v-if="!creating && !addingGrade" color="primary" class="ma-0 mr-4" @click="nextStep">Selanjutnya</v-btn>
            </v-layout>
        </v-navigation-drawer>
        <v-dialog v-model="dialog.show" persistent max-width="600px">
            <v-card>
                <v-card-title class="title pb-0">Anda ingin menghapus komentar ini?</v-card-title>
                <v-card-text>
                    <h3 v-text="corrections[dialog.section].name"></h3>
                    <span class="font-weight-bold">Halaman {{dialog.page}}</span><br>
                    <p v-text="dialog.text" class="mb-1 mt-1"></p>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="font-weight-bold" flat @click="closeDialog()">Batal</v-btn>
                <v-btn class="font-weight-bold" color="green darken-1" flat @click="deleteCorrection(dialog.section, dialog.index)">Ya</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-content id="exam-content">
            <!-- <embed :src="'https://drive.google.com/viewerng/viewer?embedded=true&url=' + exam.ujian.skripsi.naskah" id="exam-content-view"> -->
            <embed :src="'https://drive.google.com/viewerng/viewer?embedded=true&url=https://www.otago.ac.nz/library/pdf/Google_searching.pdf'" id="exam-content-view">
            <!-- <iframe :src="this.exam.ujian.skripsi.naskah" id="exam-content-view"></iframe> -->
            <v-layout row class="toggle-button">
                <v-btn @click="toggleCorrectionSection()" class="pa-2 flat primary text-capitalize">
                    {{ drawer ? 'Sembunyikan Komentar' : 'Tambah Komentar'}}
                </v-btn>
            </v-layout>
        </v-content>
    </div>
</template>

<script>
export default {
    data() {
        return {
            exam: {},
            selectedSO: 0,
            gradeTemp: {
                so: 0,
                grades: []
            },
            grades: [],
            sos: [
                {
                    name: 'SO(c): Engineering Design',
                    description: 'Mampu mengaplikasikan engineering design dengan memperimbangkan berbagai Batasan nyata',
                    indicators: [
                        [
                            'Proses desain tidak dilakukan secara benar apabila ditinjau dari ilmu teori yang berkaitan.', 
                            'Terdapat constraint-constraint penting yang sama sekali tidak dipertimbangkan.',
                            'Mahasiswa tidak menguasai dan memahami proses desain yang dia lakukan sendiri.',
                            'Mahasiswa sama sekali tidak menguasai ilmu teori yang mendasari proses desain yang dilakukan.'
                        ],
                        [
                            'Proses desain tidak dipaparkan secara terstruktur.',
                            'Penilai sedikit mendapatkan kesulitan untuk memahami bagaimana proses desain sesungguhnya dilakukan oleh mahasiswa tugas akhir.',
                            'Motivasi pemilihan desain sangat kabur.',
                            'Pertimbangan akan constraint-constraint yang harus dipenuhi tidak tersedia.'
                        ],
                        [
                            'Proses desain dipaparkan secara terstruktur, namun tidak disertai dengan motivasi dan teori yang cukup kuat',
                            'Penilai mendapatkan kesan bahwa proses desain yang dilakukan hanya difokuskan pada alasan operasional semata.',
                            'Pemaparan yang menjelaskan bagaimana constraint-constraint yang ada dipenuhi juga tidak dikemukakan secara jelas.'
                        ],
                        [
                            'Pemaparan proses desain pada laporan skripsi dilakukan secara terstruktur disertai dengan motivasi kuat yang mendukung proses desain yang diusulkan.',
                            'Di samping itu, tersedia pula analisis yang berkaitan dengan pertimbangan constraint-constraint yang ada saat proses desain tersebut dilakukan.',
                            'Mahasiswa dapat mengkolerasikan yang dilakukan dengan matakuliah teori yang melandasi topik skripsi yang dikerjakan.'
                        ]
                    ]
                },
                {
                    name: 'SO(c): Engineering Design',
                    description: 'Menuliskan dan mampu menjelaskan standar-standar keteknikan (jika tidak ditulis maka nilai poin ini adalah nol)',
                    indicators: [
                        [
                            'Tidak menjelaskan standar apa pun yang berkaitan dengan tugas akhirnya.',
                            'Atau tugas akhirnya tidak berhubungan dengan engineering design.'
                        ],
                        [
                            'Menuliskan standar-standar keteknikan yang berkaitan dengan skripsinya tetapi tidak tepat dan terdapat kesalahan fatal.'
                        ],
                        [
                            'Menuliskan standar-standar keteknikan yang berkaitan dengan skripsinya dengan tepat dengan sedikit kesalahan fatal.'
                        ],
                        [
                            'Menuliskan standar-standar keteknikan yang berkaitan dengan skripsinya dengan tepat tanpa kesalahan atau sedikit kesalahan yang tidak fatal.'
                        ]
                    ]
                },
                {
                    name: 'SO(j): Engineering Awareness and Society',
                    description: 'Mampu menjelaskan akibat dari keteknikan yang terkait terhadap lingkungan, masyarakat dan atau bidang lain',
                    indicators: [
                        ['Analisis mahasiswa berkaitan dengan aspek masyarakat tidak ada'],
                        ['Analisis mengenai dampak dari proses desain yang dilakukan terhadap lingkungan hidup dan masyarakat sangat minimal atau nyaris tidak ada'],
                        [
                            'Analisis mengenai dampak dari proses desain yang dilakukan terhadap lingkungan hidup dan masyarakat kurang jelas dan implisit',
                            'Tidak ada section/subsection terpisah mengenai paparan tersebut'
                        ],
                        [
                            'Mahasiswa mampu menganalisis secara eksplisit dan tajam mengenai dampak dari proses desain yang dilakukan terhadap lingkungan hidup dan masyarakat.',
                            'Ada section/subsection terpisah di dalam laporan tugas akhir mengenai hal ini.'
                        ]
                    ]
                },
                {
                    name: 'SO(g) Effective Communicaion',
                    description: 'Mampu menyampaikan komunikasi dan presentasi secara baik dan benar',
                    indicators: [
                        ['Kualitas presentasi tugas akhir oleh mahasiswa sangat rendah. Penguji mendapat kesan seolah-olah mahasiswa tidak menguasai  materi dari tugas akhir yang dilakukan.'],
                        ['Kualitas presentasi mahasiswa dalam merepresentasikan proses/hasil tugas akhir cukup', 'Namun penguji mendapatkan kesulitan untuk mendapatkan gambaran umum mengenai tugas akhir yang dilakukan.', 'Penguji perlu menggali lebih lanjut informasi mengenai proses/hasil tugas akhir dengan memanfaatkan forum tanya jawab.'],
                        ['Pemaparan hasil tugas akhir pada siding pendadaran disampaikan secara terstruktur.', 'Penguji mendapatkan informasi mengenai gambaran umum proses tugas akhir yang dilakukan.', 'Akan tetapi informasi detail mengenai proses tugas akhir implisit akibat kualitas penyampaian informasi yang kurang sempurna'],
                        ['Pemaparan hasil tugas akhir pada siding pendadaran disampaikan secara jelas dan stuktur yang mampu memberikan kesan kepada penguji bahwa mahasiswa sangat menguasai seluruh proses tugas akhir yang dilakukan.', 'Dari hasil presentasi tugas akhir, penguji mendapat gambaran lengkap mengenai seluruh proses tugas akhir yang dilakukan.']
                    ]
                },
                {
                    name: 'SO(i) Professional and Ethical Responsibility',
                    description: 'Mahasiswa mampu menerapkan etika yang baik untuk menjawab pertanyaan',
                    indicators: [
                        ['Mahasiswa menjawab pertanyaan dengan memotong pertanyaan penguji.'],
                        ['Mahasiswa mampu menjawab pertanyaan secara sopan walau keliru atau tidak sesuai dengan teori yang berlaku.'],
                        ['Mahasiswa menjawab pertanyaan baik dengan beberapa argument yang tidak tepat.'],
                        ['Mahasiswa menjawab pertanyaan dengan baik dan menunjukkan aspek kritis dan argument yang sesuai dengan tanggung jawabnya di skripsi tersebut.']
                    ]
                },
                {
                    name: 'SO(k) Sustainable Learning',
                    description: 'Mahasiswa mampu mendemonstrasikan apa yang akan mereka lakukan dan mengikuti kebaruan yang terkait dengan tesis mereka',
                    indicators: [
                        [
                            'Studi literatur yang dilakukan tidak memadai dan tidak layak untuk disebut untuk studi literatur karena analisis dari mahasiswa terhadap penelitian-penelitian yang dilakukan oleh peneliti lain tidak tersedia.',
                            'Bagian studi literatur hanya berisikan cuplikan-cuplikan dari makalah-makalah tanpa pembahasan'
                        ],
                        [
                            'Referensi yang direview tidak cukup up to date. Banyak referensi terbaru yang tidak disertakan pada proses review.',
                            'Ada kecenderungan bahwa mahasiswa menyediakan bagian studi literatur di dalam laporan skripsi hanya untuk memenuhi persyaratan format laporan skripsi saja'
                        ],
                        [
                            'Studi literatur berisikan review yang cukup lengkap mengenai penelitian-penelitian (termasuk penelitian) terbaru yang telah dilakukan namun tidak disertai dengan alur dan kronologis yang memadai.',
                            'Hubungan antar review pada penelitian yang berbeda tidak cukup jelas memberi kesan bahwa mahasiswa hanya sekedar mengambil potongan-potongan dari makalah-makalah penelitian yang sudah ada.'
                        ],
                        [
                            'Bagian dari laporan skripsi yang berkaitain dengan studi literatur (literature review) direpresentasikan secara runtut dengan alur dan kronologis yang memadai, lengkap dengan motivasi-motivasi dari setiap referensi yang direview',
                            'Di samping itu mahasiswa juga mampu memberikan prediksi atau gambaran bagaimana arah penelitian di masa mendatang berkaitan dengan topik yang diteliti'
                        ]
                    ]
                }
            ],
            gradeIndicators: ['Unsatisfactory (0-49)', 'Adequate (50-74)', 'Satisfactory (75-84)', 'Excellent (85-100)'],
            drawerWidth: '',
            drawer: true,
            windowWidth: 0,
            dialog: {
                show: false,
                text: '',
                section: 0,
                index: '',
                page: ''
            },
            itemIndex: 0,
            bab: ['ABSTRAK', 'BAB I PENDAHULUAN', 'BAB II DASAR TEORI', 'BAB III METODE PENELITIAN', 'BAB IV HASIL DAN PEMBAHASAN', 'KOMENTAR UMUM/CATATAN'],
            corrections: [],
            newCorrection: {
                text: '',
                page: '',
                index: 0,
                rules: {
                    required: [v => !!v && v.length > 0 || 'Harus diisi'],
                    mustBeNumber: [v => !isNaN(v) && v >= 0 || 'Harus angka'],
                }
            },
            temp: {
                edit: false,
                text: '',
                page: '',
                index: 0,
                section: 0,
                selectedBab: null
            },
            creating: false,
            addingGrade: false,
            selectedBab: null,
            valid: true,
            step: 2,
        }
    },

    watch: {
        selectedBab(val) {
            return this.newCorrection.index = this.bab.indexOf(val)
        }
    },

    computed: {
        mobileAndShow() {
            return Number(this.windowWidth <= 1000) && this.drawer
        },

        title() {
            return this.step == 1
                ? 'Koreksi'
                : 'SO'
        },

        correctionFilled() {
            let filled = false
            this.corrections.forEach(correction => correction && correction.items.length > 0 ? filled = true : null)
            return filled
        }
    },

    methods: {        
        nextStep() {
            this.step += 1
        },

        addGrades(index) {
            let grades = []
            this.grades.forEach((mhs,i) => mhs.grades[index] && mhs.grades[index].nilai ? grades.splice(i, 1, mhs.grades[index].nilai) : null)
            this.addingGrade = true
            this.gradeTemp = {
                so: index,
                grades
            }
        },

        discardGrades() {
            this.addingGrade = false
            this.gradeTemp = {
                so: 0,
                grades: []
            }
        },

        filledGrades(i) {
            let filled = true
            this.grades.forEach(mhs => {
                mhs.grades[i] && mhs.grades[i].nilai ? null : filled = false
            })

            if (filled) {
                filled = [],
                this.grades.forEach(mhs => {
                    filled.push(mhs.grades[i].nilai)
                })

                filled = filled.join(', ')
            }

            return filled
        },

        saveGrades() {
            const { so, grades } = this.gradeTemp
            this.exam.ujian.skripsi.mahasiswa.forEach((mahasiswa, i) => {
                this.grades[i].grades.splice(so, 1, {so, nilai: grades[i]})
            })
            this.discardGrades()
        },

        generateGrades() {
            this.exam.ujian.skripsi.mahasiswa.forEach(mahasiswa => this.grades.push({mahasiswa, grades: new Array(this.sos.length).fill(null)}))
        },

        async fetchExam() {
            try {
                const res = await axios.get(`/me/exams/${this.$router.currentRoute.params.id}/`, this.$store.getters.authHeaders)
                this.exam = res.data
                this.generateGrades()
            } catch (error) {
                this.showSnackbar(error)
                this.$router.go(-1)
            }
        },

        generateCorrectionsTemplate() {
            this.bab.map(bab => {
                this.corrections.push({
                    items: []
                })
            })
        },

        generateExamData() {
            // const examData = JSON.parse(localStorage.getItem('exam-data'))
            // if (examData && this.$router.currentRoute.params.id == examData.id) {
            //     this.step = examData.step
            //     this.corrections = examData.corrections
            //     this.sortCorrections()
            // } else {
            //     this.updateLocalStorage()
            // }
        },

        editCorrection(section, index) {
            const { text, page } = this.corrections[section].items[index]
            this.temp = {edit: true, text, page, index, selectedBab: this.bab[section], section}
            this.newCorrection.text = text
            this.newCorrection.page = page
            this.newCorrection.section = section
            this.itemIndex = index
            this.selectedBab = this.bab[section]
            this.creating = true
        },

        saveChanges() {
            const index = this.temp.index
            const section = this.newCorrection.section
            if (section != this.bab.indexOf(this.selectedBab)) {
                this.corrections[this.temp.section].items.splice(index, 1)
                this.corrections[this.bab.indexOf(this.selectedBab)].items.push({
                    page: this.newCorrection.page, 
                    text: this.newCorrection.text
                })
            } else {
                this.corrections[section].items[index] = {
                    page: this.newCorrection.page, 
                    text: this.newCorrection.text
                }
            }
            this.resetNewCorrection()
        },

        discardChanges() {
            this.temp = {
                edit: false,
                text: '',
                page: '',
                index: 0,
                section: 0,
                selectedBab: null
            }
        },

        showDialog(section, index) {
            const { text, page } = this.corrections[section].items[index]
            this.dialog = { show: true, section, index, text,page }
        },

        closeDialog() {
            this.dialog = { show: false, section: 0, index: 0, text: '', page: '' }
        },

        deleteCorrection(section, index) {
            this.corrections[section].items.splice(index, 1)
            this.updateLocalStorage()
            this.closeDialog()
        },

        updateLocalStorage() {
            const examData = {
                id: this.$router.currentRoute.params.id,
                step: this.$router.currentRoute.query.step ? this.$router.currentRoute.query.step : 0,
                corrections: this.corrections
            }
            localStorage.setItem('exam-data', JSON.stringify(examData))
        },

        resetNewCorrection() {
            this.newCorrection = {page: '', text: '', index: 0}
            this.temp = {edit: false, text: '', page: '', index: 0, selectedBab: null, section: 0}
            this.itemIndex = 0
            this.creating = false
            this.selectedBab = null
        },

        sortCorrections(section) {
            this.corrections.forEach(correction => correction.items.sort((a, b) => (a.page > b.page) ? 1 : -1)) 
        },

        addCorrection() {
            const validInput = this.$refs['add-correction-form'].validate()
            if (validInput) {
                const { page, text, index } = this.newCorrection
                this.corrections[index].items.push({
                    bab: index,
                    page,
                    text
                })
                this.corrections[index].items.sort((a, b) => (a.page > b.page) ? 1 : -1)
                this.updateLocalStorage()
                this.resetNewCorrection()
            }
        },

        toggleCorrectionSection() {
            this.drawer = !this.drawer
        },

        getDrawerWidth() {
            this.windowWidth = window.innerWidth
            this.windowWidth > 1000 
                ? this.drawerWidth = this.windowWidth/2 + 'px' 
                : this.windowWidth <= 1000 && this.windowWidth > 425
                ? this.drawerWidth = 90*this.windowWidth/100 + 'px'
                : this.drawerWidth = this.windowWidth + 'px'
        },
    },

    created() {
        if (this.$store.state.auth.token) {
            this.fetchExam()
            this.generateExamData()
            this.generateCorrectionsTemplate()
            this.getDrawerWidth()
            this.windowWidth <= 991 ? this.drawer = false : true
            window.addEventListener('resize', this.getDrawerWidth)
        } else {
            return this.$router.push('/login')
        }
    },

    beforeDestroy: function () {
        window.removeEventListener('resize', this.getDrawerWidth)
    }
}
</script>

<style lang="sass">
    .full
        min-height: 100vh
    
    td 
        vertical-align: middle
    
    .grade-list
        tr 
            td:first-of-type
                width: 50px
            td:nth-of-type(2)
                width: 110px
            
        .grade
            width: 100px

    #exam-content
        .toggle-button
            position: absolute
            right: 0
            top: 20px
            margin-right: 0
            transform: rotate(-90deg)
            transform-origin: bottom right
        
    #exam-content,
    #exam-content-view
        width: 100%
        height: 100%
        position: relative

    #exam-content-view
        display: block
        height: 100vh
    
    .correction-section
        background-color: white

        .v-text-field--solo
            padding-top: 0 !important

            .v-input__slot
                margin-bottom: 0
                box-shadow: unset !important
                border: 1px solid #c3c3c3
            
            .v-text-field__details
                padding-left: 0
                padding-right: 0

        .v-btn
            text-transform: capitalize

        .correction-item
            background: #f0f0f0
            border-radius: 4px

            .v-btn
                &:before 
                    opacity: 0

                padding: 0
                margin: 0
                text-transform: capitalize
    
        .correction-input       
            border: 1px solid #aaa
            border-radius: 4px
            padding: 4px
            margin-bottom: 4px
</style>