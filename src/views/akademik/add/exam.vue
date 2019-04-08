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
                        <v-radio-group v-model="tipe">
                            <template v-slot:label>
                                <div>Tipe Ujian</div>
                            </template>
                            <v-radio value="0" color="primary">
                                <template v-slot:label>
                                <div>Individu</div>
                                </template>
                            </v-radio>
                            <v-radio value="1" color="primary">
                                <template v-slot:label>
                                <div>Capstone</div>
                                </template>
                            </v-radio>
                        </v-radio-group>

                        <v-text-field
                            v-model="judul"
                            label="Judul Ujian"
                            prepend-icon="bookmark"
                            required
                            :rules="rules.judul"
                            ></v-text-field>

                        <v-container grid-list-xl pa-0>
                            <v-layout row wrap>
                                <v-flex xs12 sm4>
                                    <v-text-field
                                        v-model="ruang"
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
                                            v-model="tanggal"
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
                                            v-model="jam"
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
                            :value="intisari"
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
                                <div v-for="(mahasiswa, index) in (tipe == '0' ? mahasiswa : mahasiswaCapstone)" :key="index" class="mb-4">
                                    <v-layout row wrap align-center>
                                        <h3>Mahasiswa {{ index + 1 }}</h3>
                                        <v-btn color="error" v-if="index > 1" @click="deleteMahasiswa(index)">Hapus mahasiswa</v-btn>                                            
                                    </v-layout>
                                    <v-text-field
                                        v-model="mahasiswa['nama']"
                                        :label="'Nama Mahasiswa ' + (index + 1)" 
                                        prepend-icon="person"
                                        required
                                        :rules="rules.required"
                                    ></v-text-field>
                                    <v-container grid-list-xl class="pa-0">
                                        <v-layout row wrap>
                                            <v-flex xs12 sm3>
                                                <v-text-field
                                                    v-model="mahasiswa['nim']"
                                                    label="NIM"
                                                    required
                                                    prepend-icon="picture_in_picture"
                                                    :rules="rules.required"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <v-text-field
                                                    v-model="mahasiswa['ipk']"
                                                    label="IPK"
                                                    prepend-icon="grade"
                                                    required
                                                    :rules="rules.required"
                                                    ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <v-text-field
                                                    v-model="mahasiswa['tempat_lahir']"
                                                    label="Tempat Lahir"
                                                    required
                                                    prepend-icon="home"
                                                    :rules="rules.required"
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
                                                            :rules="rules.required"
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
                    <v-btn color="primary" v-if="tipe == '1' && mahasiswaCapstone.length <= 4" @click="addMahasiswa()">Tambah mahasiswa</v-btn>
                </tab-content>
                <tab-content title="Dosen Penguji" icon="fas fa-chalkboard-teacher">
                    <v-data-table
                        :headers="dosenHeaders"
                        :items="dosen">
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
                                            v-for="(type, i) in (tipe == '0' ? dosenTypes.slice(0, 4) : dosenTypes)"
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
            dosen: [],
            dosenHeaders: [
                { text: 'Nama', align: 'left', value: 'nama' },
                { text: 'Aksi', align: 'left', sortable: false, value: 'selectedType' }
            ],
            dosenSelected: [],
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
            checkbox: false,
            rules: {
                judul: [
                    v => !!v || 'Judul ujian tidak boleh kosong'
                ],
                tipe: [
                    v => !!v || 'Pilih salah satu tipe ujian'
                ],
                intisari: [
                    v => !!v || 'Intisari ujian tidak boleh kosong'
                ],
                required: [
                    v => !!v || 'Harap diisi terlebih dahulu'
                ]
            },
            mahasiswa: [
                {
                    nama: '',
                    nim: '',
                    ipk: '',
                    tempat_lahir: '',
                    tanggal_lahir: '',
                    tanggal_dialog: false
                }
            ],
            mahasiswaCapstone: [
                {
                    nama: '',
                    nim: '',
                    ipk: '',
                    tempat_lahir: '',
                    tanggal_lahir: '',
                    tanggal_dialog: false
                },
                {
                    nama: '',
                    nim: '',
                    ipk: '',
                    tempat_lahir: '',
                    tanggal_lahir: '',
                    tanggal_dialog: false
                }
            ]
        }
    },

    components: {
        FormWizard,
        TabContent,
    },

    computed: {
        dosenList() {
            let list = this.dosen
            console.log('computed!')
            console.log(list)
            return list
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),
        setType(i, dosenId){
            if (this.dosenSelected.includes(dosenId)) {
                this.dosenSelected[this.dosenSelected.findIndex(e => e == dosenId)] = null
                const index = this.dosen.findIndex(dosen => this.dosenSelected[i] == dosen.id)
                delete this.dosen[index].selectedType
            }
            if (this.dosenSelected[i]) {
                const index = this.dosen.findIndex(dosen => this.dosenSelected[i] == dosen.id)
                delete this.dosen[index].selectedType
            }
            const index = this.dosen.findIndex(dosen => dosen.id == dosenId)
            const { email, nama } = this.dosen[index]
            this.dosenSelected[i] = dosenId
            this.dosen[index].selectedType = this.dosenTypes[i]
            this.dosen[index].email = 'updating'
            this.dosen[index].nama = 'updating'
            this.dosen[index].email = email
            this.dosen[index].nama = nama
            console.log(this.dosenSelected)
        },
        isSelected(i) {
            return !!this.dosenSelected[i]
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
                    'Authorization': 'Token ' + this.$store.state.auth.token
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