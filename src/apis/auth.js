import axios from './instance'

export default {
    login: async (id_token) => await axios.post('/auth/login-google/', {token: id_token}),
    logout: async () => await axios.post('/auth/logout/')
}