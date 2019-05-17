<template>
    <div>
        <v-layout row flat color="white" align-center>
            <v-toolbar-title>Daftar Ruangan dan Sesi</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="showDialog(0)">Tambah Ruangan</v-btn>
            <v-btn color="primary" dark class="mb-2" @click="showDialog(1)">Tambah Sesi</v-btn>
            <v-dialog v-model="editDialog" persistent max-width="500px">
                <v-card>
                    <v-card-title class="headline pb-0">{{ edit.type == 0 ? 'Edit' : 'Hapus'}} Ruangan</v-card-title>
                    <v-card-text>
                        Ruangan terpilih: {{ edit.value }}
                        <v-form ref="edit-form" v-if="edit.type == 0">
                            <v-text-field v-model="edit.newValue" :disabled="editing" label="Nama Ruangan"></v-text-field>
                        </v-form>
                        <p v-else class="mb-0">Apakah anda ingin menghapus <b>{{ edit.value }}</b>?</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error darken-1" :disabled="editing" @click="discardEdit">Batal</v-btn>
                        <v-btn v-if="edit.type == 0" color="success darken-1" :loading="editing" @click="dialog = false">Ubah</v-btn>
                        <v-btn v-else color="success darken-1" @click="deleteRoom" :loading="editing">Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title class="mb-0 pb-0 pl-4">
                        <span class="headline">Tambah {{ type == 0 ? 'Ruangan' : 'Sesi' }}</span>
                    </v-card-title>

                    <v-card-text class="pt-2 pb-0">
                        <v-container>
                            <v-form ref="room" v-model="valid" lazy-validation>
                                <v-layout wrap v-if="type === 0">
                                    <v-flex xs12>
                                        <v-text-field v-model="roomName" :disabled="!input" label="Nama Ruangan"></v-text-field>
                                        <span class="caption">Contoh: Ruang Sidang</span>
                                    </v-flex>
                                </v-layout>
                                <v-layout v-else>
                                    <v-flex xs12>
                                        <v-text-field v-model="sessionName" :disabled="!input" label="Nama Sesi"></v-text-field>
                                        <v-dialog
                                            ref="dialog"
                                            v-model="modal"
                                            :return-value.sync="sessionStart"
                                            persistent
                                            lazy
                                            full-width
                                            width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    v-model="sessionStart"
                                                    label="Jam Mulai. Contoh: 08:00"
                                                    readonly
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                format="24hr"
                                                v-if="modal"
                                                v-model="sessionStart"
                                                full-width>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="modal = false">Batal</v-btn>
                                                <v-btn flat color="primary" @click="$refs.dialog.save(sessionStart)">OK</v-btn>
                                            </v-time-picker>
                                        </v-dialog>
                                        <v-dialog
                                            ref="dialog2"
                                            v-model="modal2"
                                            :return-value.sync="sessionEnd"
                                            persistent
                                            lazy
                                            full-width
                                            width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    v-model="sessionEnd"
                                                    label="Jam Mulai. Contoh: 10:00"
                                                    readonly
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                format="24hr"
                                                v-if="modal2"
                                                v-model="sessionEnd"
                                                full-width>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="modal2 = false">Batal</v-btn>
                                                <v-btn flat color="primary" @click="$refs.dialog2.save(sessionEnd)">OK</v-btn>
                                            </v-time-picker>
                                        </v-dialog>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="success" :loading="!input" @click="createNew()">Simpan</v-btn>
                        <v-btn color="error" v-if="input" @click="discard()">Batal</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-container grid-list-xl class="no-h-paddings tables">
            <v-layout row wrap>
                <v-flex xs12 sm6>
                    <h3 class="font-weight-regular">Daftar Ruangan</h3>
                    <v-data-table
                        hide-actions
                        :headers="roomsHeader"
                        :items="rooms">
                        <template v-slot:items="props">
                            <td v-text="props.item.id"></td>
                            <td v-text="props.item.nama"></td>
                            <td class="justify-center layout pa-0 ma-0">
                                <v-icon small class="mr-2" @click="editRoom(0, props.item.id, props.item.nama)">edit</v-icon>
                                <v-icon small @click="editRoom(1, props.item.id, props.item.nama)">delete</v-icon>
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
                <v-flex xs12 sm6>
                    <h3 class="font-weight-regular">Daftar Sesi</h3>
                    <v-data-table
                        hide-actions
                        :headers="sessionsHeader"
                        :items="sessions">
                        <template v-slot:items="props">
                            <td v-text="props.item.id"></td>
                            <td v-text="props.item.nama"></td>
                            <td v-text="props.item.mulai"></td>
                            <td v-text="props.item.selesai"></td>
                            <td class="justify-center layout pa-0 ma-0">
                                <v-icon small class="mr-2">edit</v-icon>
                                <v-icon small>delete</v-icon>
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import { setTimeout, setInterval } from 'timers';
export default {
    data() {
        return {
            dialog: false,
            editDialog: false,
            editing: false,
            edit: {
                type: 0,
                id: '',
                value: '',
                newValue: ''
            },
            roomName: '',
            sessionName: '',
            sessionStart: '',
            sessionEnd: '',
            modal: false,
            modal2: false,
            valid: true,
            type: null,
            input: true,
            rooms: [],
            sessions: [],
            roomsHeader: [{text: 'ID', value: 'id', sortable: true, align: 'left', width: '10px'}, {text: 'Nama Ruangan', value: 'nama', sortable: true, align: 'left'}, { text: 'Aksi', value: 'nama', sortable: false, align: 'center', width: '10px' }],
            sessionsHeader: [
                {text: 'ID', value: 'id', sortable: true, align: 'left', width: '10px'},
                {text: 'Nama', value: 'nama', sortable: true, align: 'left'},
                {text: 'Mulai', value: 'mulai', sortable: true, align: 'left'},
                {text: 'Selesai', value: 'selesai', sortable: true, align: 'left'},
                { text: 'Aksi', value: 'nama', sortable: false, align: 'center', width: '10px' }
            ]
        }
    },

    created() {
        this.$store.state.auth.token ? this.fetchRoomsAndSessions() : null
    },  

    methods: {
        ...mapActions([
            'showSnackbar'    
        ]),

        async fetchRoomsAndSessions() {
            try {
                const res = await axios.get('/exams/get_room_session/', {headers: { 'Authorization': this.$store.getters.authToken}})
                this.rooms = res.data.Ruang
                this.sessions = res.data.Sesi
            } catch (err) {
                this.showSnackbar({
                    message: e.message,
                    type: 'error'
                })
            }
        },

        showDialog(type) {
            this.type = type
            this.dialog = true
            this.input = true
        },

        discard() {
            this.roomName = ''
            this.sessionName = ''
            this.sessionStart = ''
            this.sessionEnd = ''
            this.type = null
            this.dialog = false
        },

        discardEdit() {
            this.edit = {
                value: '',
                newValue: '',
                id: '',
                type: 0
            }
            this.editDialog = false
        },

        editRoom(type, id, nama) {
            this.edit = {
                value: nama,
                newValue: nama,
                id,
                type
            }
            this.editDialog = true
        },

        async saveEditedRoom() {
            try {
                await axios.put('/', {nama: this.edit.newValue}, this.$store.getters.authHeaders)
                this.rooms[this.rooms.indexOf(room => room.id == this.edit.id)] = { id: this.edit.id,  nama: this.edit.newValue}
            } catch (error) {
                this.showSnackbar(error)
            }
        },

        async deleteRoom() {
            this.editing = true
        }
    }
}
</script>

<style lang="sass">
    .tables
        padding-left: 0 !important
        padding-right: 0 !important

        .v-table__overflow
            border: 1px solid #c5c5c5
            margin-top: 8px
            

        table.v-table 
            thead tr
                height: 40px

                th
                    color: rgba(0, 0, 0, 1) !important

            th:first-of-type, td:first-of-type
                text-align: center
                
            th, td 
                padding: 0 8px !important
            
            tr td:not(:last-of-type),
            tr th:not(:last-of-type)
                border-right: 1px solid #c5c5c5
</style>
