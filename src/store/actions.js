const actions = {
    logUserIn({ commit }, payload) {
        commit('logUserIn', payload)
    },
    showSnackbar({ commit }, payload) {
        commit('showSnackbar', payload)
    },
    showAlert({ commit }, payload) {
        commit('showAlert', payload)
    },
    removeCookies({ commit }) {
        commit('removeCookies')
    }
}

export default actions