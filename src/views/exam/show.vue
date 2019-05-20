<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-dialog persistent v-model="editDialog" max-width="600px">
                    <v-card>
                        <v-card-title class="title pb-0">Edit</v-card-title>
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
                                min-width="290px"
                            >
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
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="font-weight-bold" color="red darken-1" flat @click="discard">Batal</v-btn>
                        <v-btn class="font-weight-bold" color="green darken-1" v-if="hasChanged" flat>Ya</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-card>
                    <v-card-text v-if="exam">
                        <h3 class="headline font-weight-regular mt-1 text-capitalize">
                            <span v-if="exam.skripsi.is_capstone" class="warning--text">Capstone: </span>
                            {{ exam.skripsi.judul }}
                            <span @click="edit('skripsi.judul', 'text', 'Judul Skripsi')" class="edit--text" v-if="isAdmin">(edit)</span>
                        </h3>
                        <v-layout align-center wrap class="mt-2">
                            <template>
                                <!-- <v-btn v-if="isAdmin" depressed color="info" class="ma-0 mt-2 mr-2" @click="startUjian(exam.id)"><v-icon left>edit</v-icon> edit ujian</v-btn> -->
                                <v-btn v-if="!isAdmin" depressed color="info" class="ma-0 mt-2 mr-2" @click="startUjian(exam.id)"><v-icon left>send</v-icon> masuk ujian</v-btn>
                            </template>
                        </v-layout>
                        <hr class="mt-3 mb-3">
                        <v-layout row justify-start align-center wrap>
                            <v-chip v-if="isLeader" color="warning" class="white--text ml-0">
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
                                <span class="edit--text" v-if="isAdmin">(edit)</span>
                            </v-chip>
                            <v-chip class="ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">place</v-icon>
                                </v-avatar>
                                {{ exam.ruang }}
                                <span class="edit--text" v-if="isAdmin">(edit)</span>
                            </v-chip>
                        </v-layout>
                        <v-layout column class="mt-4">
                            <h6 class="title font-weight-regular mb-2">Intisari<span class="edit--text" v-if="isAdmin" @click="edit('skripsi.intisari', 'text', 'Intisari')">(edit)</span></h6>
                            <p class="ma-0 mb-2">{{ exam.skripsi.intisari }}</p>
                        </v-layout>
                        <v-layout class="mt-3" column>
                            <h6 class="title font-weight-regular">Informasi Mahasiswa<span class="edit--text" v-if="isAdmin">(edit)</span></h6>
                            <v-data-table
                                :headers="headers"
                                :items="exam.skripsi.mahasiswa"
                                hide-actions
                                class="elevation-1 mt-2">
                                <template v-slot:items="props">
                                    <td>{{ props.item.nama }}</td>
                                    <td>{{ props.item.nim }}</td>
                                    <td>{{ props.item.prodi }}</td>
                                    <td>{{ props.item.konsentrasi }}</td>
                                </template>
                            </v-data-table>
                        </v-layout>
                        <v-layout class="mt-3" column>
                            <h6 class="title font-weight-regular">Informasi Penguji<span class="edit--text" v-if="isAdmin">(tambah penguji)</span></h6>
                            <v-data-table
                                :headers="dosenHeaders"
                                :items="exam.penguji"
                                hide-actions
                                class="elevation-1 mt-2">
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
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            exam: null,
            editDialog: '',
            menu: false,
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
            ]
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
                : changed = oldValue && oldValue != value
            return changed
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),

        async getExam() {
            try {
                const exam = await axios.get(`/${this.isAdmin ? '' : 'me/'}exams/${this.$router.currentRoute.params.id}/`, this.$store.getters.authHeaders)
                this.exam = this.isAdmin ? exam.data : exam.data.ujian
            } catch (error) {
                this.showSnackbar(error.message)
                this.$router.go(-1)
            }
        },

        openThesis() {
            window.open('http://www.africau.edu/images/default/sample.pdf', '_blank')
        },

        startUjian() {
            this.$router.push(`/ujian/${this.$router.currentRoute.params.id}/mulai`)
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

        edit(key, type, label) {
            let value = this.getValue(key)
            type == 'date' ? value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
            this.editTemp.value = value
            this.editTemp.oldValue = value
            this.editTemp.label = label
            this.editTemp.type = type
            this.editDialog = true
        },

        discard() {
            this.editTemp.value = ''
            this.editTemp.oldValue = ''
            this.editDialog = false
        },
    },

    created() {
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


