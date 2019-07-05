<template>
    <v-layout column>
        <button @click="signInWithGoogle" class="google-action mb-4">
            <template v-if="submitting">
                <v-progress-circular
                    class="google-button__icon"
                    indeterminate
                    color="primary"
                    :size="20"
                    ></v-progress-circular>
                <span class="google-button__text">Loading...</span>
            </template>
            <template v-else>
                <div class="icon">
                    <svg width="25" height="25"><g fill="none" fill-rule="evenodd"><path d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z" fill="#4285F4"></path><path d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z" fill="#34A853"></path><path d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z" fill="#FBBC05"></path><path d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z" fill="#EA4335"></path></g></svg>
                </div>
                <div>Masuk dengan Google</div>
            </template>
        </button>
        <button @click="signInWithGoogle" class="google-button">
            <template v-if="submitting">
                <v-progress-circular
                    class="google-button__icon"
                    indeterminate
                    color="primary"
                    :size="20"
                    ></v-progress-circular>
                <span class="google-button__text">Loading...</span>
            </template>
            <template v-else>
                <v-layout row align-center style="height: 100%;">
                    <span class="google-button__icon mr-3 ml-3">
                        <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/></svg>
                    </span>
                    <v-layout class="google-button__text pl-3 pr-3" align-center style="height: 100%; width: 100%;">
                        <span>Masuk dengan Google</span>
                    </v-layout>
                </v-layout>
            </template>
        </button>
        <span class="error--text mt-2" v-text="message"></span>
    </v-layout>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            isSignIn: null,
            submitting: false,
            message: '',
        }
    },

    computed: mapState({
        googleAuth: state => state.auth.google
    }),

    mounted() {
        this.loadGapi()
    },

    methods: {
        loadGapi() {
            window.gapi.load('client:auth2', () => {
                window.gapi.client.init({
                    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
                    scope: 'email profile'
                }).then(() => {
                    this.$store.dispatch('setAuthInstance', window.gapi.auth2.getAuthInstance())
                })
            })
        },

        async signInWithGoogle() {
            this.message = '' 
            this.googleAuth ? this.googleAuth.disconnect() : await this.loadGapi()
            try {
                this.googleAuth.signIn().then(() => {
                    const token = this.googleAuth.currentUser.get().getAuthResponse().id_token
                    this.logUserIn(token)
                })
            } catch (error) {
                if (error.error == 'network_error') this.message = 'Terdapat kesalahan dalam jaringan, mohon coba lagi.'
            }
        },

        async logUserIn(id_token) {
            this.message = ''
            this.submitting = true
            try {
                const res = await this.$thessa.login(id_token)
                this.$store.dispatch('logUserIn', res.data)
                this.submitting = false
                this.$router.push('/')
            } catch (error) {
                const res = error.response
                this.submitting = false
                this.$store.dispatch('logUserOut')
                this.message = res && res.status == 404 ? res.data.message : 'Terjadi kesalahan dalam proses autentikasi'
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.google-action {
    max-height: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #202020;
    border-color: #d4d4d4;
    background-color: #fff;
    border-radius: 6px;
    width: 100%;
    padding: .8rem;
    border-width: 1px;
    border-style: solid;
    cursor: pointer;
    background: white;
    outline: none;

    .icon {
        margin-bottom: -4px;
        margin-right: .5rem;
    }
}
.google-button {
    height: 40px;
    border-width: 0;
    background: white;
    color: #737373;
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
    transition-property: background-color, box-shadow;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    padding: 0;
    text-align: left;
    overflow: hidden;
    
    &:focus,
    &:hover {
        box-shadow: 1px 4px 5px 1px rgba(0,0,0,0.1);
    }
    
    &:active {
        background-color: #e5e5e5;
        box-shadow: none;
        transition-duration: 10ms;
    }
}
    
.google-button__icon {
    display: inline-block;
    vertical-align: middle;
    margin: 8px 0 8px 8px;
    width: 18px;
    height: 18px;
    box-sizing: border-box;
}

.google-button__text {
    background: #4587F4;
    box-sizing: border-box;
    color: white;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto',arial,sans-serif;
}
</style>

