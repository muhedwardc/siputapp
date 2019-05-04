<template>
    <v-layout column>
        <v-card flat class="pa-2 pl-3 pr-3">
            <form-wizard
                @on-complete="onComplete"
                color="blue">
                <tab-content title="Informasi Ujian" :before-change="validateInfo">
                    <v-form
                        ref="form"
                        v-model="valid">
                        <label>Tipe Ujian</label>
                        <v-radio-group v-model="exam.skripsi.is_capstone">
                            <v-radio :value="false" color="primary">
                                <template v-slot:label>
                                <div>Individu</div>
                                </template>
                            </v-radio>
                            <v-radio :value="true" color="primary">
                                <template v-slot:label>
                                <div>Capstone</div>
                                </template>
                            </v-radio>
                        </v-radio-group>
                        
                        <label>Judul Ujian</label>
                        <v-text-field
                            v-model="exam.skripsi.judul"
                            required
                            solo
                            label="Judul Ujian"
                            ></v-text-field>
                        
                        <label>Intisari</label>
                        <v-textarea
                            v-model="exam.skripsi.intisari"
                            required
                            solo
                            label="Intisari"
                            ></v-textarea>
                        
                        <label>Tambahkan Naskah</label>
                        <v-text-field placeholder="pilih naskah" readonly @click='pickFile' v-model='pdfName' prepend-icon='attach_file' class="pa-0"></v-text-field>
                        <input
                            type="file"
                            style="display: none"
                            ref="pdf"
                            readonly
                            solo
                            accept="application/pdf,application/vnd.ms-excel"
                            @change="onFilePicked"
                        >
                    </v-form>
                </tab-content>
                <tab-content title="Pilih Ruangan">
                    <v-menu
                        v-model="dateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        solo
                        min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="exam.tanggal"
                                readonly
                                placeholder="Pilih Tanggal Ujian"
                                prepend-icon="event "
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker @input="getThisDayExams(exam.tanggal)" v-model="exam.tanggal"></v-date-picker>
                    </v-menu>
                    <template v-if="exam.tanggal">
                        <v-container class="no-h-padding" grid-list-md v-if="this.thisDayExams.length > 0">
                            <v-layout row wrap>
                                <p class="ml-1">Daftar ujian ditanggal {{exam.tanggal}}</p>
                                <v-flex xs12 sm6 v-for="e in thisDayExams" :key="e.id">
                                    <v-chip label>Label</v-chip>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <p v-else>Tidak ada ujian untuk tanggal {{exam.tanggal}}</p>
                    </template>
                    <v-container class="no-h-padding" grid-list-md>
                        <p class="mb-0">Pilih ruangan dan sesi ujian</p>
                        <v-layout row wrap>
                            <v-flex xs12 sm4>
                                <v-select
                                    :items="rooms"
                                    v-model="exam.ruang"
                                    item-value="id"
                                    placeholder="Ruangan"
                                    item-text="nama"
                                    ></v-select>
                            </v-flex>
                            <v-flex xs12 sm4>
                                <v-select
                                    :items="sessions"
                                    v-model="exam.sesi"
                                    item-value="id"
                                    placeholder="Sesi"
                                    item-text="mulai"
                                    ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </tab-content>
                <tab-content title="Data Mahasiswa">
                    <v-layout column>
                        <v-form refs="formMahasiswa">
                            <v-form ref="mhsInfo" v-model="mhsValid" lazy-validation>
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
                                                        :rules="[v => !!v || 'Item is required']"
                                                        placeholder="Prodi"
                                                        required
                                                        ></v-select>
                                                    <span class="title ml-2 mr-2">/</span>
                                                    <v-select
                                                        v-model="mahasiswa['konsentrasi']"
                                                        :items="options[index].konsentrasiOptions[options[index].prodiSelected]"
                                                        :rules="[v => !!v || 'Item is required']"
                                                        placeholder="Konsentrasi"
                                                        :disabled="!mahasiswa['prodi']"
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
                                                    ></v-text-field>
                                                    <span class="title ml-2 mr-2">/</span>
                                                    <v-menu
                                                        v-model="options[index].dateDialog"
                                                        :close-on-content-click="true"
                                                        :nudge-right="40"
                                                        lazy
                                                        transition="scale-transition"
                                                        offset-y
                                                        full-width
                                                        min-width="290px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                v-model="mahasiswa['tanggal_lahir']"
                                                                placeholder="YYYY-MM-DD"
                                                                prepend-icon="event"
                                                                readonly
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="mahasiswa['tanggal_lahir']" @input="tanggal_dialog = false"></v-date-picker>
                                                    </v-menu>
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
                                                ></v-text-field>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </v-form>
                        </v-form>
                    </v-layout>
                    <v-btn color="primary" v-if="exam.skripsi.is_capstone && exam.skripsi.mahasiswa.length < 4" @click="addMahasiswa()">Tambah mahasiswa</v-btn>
                </tab-content>
                <tab-content title="Dosen Penguji">
                    <v-layout row align-center>
                        <h3>Pilih Dosen Pembimbing dan Penguji</h3>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Cari Dosen"
                            single-line
                            hide-details
                            class="pt-0"
                        ></v-text-field>
                    </v-layout>
                    <v-data-table
                        :headers="dosenHeaders"
                        :items="dosen"
                        :search="search"
                        :loading="loadingDosen">
                        <template v-slot:items="props">
                            <td>{{ props.item.nama || props.item.email }}</td>
                            <td>
                                <v-menu
                                    bottom
                                    origin="center center"
                                    transition="scale-transition"
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
                                            v-for="(type, i) in (exam.skripsi.is_capstone ? dosenTypes : dosenTypes.slice(0, 4))"
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
                </tab-content>
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
import { mapActions } from 'vuex'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import moment from 'moment'
import objectToFormData from 'object-to-formdata'
import jsonToFormData from 'json-form-data'

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
            tanggal_dialog: false,
            loadingRoomSessions: true,
            loadingThisDayExams: true,
            thisDayExams: [],
            rooms: [],
            sessions: [],
            options: [
                {
                    prodiOptions: ['TE', 'TI'],
                    prodiSelected: 0,
                    konsentrasiOptions: [
                        ['TTL', 'SIE'],
                        ['RSI', 'RPL', 'RSK']
                    ],
                    dateDialog: false
                }
            ],
            indexItem: null,
            search: '',
            loadingDosen: false,
            dosen: [],
            selectedPenguji: [null, null],
            dosenHeaders: [
                { text: 'Nama', align: 'left', value: 'nama' },
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
            pdfName: '',
            pdfUrl: '',
            pdfFile: '',
            dialog: {
                show: false,
                name: '',
                index: null
            },
        }
    },

    components: {
        FormWizard,
        TabContent,
    },

    computed: {
        dosenList() {
            let list = this.dosen
            return list
        },
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),
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
                    console.log(foundIndex)
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
        },
        resetSelected() {

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
            const valid = this.$refs.mhsInfo.validate()
            if (!valid) return
            if (this.exam.skripsi.is_capstone) {
                if (this.exam.skripsi.mahasiswa.length >= 4) {
                    this.$store.dispatch('showSnackbar', {
                        type: 'error',
                        message: 'Melebihi batas mahasiswa'
                    })
                } else {
                    this.exam.skripsi.mahasiswa.push({
                        nama: '',
                        nim: '',
                        ipk: '',
                        tempat_lahir: '',
                        tanggal_lahir: '',
                    })
                    this.options.push({
                        prodiOptions: ['TE', 'TI'],
                        konsentrasiOptions: [
                            ['TTL', 'SIE'],
                            ['RSI', 'RPL', 'RSK']
                        ],
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
        fetchDosen() {
            this.loadingDosen = true
            axios.get('/users/dosen/', {
                headers: {
                    'Authorization': this.$store.getters.authToken
                }
            })
            .then(r => {
                this.dosen = r.data.results
                this.loadingDosen = false
            })
            .catch(err => {
                this.showSnackbar({
                    message: err.message,
                    type: 'error'
                })
                this.loadingDosen = false
            })
        },
        fetchRoomSessions() {
            this.loadingRoomSessions = true
            axios.get('/exams/get_room_session/', {headers: { 'Authorization': this.$store.getters.authToken}})
                .then(r => r.data)
                .then(r => {
                    this.rooms = r.Ruang
                    this.sessions = r.Sesi
                    this.loadingRoomSessions = false
                })
                .catch(e => {
                    this.showSnackbar({
                        message: e.message,
                        type: 'error'
                    })
                    this.fetchRoomSessions()
                }) 
        },
        getThisDayExams(date) {
            this.dateMenu = false
            this.loadingThisDayExams = true
            axios.get('/exams/?date=' + date, {headers: {'Authorization': this.$store.getters.authToken}})
                .then(r => console.log(r.data.results))
                .catch(err => {
                    this.showSnackbar({
                        message: err.message,
                        type: 'error'
                    })
                    this.loadingThisDayExams = false
                })
        },
        pickFile () {
            this.$refs.pdf.click()
        },
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.pdfName = files[0].name
				if(this.pdfName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.pdfUrl = fr.result
					this.exam.skripsi.naskah = files[0]
				})
			} else {
				this.pdfName = ''
				this.pdfFile = ''
				this.pdfUrl = ''
			}
        },
        getRoom() {
            console.log('fetching room...')
        },
        async createExam() {
            this.exam.skripsi.naskah = null
            axios.post('/exams/', this.exam, {
                    headers: {
                        'Authorization': this.$store.getters.authToken
                    }
                })
                .then(() => this.$router.push('/ujian'))
                .catch(err => {
                    this.showSnackbar({
                        message: err.message,
                        type: 'error'
                    })
                    console.log(err)
                })
        }
    },

    created() {
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

    .v-input--selection-controls
        margin-top: 0 !important
        padding-top: 0 !important

    .v-input__slot
        margin-bottom: 0 !important

    label:not(.v-label)
        font-size: 16px
        display: block

    .wizard-header
        display: none
    
    .wizard-icon
        font-style: normal
    
    .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot
        box-shadow: none
        border: 1px solid #aaa
</style>