<template>
    <v-layout column>
        <v-card flat class="pa-2 pl-3 pr-3 solid-container">
            <form-wizard
                @on-complete="onComplete"
                class="form-wizard"
                stepSize="sm"
                :startIndex="2"
                errorColor="#FF6666"
                color="#1996F5">
                <tab-content title="Informasi Ujian" :before-change="validateExamInfo" @on-validate="validateExamInfo">
                    <v-form
                        lazy-validation
                        ref="form1"
                        v-model="valid[0]">
                        <label>Tipe Ujian</label>
                        <v-radio-group class="exam-type" :rules="rules.isBool" :disabled="submitting" v-model="exam.skripsi.is_capstone">
                            <v-radio :value="false" label="Individu" color="primary"></v-radio>
                            <v-radio :value="true" label="Capstone" color="primary"></v-radio>
                        </v-radio-group>
                        
                        <label>Judul Ujian</label>
                        <v-text-field
                            v-model="exam.skripsi.judul"
                            required
                            solo
                            :disabled="submitting"
                            label="Judul Ujian"
                            :rules="rules.required"
                            ></v-text-field>
                        
                        <label>Intisari</label>
                        <v-textarea
                            v-model="exam.skripsi.intisari"
                            required
                            solo
                            :disabled="submitting"
                            label="Intisari"
                            :rules="rules.required"
                            ></v-textarea>
                        
                        <label>Tambahkan Naskah</label>
                        <v-layout row align-center wrap>
                            <v-btn
                                :disabled="uploadingScript"
                                :loading="uploadingScript"
                                @click='pickFile'
                                class="ma-0"
                                color="primary"
                            >
                                <v-icon left dark>attach_file</v-icon>
                                {{ pdfName ? 'Ubah Naskah' : 'Unggah Naskah'}}
                            </v-btn>
                            <template v-if="pdfName || uploadingScript">
                                <template v-if="uploadingScript">
                                    <v-progress-circular
                                        :value="$store.state.asyncProgress"
                                        :rotate="-90"
                                        color="primary"
                                        class="ml-2 mr-2"
                                        :size="30"
                                        >
                                        {{ $store.state.asyncProgress }}
                                    </v-progress-circular>
                                    <span>Sedang mengunggah ...</span>
                                </template>
                                <span v-else v-line-clamp:20="1" v-text="pdfName" class="pl-2"></span>
                                <v-btn @click="cancelUpload" class="ma-0" flat icon color="black">
                                    <v-icon>close</v-icon>
                                </v-btn>
                            </template>
                        </v-layout>
                        <span v-if="!pdfFile" class="error--text" style="font-size: 12px">Naskah tidak boleh kosong</span>
                        <input
                            type="file"
                            style="display: none"
                            ref="pdf"
                            readonly
                            :disabled="submitting"
                            solo
                            accept="application/pdf,application/vnd.ms-excel"
                            @change="onFilePicked"
                        >
                    </v-form>
                </tab-content>
                <tab-content title="Data Mahasiswa" :before-change="validateMahasiswa">
                    <v-layout column>
                        <v-form refs="formMahasiswa">
                            <v-form ref="form3" v-model="valid[2]" lazy-validation>
                                <div v-for="(mahasiswa, index) in exam.skripsi.mahasiswa" :key="index" class="mb-4">
                                    <v-layout row wrap align-center class="mb-2">
                                        <h3>Mahasiswa {{ index + 1 }}</h3>
                                        <v-btn color="error" v-if="index > 0" @click="openDialog(mahasiswa['nama'].trim().length > 0 ? mahasiswa['nama'] : 'Mahasiswa ' + (index + 1), index)">Hapus mahasiswa</v-btn>                                            
                                    </v-layout>
                                    <table class="mahasiswa-table">
                                        <tr>
                                            <td><label>Nama</label></td>
                                            <td>:</td>
                                            <td>
                                                <v-text-field
                                                    v-model="mahasiswa['nama']"
                                                    placeholder="Nama Mahasiswa"
                                                    required
                                                    :disabled="submitting"
                                                    :rules="rules.required"
                                                ></v-text-field>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label>NIM</label></td>
                                            <td>:</td>
                                            <td>
                                                <v-text-field
                                                    v-model="mahasiswa['nim']"
                                                    placeholder="NIM"
                                                    required
                                                    :disabled="submitting"
                                                    :rules="rules.required"
                                                ></v-text-field>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label>Prodi/Konsentrasi</label></td>
                                            <td>:</td>
                                            <td>
                                                <v-layout row wrap align-center>
                                                    <v-select
                                                        v-model="mahasiswa['prodi']"
                                                        @change="navigateKonsentrasi(index)"
                                                        :items="options[index].prodiOptions"
                                                        :rules="rules.required"
                                                        placeholder="Prodi"
                                                        required
                                                        :disabled="submitting"
                                                        ></v-select>
                                                    <span class="title ml-2 mr-2">/</span>
                                                    <v-select
                                                        v-model="mahasiswa['konsentrasi']"
                                                        :items="options[index].konsentrasiOptions[options[index].prodiSelected]"
                                                        :rules="rules.required"
                                                        placeholder="Konsentrasi"
                                                        :disabled="!mahasiswa['prodi'] || submitting"
                                                        ></v-select>
                                                </v-layout>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Tempat/Tanggal Lahir</label>
                                            </td>
                                            <td>:</td>
                                            <td>
                                                <v-layout align-center row wrap>
                                                    <v-text-field
                                                        v-model="mahasiswa['tempat_lahir']"
                                                        placeholder="Tempat lahir"
                                                        required
                                                        :rules="rules.required"
                                                        :disabled="submitting"
                                                    ></v-text-field>
                                                    <span class="title ml-2 mr-2">/</span>
                                                    <v-text-field
                                                        v-model="mahasiswa['tanggal_lahir']"
                                                        placeholder="DD-MM-YYYY"
                                                        prepend-icon="event"
                                                        :rules="[...rules.required, ...rules.date2]"
                                                        :disabled="submitting"
                                                        lazy-validation
                                                    ></v-text-field>
                                                </v-layout>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label>No. Telepon</label></td>
                                            <td>:</td>
                                            <td>
                                                <v-text-field
                                                    v-model="mahasiswa['telepon']"
                                                    placeholder="Nomor Telepon"
                                                    required
                                                    :disabled="submitting"
                                                    :rules="[...rules.required, ...rules.isNumber]"
                                                ></v-text-field>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </v-form>
                        </v-form>
                    </v-layout>
                    <p class="error--text mb-0" v-if="exam.skripsi.is_capstone && exam.skripsi.mahasiswa.length <= 1">Jumlah mahasiswa untuk capstone harus lebih dari satu.</p>
                    <v-btn class="ml-0 text-capitalize font-weight bold" style="letter-spacing: .5px" @click="addMahasiswa" color="primary" v-if="exam.skripsi.is_capstone && exam.skripsi.mahasiswa.length < 4"><v-icon small left>add</v-icon> tambah mahasiswa</v-btn>
                </tab-content>
                <tab-content title="Pilih Ruangan" :before-change="validateRoomSession">
                    <v-form ref="form2" v-model="valid[1]" lazy-validation>
                    <v-menu
                        v-model="dateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        solo
                        :disabled="submitting"
                        min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="exam.tanggal"
                                :rules="[...rules.required, ...rules.date]"
                                readonly
                                placeholder="Pilih Tanggal Ujian"
                                prepend-icon="event "
                                :disabled="submitting"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker :disabled="submitting" @input="getThisDayExams(exam.tanggal)" v-model="exam.tanggal"></v-date-picker>
                    </v-menu>
                    <template v-if="exam.tanggal">
                        <a @click="getThisDayExams(exam.tanggal)" v-if="errorFetchingSpecificExams" class="error--text">Terjadi kesalahan saat memuat ujian, tekan untuk memuat ulang</a>
                        <v-container class="pa-0" grid-list-md v-else-if="thisDayExams.length && !errorFetchingSpecificExams">
                            <p class="mb-1">Daftar ujian ditanggal {{exam.tanggal}}</p>
                            <v-layout row wrap>
                                <v-chip v-for="e in thisDayExams" :key="e.id" label class="ml-2 mr-2">{{ e.ruang + ', ' + e.sesi }}</v-chip>
                            </v-layout>
                        </v-container>
                        <p v-else-if="!errorFetchingSpecificExams && !thisDayExams.length">Tidak ada ujian untuk tanggal {{exam.tanggal}}</p>
                    </template>
                    <v-container class="no-h-padding" grid-list-md>
                        <p class="mb-0">Pilih ruangan dan sesi ujian</p>
                        <a class="error--text" @click="fetchRoomSessions" v-if="errorFetchRoomSessions">Terdapat masalah dalam memuat ruangan dan sesi, tekan untuk memuat ulang</a>
                        <v-layout justify-center v-if="loadingRoomSessions">
                            <v-progress-circular
                                indeterminate
                                color="purple"
                                ></v-progress-circular>
                        </v-layout>
                        <v-layout v-else-if="!loadingRoomSessions && !errorFetchRoomSessions" row wrap>
                            <v-flex xs12 sm4>
                                <v-select
                                    :items="rooms"
                                    v-model="exam.ruang"
                                    item-value="id"
                                    placeholder="Ruangan"
                                    item-text="nama"
                                    :rules="[v => !!v || 'Bidang isian harus diisi']"
                                    :disabled="submitting || !exam.tanggal"
                                    ></v-select>
                            </v-flex>
                            <v-flex xs12 sm4>
                                <v-select
                                    :items="sessions"
                                    v-model="exam.sesi"
                                    item-value="id"
                                    placeholder="Sesi"
                                    :rules="[v => !!v || 'Bidang isian harus diisi']"
                                    :disabled="submitting || !exam.tanggal"
                                    >
                                    <template slot="selection" slot-scope="data">
                                        {{ data.item.mulai }} - {{ data.item.selesai }}
                                    </template>
                                    <template slot="item" slot-scope="data">
                                        {{ data.item.mulai }} - {{ data.item.selesai }}
                                    </template>
                                </v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    </v-form>
                </tab-content>
                <tab-content title="Dosen Penguji" :before-change="validateDosen">
                    <v-form ref="form4" lazy-validation v-model="valid[3]">
                    <v-layout row align-center wrap>
                        <h3>Pilih Dosen Pembimbing dan Penguji</h3>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Cari Dosen"
                            :disabled="submitting"
                            single-line
                            hide-details
                            class="pt-0"
                        ></v-text-field>
                    </v-layout>
                    <v-layout row wrap justify-space-between>
                        <v-layout column>
                            <p class="mt-2 mb-0">Dosen terpilih: <span v-text="dosenStr"></span></p>
                            <p v-if="dosenValidation" class="ma-0 error--text">{{ dosenValidation }}</p>
                        </v-layout>
                        <v-btn class="primary ma-0 mb-2 mt-2 text-capitalize" @click="filterDosen = !filterDosen" :loading="loadingDosen"><v-icon left>filter_list</v-icon>{{ !filterDosen ? 'Filter Dosen yang Tersedia' : 'Semua Dosen'}}</v-btn>
                    </v-layout>
                    <v-data-table
                        :headers="dosenHeaders"
                        :items="filteredDosen"
                        :search="search"
                        :pagination.sync="pagination"
                        :total-items="totalItems"
                        :rows-per-page-items="pagination.rowsPerPageItems"
                        :loading="loadingDosen">
                        <template v-slot:items="props">
                            <td>{{ props.item.nama || props.item.email }}</td>
                            <td>{{ props.item.konsentrasi || props.item.prodi }}</td>
                            <td>
                                <v-menu
                                    bottom
                                    origin="center center"
                                    transition="scale-transition"
                                    v-if="!submitting"
                                    >
                                    <template v-if="props.item.selectedType == null" v-slot:activator="{ on }">
                                        <v-btn small fab class="primary" v-on="on">
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                    </template>
                                    <template v-else v-slot:activator="{ on }">
                                        <v-btn v-on="on" color="success">
                                            {{ props.item.selectedType }}
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-tile
                                            v-for="(type, i) in dosenTypes"
                                            :key="i"
                                            @click="setType(i, props.item.id)"
                                            >
                                            <v-list-tile-title v-if="i === 3"><v-icon color="error">delete</v-icon><span class="error--text">{{ type }}</span></v-list-tile-title>
                                            <v-list-tile-title v-else-if="i === 2">
                                                <v-layout align-center>
                                                    {{ type }}
                                                    <span class="ml-2 success white--text" style="display: flex; justify-content: center; align-items: center; width: 22px; height: 22px; border-radius: 50%;">{{ selectedPenguji.length - 2 }}</span>
                                                </v-layout>
                                            </v-list-tile-title>
                                            <v-list-tile-title v-else>{{ type }} <v-icon v-if="isSelected(i)" color="success">check</v-icon></v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </td>
                        </template>
                        <template v-slot:no-data>
                            <v-layout align-center pa-2 justify-center>
                                Tidak ada data yang ditampilkan
                            </v-layout>
                        </template>
                    </v-data-table>
                    </v-form>
                </tab-content>
                <template slot="footer" slot-scope="props">
                    <div class="wizard-footer-left">
                        <wizard-button :disabled="submitting" v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" :style="props.fillButtonStyle">Kembali</wizard-button>
                    </div>
                    <div class="wizard-footer-right">
                        <wizard-button :disabled="submitting" :loading="props.activeTabIndex == 2 ? loadingDosen : false" v-if="!props.isLastStep" @click.native="props.activeTabIndex == 2 ? fetchDosen(props.nextTab, `&date=${exam.tanggal}&session=${exam.sesi}`) : props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Lanjut</wizard-button>
                        <v-layout column align-end v-else>
                            <wizard-button v-if="!submitting" :disabled="submitting" @click.native="createExam" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">  {{props.isLastStep ? 'Simpan' : 'Lanjut'}}</wizard-button>
                            <v-layout row align-center v-else>
                                <span>sedang menyimpan</span>
                                <v-progress-circular
                                    class="ml-2"
                                    indeterminate
                                    color="primary"
                                    size="20"
                                    ></v-progress-circular>
                            </v-layout>
                        </v-layout>
                    </div>
                </template>
            </form-wizard>
        </v-card>
        <v-dialog
            v-model="dialog.show"
            max-width="300">
        <v-card>
            <v-card-text>
                Anda ingin menghapus data mahasiswa <b>{{ dialog.name }}</b>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="closeDialog()">
                    Tidak
                </v-btn>
                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="deleteMahasiswa(dialog.index)">
                    Ya
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { FormWizard, TabContent, WizardButton } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import departement from '@/documents/partials/departement'
import moment from 'moment'

