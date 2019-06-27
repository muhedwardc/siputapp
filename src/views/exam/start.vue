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
                <v-spacer></v-spacer>
                <v-btn class="white red--text text-uppercase" @click="fetchRecap"><b>Selesai</b></v-btn>
            </v-toolbar>
            <v-tabs
                v-model="step"
                color="white"
                grow
                class="outline-tab"
                >
                <v-tabs-slider color="primary"></v-tabs-slider>
                <v-tab>Komentar</v-tab>
                <v-tab>Penilaian</v-tab>
                <v-tab v-if="isLeader">Revisi Judul</v-tab>
            </v-tabs>
            <v-tabs-items v-model="step">
                <v-tab-item class="tab-container">
                    <v-layout column style="position: relative;">
                        <v-slide-y-reverse-transition>
                            <v-layout column class="pt-2" v-show="creating" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: white; z-index: 4">
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
                                            <h3 class="mb-1 grey--text" v-text="bab[section]"></h3>
                                            <v-layout class="correction-item mb-2 pa-2" column v-for="(item, index) in correction.items" :key="index">
                                                <p class="mb-0" v-text="item.komentar"></p>
                                                <v-layout row align-center>
                                                    <span class="font-weight-bold" style="color: #9C9C9C">Halaman {{item.halaman}}</span>
                                                    <v-spacer></v-spacer>
                                                    <v-btn icon flat :ripple="false" @click="editCorrection(section, index)">
                                                        <v-icon class="seconday--text" small>edit</v-icon>
                                                    </v-btn>
                                                    <v-btn icon flat :ripple="false" @click="showDialog(section, index)">
                                                        <v-icon class="secondary--text" small>delete</v-icon>
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
                </v-tab-item>
                <v-tab-item class="tab-container">
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
                    <v-layout column class="pa-4" v-show="addingGrade" style="width: 100%; min-height: 100%; position: absolute; top: 0; left: 0; background-color: white; z-index: 10">
                        <v-layout column>
                            <b>{{ socs[gradeTemp.so-1].name }}</b>
                            <p class="mb-1">{{ socs[gradeTemp.so-1].description }}</p>
                            <v-form v-model="validGrades">
                                <table class="mt-2 grade-list">
                                    <template v-for="(mahasiswa, index) in exam.ujian.skripsi.mahasiswa">
                                        <div :key="mahasiswa.nim">
                                            <tr>
                                                <td v-text="mahasiswa.nama" colspan="2"></td>
                                            </tr>
                                            <tr>
                                                <td><v-text-field :disabled="saving" :rules="[v => !isNaN(v) && v <= 100 && v >= 0 || 'Angka 0 - 100']" type="number" class="grade" min="0" max="100" placeholder="ex. 85" solo v-model="gradeTemp.daftar_nilai[index]"></v-text-field></td>
                                                <td class="pb-4 pl-2"><b v-text="gradeIndicator(gradeTemp.daftar_nilai[index])"></b></td>
                                            </tr>
                                        </div>
                                    </template>
                                </table>
                            </v-form>
                            <v-layout column>
                                <v-layout wrap>
                                    <v-spacer></v-spacer>
                                    <v-btn class="error" @click="discardGrades" :disabled="saving">Batal</v-btn>
                                    <v-btn class="success" @click="saveGrades" :loading="saving">simpan</v-btn>
                                </v-layout>
                                <v-layout column>
                                    <b class="mt-2">Indikator Penilaian</b>
                                    <v-layout v-for="(list, i) in socs[selectedSO].indicators" :key="i" style="display: block;" column>
                                        <b>{{ gradeIndicators[i] }}</b>
                                        <ul>
                                            <li v-for="(indicator, index) in list" :key="index" v-text="indicator"></li>
                                        </ul>
                                    </v-layout>
                                </v-layout>
                            </v-layout>
                        </v-layout>
                    </v-layout>
                </v-tab-item>
                <v-tab-item class="tab-container" v-if="isLeader">
                    <h3 class="font-weight-medium">Apakah ada revisi judul?</h3>
                    <p class="font-weight-medium ma-0" v-text="'Judul: ' + exam.ujian.skripsi.judul"></p>
                    <v-radio-group class="pa-0 mt-2" v-model="revisionTemp.revisi" :mandatory="false">
                        <v-radio color="primary" label="Tidak ada revisi judul" :value="false"></v-radio>
                        <v-radio color="primary" label="Ada, revisi judulnya:" :value="true"></v-radio>
                    </v-radio-group>
                    <p>Masukkan revisi judul</p>
                    <v-textarea :disabled="!revisionTemp.revisi" box v-model="revisionTemp.konten"></v-textarea>
                    <v-layout>
                        <v-spacer></v-spacer>
                        <v-btn v-show="revisionHasChanged" class="default ma-0 mr-2" :disabled="saving" @click="resetRevision">hapus perubahan</v-btn>
                        <v-btn v-show="revisionHasChanged" class="success ma-0" :loading="saving" @click="addRevision">simpan revisi</v-btn>
                    </v-layout>
                </v-tab-item>
            </v-tabs-items>
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
            <object data='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' id="exam-content-view">
                <v-layout column align-center justify-center style="height: 100%">
                    <h1>Maaf,</h1>
                    <p class="ma-0 mt-2 mb-2">Peramban Anda tidak mendukung penampilan PDF</p>
                    <v-btn class="primary">
                        <a class="white--text text-capitalize" target="_blank" href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">lihat naskah</a>
                    </v-btn>
                    <!-- <p class="mb-4"><a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">Unduh Naskah</a></p> -->
                </v-layout>
            </object>
            <!-- <embed :src="'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'" id="exam-content-view"> -->
            <!-- <embed :src="'https://drive.google.com/viewerng/viewer?embedded=true&url=https://www.otago.ac.nz/library/pdf/Google_searching.pdf'" id="exam-content-view"> -->
            <!-- <iframe :src="this.exam.ujian.skripsi.naskah.replace('/media/', '/uploads/')" id="exam-content-view"></iframe> -->
            <v-layout v-if="!drawer" row class="toggle-button">
                <v-btn @click="toggleCorrectionSection()" class="pa-2 flat primary text-capitalize">
                    Borang Penilaian
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
                        <span class="text-capitalize">Perbarui Rekap</span>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-content style="margin-top: 50px; width: 100%;" class="pa-0">
                <v-layout column class="pa-4" style="width: 100%;">
                    <h3 class="mb-2">INFORMASI UJIAN</h3>
                    <template v-if="recap">
                        <p class="mb-0" v-text="recap.rekap_ujian.skripsi.judul"></p>
                        <v-layout align-center class="mt-2"><v-icon class="mr-2">schedule</v-icon> {{today}}</v-layout>
                        <v-layout align-center class="mt-2"><v-icon class="mr-2">event</v-icon> {{recap.rekap_ujian.sesi}}</v-layout>
                        <v-layout align-center class="mt-2"><v-icon class="mr-2">location_on</v-icon> {{recap.rekap_ujian.ruang}}</v-layout>
                        <v-layout align-center class="mt-2"><v-icon class="mr-2">person</v-icon> {{mahasiswa}}</v-layout>
                    </template>
                    <hr class="mt-4 mb-4">
                    <h3 class="mb-2">REKAP PENILAIAN UJIAN TUGAS AKHIR</h3>
                    <div class="recap-table v-table__overflow">
                        <table class="v-datatable v-table theme--light" v-if="recap">
                            <tr class="text-xs-center">
                                <td rowspan="2">Dosen</td>
                                <td :colspan="recap.rekap_ujian.skripsi.mahasiswa.length">Nilai</td>
                                <td rowspan="2">Keterangan</td>
                            </tr>
                            <tr class="text-xs-center">
                                <td class="mahasiswa-cell" v-for="(nilai, i) in recap.rekap_nilai" :key="i" v-text="nilai.mahasiswa"></td>
                            </tr>
                            <tr v-for="(penguji, i) in recap.rekap_ujian.penguji" :key="i" :class="penguji.dosen == $store.state.auth.user.nama ? 'success lighten-4' : ''">
                                <td class="dosen-cell" v-text="penguji.dosen"></td>
                                <td v-for="(mahasiswa, j) in recap.rekap_nilai" :key="j">{{ mahasiswa.nilai[i].rerata ? mahasiswa.nilai[i].rerata : 0 }}</td>
                                <td >Keterangan</td>
                            </tr>
                            <tr>
                                <td><b>Total</b></td>
                                <td v-for="(mahasiswa, i) in recap.rekap_nilai" :key="i" v-text="mahasiswa.jumlah_rerata"></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><b>Rerata</b></td>
                                <td class="font-weight-bold" v-for="(mahasiswa, i) in recap.rekap_nilai" :key="i" v-text="mahasiswa.rerata_total"></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><b>Konversi</b></td>
                                <td class="font-weight-bold" v-for="(mahasiswa, i) in recap.rekap_nilai" :key="i" v-text="convertGrade(mahasiswa.rerata_total)"></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    <h3 class="mt-4">REKAP KOMENTAR</h3>
                    <table class="recap-table">

                    </table>
                    <v-layout class="end-exam" wrap>
                        <p class="red--text font-weight-bold ma-0"><i>Pastikan semua nilai dan komentar sudah benar, tepat, serta sudah disetujui oleh semua penguji.<br>Seluruh hasil ujian akan disimpan dan tidak dapat diubah ketika sudah menekan tombol SELESAI.</i></p>
                        <v-spacer></v-spacer>
                        <v-layout class="pa-0">
                            <v-spacer></v-spacer>
                            <v-btn color="primary">SELESAI</v-btn>
                        </v-layout>
                    </v-layout>
                </v-layout>
            </v-content>
        </v-dialog>
        <v-dialog></v-dialog>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import moment from 'moment'
