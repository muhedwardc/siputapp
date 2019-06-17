<template>
    <v-layout column>
        <h3 class="mb-2">Pengurus Departemen</h3>
        <v-layout align-center>
            <h3 class="ma-0 mr-2">Kepala Departemen</h3>
            <v-icon small @click="editKadep">edit</v-icon>
        </v-layout>
        <p class="ma-0">Muhammad Edward Chakim</p>
        <v-layout v-if="editingKadep">
            <v-autocomplete item-text="nama" placeholder="Cari Dosen" v-model="kadep" :items="dosen" :loading="loading" no-data-text="Data tidak ditemukan" :search-input.sync="search"></v-autocomplete>
            <v-btn class="error" @click="reset">batal</v-btn>
            <v-btn class="primary">simpan</v-btn>
        </v-layout>
        <v-layout class="mt-2" align-center>
            <h3 class="ma-0 mr-2">Sekretaris Departemen</h3>
            <v-icon small @click="editSekretaris">edit</v-icon>
        </v-layout>
        <p class="ma-0">Muhammad Edward Chakim</p>
        <v-layout v-if="editingSekretaris">
            <v-autocomplete item-text="nama" placeholder="Cari Dosen" v-model="sekretaris" :items="dosen" :loading="loading" no-data-text="Data tidak ditemukan" :search-input.sync="search2"></v-autocomplete>
            <v-btn class="error" @click="reset">batal</v-btn>
            <v-btn class="primary">simpan</v-btn>
        </v-layout>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            dosen: [],
            loading: false,
            search: null,
            search2: null,
            kadep: null,
            sekretaris: null,
            editingKadep: false,
            editingSekretaris: false,
        }
    },

    methods: {
        async fetchUser() {
            this.loading = true
            try {
                const response = await this.$thesa.getAllUsers()
                this.getDosen(response.data.results)
                this.loading = false
            } catch (error) {
                this.$store.dispatch('showSnackbar', error)
                this.loading = false
            }
        },

        editKadep() {
            this.editingKadep = true
        },

        editSekretaris() {
            this.editingSekretaris = true
        },

        reset() {
            this.editingKadep = false
            this.editingSekretaris = false
            this.kadep = null
            this.sekretaris = null
        },

        getDosen(users) {
            this.dosen = users.filter(user => !user.is_admin)
        }
    },

    mounted() {
        this.fetchUser()
    }
}
</script>

