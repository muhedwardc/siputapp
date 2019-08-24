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
                                <v-text-field :disabled="creating" :rules="rules.required" v-model="editedItem.nama" label="Nama"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field :disabled="creating" :rules="rules.required && rules.email" v-model="editedItem.email" label="Email"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field :disabled="creating" :rules="rules.required && rules.number" v-model="editedItem.nip" label="NIP"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-select
                                    v-model="editedItem.prodi"
                                    :items="prodiOptions"
                                    :rules="rules.required"
                                    label="Prodi"
                                    required
                                    :disabled="creating"
                                    ></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <v-select
                                    v-model="editedItem.konsentrasi"
                                    :items="konsentrasi"
                                    :rules="rules.required"
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
                        <v-btn :loading="creating" v-if="!editTemp" color="success" @click="save">Simpan</v-btn>
                        <v-btn :loading="creating" v-else-if="hasChanged && editedItem" color="success" @click="update">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <app-search-box @on-search="onSearch($event)"></app-search-box>
        </template>
        <template v-slot:list>
            <v-data-table
                class="solid-container zebra-column"
                hide-actions
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
                        <v-btn color="primary" @click="getDosen(page)">Muat ulang</v-btn>
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
                <template v-slot:footer>
                    <app-pagination-footer :page="page" :totalItems="totalItems" :td="headers.length" @on-page-change="getDosen($event)"></app-pagination-footer>
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
            editTemp: null,
            rules: {
                required: [v => !!v || 'Borang isian tidak boleh kosong.'],
                email: [v => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v) || 'Email harus valid.'],
                number: [v => /^[\d ]+$/.test(v) || 'Borang isian harus berisi hanya angka.']
            },
            editedItem: {
                nama: '',
                email: '',
                prodi: '',
                konsentrasi: '',
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
            deleting: false,
            totalItems: 0,
            page: 1,
            textSearch: null
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
            let notChanged = true
            const a = this.editedItem
            const b = this.editTemp
            if (a && b) {
                for (const key in a) {
                    let tempA = a[key], tempB = b[key]
                    if (a[key]) tempA = tempA.trim()
                    if (b[key]) tempB = tempB.trim()

                    notChanged = notChanged && (tempA === tempB)
                }
            }
            return !notChanged
        }   
    },

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    created () {
        this.$store.state.auth.token ? this.getDosen() : null
    },

    methods: {
        async onSearch (text = '') {
            this.page = 1
            this.textSearch = text
            if (this.$store.state.cancelTokenSource) this.$store.state.cancelTokenSource.cancel()
            this.loading = true
            this.$store.state.useUploadProgress = true
            try {
                const response = await this.$thessa.getAllDosen('search=' + text)
                this.totalItems = response.data.count
                this.users = response.data.results
                this.page = 1
                this.loading = false
                this.$store.state.useUploadProgress = false
            } catch (error) {
                this.showSnackbar({
                    message: error.message,
                    type: 'error'
                })
                this.loading = false
                this.$store.state.useUploadProgress = false
            }
        },
        
        async getDosen (page = 1) {
            this.page = 1
            this.loading = true
            let qs = 'page=' + page
            if (this.textSearch) qs += '&search=' + this.textSearch
            try {
                const response = await this.$thessa.getAllDosen(qs)
                this.totalItems = response.data.count
                this.page = page
                this.users = response.data.results
                this.loading = false
            } catch (error) { 
                this.showSnackbar({
                    message: error.message,
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
            this.valid = true
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
            this.valid = true
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


