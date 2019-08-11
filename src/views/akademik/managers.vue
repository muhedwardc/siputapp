<template>
    <v-layout class="managers solid-container pa-4" style="background: white;" column>
        <app-loading></app-loading>
        <template v-if="!$store.state.loadViewContent">
            <h3 class="mb-4">Pengurus Departemen</h3>
            <v-layout align-center>
                <h3 class="ma-0 mr-2">Kepala Departemen</h3>
                <v-icon small @click="editKadep">edit</v-icon>
            </v-layout>
            <p class="ma-0" v-text="kadep && kadep.nama ? kadep.nama : 'Kepala departemen belum dipilih.'"></p>
            <v-layout v-if="editingKadep">
                <v-autocomplete return-object item-text="nama" placeholder="Cari Dosen" v-model="kadepTemp" :items="dosen" :loading="loading" no-data-text="Data tidak ditemukan" :search-input.sync="search"></v-autocomplete>
                <template :disabled="assigning" v-if="kadepTemp.id && kadep.user !== kadepTemp.id && !isDuplicate(0)">
                    <v-btn :disabled="assigning" class="error" @click="reset">batal</v-btn>
                    <v-btn :loading="assigning" class="primary" @click="assignDosen('Kepala Departemen', kadepTemp.id)">simpan</v-btn>
                </template>
            </v-layout>
            <p v-if="isDuplicate(0)" class="red--text">Dosen ini telah didaftarkan menjadi Sekretaris.</p>
            <v-layout class="mt-2" align-center>
                <h3 class="ma-0 mr-2">Sekretaris Departemen</h3>
                <v-icon small @click="editSekretaris">edit</v-icon>
            </v-layout>
            <p class="ma-0" v-text="sekretaris && sekretaris.nama ? sekretaris.nama : 'Sekretaris departemen belum dipilih.'"></p>
            <v-layout v-if="editingSekretaris">
                <v-autocomplete return-object item-text="nama" placeholder="Cari Dosen" v-model="sekretarisTemp" :items="dosen" :loading="loading" no-data-text="Data tidak ditemukan" :search-input.sync="search"></v-autocomplete>
                <template :disabled="assigning" v-if="sekretarisTemp.id && sekretaris.user !== sekretarisTemp.id && !isDuplicate(1)">
                    <v-btn :disabled="assigning" class="error" @click="reset">batal</v-btn>
                    <v-btn :loading="assigning" class="primary" @click="assignDosen('Kepala Departemen', sekretarisTemp.id)">simpan</v-btn>
                </template>
            </v-layout>
            <p v-if="isDuplicate(1)" class="red--text">Dosen ini telah didaftarkan menjadi Kepala Departemen.</p>
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

    computed: {
        isDuplicate() {
            return function(type) {
                if (type == 0) {
                    if (this.kadepTemp && this.kadepTemp.id && this.sekretaris.user) {
                        return this.kadepTemp.id == this.sekretaris.user
                    }
                } else if (type == 1) {
                    if (this.sekretarisTemp && this.sekretarisTemp.id && this.kadep.user) {
                        return this.sekretarisTemp.id == this.kadep.user
                    }
                }
                return false
            }
        }
    },

    methods: {
        async fetchUser() {
            this.$store.state.loadViewContent = true
            try {
                const response = await this.$thessa.getAllDosen('page=all')
                this.dosen = response.data
                await this.fetchManagers()
                this.$store.state.loadViewContent = false
            } catch (error) {
                this.$store.dispatch('showSnackbar', error)
                this.$store.state.loadViewContent = false
            }
        },

        async assignDosen(jabatan, user) {
            this.assigning = true
            try {
                const response = await this.$thessa.postManager({jabatan, user})
                const { data } = response
                if (data.jabatan == 'Kepala Departemen') this.kadep = data
                else this.sekretaris = data
                this.reset()
                this.assigning = false
                this.$store.dispatch('showSnackbar', {message: 'Berhasil mengubah data pengurus', type: 'success'})
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

<style>
    .v-messages.theme--light {
        height: 0;
        min-height: 0;
    }
</style>

