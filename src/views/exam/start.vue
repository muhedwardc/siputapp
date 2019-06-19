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
            <v-layout column v-if="step == 0">
                <v-layout column class="pa-2 pt-4 pl-4 pr-4" style="position: relative;">
                    <v-slide-y-reverse-transition>
                        <v-layout column class="pa-4" v-show="creating" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: white; z-index: 4">
                            <v-form ref="add-correction-form" v-model="valid" lazy-validation>
                            <v-layout row justify-space-between>
                                <v-select
                                    v-model="selectedBab"
                                    :items="bab"
                                    :rules="[v => !!v || 'Pilih salah satu']"
                                    solo
                                    placeholder="Pilih Bab"
                                    class="mr-2"></v-select>
                                <v-text-field :rules="[v => !!v || 'Harus diisi', v => !isNaN(v) && v >= 0 || 'Halaman berisi angka']" style="width: 80px; flex-shrink: 0; flex-grow: 0" solo v-model="newCorrection.halaman" placeholder="hal" type="number" min="0"></v-text-field>
                            </v-layout>
                            <v-textarea :rules="[v => !!v || 'Harus diisi']" rows="3" solo v-model="newCorrection.komentar" placeholder="Masukkan komentar"></v-textarea>
                            <v-layout>
                                <v-spacer></v-spacer>
                                <v-btn class="error ma-0 mb-2 mr-2" @click="resetNewCorrection" :disabled="saving">Batal</v-btn>
                                <v-btn v-if="temp.edit" class="success ma-0 mb-2" @click="saveChanges" :loading="saving">Edit</v-btn>
                                <v-btn v-else class="success ma-0 mb-2" @click="addCorrection" :loading="saving">Simpan</v-btn>
                            </v-layout>
                            </v-form>
                        </v-layout>
                    </v-slide-y-reverse-transition>
                    <v-layout column v-show="!creating">
                        <app-loading :loadingState="fetchingComments"></app-loading>
                        <v-layout align-center v-if="errorFetchingComments" column>
                            <p class="error--text text-xs-center mb-0">Ada kesalahan dalam memuat komentar</p>
                            <v-btn flat class="primary--text" @click="fetchComments">
                                <v-icon left small>refresh</v-icon>
                                <span class="text-lowercase">muat ulang komentar</span>
                            </v-btn>
                        </v-layout>
                        <template v-else-if="!fetchingComments">
                            <v-layout column v-if="correctionFilled">
                                <v-layout column v-for="(correction, section) in corrections" :key="section">
                                    <template v-if="correction.items.length > 0">
                                        <h3 class="mb-1" v-text="bab[section]"></h3>
                                        <v-layout class="correction-item mb-2 pa-2" column v-for="(item, index) in correction.items" :key="index">
                                            <p class="mb-0" v-text="item.komentar"></p>
                                            <v-layout row align-center>
                                                <span class="font-weight-bold">Halaman {{item.halaman}}</span>
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
                                Anda belum memberikan komentar.
                            </v-layout>
                        </template>
                    </v-layout>
                    <v-btn class="primary ma-0 mt-2 mb-2" @click="creating = true" v-if="!creating">Tambah komentar</v-btn>
                </v-layout>
            </v-layout>
            <v-layout column v-if="step == 1" class="pa-2 pl-4 pr-4" style="position: relative;">
                <template v-show="!addingGrade">
                    <template v-if="exam.ujian && exam.ujian.skripsi.mahasiswa.length > 0">
                        <p class="mb-0"><b>Mahasiswa</b></p>
                        <ol class="mb-3">
                            <li v-for="mhs in exam.ujian.skripsi.mahasiswa" :key="mhs.nim" v-text="mhs.nama"></li>
                        </ol>
                    </template>
                    <v-layout column v-if="exam.ujian">
                        <v-layout align-start v-for="(so, index) in socs" :key="index">
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
                        <b>{{ socs[gradeTemp.so_id].name }}</b>
                        <p class="mb-1">{{ socs[gradeTemp.so_id].description }}</p>
                        <v-form v-model="validGrades">
                        <table class="mt-2 grade-list">
                            <template v-for="(mahasiswa, index) in exam.ujian.skripsi.mahasiswa">
                                <div :key="mahasiswa.nim">
                                    <tr>
                                        <td v-text="mahasiswa.nama" colspan="2"></td>
                                    </tr>
                                    <tr>
                                        <td><v-text-field :disabled="saving" :rules="[v => !isNaN(v) && v <= 100 && v >= 0 || 'Angka 0 - 100']" type="number" class="grade" min="0" max="100" placeholder="ex. 85" solo v-model="gradeTemp.grades[index]"></v-text-field></td>
                                        <td class="pb-4 pl-2"><b v-text="gradeIndicator(gradeTemp.grades[index])"></b></td>
                                    </tr>
                                </div>
                            </template>
                        </table>
                        </v-form>
                        <v-layout>
                            <v-spacer></v-spacer>
                            <v-btn class="error" @click="discardGrades" :disabled="saving">Batal</v-btn>
                            <v-btn class="success" @click="saveGrades" :loading="saving">simpan</v-btn>
                        </v-layout>
                    </v-layout>
                    <b class="mt-2">Indikator Penilaian</b>
                    <v-layout column v-for="(list, i) in socs[selectedSO].indicators" :key="i">
                        <b>{{ gradeIndicators[i] }}</b>
                        <ul>
                            <li v-for="(indicator, index) in list" :key="index" v-text="indicator"></li>
                        </ul>
                    </v-layout>
                </v-layout>
            </v-layout>
            <v-layout column v-if="step == 2" class="pa-4">
                <h3>Apakah ada revisi judul?</h3>
                <v-radio-group v-model="revisionTemp.revisi" :mandatory="false">
                    <v-radio color="primary" label="Tidak Ada" :value="false"></v-radio>
                    <v-radio color="primary" label="Ada" :value="true"></v-radio>
                </v-radio-group>
                <template v-if="revisionTemp.revisi">
                    <p>Masukkan revisi judul</p>
                    <v-textarea box label="revisi judul" v-model="revisionTemp.konten"></v-textarea>
                </template>
                <v-layout>
                    <v-spacer></v-spacer>
                    <v-btn class="default ma-0 mr-2" :disabled="saving" v-if="revisionHasChanged" @click="resetRevision">hapus perubahan</v-btn>
                    <v-btn class="success ma-0" :loading="saving" @click="addRevision" v-if="revisionHasChanged">simpan revisi</v-btn>
                </v-layout>
            </v-layout>
            <v-layout row class="pr-4">
                <v-spacer></v-spacer>
                <v-btn v-if="!creating && !addingGrade && step !== 0" color="primary" class="ma-0 ml-2" @click="step = 0">Komentar</v-btn>
                <v-btn v-if="!creating && !addingGrade && step !== 1" color="primary" class="ma-0 ml-2" @click="step = 1">Penilaian</v-btn>
                <v-btn v-if="!creating && !addingGrade && step !== 2 && isLeader" color="primary" class="ma-0 ml-2" @click="step = 2">Revisi Judul</v-btn>
                <v-btn v-if="!creating && !addingGrade" color="primary" class="ma-0 ml-2" @click="fetchRecap">Rekap</v-btn>
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
            <embed :src="'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'" id="exam-content-view">
            <!-- <embed :src="'https://drive.google.com/viewerng/viewer?embedded=true&url=https://www.otago.ac.nz/library/pdf/Google_searching.pdf'" id="exam-content-view"> -->
            <!-- <iframe :src="this.exam.ujian.skripsi.naskah.replace('/media/', '/uploads/')" id="exam-content-view"></iframe> -->
            <v-layout v-if="!drawer" row class="toggle-button">
                <v-btn @click="toggleCorrectionSection()" class="pa-2 flat primary text-capitalize">
                    Tambah Komentar
                </v-btn>
            </v-layout>
        </v-content>
        <v-dialog fullscreen v-model="showRecap" transition="dialog-bottom-transition" class="recap-dialog">
            <v-toolbar fixed dark color="primary">
                <v-btn icon dark @click="showRecap = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Rekap</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn flat @click="syncRecap">
                        <v-icon left :class="{rotating: sync}">sync</v-icon>
                        <span class="text-capitalize">Sinkronkan Rekap</span>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-content style="margin-top: 50px">
                <v-layout column class="pa-4">
                    <h3>Intro</h3>
                    <p class="mb-4">Rekap ujian tugas akhir yang berjudul <b>{{exam.ujian.skripsi.judul}}</b> pada <b>{{ today }}</b> di <b>{{ room }}</b> dengan mahasiswa <b>{{ mahasiswa }}</b>.</p>
                    <h3>Rekap Penilaian</h3>
                    <!-- <v-layout style="overflow-x: scroll">
                        <table class="recap-table">
                            <tr class="text-xs-center">
                                <td rowspan="2">Dosen</td>
                                <td :colspan="exam.ujian.skripsi.mahasiswa.length">Nilai</td>
                            </tr>
                            <tr class="text-xs-center">
                                <td v-for="mahasiswa in exam.ujian.skripsi.mahasiswa" :key="mahasiswa.nim" v-text="mahasiswa.nama"></td>
                            </tr>
                            <tr v-for="dosen in exam.ujian.penguji" :key="dosen.nip">
                                <td v-text="dosen.dosen"></td>
                                <td>99</td>
                                <td>97</td>
                                <td>89</td>
                            </tr>
                            <tr>
                                <td><b>Total</b></td>
                                <td>{{ 99 * 6}}</td>
                                <td>{{ 87 * 6}}</td>
                                <td>{{ 89 * 6}}</td>
                            </tr>
                            <tr>
                                <td><b>Rerata</b></td>
                                <td>99</td>
                                <td>87</td>
                                <td>89</td>
                            </tr>
                        </table>
                    </v-layout> -->
                    <h3 class="mt-4">Rekap Komentar</h3>
                    <table class="recap-table">

                    </table>
                </v-layout>
            </v-content>
        </v-dialog>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import moment from 'moment'
