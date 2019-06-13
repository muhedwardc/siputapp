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
    },
    logUserOut({ commit }) {
        commit('logUserOut')
    },
    updateUser({commit}, payload) {
        commit('updateUser', payload)
    },
    setAuthInstance({commit}, payload) {
        commit('setAuthInstance', payload)
    }
}

export default actions