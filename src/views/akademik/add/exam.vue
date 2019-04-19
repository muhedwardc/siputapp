<template>
    <v-layout column>
        <v-card flat class="pa-2 pl-3 pr-3">
            <form-wizard
                @on-complete="onComplete"
                shape="tab"
                color="blue">
                <tab-content title="Informasi Ujian" icon="fas fa-info-circle" :before-change="validateInfo">
                    <v-form
                        ref="form"
                        v-model="valid">
                        <v-radio-group v-model="is_capstone">
                            <template v-slot:label>
                                <div>Tipe Ujian</div>
                            </template>
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

                        <v-text-field
                            v-model="exam.skripsi.judul"
                            label="Judul Ujian"
                            prepend-icon="bookmark"
                            required
                            ></v-text-field>

                        <v-container grid-list-xl pa-0>
                            <v-layout row wrap>
                                <v-flex xs12 sm4>
                                    <v-text-field
                                        v-model="exam.ruang"
                                        label="Ruangan"
                                        prepend-icon="room"
                                        required
                                        ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm4>
                                    <v-menu
                                        v-model="dateMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px">
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="exam.tanggal"
                                            label="tanggal"
                                            readonly
                                            prepend-icon="event"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="tanggal" @input="dateMenu = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm4>
                                    <v-menu
                                        v-model="timeMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px">
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="exam.sesi"
                                            label="jam"
                                            prepend-icon="schedule"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-time-picker format="24hr" @input="timeMenu = false" v-model="jam" color="green lighten-1" header-color="primary"></v-time-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-textarea
                            :value="exam.skripsi.intisari"
                            label="Intisari"
                            prepend-icon="subject"
                            required
                            ></v-textarea>
                    </v-form>
                </tab-content>
                <tab-content title="Data Mahasiswa" icon="fas fa-graduation-cap">
                    <v-layout column>
                        <v-form refs="formMahasiswa">
                            <v-form ref="mhsInfo" v-model="mhsValid" lazy-validation>
                                <div v-for="(mahasiswa, index) in exam.skripsi.mahasiswa" :key="index" class="mb-4">
                                    <v-layout row wrap align-center>
                                        <h3>Mahasiswa {{ index + 1 }}</h3>
                                        <v-btn color="error" v-if="index > 1" @click="deleteMahasiswa(index)">Hapus mahasiswa</v-btn>                                            
                                    </v-layout>
                                    <v-text-field
                                        v-model="mahasiswa['nama']"
                                        :label="'Nama Mahasiswa ' + (index + 1)" 
                                        prepend-icon="person"
                                        required
                                    ></v-text-field>
                                    <v-container grid-list-xl class="pa-0">
                                        <v-layout row wrap>
                                            <v-flex xs12 sm3>
                                                <v-text-field
                                                    v-model="mahasiswa['nim']"
                                                    label="NIM"
                                                    required
                                                    prepend-icon="picture_in_picture"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <v-text-field
                                                    v-model="mahasiswa['ipk']"
                                                    label="IPK"
                                                    prepend-icon="grade"
                                                    required
                                                    ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <v-text-field
                                                    v-model="mahasiswa['tempat_lahir']"
                                                    label="Tempat Lahir"
                                                    required
                                                    prepend-icon="home"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm3>
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
                                                            label="Tanggal Lahir"
                                                            readonly
                                                            prepend-icon="event"
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
                    <v-btn color="primary" v-if="exam.skripsi.is_capstone && exam.skripsi.mahasiswa <= 4" @click="addMahasiswa()">Tambah mahasiswa</v-btn>
                </tab-content>
                <tab-content title="Dosen Penguji" icon="fas fa-chalkboard-teacher">
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-data-table
                        :headers="dosenHeaders"
                        :items="dosen"
                        :search="search">
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
                    </v-data-table>
                </tab-content>
            </form-wizard>
        </v-card>
    </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
    data() {
        return {
            exam: {
                tanggal: '',
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
                            nama: "Muhammad Edward Chakin",
                            nim: "15/385407/TK/44069",
                            prodi: "Teknologi Informasi",
                            konsentrasi: "Rekayasa Perangkat Lunak",
                            tempat_lahir: "Solo",
                            tanggal_lahir: "1997-05-21",
                            telepon: "08234785324"
                        }
                    ],
                    berkas: null
                },
                penguji: []
            },
            is_capstone: false,
            search: '',
            dosen: [],
            dosenHeaders: [
                { text: 'Nama', align: 'left', value: 'nama' },
                { text: 'Aksi', align: 'left', sortable: false, value: 'selectedType' }
            ],
            dosenTypes: [
                'Pembimbing 1 (Ketua)',
                'Pembimbing 2',
                'Penguji 1',
                'Penguji 2',
                'Penguji 3',
                'Penguji 4',
            ],
            valid: true,
            mhsValid: true,
            judul: 'Judul',
            tipe: "0",
            intisari: '',
            ruang: '',
            tanggal: '',
            jam: '',
            name: '',
            dateMenu: false,
            timeMenu: false,
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4'
            ],
            checkbox: false
        }
    },

    watch: {
        is_capstone(val) {
            let mhs = {
                nama: "",
                nim: "",
                prodi: "",
                konsentrasi: "",
                tempat_lahir: "",
                tanggal_lahir: "",
                telepon: ""
            }
            if (val) this.exam.skripsi.mahasiswa = [mhs, mhs]
            else this.exam.skripsi.mahasiswa = [mhs]
            this.exam.skripsi.is_capstone = val
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
        onComplete: function(){
            alert('Selesai');
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
            if (this.mahasiswaCapstone.length === 4) {
                this.$store.dispatch('showSnackbar', {
                    type: 'error',
                    message: 'Melebihi batas mahasiswa'
                })
            } else {
                this.mahasiswaCapstone.push({
                    nama: '',
                    nim: '',
                    ipk: '',
                    tempat_lahir: '',
                    tanggal_lahir: '',
                    tanggal_dialog: false
                })
            }
        },
        deleteMahasiswa(index) {
            this.mahasiswaCapstone.splice(index, 1)
        },
        fetchDosen() {
            axios.get('/users/dosen/', {
                headers: {
                    'Authorization': this.$store.getters.authToken
                }
            })
            .then(r => {
                this.dosen = r.data
            })
            .catch(err => {
                this.showSnackbar({
                    message: err.message,
                    type: 'error'
                })
            })
        }
    },

    created() {
        this.fetchDosen()
    }
}
</script>

<style lang="sass">
    .v-input--selection-controls:not(.v-input--hide-details) 
        .v-input__slot
            margin-bottom: 0 !important

    .wizard-header
        display: none
</style>