import socs from './socs'
import { POINT_CONVERSION_COMPRESSED } from 'constants';
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
                so: 1,
                daftar_nilai: []
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
            recap: null,
            fetchingComments: false, 
            errorFetchingComments: false,
            fetchingGrades: false,
            errorFetchingGrades: false,
            fetchingGrades: false,
            errorFetchingGrades: false,
            fetchingRevision: false,
            errorFetchingRevision: false,
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
            if (this.exam.ujian) {
                return this.$store.state.auth.user.id == this.exam.ujian.skripsi.pembimbing_satu
            }

            return false
        },

        commentsRecapByBab() {
            // if (this.recap) {
            //     const { rekap_komentar } = this.recap
            //     let recapByBab = []
            //     for (let i = 0; i < rekap_komentar[0].komentar.length; i ++) {
            //         let recapByDosenByBab = []
            //         for (let j = 0; rekap_komentar.length; j++) {
            //             if (rekap_komentar[i].daftar_komentar.length) {
            //                 let commentsRecap = rekap_komentar[i].daftar_komentar.map(komentar => {
            //                     return {dosen: rekap_komentar[i].penguji, komentar}
            //                 })
            //                 recapByDosenByBab.push(...commentsRecap)
            //             }
            //         }
            //         recapByDosenByBab
            //     }
            // }
        },

        convertGrade() {
            return function(numGrade) {
                let grade = Number(numGrade)
                if (grade >= 84.6 && grade <= 100) return 'A'
                else if (grade >= 81.6 && grade < 84.6) return 'A-'
                else if (grade >= 79.6 && grade < 81.6) return 'A/B'
                else if (grade >= 75.6 && grade < 79.6) return 'B+'
                else if (grade >= 69.6 && grade < 75.6) return 'B'
                else if (grade >= 65.6 && grade < 69.6) return 'B-'
                else if (grade >= 59.6 && grade < 65.6) return 'B/C'
                else if (grade >= 54.6 && grade < 59.6) return 'C'
                else if (grade >= 0 && grade < 54.6) return 'D'
                return 'Tidak valid'
            }
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
            if (this.recap) {
                const listMahasiswa = this.recap.rekap_ujian.skripsi.mahasiswa.map(mhs => mhs.nama)
                return listMahasiswa.join(', ')
            } 
            return ''
        },

        filledGrades() {
            return function(i) {
                let filled = true
                this.grades.forEach(mhs => {
                    if (!(mhs.daftar_nilai[i] && mhs.daftar_nilai[i].nilai)) filled = false
                })
    
                if (filled) {
                    filled = [],
                    this.grades.forEach(mhs => {
                        filled.push(mhs.daftar_nilai[i].nilai)
                    })
    
                    filled = filled.join(', ')
                }
    
                return filled
            }
        },
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

        fillNullGrades(gradesByMahasiswa) {
            return gradesByMahasiswa.map(grades => {
                let socs = Array.from(Array(6), (_, index) => {return {so: index+1, nilai: null}})
                for (let i = 0; i < grades.daftar_nilai.length; i++) {
                    const so = grades.daftar_nilai[i].so
                    socs.splice(so-1, 1, grades.daftar_nilai[i])
                }
                let result = {
                    mahasiswa: grades.mahasiswa,
                    daftar_nilai: socs
                }
                return result
            })
        },

        async fetchGrades() {
            this.fetchingGrades = true
            try {
                const response = await this.$thessa.getExamGrades(this.$router.currentRoute.params.id)
                this.grades = this.fillNullGrades(response.data)
                this.fetchingGrades = true
                this.constructGrades(response.data)
            } catch (error) {
                this.errorFetchingGrades = true
                this.fetchGrades = false
                this.showSnackbar(error)
            }
        },

        async fetchExam() {
            try {
                const res = await this.$thessa.getExamById(this.$router.currentRoute.params.id)
                this.exam = res.data
                this.generateGrades()
                this.fetchComments()
                this.fetchGrades()
            } catch (error) {
                this.showSnackbar(error)
                this.$router.go(-1)
            }
        },

        async fetchRevision() {
            this.errorFetchingRevision = false
            try {
                const res = await this.$thessa.getExamRevision(this.$router.currentRoute.params.id)
                this.revisionTemp.revisi = res.data.revisi
                this.revisionTemp.konten = res.data.konten
                this.revision.revisi = res.data.revisi
                this.revision.konten = res.data.konten
            } catch (error) {
                this.errorFetchingRevision = true
            }
        },

        async saveGrades() {
            const { so, daftar_nilai } = this.gradeTemp
            this.saving = true
            let tempGrades = JSON.parse(JSON.stringify(this.grades))
            this.exam.ujian.skripsi.mahasiswa.forEach((mahasiswa, i) => {
                tempGrades[i].daftar_nilai.splice(so-1, 1, {so: so, nilai: Number(Number(daftar_nilai[i]).toFixed(2))})
            })
            try {
                const response = await this.$thessa.submitGrades(this.$router.currentRoute.params.id, tempGrades)
                this.grades = this.fillNullGrades(response.data.result)
                this.fetchGrades()
                this.saving = false
            } catch (error) {
                this.showSnackbar(error)
                this.saving = false
            }
            this.discardGrades()
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
                this.revision.revisi = result.revisi
                this.revision.konten = result.konten
                this.revisionTemp.revisi = result.revisi
                this.revisionTemp.konten = result.konten
                this.saving = false
                this.showSnackbar({type: 'success', message: 'Berhasil menambahkan revisi judul'})
            } catch (error) {
                this.showSnackbar(error)
                this.saving = false
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

        generateCorrectionsTemplate() {
            this.bab.map(bab => {
                this.corrections.push({
                    items: []
                })
            })
        },

        constructGrades(grades) {

        },

        nextStep() {
            this.step += 1
        },

        addGrades(index) {
            this.validGrades = true
            let daftar_nilai = []
            this.grades.forEach((mhs,i) => mhs.daftar_nilai[index] && mhs.daftar_nilai[index].nilai ? daftar_nilai.splice(i, 1, mhs.daftar_nilai[index].nilai) : null)
            this.addingGrade = true
            this.gradeTemp = {
                so: index+1,
                daftar_nilai
            }
        },

        discardGrades() {
            this.addingGrade = false
            this.gradeTemp = {
                so: 1,
                daftar_nilai: []
            }
            this.validGrades = true
        },

        generateGrades() {
            let grades = this.exam.ujian.skripsi.mahasiswa.map(({ id }) => {
                return {
                    mahasiswa: id,
                    daftar_nilai: Array.from(Array(this.socs.length), (_, index) => {return {so: index+1, nilai: null}})
                }
            })
            this.grades = grades
        },

        editCorrection(section, index) {
            const { halaman, komentar, bab, id } = this.corrections[section].items[index]
            this.temp = {edit: true, text: komentar, page: halaman, index, selectedBab: this.bab[section], section}
            this.newCorrection = {...this.newCorrection, komentar, halaman, bab, id }
            this.itemIndex = index
            this.selectedBab = this.bab[bab]
            this.creating = true
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
            const { halaman, komentar } = this.corrections[section].items[index]
            this.dialog = { show: true, section, index, text:komentar, page:halaman }
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

        resetRevision() {
            const {revisi, konten} = this.revision
            this.revisionTemp = {
                revisi,
                konten
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
        this.generateCorrectionsTemplate()
        this.getDrawerWidth()
        this.windowWidth <= 991 ? this.drawer = false : true
        window.addEventListener('resize', this.getDrawerWidth)

        if (this.$store.state.auth.token) {
            this.fetchExam()
            this.isLeader ? this.fetchRevision() : null
            this.syncRecap()
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

    .outline-tab
        .v-tabs__div
            border: 1px solid #ececec
            text-transform: capitalize

            .v-tabs__item.v-tabs__item--active
                color: #47ABF7

    .tab-container
        padding: 8px 12px 8px 12px

        .theme--light.v-label
            color: black
    
    .end-exam
        padding: 8px
        border-radius: 4px
        background: #EBEBEB
    
    .recap-table
        border-radius: 8px
        box-shadow: 1px 1px 20px 2px #dedede
        border-collapse: collapse
        width: 100%

        tr
            &:not(:last-of-type)
                border-bottom: 1px solid #a7a7a7;

            td
                padding: 12px 8px
                &:not(:first-of-type)
                    border-left: 1px solid #a7a7a7
                    // border-left: border-bottom: 1px solid #a7a7a7

        tr:last-child td:first-child
            border-bottom-left-radius: 10px

        tr:last-child td:last-child
            border-bottom-right-radius: 10px

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