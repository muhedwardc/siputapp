<template>
    <div>
        <v-layout row flat color="white" align-center>
            <v-toolbar-title>Daftar Pengguna</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">Tambah pengguna</v-btn>
                </template>
                <v-card>
                    <v-card-title class="mb-0 pb-0 pl-4">
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text class="pt-2 pb-0">
                        <v-container>
                            <v-form ref="form" v-model="valid" lazy-validation>
                            <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field v-model="editedItem.name" label="Nama"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="editedItem.nip" label="NIP"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-select
                                    v-model="editedItem.role"
                                    :items="roles"
                                    :rules="[v => !!v || 'Item is required']"
                                    label="Status"
                                    required
                                    ></v-select>
                            </v-flex>
                            <template v-if="editedItem.role == roles[0]">
                                <v-flex xs12>
                                    <v-select
                                        v-model="editedItem.prodi"
                                        :items="prodiOptions"
                                        :rules="[v => !!v || 'Item is required']"
                                        label="Prodi"
                                        required
                                        ></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select
                                        v-model="editedItem.konsentrasi"
                                        :items="konsentrasi"
                                        :rules="[v => !!v || 'Item is required']"
                                        label="Konsentrasi"
                                        :disabled="!editedItem.prodi"
                                        required
                                        ></v-select>
                                </v-flex>
                            </template>
                            <v-flex xs12>
                                <v-text-field v-model="editedItem.password" label="Password" type="password"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="editedItem.confirmPassword" :error-messages="matchPassword()" label="Konfirmasi Password" type="password"></v-text-field>
                            </v-flex>
                            </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="save">Simpan</v-btn>
                        <v-btn color="success" @click="close">Batal</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-data-table
            class="user-table"
            :headers="headers"
            :items="users"
            :rows-per-page-items="perPage"
            :loading="loading">
            <template slot="headerCell" slot-scope="props">
                <span class="grey--text font-weight-medium" style="font-size: 13px">
                    {{ props.header.text }}
                </span>
            </template>
            <template v-slot:no-data>
                <v-layout :value="!users" class="pa-2" column align-center>
                    Tidak ada pengguna untuk ditampilkan.
                    <v-btn color="primary" @click="initialize">Muat ulang</v-btn>
                </v-layout>
            </template>
            <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.nama }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.is_admin ? 'Akademik' : 'Dosen' }}</td>
                <td class="text-xs-left">{{ props.item.nip }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(props)">edit</v-icon>
                    <v-icon small @click="showDeleteDialog(props.item)">delete</v-icon>
                </td>
            </template>
        </v-data-table>
        <v-dialog
            v-model="deleteItem.show"
            max-width="290">
            <v-card>
                <v-card-text>
                Anda ingin menghapus {{ deleteItem.name }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        v-show="!deleting"
                        color="green darken-1"
                        flat="flat"
                        @click="deleteItem.show = false">
                        Batal
                    </v-btn>

                    <v-btn
                        :loading="deleting"
                        color="green darken-1"
                        flat="flat"
                        @click="deleteUser">
                        Hapus
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            valid: true,
            dialog: false,
            loading: false,
            headers: [
                { text: 'Nama', align: 'left', sortable: true, value: 'nama' },
                { text: 'Email', value: 'email', sortable: true },
                { text: 'Status', value: 'status', sortable: true },
                { text: 'NIP', value: 'nip', sortable: false },
                { text: 'Aksi', value: 'nama', sortable: false },
            ],
            roles: ['Dosen', 'Akademik'],
            prodiOptions: ['TE', 'TI'],
            prodi: ['Teknologi Elektro', 'Teknologi Informasi'],
            konsentrasiOptions: [
                ['TTL', 'SIE'],
                ['RSI', 'RPL', 'RSK']
            ],
            deleteItem: {
                show: false,
                name: '',
                id: ''
            },
            users: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                prodi: '',
                konsentrasi: '',
                email: '',
                role: '',
                nip: '',
                password: '',
                confirmPassword: ''
            },
            defaultItem: {
                name: '',
                email: '',
                prodi: '',
                konsentrasi: '',
                role: '',
                nip: '',
                password: '',
                confirmPassword: ''
            },
            perPage: [ 10, 15, 25, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
            deleting: false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Pengguna' : 'Ubah Pengguna'
        },
        konsentrasi () {
            return this.editedItem.prodi == this.prodiOptions[0] ? this.konsentrasiOptions[0] : this.konsentrasiOptions[1]
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    created () {
        this.$store.state.auth.token ? this.initialize() : null
    },

    methods: {
        ...mapActions([
			'showSnackbar'
        ]),
        
        async initialize () {
            this.loading = true
            try {
                const response = await axios.get('/users/', this.$store.getters.authHeaders)
                this.users = response.data.results
                this.loading = false
            } catch (error) {
                this.showSnackbar({
                    message: err.message,
                    type: 'error'
                })
                this.loading = false
            }
        },

        matchPassword () {
            return (this.editedItem.password == this.editedItem.confirmPassword) ? '' : 'Password doesn\'t match'
        },

        showDeleteDialog(item) {
            this.deleteItem = {
                show: true,
                name: item.nama,
                id: item.id
            }
        },

        editItem (props) {
            this.dialog = true
            const { nama, prodi, konsentrasi, email, is_admin, nip, password, confirmPassword } = props.item
            this.editedItem = {
                name: nama,
                email,
                role: is_admin ? 'Akademik' : 'Dosen',
                nip,
                password,
                confirmPassword
            }

            if (!is_admin) {
                this.editedItem.prodi = prodi
                this.editedItem.konsentrasi = konsentrasi
            }
        },

        async deleteUser () {
            if (this.deleteItem.id) {
                try {
                    await axios.delete(`/users/${this.deleteItem.id}/`, this.$store.getters.authHeaders)
                    this.deleteItem.show = false
                    this.showSnackbar({
                        message: 'Berhasil menghapus dosen',
                        type: 'success'
                    })
                    this.users.splice(this.users.findIndex(user => user.id === this.deleteItem.id), 1)
                } catch(err) {
                    this.showSnackbar({
                        message: err.message,
                        type: 'error'
                    })
                }
            }
        },

        close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save () {
            const valid = this.$refs.form.validate()
            if (valid) {
                const { name, email, role, prodi, nip, konsentrasi, password } = this.editedItem
                let user = {
                    nama: name,
                    email,
                    password,
                    nip,
                }
                if (role == this.roles[0]) {
                    user['konsentrasi'] = konsentrasi
                    user['prodi'] = prodi
                }

                this.postUserData(role, user)
            }
        },

        async postUserData(role, user) {
            try {
                const response = await axios.post(`/users/${role.toLowerCase()}/`, user, this.$store.getters.authHeaders)
                this.users.push(response.data.users)
                this.showSnackbar({
                    message: response.data.message,
                    type: 'success'
                })
                this.close()
            } catch (error) {
                this.showSnackbar({
                    message: error.message,
                    type: 'error'
                })
                this.close()
            }
        }
    }
}
</script>

<style lang="sass">
    .user-table
        .v-datatable 
            tbody 
                tr 
                    td:first-of-type
                        padding-left: 0
                    td:last-of-type
                        padding-right: 0
            thead 
                tr 
                    th:first-of-type
                        padding-left: 0
                    th:last-of-type
                        padding-right: 0
</style>


