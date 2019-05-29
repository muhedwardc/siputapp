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
    }
}

export default mutations