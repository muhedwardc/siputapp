<template>
    <v-layout row wrap>
        <v-flex hidden-sm-and-down md7 class="banner">
            <v-layout column class="welcome" pa-4>
                <h2>Selamat datang!</h2>
                <h3 class="font-weight-light">Silahkan masuk mengggunakan akun UGM Anda</h3>
            </v-layout>
        </v-flex>
        <v-flex sm12 md5>
            <v-container class="form-container">
                <v-layout align-center>
                    <v-layout column>
                        <h2 class="mb-4">Login to App</h2>
                        <v-btn id="google-btn" class="mt-4 font-weight-light" round color="primary" :loading="isSubmitting" :disabled="isSubmitting">Masuk dengan Google</v-btn>
                        <span v-if="error" class="error--text text-xs-center" v-text="message"></span>
                    </v-layout>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            valid: true,
            email: '',
            password: '',
            message: '',
            error: false,
            isSubmitting: false
        }
    },
    
    mounted () {
        this.loadGapi()
    },

    methods: {
        ...mapActions([
            'logUserIn',
            'logUserOut',
            'showSnackbar'
        ]),

        validate() {
            return this.$refs.form.validate()
        },

        async loadGapi() {
            this.error = false
            try {
                await window.gapi
                window.gapi.load('auth2', () => {
                    const auth2 = window.gapi.auth2.init({
                        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
                        cookiepolicy: 'single_host_origin'
                    })

                    auth2.attachClickHandler(document.getElementById('google-btn'), {},
                        (googleUser) => {
                            const token = googleUser.getAuthResponse().id_token
                            this.googleLogin(token)
                        }
                    )
                })
            } catch (error) {
                this.error = true
                this.message = 'Terjadi kesalahan koneksi ke server, harap coba lagi atau muat ulang halaman'
                console.log(error)
                this.showSnackbar(error)
            }
        },

        async googleLogin(token) {
            this.isSubmitting = true
            try {
                const res = await axios.post('/auth/login-google/', {token})
                await this.logUserIn(res.data)
                this.isSubmitting = false
                this.$router.push('/')
            } catch (error) {
                this.isSubmitting = false
                this.message = error.message
                this.logUserOut()
                this.showSnackbar(error.message)
            }
        }
    }
}
</script>

<style lang="scss">
    .banner {
        position: relative;

        &:before {
            background-image: url('https://images.unsplash.com/photo-1551289140-01081581fb36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            filter: brightness(20%);
            content: "";
        }

        .welcome {
            font-size: 20px;
            color: white;
            position: absolute;
            bottom: 40%;
            left: 40px;
        }
    }

    .form-container {
        width: 100%;
        height: 100%;
        padding-left: 10%;
        padding-right: 10%;

        > div {
            height: 100%;
        }

        .login-form {
            button {
                width: 100%;
                height: auto;
                padding-top: 12px;
                padding-bottom: 12px;
                margin: 0;
            }
        }
    }
</style>