import socs from './socs'
export default {
    data() {
        return {
            exam: {},
            sync: false,
            selectedSO: 0,
            hasRevision: false,
            revisionTemp: {
                revisi: false,
                konten: null
            },
            revision: {
                revisi: false,
                konten: null
            },
            gradeTemp: {
                so_id: 0,
                grades: []
            },
            grades: [],
            socs: socs,
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
                komentar: '',
                halaman: '',
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
            validGrades: true,
            step: 0,
            showRecap: false,
            recap: {},
            fetchingComments: false, 
            errorFetchingComments: false,
            saving: false
        }
    },

    watch: {
        selectedBab(val) {
            return this.newCorrection.index = this.bab.indexOf(val)
        }
    },

    computed: {
        isLeader() {
            return this.$store.state.auth.user.id == this.exam.ujian.skripsi.pembimbing_satu
        },

        mobileAndShow() {
            return Number(this.windowWidth <= 1000) && this.drawer
        },

        revisionHasChanged() {
            return this.revision.revisi !== this.revisionTemp.revisi || this.revision.konten !== this.revisionTemp.konten
        },

        title() {
            return this.step == 0 ? 'Lembar Koreksi'
                : this.step == 1 ? 'Lembar Penilaian SO'
                : 'Lembar Revisi'
        },

        correctionFilled() {
            let filled = false
            this.corrections.forEach(correction => correction && correction.items.length > 0 ? filled = true : null)
            return filled
        },

        gradeIndicator() {
            return function(grade) {
                if (grade) {
                    let indicator = ''
                    if (grade >= 0 && grade < 50) indicator = 'Unsatisfactory'
                    else if (grade >= 50 && grade < 75) indicator = 'Adequate'
                    else if (grade >= 75 && grade < 85) indicator = 'Satisfactory'
                    else if (grade >= 85 && grade <= 100) indicator = 'Excelent'
                    return indicator
                }
                return ''
            }
        },

        today() {
            moment.locale('id')
            return moment().format('DD MMMM YYYY')
        },

        room() {
            if (this.exam.ujian) {
                if (this.exam.ujian.ruang.toLowerCase().includes('ruang')) return this.exam.ujian.ruang
                else return 'Ruang ' + this.exam.ujian.ruang
            }
            return ''
        },

        mahasiswa() {
            if (this.exam.ujian) {
                const listMahasiswa = this.exam.ujian.skripsi.mahasiswa.map(mhs => mhs.nama)
                return listMahasiswa.join(', ')
            } 
            return ''
        }
    },

    methods: {
        ...mapActions(['showSnackbar']),

        async syncRecap() {
            this.sync = true
            try {
                const response = await this.$thessa.getExamRecap(this.$router.currentRoute.params.id)
                this.recap = response.data
                this.sync = false
            } catch (error) {
                this.showSnackbar(error)
                this.sync = false
            }
        },

        async fetchRecap() {
            this.showRecap = true
            try {
                await this.syncRecap()
            } catch (error) {
                this.showSnackbar(error)
            }
        },

        nextStep() {
            this.step += 1
        },

        addGrades(index) {
            this.validGrades = true
            let grades = []
            this.grades.forEach((mhs,i) => mhs.grades[index] && mhs.grades[index].nilai ? grades.splice(i, 1, mhs.grades[index].nilai) : null)
            this.addingGrade = true
            this.gradeTemp = {
                so_id: index,
                grades
            }
        },

        discardGrades() {
            this.addingGrade = false
            this.gradeTemp = {
                so_id: 0,
                grades: []
            }
            this.validGrades = true
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

        async saveGrades() {
            const { so_id, grades } = this.gradeTemp
            this.saving = true
            let tempGrades = JSON.parse(JSON.stringify(this.grades))
            this.exam.ujian.skripsi.mahasiswa.forEach((mahasiswa, i) => {
                tempGrades[i].grades.splice(so_id, 1, {so_id, nilai: grades[i]})
            })
            try {
                const response = await this.$thessa.submitGrades(this.$router.currentRoute.params.id, tempGrades)
                this.grades = response.data.result
                this.saving = false
            } catch (error) {
                this.showSnackbar(error)
                this.saving = false
            }
            this.discardGrades()
        },

        generateGrades() {
            let grades = this.exam.ujian.skripsi.mahasiswa.map(({ id }) => {
                return {
                    mahasiswa: id,
                    grades: Array.from(Array(this.socs.length), (_, index) => {return {so_id: index, nilai: null}})
                }
            })
            this.grades = grades
        },

        async fetchExam() {
            try {
                const res = await this.$thessa.getExamById(this.$router.currentRoute.params.id)
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
            const { halaman, komentar, bab, id } = this.corrections[section].items[index]
            this.temp = {edit: true, text: komentar, page: halaman, index, selectedBab: this.bab[section], section}
            this.newCorrection = {...this.newCorrection, komentar, halaman, bab, id }
            this.itemIndex = index
            this.selectedBab = this.bab[bab]
            this.creating = true
        },

        async saveChanges() {
            const validInput = this.$refs['add-correction-form'].validate()
            if(validInput) {
                this.saving = true
                try {
                    const {id, halaman, komentar, bab} = this.newCorrection
                    const comments = await this.$thessa.getExamComments(this.$router.currentRoute.params.id)
                    this.constructComment(comments.data)
                    this.resetNewCorrection()
                    this.saving = false
                } catch (error) {
                    this.showSnackbar(error)
                    this.saving = false
                }
            }
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
            this.valid = true
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
            this.newCorrection = {halaman: '', komentar: '', index: 0}
            this.temp = {edit: false, komentar: '', halaman: '', index: 0, selectedBab: null, section: 0}
            this.itemIndex = 0
            this.creating = false
            this.selectedBab = null
        },

        sortCorrections(section) {
            this.corrections.forEach(correction => correction.items.sort((a, b) => (a.page > b.page) ? 1 : -1)) 
        },

        async addCorrection() {
            const validInput = this.$refs['add-correction-form'].validate()
            if (validInput) {
                this.saving = true
                try {
                    const { halaman, komentar, index } = this.newCorrection
                    const comments = await this.$thessa.submitComments(this.$router.currentRoute.params.id, {bab: index, halaman, komentar})
                    this.constructComment(comments.data)
                    this.corrections[index].items.sort((a, b) => (a.page > b.page) ? 1 : -1)
                    this.updateLocalStorage()
                    this.resetNewCorrection()
                    this.saving = false
                } catch (error) {
                    this.showSnackbar(error)
                    this.saving = false
                }
            }
        },

        async addRevision() {
            this.saving = true
            try {
                const response = await this.$thessa.submitRevision(this.$router.currentRoute.params.id, {revisi: this.revisionTemp.revisi, konten: this.revisionTemp.revisi ? this.revisionTemp.konten : ''})
                const result = response.data.result
                this.revision = result
                this.revisionTemp = result
                this.saving = false
            } catch (error) {
                this.showSnackbar(error)
                this.saving = false
            }
        },

        resetRevision() {
            const {revisi, konten} = this.revision
            this.revisionTemp = {
                revisi,
                konten
            }
        },

        constructComment(comments) {
            if (!this.errorFetchingComments) {
                this.corrections = []
                this.generateCorrectionsTemplate()
                comments.forEach(comment => {
                    this.corrections[comment.bab].items.push(comment)
                })
            }
        },

        async fetchComments() {
            this.fetchingComments = true
            try {
                const comments = await this.$thessa.getExamComments(this.$router.currentRoute.params.id)
                this.fetchingComments = false
                this.errorFetchingComments = false
                this.constructComment(comments.data)
            } catch (error) {
                this.errorFetchingComments = true
                this.fetchingComments = false
                this.showSnackbar(error)
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
            this.fetchComments()
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

<style>
    @keyframes rotating {
        from {
            transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
        }
	}
    @-webkit-keyframes rotating {
        from {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
        }
	}
    .rotating {
        -webkit-animation: rotating 1s linear infinite;
        -moz-animation: rotating 1s linear infinite;
        -ms-animation: rotating 1s linear infinite;
        -o-animation: rotating 1s linear infinite;
        animation: rotating 1s linear infinite;
	}
</style>


<style lang="sass">
    .full
        min-height: 100vh
    
    td 
        vertical-align: middle
    
    .v-dialog--fullscreen
        background-color: white
    
    .recap-table,.recap-table td
            border: 1px solid black
            border-collapse: collapse

    .recap-table
        td
            padding: 4px
    
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