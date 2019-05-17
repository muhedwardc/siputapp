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
                        <v-form
                            ref="form"
                            class="login-form"
                            v-model="valid"
                            @keyup.native.enter="login"
                            lazy-validation>

                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="Email"
                                required
                                :disabled="isSubmitting"
                                autocomplete="email"
                                class="mb-2"
                                ></v-text-field>

                            <v-text-field
                                v-model="password"
                                :rules="passwordRules"
                                label="Password"
                                type="password"
                                autocomplete="password"
                                required
                                :disabled="isSubmitting"
                                ></v-text-field>
                            
                            <!-- <v-btn class="mt-4 font-weight-light" round color="primary" @click="login()" :loading="isSubmitting" :disabled="isSubmitting">Login</v-btn> -->
                            <v-btn id="google-btn" class="mt-4 font-weight-light" round color="primary" @click="googleLogin()" :loading="isSubmitting" :disabled="isSubmitting">Masuk dengan Google</v-btn>
                        </v-form>
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
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'E-mail is required',
                // v => (v && v.length >= 6) || 'Name must be 6 characters or more'
            ],
            isSubmitting: false
        }
    },

    methods: {
        ...mapActions([
            'logUserIn',
            'removeCookies',
            'showSnackbar'
        ]),

        validate() {
            return this.$refs.form.validate()
        },

        login() {
            const valid = this.validate()
            if (valid) {
                this.isSubmitting = true
                axios.post('/auth/login/', {
                    email: this.email,
                    password: this.password
                }, {})
                .then(r => {
                    this.logUserIn(r.data)
                        .then(() => this.$router.push('/'))
                })
                .catch(err => {
                    this.isSubmitting = false
                    this.removeCookies()
                    this.showSnackbar({
                        type: 'error',
                        message: err.message
                    })
                })
            }
        },

        async googleLogin() {
            this.isSubmitting = true
            try {
                const user = await this.$gAuth.signIn()
                const token = user.getAuthResponse().id_token
                const res = await axios.post('/auth/login-google/', {token})
                await this.logUserIn(res.data)
                this.isSubmitting = false
                this.$router.push('/')
            } catch (error) {
                this.isSubmitting = false
                this.removeCookies()
                this.showSnackbar(error)
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
