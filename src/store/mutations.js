import Cookies from 'js-cookie'
import moment from 'moment'

const mutations = {
    logUserIn(state, payload) {
        state.auth.token = payload.token
        state.auth.user = payload.user
        Cookies.set('_usr', payload.user)
        Cookies.set('_tkn', payload.token)
    },
    showSnackbar(state, payload) {
        state.snackbar = {
            show: true,
            message: payload.message ? payload.message : payload,
            type: payload.type ? payload.type : 'error'
        }
    },
    removeCookies(state) {
        state.auth.token = null
        state.auth.user = null
        Object.keys(Cookies.get()).forEach(function(cookieName) {
            Cookies.remove(cookieName)
        })
    },
    async logUserOut(state) {
        state.auth.token = null
        state.auth.user = null
        state.auth.google ? await state.auth.google.signOut() : null
        await Object.keys(Cookies.get()).forEach(function(cookieName) {
            Cookies.remove(cookieName)
        })
    },
    updateUser(state, payload) {
        state.auth.user = { ...state.auth.user, ...payload }
        Cookies.set('_usr', state.auth.user)
    },
    setAuthInstance(state, authInstance) {
        state.auth.google = authInstance
        state.auth.isSignIn = authInstance.isSignedIn.get()
        authInstance.isSignedIn.listen(() => state.auth.isSignIn = state.auth.google.isSignedIn.get())
    }
}

export default mutations