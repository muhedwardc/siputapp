<template>
    <v-layout justify-center row v-if="user">
        <v-layout column class="profile-wrap">
            <v-form v-model="valid" ref="edit-profile">
            <v-layout row wrap align-center class="mb-3">
                <v-flex xs12 sm4>
                    <v-avatar>
                        <img v-if="user.image" :src="user.image" :alt="user.name">
                        <div v-else style="background-color: #eee; width: 100%; height: 100%; border-radius: 50%;"></div>
                    </v-avatar>
                </v-flex>
                <v-flex xs12 sm8>
                    <h3 v-text="user.email"></h3>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center>
                <v-flex xs12 sm4>
                    <b>Nama</b>
                </v-flex>
                <v-flex xs12 sm8>
                    <v-text-field :disabled="loading" :rules="[v => !!v.trim() || 'Harus diisi']" v-model="user.nama"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center>
                <v-flex xs12 sm4>
                    <b>NIP</b>
                </v-flex>
                <v-flex xs12 sm8>
                    <v-text-field :disabled="loading" :rules="[v => !!v.trim() || 'Harus diisi', v => !isNaN(v.replace(/\s/g, '')) || 'Hanya dapat berisi angka']" v-model="user.nip"></v-text-field>
                </v-flex>
            </v-layout>
            <template v-if="!user.is_admin">
                <v-layout row wrap align-center>
                    <v-flex xs12 sm4>
                        <b>Prodi</b>
                    </v-flex>
                    <v-flex xs12 sm8>
                        <v-select
                            v-model="user.prodi"
                            :items="prodiOptions"
                            :rules="[v => !!v || 'Harus diisi']"
                            required
                            :disabled="loading"
                            ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                    <v-flex xs12 sm4>
                        <b>Konsentrasi</b>
                    </v-flex>
                    <v-flex xs12 sm8>
                        <v-select
                            v-model="user.konsentrasi"
                            :items="konsentrasiOptions[selectedProdi]"
                            :rules="[v => !!v || 'Harus diisi']"
                            required
                            :disabled="loading"
                            ></v-select>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout>
                <v-spacer></v-spacer>
                <v-btn v-show="changed" class="secondary" @click="reset" :disabled="loading">reset</v-btn>
                <v-btn v-show="changed" class="primary" @click="saveChanges" :loading="loading">simpan</v-btn>
            </v-layout>
        </v-form>
        </v-layout>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            valid: true,
            selectedProdi: 0,
            prodiOptions: ['TE', 'TI'],
            konsentrasiOptions: [
                ['STL', 'SIE', 'SK'],
                ['RSI', 'RPL', 'RSK']
            ],
            loading: false
        }
    },

    watch: {
        'user.prodi': function(val, oldVal){
            this.selectedProdi = this.prodiOptions.indexOf(val)
            oldVal ? this.user.konsentrasi = this.konsentrasiOptions[this.selectedProdi][0] : null
        }
    },

    computed: {
        changed() {
            const auth = this.$store.state.auth
            const hasChanged =
                (this.user.nama && this.user.nama.trim() !== auth.user.nama.trim())
                || (this.user.nip && this.user.nip.trim() !== auth.user.nip.trim())
                || (this.user.prodi && this.user.prodi.trim() !== auth.user.prodi.trim())
                || (this.user.konsentrasi && this.user.konsentrasi.trim() !== auth.user.konsentrasi.trim())
            
            return hasChanged
        }
    },

    created() {
        this.user = JSON.parse(JSON.stringify(this.$store.state.auth.user))
    },

    methods: {
        async saveChanges() {
            this.$refs['edit-profile'].validate()
            if (this.valid) {
                this.loading = true
                try {
                    const res = await this.$thessa.updateMyProfile(this.user)
                    this.loading = false
                    this.$store.dispatch('updateUser', res.data.user)
                    this.$store.dispatch('showSnackbar', {message: 'Berhasil mengubah profil', type: 'success'})
                } catch(error) {
                    this.$store.dispatch('showSnackbar', error)
                    this.loading = false
                }
            }
        },
        reset() {
            this.user = JSON.parse(JSON.stringify(this.$store.state.auth.user))
        }
    }
}
</script>

<style lang="sass">
    .profile-wrap
        border: none
        padding: 8px
        background: #fff
        border-radius: 4px
    
    @media (min-width: 600px)
        .profile-wrap
            max-width: 900px
            border: 1px solid #eee
            padding: 16px

            > form > div > div:first-of-type
                text-align: right
                padding-right: 18px
</style>


