import Cookies from 'js-cookie'

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
        await gapi.auth2.getAuthInstance().disconnect()
        await Object.keys(Cookies.get()).forEach(function(cookieName) {
            Cookies.remove(cookieName)
        })
    },
    updateUser(state, payload) {
        state.auth.user = { ...state.auth.user, ...payload }
        Cookies.set('_usr', state.auth.user)
    }
}

export default mutations