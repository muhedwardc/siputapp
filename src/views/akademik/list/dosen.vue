<template>
    <app-list-container>
        <template v-slot:header>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class="ma-0" dark v-on="on">Tambah pengguna</v-btn>
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
                                <v-text-field :disabled="creating" v-model="editedItem.nama" label="Nama"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field :disabled="creating" v-model="editedItem.email" label="Email"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field :disabled="creating" v-model="editedItem.nip" label="NIP"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-select
                                    v-model="editedItem.prodi"
                                    :items="prodiOptions"
                                    :rules="[v => !!v || 'Item is required']"
                                    label="Prodi"
                                    required
                                    :disabled="creating"
                                    ></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <v-select
                                    v-model="editedItem.konsentrasi"
                                    :items="konsentrasi"
                                    :rules="[v => !!v || 'Item is required']"
                                    label="Konsentrasi"
                                    :disabled="!editedItem.prodi || creating"
                                    required
                                    ></v-select>
                            </v-flex>
                            </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn :disabled="creating" color="error" @click="close">Batal</v-btn>
                        <v-btn :loading="creating" v-if="!editTemp.id" color="success" @click="save">Simpan</v-btn>
                        <v-btn :loading="creating" v-else-if="hasChanged && editTemp.id" color="success" @click="update">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Cari Dosen"
                :disabled="creating"
                single-line
                hide-details
                solo
                class="no-message solid-input"
            ></v-text-field>
        </template>
        <template v-slot:list>
            <v-data-table
                class="solid-container zebra-column"
                :headers="headers"
                :search="search"
                :items="users"
                :rows-per-page-items="perPage"
                :loading="loading">
                <template slot="headerCell" slot-scope="props">
                    <span class="black--text font-weight-bold" style="font-size: 13px">
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
                    <td class="text-xs-left">{{ props.item.prodi }}</td>
                    <td class="text-xs-left">{{ props.item.konsentrasi }}</td>
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
                    Anda ingin menghapus {{ deleteItem.nama }}
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
        </template>
    </app-list-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            valid: true,
            dialog: false,
            loading: false,
            creating: false,
            search: '',
            headers: [
                { text: 'Nama', align: 'left', sortable: true, value: 'nama' },
                { text: 'Email', value: 'email', sortable: true },
                { text: 'Prodi', value: 'prodi', sortable: true },
                { text: 'Konsentrasi', value: 'konsentrasi', sortable: true },
                { text: 'NIP', value: 'nip', sortable: false },
                { text: 'Aksi', value: 'nama', sortable: false, align: 'center' },
            ],
            roles: ['Dosen', 'Akademik'],
            prodiOptions: ['TE', 'TI'],
            prodi: ['Teknologi Elektro', 'Teknologi Informasi'],
            konsentrasiOptions: [
                ['STL', 'SIE'],
                ['RSI', 'RPL', 'RSK']
            ],
            deleteItem: {
                show: false,
                nama: '',
                id: ''
            },
            users: [],
            editedIndex: -1,
            editTemp: {},
            editedItem: {
                nama: '',
                prodi: '',
                konsentrasi: '',
                email: '',
                nip: '',
            },
            defaultItem: {
                nama: '',
                email: '',
                prodi: '',
                konsentrasi: '',
                nip: '',
            },
            perPage: [ 10 ],
            deleting: false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Pengguna' : 'Ubah Pengguna'
        },
        konsentrasi () {
            return this.editedItem.prodi == this.prodiOptions[0] ? this.konsentrasiOptions[0] : this.konsentrasiOptions[1]
        },
        hasChanged() {
            return this.editTemp.nama.trim() !== this.editedItem.nama.trim() || this.editTemp.email.trim() !== this.editedItem.email.trim() || this.editTemp.nip.trim() !== this.editedItem.nip.trim() || this.editTemp.prodi.trim() !== this.editedItem.prodi.trim() || this.editTemp.konsentrasi.trim() !== this.editedItem.konsentrasi.trim()
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
                const response = await this.$thessa.getAllDosen()
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

        showDeleteDialog(item) {
            this.deleteItem = {
                show: true,
                nama: item.nama,
                id: item.id
            }
        },

        editItem (props) {
            this.dialog = true
            const { nama, prodi, konsentrasi, email, nip } = props.item
            this.editTemp = props.item
            this.editedItem = {
                nama,
                email,
                nip,
                prodi,
                konsentrasi
            }
        },

        async deleteUser () {
            if (this.deleteItem.id) {
                try {
                    await this.$thessa.deleteUser(this.deleteItem.id)
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
                this.postUserData(this.editedItem)
            }
        },

        updateList(newUser) {
            for (var i in this.users) {
                if (this.users[i].id == newUser.id) {
                    Object.assign(this.users[i], newUser)
                    break;
                }
            }
        },

        async update () {
            const valid = this.$refs.form.validate()
            if (valid) {
                try {
                    const response = await this.$thessa.updateUser(this.editTemp.id, this.editedItem)
                    this.updateList(response.data)
                    this.showSnackbar({
                        message: 'Berhasil mengubah data pengguna',
                        type: 'success'
                    })
                    this.valid = true
                    this.creating = false
                    this.close()
                } catch (error) {
                    this.showSnackbar(error)
                    this.creating = false
                }
            }
        },

        async postUserData(user) {
            this.creating = true
            try {
                const response = await this.$thessa.createNewUser('dosen', user)
                this.users.push(response.data.users)
                this.showSnackbar({
                    message: response.data.message,
                    type: 'success'
                })
                this.creating = false
                this.valid = true
                this.close()
            } catch (error) {
                this.showSnackbar(error)
                this.creating = false
            }
        }
    }
}
</script>

