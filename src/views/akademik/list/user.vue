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
                                <v-select
                                    v-model="editedItem.role"
                                    :items="roles"
                                    :rules="[v => !!v || 'Item is required']"
                                    label="Status"
                                    required
                                    ></v-select>
                            </v-flex>
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
                <v-layout :value="!users" class="pa-2" justify-center>
                    Tidak ada pengguna untuk ditampilkan.<br>
                    <v-btn color="primary" @click="initialize">Muat ulang</v-btn>
                </v-layout>
            </template>
            <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.nama }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.role == 1 ? 'Akademik' : 'Dosen' }}</td>
                <td class="text-xs-left">{{ props.item.nip }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                    <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                </td>
            </template>
        </v-data-table>
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
                { text: 'Actions', value: 'nama', sortable: false },
            ],
            roles: ['Dosen', 'Akademik'],
            users: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                email: '',
                role: '',
                nip: '',
                password: '',
                confirmPassword: ''
            },
            defaultItem: {
                name: '',
                email: '',
                role: '',
                nip: '',
                password: '',
                confirmPassword: ''
            },
            perPage: [ 10, 15, 25, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ]
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Pengguna' : 'Ubah Pengguna'
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    created () {
        this.initialize()
    },

    methods: {
        ...mapActions([
			'showSnackbar'
        ]),
        
        initialize () {
            this.loading = true
            axios.get('/users/', {
                headers: {
                    'Authorization': this.$store.getters.authToken
                }
            })
            .then(r => {
                this.users = r.data
                this.loading = false
            })
            .catch(err => {
                this.showSnackbar({
                    message: err.message,
                    type: 'error'
                })
                this.loading = false
            })
        },

        matchPassword () {
            return (this.editedItem.password == this.editedItem.confirmPassword) ? '' : 'Password doesn\'t match'
        },

        editItem (item) {
            // this.editedIndex = this.desserts.indexOf(item)
            // this.editedItem = Object.assign({}, item)
            // this.dialog = true
        },

        deleteItem (item) {
            // const index = this.desserts.indexOf(item)
            // confirm('Apakah anda yakin untuk menghapus pengguna ini?') && this.desserts.splice(index, 1)
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
                const { name, email, role, password } = this.editedItem
                axios.post(`/users/${role.toLowerCase()}/`, {
                    nama: name,
                    email,
                    password
                }, {
                    headers: {
                        'Authorization': this.$store.getters.authToken
                    }
                })
                .then(r => {
                    this.users.push(r.data.users)
                    this.showSnackbar({
                        message: r.data.message,
                        type: 'success'
                    })
                    this.close()
                })
                .catch(err => {
                    this.showSnackbar({
                        message: err.message,
                        type: 'error'
                    })
                    this.close()
                })
            }
            // if (this.editedIndex > -1) {
            //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
            // } else {
            //     this.desserts.push(this.editedItem)
            // }
        }
    }
}
</script>

<style lang="sass">
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


