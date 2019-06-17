<template>
    <div>
        <v-layout row flat color="white" align-center>
            <v-dialog v-model="editRoom.dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title class="headline pb-0">{{ editRoom.type == 0 ? 'Edit' : 'Hapus'}} Ruangan</v-card-title>
                    <v-card-text>
                        Ruangan terpilih: {{ editRoom.oldValue }}
                        <v-form ref="edit-form" v-if="editRoom.type == 0">
                            <v-text-field v-model="editRoom.value" :disabled="editing" label="Nama Ruangan"></v-text-field>
                        </v-form>
                        <p v-else class="mb-0">Apakah anda ingin menghapus <b>{{ editRoom.value }}</b>?</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error darken-1" :disabled="editing" @click="reset">Batal</v-btn>
                        <v-btn v-if="editRoom.type == 0 && editRoom.value.trim() && editRoom.value.trim() != editRoom.oldValue.trim()" color="success darken-1" :loading="editing" @click="saveEditedRoom">Ubah</v-btn>
                        <v-btn v-else-if="editRoom.type == 1" color="success darken-1" @click="deleteRoom" :loading="editing">Hapus</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="editSession.dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title class="headline pb-0">{{ editSession.type == 0 ? 'Edit' : 'Hapus'}} Sesi</v-card-title>
                    <v-card-text>
                        Sesi terpilih: {{ editSession.sessionName }}
                        <v-form ref="edit-form" v-if="editSession.type == 0">
                            <v-flex xs12>
                                <v-text-field v-model="editSession.sessionName" :disabled="!input" label="Nama Sesi"></v-text-field>
                                <v-dialog
                                    ref="dialog3"
                                    v-model="modal3"
                                    :return-value.sync="editSession.sessionStart"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="editSession.sessionStart"
                                            label="Jam Mulai. Contoh: 08:00"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        format="24hr"
                                        v-if="modal3"
                                        v-model="editSession.sessionStart"
                                        full-width>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="modal3 = false">Batal</v-btn>
                                        <v-btn flat color="primary" @click="$refs.dialog3.save(editSession.sessionStart)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                                <v-dialog
                                    ref="dialog4"
                                    v-model="modal4"
                                    :return-value.sync="editSession.sessionEnd"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="editSession.sessionEnd"
                                            label="Jam Mulai. Contoh: 10:00"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        format="24hr"
                                        v-if="modal4"
                                        v-model="editSession.sessionEnd"
                                        full-width>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="modal4 = false">Batal</v-btn>
                                        <v-btn flat color="primary" @click="$refs.dialog4.save(editSession.sessionEnd)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-flex>
                        </v-form>
                        <p v-else class="mb-0">Apakah anda ingin menghapus sesi <b>{{ editSession.sessionName }}?</b>?</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error darken-1" :disabled="editing" @click="reset">Batal</v-btn>
                        <v-btn v-if="editSession.type == 0 && sessionHasEdited" color="success darken-1" :loading="editing" @click="saveEditedSession">Ubah</v-btn>
                        <v-btn v-else-if="editSession.type == 1" color="success darken-1" @click="deleteSession" :loading="editing">Hapus</v-btn>
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
                        <v-btn color="error" v-if="!creating" @click="discard()">Batal</v-btn>
                        <v-btn color="success" :loading="creating" @click="createNew(type)">Simpan</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-container grid-list-xl class="no-h-paddings tables">
            <v-layout row wrap>
                <v-flex xs12 sm6 class="pt-0">
                    <v-layout class="ma-0" row justify-space-between align-center>
                        <h3 class="font-weight-regular">Daftar Ruangan</h3>
                        <v-btn color="primary text-capitalize" dark class="mb-2" @click="showDialog(0)">Tambah Ruangan</v-btn>
                    </v-layout>
                    <v-data-table
                        hide-actions
                        :headers="roomsHeader"
                        :items="rooms">
                        <template v-slot:items="props">
                            <td v-text="props.index + 1"></td>
                            <td v-text="props.item.nama"></td>
                            <td class="justify-center layout pa-0 ma-0">
                                <v-icon small class="mr-2" @click="editRoomData(0, props.item.id, props.item.nama)">edit</v-icon>
                                <v-icon small @click="editRoomData(1, props.item.id, props.item.nama)">delete</v-icon>
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
                <v-flex xs12 sm6 class="pt-0">
                    <v-layout class="ma-0" row justify-space-between align-center>
                        <h3 class="font-weight-regular">Daftar Ruangan</h3>
                        <v-btn color="primary" dark class="mb-2 text-capitalize" @click="showDialog(1)">Tambah Sesi</v-btn>
                    </v-layout>
                    <v-data-table
                        hide-actions
                        :headers="sessionsHeader"
                        :items="sessions">
                        <template v-slot:items="props">
                            <td v-text="props.index + 1"></td>
                            <td v-text="props.item.nama"></td>
                            <td v-text="props.item.mulai"></td>
                            <td v-text="props.item.selesai"></td>
                            <td class="justify-center layout pa-0 ma-0">
                                <v-icon small class="mr-2" @click="editSessionData(0, props.item)">edit</v-icon>
                                <v-icon small @click="editSessionData(1, props.item)">delete</v-icon>
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
export default {
    data() {
        return {
            dialog: false,
            editDialog: false,
            editing: false,
            editRoom: {
                id: '',
                type: 0,
                dialog: false,
                oldValue: '',
                value: '',
            },
            editSession: {
                id: '',
                type: 0,
                dialog: false,
                sessionStart: '',
                sessionEnd: '',
                sessionName: '',
                oldSessionStart: '',
                oldSessionEnd: '',
                oldSessionName: '',
            },
            roomName: '',
            sessionName: '',
            sessionStart: '',
            sessionEnd: '',
            modal: false,
            modal2: false,
            modal3: false,
            modal4: false,
            valid: true,
            type: null,
            types: ['rooms', 'sessions'],
            creating: false,
            input: true,
            rooms: [],
            sessions: [],
            roomsHeader: [{text: 'No.', value: 'id', sortable: true, align: 'left', width: '10px'}, {text: 'Nama Ruangan', value: 'nama', sortable: false, align: 'left'}, { text: 'Aksi', value: 'nama', sortable: false, align: 'center', width: '10px' }],
            sessionsHeader: [
                {text: 'No.', value: 'id', sortable: true, align: 'left', width: '10px'},
                {text: 'Nama', value: 'nama', sortable: true, align: 'left'},
                {text: 'Mulai', value: 'mulai', sortable: true, align: 'left'},
                {text: 'Selesai', value: 'selesai', sortable: true, align: 'left'},
                {text: 'Aksi', value: 'nama', sortable: false, align: 'center', width: '10px'}
            ]
        }
    },

    created() {
        this.$store.state.auth.token ? this.fetchRoomsAndSessions() : null
    },

    computed: {
        sessionHasEdited() {
            const {sessionStart, sessionEnd, sessionName, oldSessionStart, oldSessionEnd, oldSessionName}  = this.editSession
            return sessionStart && sessionStart.trim() != oldSessionStart || sessionEnd && sessionEnd.trim() != oldSessionEnd || sessionName && sessionName.trim() != oldSessionName
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'    
        ]),

        async fetchRoomsAndSessions() {
            try {
                const res = await this.$thesa.getRoomsAndSessions()
                this.rooms = res.data.Ruang
                this.sessions = res.data.Sesi
            } catch (error) {
                this.showSnackbar(error)
            }
        },

        async createNew(type) {
            this.creating = true
            let data = {}
            type == 0 ? data = {nama: this.roomName.trim()} : data = {nama: this.sessionName, mulai: this.sessionStart, selesai: this.sessionEnd}
            try {
                const res = type == 0 ? await this.$thesa.createNewRoom(data) : await this.$thesa.createNewSession(data)
                this[this.types[type]] = res.data
                this.showSnackbar({message: 'Berhasil membuat ' + type == 0 ? 'Ruangan' : 'Sesi' + ' baru', type: 'success'})
                this.creating = false
                this.discard()
            } catch (error) {
                this.showSnackbar(error)
                this.creating = false
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

        reset() {
            this.editRoom = {
                type: 0,
                id: '',
                value: '',
                oldValue: '',
                dialog: false
            }
            this.editSession = {
                id: '',
                type: 0,
                dialog: false,
                sessionStart: '',
                sessionEnd: '',
                sessionName: '',
                oldSessionStart: '',
                oldSessionEnd: '',
                oldSessionName: '',
            }
        },

        editRoomData(type, id, nama) {
            this.editRoom = {
                type,
                value: nama,
                oldValue: nama,
                id,
                dialog: true
            }
        },

        editSessionData(type, payload) {
            this.editSession = {
                id: payload.id,
                type,
                dialog: true,
                sessionStart: payload.mulai,
                sessionEnd: payload.selesai,
                sessionName: payload.nama,
                oldSessionStart: payload.mulai,
                oldSessionEnd: payload.selesai,
                oldSessionName: payload.nama,
            }
        },

        async saveEditedRoom() {
            this.editing = true
            try {
                const res = await this.$thesa.updateRoom(this.editRoom.id, {nama: this.editRoom.value})
                this.showSnackbar({message: 'Berhasil mengubah ruangan', type: 'success'})
                this.rooms = res.data
                this.reset()
                this.editing = false
            } catch (error) {
                this.showSnackbar(error)
            }
        },

        async deleteItem(id, type) {
            this.editing = true
            let str = type == 0 ? 'Ruangan' : 'Sesi'
            try {
                await type == 0 ? this.$thesa.deleteRoom(id) : this.$thesa.deleteSession(id)
                this.showSnackbar({message: 'Berhasil menghapus ' + str, type: 'success'})
                this[this.types[type]].splice(this[this.types[type]].findIndex(item => item.id == id))
                this.editing = false
                this.reset()
            } catch (error) {
                error.response && error.response.status == 500 
                    ? this.showSnackbar(str + ' sedang digunakan untuk ujian')
                    : this.showSnackbar(error)
                this.editing = false
            }
        },

        deleteRoom() {
            this.deleteItem(this.editRoom.id, 0)
        },

        deleteSession() {
            this.deleteItem(this.editSession.id, 1)
        },

        async saveEditedSession() {
            this.editing = true
            try {
                const res = await this.$thesa.updateSession(this.editSession.id, {nama: this.editSession.sessionName, mulai: this.editSession.sessionStart, selesai: this.editSession.sessionEnd})
                this.showSnackbar({message: 'Berhasil mengubah ruangan', type: 'success'})
                this.sessions = res.data
                this.reset()
                this.editing = false
            } catch (error) {
                this.editing = false
                this.showSnackbar(error)
            }
        },
    }
}
</script>

<style lang="sass">
    .no-h-paddings
        padding-top: 0
        padding-bottom: 0

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
