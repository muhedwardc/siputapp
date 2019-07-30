<template>
    <v-layout column>
        <button @click="signInWithGoogle" class="google-action">
            <template v-if="submitting">
                <v-progress-circular
                    indeterminate
                    color="primary"
                    :size="20"
                    ></v-progress-circular>
                <span class="ml-3">Loading...</span>
            </template>
            <template v-else>
                <div class="icon">
                    <svg width="25" height="25"><g fill="none" fill-rule="evenodd"><path d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z" fill="#4285F4"></path><path d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z" fill="#34A853"></path><path d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z" fill="#FBBC05"></path><path d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z" fill="#EA4335"></path></g></svg>
                </div>
                <div>Masuk dengan Google</div>
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
            isInit: false,
            isSignIn: false,
        }
    },

    computed: mapState({
        googleAuth: state => state.auth.google
    }),

    created() {
        let that = this;
        let checkGauthLoad = setInterval(function() {
            that.isInit = that.$gAuth.isInit;
        if (that.isInit) clearInterval(checkGauthLoad);
        }, 1000);
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
            this.$gAuth.signIn()
                .then(GoogleUser => {
                    this.logUserIn(GoogleUser.getAuthResponse().id_token)
                })
                .catch(error  => {
                    if (error.error == 'network_error') this.message = 'Terdapat kesalahan dalam jaringan, mohon coba lagi.'
                })
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
    border-radius: 8rem;
    font-size: 1.1rem;
    width: 100%;
    padding: .8rem;
    border-width: 1px;
    border-style: solid;
    cursor: pointer;
    background: white;
    outline: none;
    transition-property: background-color, box-shadow;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;

    &:focus,
    &:hover {
        box-shadow: 0px 2px 5px 1px rgba(0,0,0,0.1);
    }
    
    &:active {
        background-color: #e5e5e5;
        box-shadow: none;
        transition-duration: 10ms;
    }

    .icon {
        margin-bottom: -4px;
        margin-right: .5rem;
    }
}
</style>

