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
                            :value="exam.skripsi.intisari"
                            required
                            solo
                            label="Intisari"
                            ></v-textarea>
                        
                        <label>Tambahkan Naskah</label>
                        <v-text-field placeholder="pilih naskah" @click='pickFile' v-model='pdfName' prepend-icon='attach_file' class="pa-0"></v-text-field>
                        <input
                            type="file"
                            style="display: none"
                            ref="pdf"
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
                        <v-date-picker @change="getRoom()" v-model="exam.tanggal" @input="dateMenu = false"></v-date-picker>
                    </v-menu>
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
                                    <label>Nama</label>
                                    <v-text-field
                                        v-model="mahasiswa['nama']"
                                        :label="'Nama Mahasiswa ' + (index + 1)" 
                                        required
                                        solo
                                    ></v-text-field>
                                    <v-container grid-list-xl class="pa-0">
                                        <v-layout row wrap>
                                            <v-flex xs12 sm3>
                                                <label>NIM</label>
                                                <v-text-field
                                                    v-model="mahasiswa['nim']"
                                                    label="NIM"
                                                    required
                                                    solo
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <label>Prodi</label>
                                                <v-text-field
                                                    v-model="mahasiswa['prodi']"
                                                    required
                                                    solo
                                                    ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <label>Prodi</label>
                                                <v-text-field
                                                    v-model="mahasiswa['konsentrasi']"
                                                    required
                                                    solo
                                                    ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12 sm3>
                                                <label>Tempat Lahir</label>
                                                <v-text-field
                                                    v-model="mahasiswa['tempat_lahir']"
                                                    required
                                                    solo
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <label>Tanggal Lahir</label>
                                                <v-menu
                                                    v-model="mahasiswa['tanggal_dialog']"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    lazy
                                                    transition="scale-transition"
                                                    offset-y
                                                    full-width
                                                    min-width="290px">
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="mahasiswa['tanggal_lahir']"
                                                            readonly
                                                            solo
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="mahasiswa['tanggal_lahir']" @input="mahasiswa['tanggal_dialog'] = false"></v-date-picker>
                                                </v-menu>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </div>
                            </v-form>
                        </v-form>
                    </v-layout>
                    <v-btn color="primary" v-if="exam.skripsi.is_capstone && exam.skripsi.mahasiswa.length < 4" @click="addMahasiswa()">Tambah mahasiswa</v-btn>
                </tab-content>
                <tab-content title="Dosen Penguji">
                    <v-layout row>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Cari Dosen"
                            single-line
                            hide-details
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
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
                                    <template v-if="!props.item.selectedType" v-slot:activator="{ on }">
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
                                            <v-list-tile-title>{{ type }} <v-icon v-if="isSelected(i)" color="success">check</v-icon></v-list-tile-title>
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
import { loadavg } from 'os';

export default {
    data() {
        return {
            exam: {
                tanggal: null,
                sesi: null,
                ruang: null,
                skripsi: {
                    judul: '',
                    intisari: '',
                    pembimbing1: null,
                    pembimbing2: null,
                    is_capstone: false,
                    mahasiswa: [
                        {
                            nama: "Muhammad Edward Chakim",
                            nim: "15/385407/TK/44069",
                            prodi: "Teknologi Informasi",
                            konsentrasi: "Rekayasa Perangkat Lunak",
                            tempat_lahir: "Solo",
                            tanggal_lahir: "1998-06-04",
                            telepon: "08234785324"
                        }
                    ],
                    berkas: null
                },
                penguji: []
            },
            search: '',
            loadingDosen: false,
            dosen: [],
            dosenHeaders: [
                { text: 'Nama', align: 'left', value: 'nama' },
                { text: 'Aksi', align: 'left', sortable: false, value: 'selectedType', width: '200px' }
            ],
            dosenTypes: [
                'Pembimbing 1',
                'Pembimbing 2',
                'Penguji 1',
                'Penguji 2',
                'Penguji 3',
                'Penguji 4',
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
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),
        setType(i, dosenId){
            if (this.exam.penguji.includes(dosenId)) {
                this.exam.penguji[this.exam.penguji.findIndex(e => e == dosenId)] = null
                const index = this.dosen.findIndex(dosen => this.exam.penguji[i] == dosen.id)
                delete this.dosen[index].selectedType
            }
            if (this.exam.penguji[i]) {
                const index = this.dosen.findIndex(dosen => this.exam.penguji[i] == dosen.id)
                delete this.dosen[index].selectedType
            }
            const index = this.dosen.findIndex(dosen => dosen.id == dosenId)
            const { email, nama } = this.dosen[index]
            this.exam.penguji[i] = dosenId
            this.dosen[index].selectedType = this.dosenTypes[i]
            this.dosen[index].email = 'updating'
            this.dosen[index].nama = 'updating'
            this.dosen[index].email = email
            this.dosen[index].nama = nama
        },
        resetSelected() {

        },
        isSelected(i) {
            return !!this.exam.penguji[i]
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
                        tanggal_dialog: false
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
					this.exam.skripsi.berkas = files[0]
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
            const formData = new FormData()
            Object.keys(this.exam).forEach(key => {
                console.log(key, this.exam[key])
                formData.append(key, this.exam[key])
            });
        }
    },

    created() {
        this.fetchDosen()
    }
}
</script>

<style lang="sass">
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
        margin-bottom: 8px
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