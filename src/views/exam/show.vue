<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-dialog persistent v-model="editDialog" max-width="600px">
                    <v-card>
                        <v-card-title class="title pb-0">Edit {{editTemp.label}}</v-card-title>
                        <v-card-text>
                            <v-textarea v-if="editTemp.type == 'text'" :label="editTemp.label" auto-grow v-model="editTemp.value"></v-textarea>
                            <v-menu
                                v-if="editTemp.type == 'date'"
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="editTemp.value"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="editTemp.value"
                                        :label="editTemp.label"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="editTemp.value" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.menu.save(editTemp.value)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                            <v-layout column v-if="editTemp.type == 'mahasiswa'">
                                <v-form refs="formMahasiswa">
                                    <v-form ref="form3" v-model="valid" lazy-validation>
                                        <div v-for="(mahasiswa, index) in editTemp.value" :key="index" class="mb-4">
                                            <v-layout row wrap align-center class="mb-2">
                                                <h3>Mahasiswa {{ index + 1 }}</h3>
                                                <!-- <v-btn color="error" v-if="index > 0" @click="openDialog(mahasiswa['nama'].trim().length > 0 ? mahasiswa['nama'] : 'Mahasiswa ' + (index + 1), index)">Hapus mahasiswa</v-btn>                                             -->
                                            </v-layout>
                                            <table class="mahasiswa-table">
                                                <tr>
                                                    <td><label>Nama</label></td>
                                                    <td>:</td>
                                                    <td>
                                                        <v-text-field
                                                            v-model="editTemp.value[index]['nama']"
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
                                                            <v-menu
                                                                v-model="options[index].dateDialog"
                                                                :close-on-content-click="false"
                                                                :nudge-right="40"
                                                                lazy
                                                                transition="scale-transition"
                                                                offset-y
                                                                full-width
                                                                :disabled="submitting"
                                                                min-width="290px">
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        v-model="mahasiswa['tanggal_lahir']"
                                                                        placeholder="YYYY-MM-DD"
                                                                        prepend-icon="event"
                                                                        :rules="[...rules.required, ...rules.date]"
                                                                        v-on="on"
                                                                        :disabled="submitting"
                                                                    ></v-text-field>
                                                                </template>
                                                                <v-date-picker :disabled="submitting" v-model="mahasiswa['tanggal_lahir']" @input="tanggal_dialog = false"></v-date-picker>
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
                            <v-layout column v-if="editTemp.type == 'radio'">
                                <v-radio-group :rules="rules.isBool" :disabled="submitting" v-model="editTemp.value">
                                    <v-radio :value="false" label="Individu" color="primary"></v-radio>
                                    <v-radio :value="true" label="Capstone" color="primary"></v-radio>
                                </v-radio-group>
                            </v-layout>
                            <v-layout column v-if="editTemp.type == 'ruang'">
                                <v-select
                                    :items="ruang"
                                    v-model="editTemp.value"
                                    item-value="id"
                                    placeholder="Ruangan"
                                    item-text="nama"
                                    :rules="[v => !!v || 'Bidang isian harus diisi']"
                                    :disabled="submitting"
                                    ></v-select>
                            </v-layout>
                            <v-layout column v-if="editTemp.type == 'sesi'">
                                <v-select
                                    :items="sesi"
                                    v-model="editTemp.value"
                                    item-value="id"
                                    placeholder="Sesi"
                                    item-text="mulai"
                                    :rules="[v => !!v || 'Bidang isian harus diisi']"
                                    :disabled="submitting"
                                    ></v-select>
                            </v-layout>
                            <v-layout column v-if="editTemp.type == 'dosen'">
                                <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Cari Dosen"
                                    :disabled="submitting"
                                    single-line
                                    hide-details
                                    class="pt-0"
                                ></v-text-field>
                                <v-data-table
                                    v-if="dosen"
                                    :headers="[{ text: 'Nama', align: 'left', value: 'nama' },{ text: 'Aksi', align: 'left', sortable: false, value: 'selectedType', width: '200px' }]"
                                    :items="dosen"
                                    :search="search"
                                    :rows-per-page-items='[ 10, 15, 25, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ]'
                                    :loading="loading">
                                    <template v-slot:items="props">
                                        <td>{{ props.item.nama || props.item.email }}</td>
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
                                                        <v-list-tile-title v-if="i === 1"><v-icon color="error">delete</v-icon><span class="error--text">{{ type }}</span></v-list-tile-title>
                                                        <v-list-tile-title v-else-if="i === 0">
                                                            <v-layout align-center>
                                                                {{ type }}
                                                                <span class="ml-2 success white--text" style="display: flex; justify-content: center; align-items: center; width: 22px; height: 22px; border-radius: 50%;"></span>
                                                            </v-layout>
                                                        </v-list-tile-title>
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
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="font-weight-bold" color="red darken-1" flat @click="discard">Batal</v-btn>
                        <v-btn class="font-weight-bold" color="green darken-1" v-if="hasChanged" :loading="submitting" @click="saveEdit" flat>Ya</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                    v-model="dialogDelete"
                    max-width="500">
                    <v-card>
                        <v-card-text>
                        Anda ingin menghapus ujian untuk skripsi: <br><b>{{ exam.skripsi.judul }}</b>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                v-show="!deleting"
                                class="secondary"
                                @click="dialogDelete = false">
                                Batal
                            </v-btn>

                            <v-btn
                                :loading="deleting"
                                class="error"
                                @click="deleteExam">
                                Hapus
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-card>
                    <v-card-text v-if="exam">
                        <v-layout row>
                            <v-layout column>
                                <h3 class="headline font-weight-regular mt-1 text-capitalize">
                                    {{ exam.skripsi.judul }}
                                    <span @click="edit('skripsi.judul', 'text', 'Judul Skripsi')" class="edit--text" v-if="isAdmin">(edit)</span>
                                </h3>
                            </v-layout>
                            <v-btn v-if="!isAdmin" depressed color="info" class="ma-0 mt-2" @click="startExam(exam.id)"><v-icon left>send</v-icon>masuk ujian</v-btn>
                            <v-btn v-if="isAdmin" depressed color="error" class="ma-0 mt-2" @click="dialogDelete = true"><v-icon left>delete</v-icon>hapus ujian</v-btn>
                        </v-layout>
                        <span class="subheading">Tipe: {{ exam.skripsi.is_capstone ? 'Captsone' : 'Individu' }} <span @click="edit('skripsi.is_capstone', 'radio', 'Tipe Skripsi')" class="edit--text" v-if="isAdmin">(edit)</span></span>
                        <v-layout class="mt-3">
                            <v-btn @click="generateReadyDocument('download')" class="ma-0 mr-2" color="primary">
                                <v-icon left>file_download</v-icon>
                                Unduh
                            </v-btn>
                            <v-btn @click="generateReadyDocument('print')" class="ma-0" color="warning">
                                <v-icon left>print</v-icon>
                                Cetak
                            </v-btn>
                        </v-layout>
                        <!-- <v-layout align-center wrap class="mt-0"> -->
                            <!-- <template> -->
                                <!-- <v-btn v-if="isAdmin" depressed color="info" class="ma-0 mt-2 mr-2" @click="startExam(exam.id)"><v-icon left>edit</v-icon> edit ujian</v-btn> -->
                                <!-- <v-btn v-if="!isAdmin" depressed color="info" class="ma-0 mt-2 mr-2" @click="startExam(exam.id)"><v-icon left>send</v-icon> masuk ujian</v-btn> -->
                            <!-- </template> -->
                        <!-- </v-layout> -->
                        <hr class="mt-3 mb-3">
                        <v-layout row justify-start align-center wrap>
                            <v-chip v-if="isLeader && !isAdmin" color="warning" class="white--text ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon>verified_user</v-icon>
                                </v-avatar>
                                Ketua
                            </v-chip>
                            <v-chip class="ml-0" :class="isToday ? 'white--text' : ''" :color="isToday ? 'purple' : ''">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">calendar_today</v-icon>
                                </v-avatar>
                                {{ isToday ? date + ' (Hari Ini)' : date }}
                                <span class="edit--text" @click="edit('tanggal', 'date', 'Tanggal Ujian')" v-if="isAdmin">(edit)</span>
                            </v-chip>
                            <v-chip class="ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">access_time</v-icon>
                                </v-avatar>
                                {{ exam.sesi }}
                                <span class="edit--text" v-if="isAdmin" @click="edit('sesi', 'sesi', 'Sesi')">(edit)</span>
                            </v-chip>
                            <v-chip class="ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">place</v-icon>
                                </v-avatar>
                                {{ exam.ruang }}
                                <span class="edit--text" v-if="isAdmin" @click="edit('ruang', 'ruang', 'Ruang')">(edit)</span>
                            </v-chip>
                        </v-layout>
                        <v-layout column class="mt-4">
                            <h6 class="title font-weight-regular mb-2">Intisari<span class="edit--text" v-if="isAdmin" @click="edit('skripsi.intisari', 'text', 'Intisari')">(edit)</span></h6>
                            <p class="ma-0 mb-2">{{ exam.skripsi.intisari }}</p>
                        </v-layout>
                        <v-layout class="mt-3" column>
                            <h6 class="title font-weight-regular">Informasi Mahasiswa<span class="edit--text" v-if="isAdmin" @click="edit('skripsi.mahasiswa', 'mahasiswa', 'Mahasiswa')">(edit)</span></h6>
                            <v-data-table
                                :headers="headers"
                                :items="exam.skripsi.mahasiswa"
                                hide-actions
                                class="elevation-1 mt-2">
                                <template slot="headerCell" slot-scope="props">
                                    <span class="black--text" style="font-size: 13px">
                                        {{ props.header.text }}
                                    </span>
                                </template>
                                <template v-slot:items="props">
                                    <td>{{ props.item.nama }}</td>
                                    <td>{{ props.item.nim }}</td>
                                    <td>{{ props.item.prodi }}</td>
                                    <td>{{ props.item.konsentrasi }}</td>
                                    <td>{{ props.item.tempat_lahir + ', ' + readableDate(props.item.tanggal_lahir)}}</td>
                                    <td>{{ props.item.telepon }}</td>
                                </template>
                            </v-data-table>
                        </v-layout>
                        <v-layout class="mt-3" column>
                            <h6 class="title font-weight-regular">Informasi Penguji<span class="edit--text" v-if="isAdmin" @click="edit('penguji', 'dosen', 'Penguji')">(tambah penguji)</span></h6>
                            <v-data-table
                                :headers="dosenHeaders"
                                :items="exam.penguji"
                                hide-actions
                                class="elevation-1 mt-2">
                                <template slot="headerCell" slot-scope="props">
                                    <span class="black--text" style="font-size: 13px">
                                        {{ props.header.text }}
                                    </span>
                                </template>
                                <template v-slot:items="props">
                                    <td>{{ props.item.dosen }}</td>
                                    <td>{{ props.item.is_leader ? 'Ketua Penguji' : props.index == 1 ? 'Pembimbing 2' : 'Penguji' }}</td>
                                </template>
                            </v-data-table>
                        </v-layout>
                    </v-card-text>
                </v-card>   
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import moment from 'moment'
import doc from '@/documents'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            exam: null,
            examId: null,
            search: '',
            editDialog: '',
            dialogDelete: false,
            deleting: false,
            dosen: null,
            loading: false,
            menu: false,
            valid: true,
            submitting: false,
            rules: {
                required: [v => (!!v && !!v.trim()) || 'Bidang isian harus diisi'],
                requireSelect: [v => !!v || 'Bidang isian harus diisi'],
                isBool: [v => (v == false || v == true) || 'Bidang isian ujian harus diisi'],
                is_capstone: [v => (v == false || v == true) || 'Tipe ujian harus diisi'],
                isNumber: [v => !isNaN(v) || 'Hanya dapat berisi angka'],
                date: [v => /[1-9][0-9]{3}-[0-9]{2}-[0-9]{2}/g.test(v) || 'Tanggal format YYYY-MM-DD']
            },
            editTemp: {
                value: '',
                oldValue: '',
                label: '',
                type: '',
                date: ''
            },
            headers: [
                {
                    text: 'Nama',
                    sortable: false,
                    align: 'left',
                    value: 'nama',
                },
                {
                    text: 'NIM',
                    sortable: false,
                    value: 'nim'
                },
                {
                    text: 'Program Studi',
                    sortable: false,
                    value: 'prodi'
                },
                {
                    text: 'Konsentrasi',
                    sortable: false,
                    value: 'konsentrasi'
                },
                {
                    text: 'TTL',
                    sortable: false,
                    value: 'tempat_lahir'
                },
                {
                    text: 'Telepon',
                    sortable: false,
                    value: 'telepon'
                },
            ],
            dosenHeaders: [
                {
                    text: 'Nama',
                    sortable: false,
                    align: 'left',
                    value: 'dosen',
                },
                {
                    text: 'Status',
                    sortable: false,
                    align: 'left',
                    value: 'is_leader',
                },
            ],
            options: [],
            ruang: [],
            sesi: [],
            selectedPenguji: null,
            dosenTypes: [
                'Penguji',
                'Hapus'
            ],
            report: null,
            objDocument: null,
            pdfDocGenerator: null,
            generating: false,
        }
    },

    computed: {
        date() {
            return moment(this.exam.tanggal, 'DD/MM/YYYY').format('LL')
        },

        isAdmin() {
            return this.$store.state.auth.user.is_admin
        },

        isLeader() {
            return this.exam.penguji[0].dosen == this.$store.state.auth.user.nama
        },

        isToday() {
            const today = moment().format('DD/MM/YYYY')
            return this.exam.tanggal === today
        },
        hasChanged() {
            let changed = false
            const { value, oldValue, type } = this.editTemp
            type == 'text'
                ? changed = value.trim() && value.trim() != oldValue
                : type == 'mahasiswa' ? changed = JSON.stringify(value).trim() && JSON.stringify(value).trim() != JSON.stringify(this.exam.skripsi.mahasiswa)
                : changed = oldValue && oldValue != value
            return changed
        },
        readableDate() {
            return function (date) {
                moment.locale('id')
                return moment(date, 'DD/MM/YYYY').format('LL')
            }
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),

        async deleteExam() {
            this.deleting = true
            try {
                await this.$thessa.deleteExam(this.examId)
                this.showSnackbar({type: 'success', message: 'Berhasil menghapus ujian'})
                this.deleting = false
                this.dialogDelete = false
                this.$router.push('/ujian')
            } catch (error) {
                this.deleting = false
                this.showSnackbar(error)
            }
        },

        async fetchReport() {
            try {
                return await {
                    hari: 'SENIN',
                    tanggal: '12 Mei 2019',
                    waktu: '09.00 WIB',
                    ruang: 'Ruang Sidang',
                    mahasiswa: [
                        {
                            nama: 'Muhammad Edward Chakim',
                            nim: '15/385407/TK/44069',
                            tl: 'Batang',
                            tgl: '4 Juni 1998',
                            prodi: 'Teknologi Informasi',
                            konsentrasi: 'Rekayasa Perangkat Lunak',
                            nilai: 98,
                        },
                        {
                            nama: 'Muhammad Edward Chakim Dua',
                            nim: '15/385407/TK/44069',
                            tl: 'Batang Dua',
                            tgl: '4 Juni 1998',
                            prodi: 'Teknologi Informasi',
                            konsentrasi: 'Rekayasa Sistem Informasi',
                            nilai: 99
                        }
                    ],
                    judul: 'Pengembangan aplikasi ujian tugas akhir berbasis Outcome Based Assessment Test Dua Baris',
                    dosen: ['Ridi Ferdiana', 'Rudi Hartanto', 'Selo', 'Markus', 'Silmi', 'Teguh Bharata Adji'],
                    kadep: {
                        nama: 'Sarjiya, S.T., M.T., Ph.D.',
                        nip: '197307061999031005'
                    },
                    sekretaris: {
                        nama: 'Hanung Adi  Nugroho, S.T., M.E., Ph.D.',
                        nip: '197802242002121001'
                    },
                }
            } catch (error) {
                return false
            }
        },

        async generateObjDocument() {
            this.report = await this.fetchReport()
            return this.report ? doc(this.report) : null
        },

        async generateReadyDocument(type) {
            this.report = null
            this.objDocument = await this.generateObjDocument()
            if (this.objDocument) {
                if (pdfMake.vfs == undefined) {
                    pdfMake.vfs = pdfFonts.pdfMake.vfs
                }
    
                const docDefinition = { 
                    pageOrientation: 'portrait',
                    content: this.objDocument,
                    defaultStyle: {
                        fontSize: 10,
                        lineHeight: 1
                    },
                    pageSize: 'A4',
                    pageMargins: [ 30, 20, 30, 20 ]
                }
    
                this.pdfDocGenerator = pdfMake.createPdf(docDefinition);
                if (type == 'open') {
                    pdfMake.createPdf(docDefinition).open({}, window)
                    this.generating = false
                } else if (type == 'print') {
                    this.pdfDocGenerator.print()
                } else {
                    this.pdfDocGenerator.download()
                }
            }
        },

        isSelected(i) {
            if (i < 2) return !!this.selectedPenguji[i]
            else return this.selectedPenguji.length > 2
        },

        async fetchRoomSessions() {
            this.loading = true
            try {
                const response = await this.$thessa.getRoomsAndSessions()
                this.ruang = response.data.Ruang
                this.sesi = response.data.Sesi
                this.loading = false
            } catch (error) {
                this.showSnackbar(error)
                this.fetchRoomSessions()
            }
        },

        async saveEditedSkripsiItem(fullKey, newVal) {
            const key = fullKey.replace('skripsi.', '')
            try {
                let data = {}
                data[key] = newVal
                const response = await this.$thessa.editEssayItem(this.examId, data)
                this.exam.skripsi[key] = newVal
                this.discard()
            } catch (error) {
                this.showSnackbar(error.message ? error.message : error)
            }   
        },

        async saveEditedExamItem(key, newVal) {
            try {
                let data = {}
                data[key] = newVal
                const response = await this.$thessa.editExamItem(this.examId, data)
                this.exam[key] = response.data.ujian[key]
                this.discard()
            } catch (error) {
                this.showSnackbar(error.message ? error.message : error)
            } 
        },

        async assignNewDosen(penguji) {
            try {
                const response = await this.$thessa.assignNewDosen(this.examId, penguji)
                console.log(response.data)
            } catch (error) {
                this.showSnackbar(error)
            }
        },

        async saveEdit() {
            if (this.editTemp.key == 'penguji') this.assignNewDosen(this.selectedPenguji)
            else {
                const isSkripsi = /skripsi\..+/.test(this.editTemp.key)
                if (isSkripsi) this.saveEditedSkripsiItem(this.editTemp.key, this.editTemp.value)
                else this.saveEditedExamItem(this.editTemp.key, this.editTemp.value)
            }
        },

        navigateKonsentrasi(index) {
            const i = this.options[index].prodiOptions.findIndex(el => el == this.editTemp.value[index].prodi)
            this.options[index].prodiSelected = i
        },

        async getExam() {
            this.isAdmin ? this.fetchRoomSessions() : null
            try {
                const exam = await this.$thessa.getExamById(this.examId)
                this.exam = this.isAdmin ? exam.data : exam.data.ujian
            } catch (error) {
                this.$store.dispatch('showSnackbar', error.message)
            }
        },

        openThesis() {
            window.open('http://www.africau.edu/images/default/sample.pdf', '_blank')
        },

        startExam() {
            this.$router.push(`/ujian/${this.examId}/mulai`)
        },

        getValue(key) {
            let object = this.exam
            var keys = key.split('.');
            for (var i = 0; i < keys.length; i++) {
                if (!object.hasOwnProperty(keys[i])) {
                    return null;
                }
                object = object[keys[i]];
            }
            return object;
        },

        async fetchDosen() {
            this.loadingDosen = true
            try {
                const response = await this.$thessa.getAllDosen()
                this.dosen = response.data.results
                this.loadingDosen = false
            } catch (error) {
                this.$store.dispatch('showSnackbar', error)
                this.loadingDosen = false
            }
        },

        filterList() {
            let arr = this.exam.penguji.map(dosen => dosen.dosen)
            this.dosen = this.dosen.filter(dosen => !arr.includes(dosen.nama))
        },

        edit(key, type, label) {
            this.options = []
            let value = this.getValue(key)
            if (type == 'mahasiswa') {
                value.forEach(v => this.options.push({
                    prodiOptions: ['TE', 'TI'],
                    konsentrasiOptions: [
                        ['TTL', 'SIE'],
                        ['RSI', 'RPL', 'RSK']
                    ],
                    dateDialog: false,
                    prodiSelected: v.prodi == 'TE' ? 0 : 1
                }))
            }
            type == 'date' ? value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
            if (type == 'mahasiswa') {
                this.editTemp.value = JSON.parse(JSON.stringify(value))
                this.editTemp.oldValue = JSON.parse(JSON.stringify(value))
            } else if (type == 'ruang') {
                this.fetchRoomSessions()
                    .then(() => {
                        let id = this[type][this[type].findIndex(item => item.nama == value)].id
                        this.editTemp.value = id
                        this.editTemp.oldValue = id
                    })
                    .catch(error => this.$store.dispatch('showSnackbar', error))
            } else if (type == 'sesi') {
                this.fetchRoomSessions()
                    .then(() => {
                        let id = this[type][this[type].findIndex(item => item.mulai + ' - ' + item.selesai + ' WIB' == value)].id
                        this.editTemp.value = id
                        this.editTemp.oldValue = id
                    })
                    .catch(error => this.$store.dispatch('showSnackbar', error))
            } else if (type == 'dosen') {
                this.fetchDosen()
                    .then(() => {
                        this.filterList()
                        this.editTemp.value = []
                        this.editTemp.oldValue = []
                    })
            }
            else {
                this.editTemp.value = value
                this.editTemp.oldValue = value
            }
            this.editTemp.label = label
            this.editTemp.key = key
            this.editTemp.type = type
            this.editDialog = true
        },

        discard() {
            this.editTemp.value = ''
            this.editTemp.oldValue = ''
            this.editDialog = false
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
            this.editTemp.value = penguji
            return this.selectedPenguji = cleanedArr
        },
        deleteRole(id) {
            this.selectedPenguji = null
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
            if (i == 1) {
                this.deleteRole(dosenId)
            }
            else if (i == 0) {
                if (this.selectedPenguji) {
                    const lastIndex = this.dosen.findIndex(dosen => this.selectedPenguji.dosen == dosen.id)
                    delete this.dosen[lastIndex].selectedType
                }
                this.selectedPenguji = {dosen: dosenId}
                const newIndex = this.dosen.findIndex(dosen => dosenId == dosen.id)
                const { email, nama } = this.dosen[newIndex]
                this.dosen[newIndex].selectedType = 'penguji baru'
                this.dosen[newIndex]['email'] = 'updating' 
                this.dosen[newIndex]['nama'] = 'updating'
                this.dosen[newIndex]['email'] = email
                this.dosen[newIndex]['nama'] = nama
            }
        },
    },

    created() {
        this.examId = this.$router.currentRoute.params.id
        this.$store.state.auth.token ? this.getExam() : null
    }
}
</script>

<style lang="sass" scoped>
    .container 
        padding: 0

    .edit--text
        color: blue
        padding-left: 8px
        cursor: pointer
        font-size: 14px
        text-transform: lowercase
</style>


