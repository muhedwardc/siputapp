const getters = {
    authToken: (state) => 'Token ' + state.auth.token,
    isLoggedIn: (state) => !!state.auth.token && !!state.auth.user,
    authHeaders: (state) => ({headers: {'Authorization': 'Token ' + state.auth.token}})
}

export default getters