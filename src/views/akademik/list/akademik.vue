<template>
    <app-list-container>
        <template v-slot:header>
            <v-btn color="primary" class="ma-0" dark @click="dialog = true">Tambah Akademik</v-btn>
            <v-dialog v-model="dialog" max-width="500px">
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
                label="Cari Akademik"
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
                { text: 'NIP', value: 'nip', sortable: false },
                { text: 'Aksi', value: 'nama', sortable: false, align: 'center' },
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
                email: '',
                nip: '',
            },
            defaultItem: {
                nama: '',
                email: '',
                nip: '',
            },
            perPage: [ 10 ],
            deleting: false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Akademik' : 'Ubah Akademik'
        },

        hasChanged() {
            return this.editTemp.nama.trim() !== this.editedItem.nama.trim() || this.editTemp.email.trim() !== this.editedItem.email.trim() || this.editTemp.nip.trim() !== this.editedItem.nip.trim()
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
                const response = await this.$thessa.getAllAkademik()
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

        showDeleteDialog({nama, id}) {
            this.deleteItem = {
                show: true,
                nama,
                id
            }
        },

        editItem (props) {
            this.dialog = true
            this.editTemp = props.item
            this.editedItem = {nama: props.item.nama, email: props.item.email, nip: props.item.nip}
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
                let user = this.editedItem
                this.postUserData(user)
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
                const response = await this.$thessa.createNewUser('akademik', user)
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