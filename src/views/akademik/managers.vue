<template>
    <v-layout column>
        <app-loading></app-loading>
        <template v-if="!$store.state.loadViewContent">
            <h3 class="mb-2">Pengurus Departemen</h3>
            <v-layout align-center>
                <h3 class="ma-0 mr-2">Kepala Departemen</h3>
                <v-icon small @click="editKadep">edit</v-icon>
            </v-layout>
            <p class="ma-0" v-text="kadep ? kadep.nama : ''"></p>
            <v-layout v-if="editingKadep">
                <v-autocomplete return-object item-text="nama" placeholder="Cari Dosen" v-model="kadepTemp" :items="dosen" :loading="loading" no-data-text="Data tidak ditemukan" :search-input.sync="search"></v-autocomplete>
                <template :disabled="assigning" v-if="kadep.user !== kadepTemp.id">
                    <v-btn :disabled="assigning" class="error" @click="reset">batal</v-btn>
                    <v-btn :loading="assigning" class="primary" @click="assignDosen('Kepala Departemen', kadepTemp.id)">simpan</v-btn>
                </template>
            </v-layout>
            <v-layout class="mt-2" align-center>
                <h3 class="ma-0 mr-2">Sekretaris Departemen</h3>
                <v-icon small @click="editSekretaris">edit</v-icon>
            </v-layout>
            <p class="ma-0" v-text="sekretaris ? sekretaris.nama : ''"></p>
            <v-layout v-if="editingSekretaris">
                <v-autocomplete return-object item-text="nama" placeholder="Cari Dosen" v-model="sekretaris" :items="dosen" :loading="loading" no-data-text="Data tidak ditemukan" :search-input.sync="search2"></v-autocomplete>
                <v-btn class="error" @click="reset">batal</v-btn>
                <v-btn class="primary" @click="assignDosen('Sekretaris', kadepTemp.id)">simpan</v-btn>
            </v-layout>
        </template>
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
            kadepTemp: null,
            sekretaris: null,
            sekretarisTemp: null,
            managers: null,
            editingKadep: false,
            editingSekretaris: false,
            loadManagers: false,
            assigning: false,
        }
    },

    methods: {
        async fetchUser() {
            this.$store.state.loadViewContent = true
            try {
                const response = await this.$thessa.getAllDosen('page=all')
                this.dosen = response.data.results
                await this.fetchManagers()
                this.$store.state.loadViewContent = false
            } catch (error) {
                this.$store.dispatch('showSnackbar', error)
                this.$store.state.loadViewContent = false
            }
        },

        async assignDosen(jabatan, user) {
            const data = { jabatan, user }
            this.assigning = true
            try {
                const response = await this.$thessa.postManager(data)
                const { data } = response
                if (data.jabatan == 'Kepala Departemen') this.kadep = data
                else this.sekretaris = data
                this.syncData()
                this.assigning = false
                this.$store.dispatch('showSnackbar', {message: 'Sukses', type: 'success'})
            } catch (error) {
                this.$store.dispatch('showSnackbar', error)
                this.assigning = false
            }
        },

        assignManagers(managers) {
            this.kadep = managers.find(manager => manager.jabatan == 'Kepala Departemen')
            this.sekretaris = managers.find(manager => manager.jabatan == 'Sekretaris')
            this.syncData()
        },

        syncData() {  
            this.kadepTemp = this.kadep
            this.sekretarisTemp = this.sekretaris
        },

        async fetchManagers() {
            this.loadManagers = false
            try {
                const response = await this.$thessa.getManagers()
                this.managers = response.data
                this.assignManagers(response.data)
                this.loadManagers = true
            } catch (error) {
                this.loadManagers = true
                this.$store.dispatch('showSnackbar', error)
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
            this.kadepTemp = this.kadep
            this.sekretarisTemp = this.sekretaris
        },
    },

    created() {
        this.fetchUser()
    }
}
</script>