export default {
    data() {
        return {
            exam: {
                tanggal: null,
                sesi: null,
                ruang: null,
                penguji: [],
                skripsi: {
                    judul: '',
                    intisari: '',
                    pembimbing_satu: null,
                    pembimbing_dua: null,
                    is_capstone: false,
                    mahasiswa: [{}],
                    naskah: null
                },
            },
            totalItems: 0,
            pagination: {
                page: 1,
                rowsPerPage: 10,
                rowsPerPageItems: [10],
                current: 1,
                links: {}
            },
            errorFetchRoomSessions: false,
            errorFetchingSpecificExams: false,
            tanggal_dialog: false,
            loadingRoomSessions: true,
            loadingThisDayExams: true,
            uploadingScript: false,
            uploadingScriptProgress: null,
            thisDayExams: [],
            rooms: [],
            sessions: [],
            options: [
                {
                    prodiOptions: null,
                    prodiSelected: 0,
                    konsentrasiOptions: null,
                    dateDialog: false
                }
            ],
            prodiList: null,
            konsentrasiList: null,
            indexItem: null,
            search: '',
            loadingDosen: false,
            dosen: [],
            selectedPenguji: [null, null],
            dosenHeaders: [
                { text: 'Nama', align: 'left', value: 'nama' },
                { text: 'Konsentrasi', align: 'left', value: 'konsentrasi' },
                { text: 'Aksi', align: 'left', sortable: false, value: 'selectedType', width: '200px' }
            ],
            dosenTypes: [
                'Pembimbing 1',
                'Pembimbing 2',
                'Penguji',
                'Hapus'
            ],
            valid: true,
            mhsValid: true,
            dateMenu: false,
            timeMenu: false,
            checkbox: false,
            pdfName: null,
            pdfUrl: null,
            pdfFile: null,
            dialog: {
                show: false,
                name: '',
                index: null
            },
            submitting: false,
            valid: [true, true, true, true],
            rules: {
                required: [v => (!!v && !!v.trim()) || 'Bidang isian harus diisi'],
                requireSelect: [v => !!v || 'Bidang isian harus diisi'],
                isBool: [v => (v == false || v == true) || 'Bidang isian ujian harus diisi'],
                is_capstone: [v => (v == false || v == true) || 'Tipe ujian harus diisi'],
                isNumber: [v => !isNaN(v) || 'Hanya dapat berisi angka'],
                date: [v => /^[1-9][0-9]{3}-[0-9]{2}-[0-9]{2}$/g.test(v) || 'Tanggal format YYYY-MM-DD'],
                date2: [v => /^[0-9]{2}-[0-9]{2}-[1-9][0-9]{3}$/g.test(v) || 'Tanggal format DD-MM-YYYY'],
            },
            dosenStr: 'belum dipilih',
            dosenWithFilter: [],
            filterDosen: false
        }
    },

    components: {
        FormWizard,
        TabContent,
        WizardButton
    },

    computed: {
        dosenValidation() {
            let errors = []
            if (this.exam.skripsi.pembimbing_satu == null) errors.push('Pembimbing satu belum dipilih')
            if (this.exam.skripsi.pembimbing_dua == null) errors.push('Pembimbing dua belum dipilih')
            if (this.exam.penguji.length == 0 && !this.exam.penguji[0]) errors.push('Penguji belum dipilih')
            if (errors.length > 0) return errors.join(', ')
            return false
        },

        filteredDosen() {
            return this.filterDosen ? this.dosenWithFilter : this.dosen
        }
    },

    methods: {
        validateExamInfo() {
            return this.$refs.form1.validate() && !!this.exam.skripsi.naskah
        },
        validateRoomSession() {
            return this.$refs.form2.validate()
        },
        validateMahasiswa(add = false) {
            if (!add) {
                if (this.exam.skripsi.is_capstone) {
                    return this.$refs.form3.validate() && this.exam.skripsi.mahasiswa.length > 1
                }
                return this.$refs.form3.validate()
            } else {
                return this.$refs.form3.validate()
            }
        },
        validateDosen() {
            return this.$refs.form4.validate()
        },
        navigateKonsentrasi(index) {
            const i = this.options[index].prodiOptions.findIndex(el => el == this.exam.skripsi.mahasiswa[index].prodi)
            this.options[index].prodiSelected = i
        },
        cleanArr() {
            const cleanedArr = this.selectedPenguji
            const penguji = []
            this.exam.skripsi.pembimbing_satu = cleanedArr[0]
            this.exam.skripsi.pembimbing_dua = cleanedArr[1]
            for (var i = 2; i < cleanedArr.length; i++) {
                if (cleanedArr[i] == null) {         
                    cleanedArr.splice(i, 1);
                    i--;
                } else {
                    penguji.push({
                        dosen: cleanedArr[i]
                    })
                }
            }
            this.exam.penguji = penguji
            return this.selectedPenguji = cleanedArr
        },
        deleteRole(id) {
            this.selectedPenguji[this.selectedPenguji.indexOf(id)] = null
            const index = this.dosen.findIndex(dosen => id == dosen.id)
            const { email, nama } = this.dosen[index]
            delete this.dosen[index].selectedType
            this.dosen[index].selectedType = null
            this.dosen[index]['email'] = 'updating' 
            this.dosen[index]['nama'] = 'updating'
            this.dosen[index]['email'] = email
            this.dosen[index]['nama'] = nama
        },
        setType(i, dosenId){
            if (i == 3) {
                this.deleteRole(dosenId)
            }
            else if (i == 2) {
                const foundIndex = this.selectedPenguji.indexOf(dosenId)
                const selectedIndex = this.dosen.findIndex(dosen => dosenId == dosen.id)
                if (foundIndex !== -1) {
                    const foundId = this.selectedPenguji[foundIndex]
                    const index = this.dosen.findIndex(dosen => foundId == dosen.id)
                    this.selectedPenguji[foundIndex] = null
                    const { email, nama } = this.dosen[index]
                    delete this.dosen[index].selectedType
                    this.selectedPenguji.push(dosenId)
                    this.dosen[index].selectedType = this.dosenTypes[i]
                    this.dosen[index]['email'] = 'updating' 
                    this.dosen[index]['nama'] = 'updating'
                    this.dosen[index]['email'] = email
                    this.dosen[index]['nama'] = nama
                } else {
                    this.selectedPenguji.push(dosenId)
                    const index = this.dosen.findIndex(dosen => dosenId == dosen.id)
                    const { email, nama } = this.dosen[index]
                    if (index !== -1) {
                        this.dosen[index]['selectedType'] = this.dosenTypes[i]
                        this.dosen[index]['email'] = 'updating'
                        this.dosen[index]['nama'] = 'updating'
                        this.dosen[index]['email'] = email
                        this.dosen[index]['nama'] = nama
                    }
                }
            } else {
                const index = this.dosen.findIndex(dosen => this.selectedPenguji[i] == dosen.id)
                this.selectedPenguji[this.selectedPenguji.indexOf(dosenId)] = null
                if (index !== -1) {
                    this.selectedPenguji[i] = null
                    delete this.dosen[index].selectedType
                }
                const id = this.dosen.findIndex(dosen => dosen.id == dosenId)
                const { email, nama } = this.dosen[id]
                this.selectedPenguji[i] = dosenId
                this.dosen[id].selectedType = this.dosenTypes[i]
                this.dosen[id]['email'] = 'updating'
                this.dosen[id]['nama'] = 'updating'
                this.dosen[id]['email'] = email
                this.dosen[id]['nama'] = nama
                this.selectedPenguji[i] = dosenId
            }
            this.cleanArr()
            this.dosenStr = this.checkDosen()
        },
        checkDosen() {
            if (this.dosen.length) {
                let arr = []
                this.selectedPenguji.forEach(id => {
                    if (id !== null) {
                        arr.push(this.dosen.find(e => e.id == id).nama)
                    } else {
                        arr.push('belum dipilih')
                    }
                })

                this.selectedPenguji.length <= 2 ? arr.push('penguji belum dipilih') : null
                return arr.join(', ')
            }

            return 'belum dipilih'
        },
        isSelected(i) {
            if (i < 2) return !!this.selectedPenguji[i]
            else return this.selectedPenguji.length > 2
        },
        onComplete() {
            this.createExam()
        },
        validateInfo () {
            return this.$refs.form.validate()
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        addMahasiswa() {
            const valid = this.validateMahasiswa(true)
            if (!valid) return
            if (this.exam.skripsi.is_capstone) {
                if (this.exam.skripsi.mahasiswa.length >= 4) {
                    this.showSnackbar('Melebihi batas mahasiswa')
                } else {
                    this.exam.skripsi.mahasiswa.push({
                        nama: '',
                        nim: '',
                        ipk: '',
                        tempat_lahir: '',
                        tanggal_lahir: '',
                    })
                    this.options.push({
                        prodiOptions: this.prodiList,
                        konsentrasiOptions: this.konsentrasiList,
                        dateDialog: false
                    })
                }
            }
        },
        openDialog(name, index) {
            this.dialog = {
                show: true,
                name,
                index
            }
        },
        closeDialog() {
            this.dialog = {
                show: false, 
                name: '',
                index: null
            }
        },
        deleteMahasiswa(index) {
            this.exam.skripsi.mahasiswa.splice(index, 1)
            this.options.splice(index, 1)
            this.closeDialog()
        },
        assignDosen() {
            this.selectedPenguji.forEach((id, i) => {
                if (id) {
                    const dosenIndex = this.dosen.findIndex(dosen => dosen.id == id)
                    if (i <= 1) this.dosen[dosenIndex].selectedType = this.dosenTypes[i]
                    else this.dosen[dosenIndex].selectedType = this.dosenTypes[2]
                }
            })
        },
        async fetchDosen(nextTab = null, filter = '') {
            this.loadingDosen = true
            try {
                const response = await this.$thessa.getAllDosen('page=all' + filter)
                if (filter) this.dosenWithFilter = response.data
                else this.dosen = response.data
                this.loadingDosen = false
                this.assignDosen()
                if (nextTab !== null) nextTab()
            } catch (error) {
                this.showSnackbar(error)
                this.loadingDosen = false
            }
        },
        async fetchRoomSessions() {
            this.loadingRoomSessions = true
            this.errorFetchRoomSessions = false
            try {
                const response = await this.$thessa.getRoomsAndSessions()
                this.rooms = response.data.Ruang
                this.sessions = response.data.Sesi
                this.loadingRoomSessions = false
            } catch (error) {
                this.errorFetchRoomSessions = true
                this.loadingRoomSessions = false
            }
        },
        async getThisDayExams(date) {
            this.dateMenu = false
            this.loadingThisDayExams = true
            this.errorFetchingSpecificExams = false
            try {
                const response = await this.$thessa.getExamsByDate(date)
                this.thisDayExams = response.data.results
            } catch (error) {
                this.errorFetchingSpecificExams = true
                this.loadingThisDayExams = false
            }
        },
        pickFile () {
            this.$refs.pdf.click()
        },
		onFilePicked (e) {
            this.exam.skripsi.naskah = ''
			const files = e.target.files
			if(files[0] !== undefined) {
				this.pdfName = files[0].name
				if(this.pdfName.lastIndexOf('.') <= 0) return
				const fr = new FileReader()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.pdfUrl = fr.result
					this.pdfFile = files[0]
                    this.uploadFile()
				})
			} else {
				this.pdfName = ''
				this.pdfFile = ''
				this.pdfUrl = ''
            }
        },
        formatMahasiswaBornDate() {
            this.exam.skripsi.mahasiswa.forEach((mahasiswa, i) => {
                let bornDate = this.exam.skripsi.mahasiswa[i].tanggal_lahir
                let formated = this.formatDate(bornDate, 'YYYY-MM-DD', 'DD-MM-YYYY')
                this.exam.skripsi.mahasiswa[i].tanggal_lahir = formated
            })
        },
        async createExam() {
            if (!!this.dosenValidation) return false
            this.submitting = true
            this.formatMahasiswaBornDate()
            try {
                await this.$thessa.createNewExam(this.exam)
                this.showSnackbar({
                    message: 'Ujian Telah berhasi dibuat',
                    type: 'success'
                })
                this.$router.push('/ujian')
            } catch (error) {
                this.showSnackbar(error)
                this.submitting = false
            }
        },
        async uploadFile() {
            this.uploadingScript = true
            this.$store.state.useUploadProgress = true
            const formData = new FormData()
            formData.append('file', this.pdfFile)
            try {
                const name = + new Date() + '_' + this.pdfName
                const res = await this.$thessa.addThesis(name, formData)
                this.exam.skripsi.naskah = res.data.file
                this.uploadingScript = false
                this.uploadingScriptProgress = null
                this.$store.state.useUploadProgress = false
                this.$store.state.asyncProgress = 0
            } catch (error) {
                this.showSnackbar(error.message)
                this.exam.skripsi.naskah = ''
                this.pdfName = ''
                this.pdfFile = ''
                this.pdfUrl = ''
                this.uploadingScript = false
                this.uploadingScriptProgress = null
                this.$store.state.useUploadProgress = false
                this.$store.state.asyncProgress = 0
            }
        },
        async cancelUpload() {
            this.$store.state.cancelTokenSource.cancel('Pengunggahan naskah dibatalkan.')
            this.exam.skripsi.naskah = ''
            this.pdfName = ''
            this.pdfFile = ''
            this.pdfUrl = ''
        }
    },

    created() {
        this.prodiList = departement.getProdiList()
        this.konsentrasiList = departement.getKonsentrasiList()
        this.options[0].prodiOptions = this.prodiList
        this.options[0].konsentrasiOptions = this.konsentrasiList
        if(this.$store.state.auth.token) {
            this.fetchDosen()
            this.fetchRoomSessions()
        } 
    }
}
</script>

<style lang="sass">
    .container.no-h-padding
        padding-left: 0 !important
        padding-right: 0 !important

        .v-text-field
            padding-top: 0 !important

    .mahasiswa-table
        width: 100%
        tr
            td:nth-of-type(2)
                width: 20px

        .v-text-field
            padding-top: 0
            margin-top: 0

    .container.grid-list-xl 
        .layout 
            .flex
                padding: 4px 12px

    .v-text-field__details
        padding: 0 !important

    .v-input--selection-controls
        margin-top: 0 !important
        padding-top: 0 !important
        margin-bottom: 8px

    .v-input__slot
        margin-bottom: 0 !important

    label:not(.v-label)
        font-size: 16px
        display: block

    .wizard-header
        display: none
    
    .wizard-icon
        font-style: normal
    
    .form-wizard .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot
        box-shadow: none
        border: 1px solid #aaa

    .exam-type .v-label 
        color: black
</style>