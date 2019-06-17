import axios from './instance'
import store from '../store'

export default {
    getAllUsers: async () => await axios.get('/users/'),
    getAllDosen: async () => await axios.get('/users/dosen/'),
    getAllAkademik: async () => await axios.get('/users/akademik/'),
    getMyProfile: async () => await axios.get('/me/profile/'),

    createNewUser: async (role, payload) => await axios.post(`/users/${role.toLowerCase()}/`, payload),

    updateUser: async (id, payload) => await axios.put(`/users/${id}/`, payload),
    updateMyProfile: async (payload) => await axios.put('/me/profile/', payload),

    deleteUser: async (id) => await axios.delete(`/users/${id}/`)
}