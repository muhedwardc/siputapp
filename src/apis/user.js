import axios from './instance'

export default {
    getAllUsers: async (qs) => await axios.get(`/users/${qs ? '?' + qs : ''}`),
    getAllDosen: async (qs) => await axios.get(`/users/dosen/${qs ? '?' + qs : ''}`),
    getAllAkademik: async (qs) => await axios.get(`/users/akademik/${qs ? '?' + qs : ''}`),
    getMyProfile: async () => await axios.get('/me/profile/'),
    getManagers: async () => await axios.get('/users/pengelola/'),

    createNewUser: async (role, payload) => await axios.post(`/users/${role.toLowerCase()}/`, payload),
    postManager: async (payload) => await axios.post('/users/pengelola/', payload),

    updateUser: async (id, payload) => await axios.put(`/users/${id}/`, payload),
    updateMyProfile: async (payload) => await axios.put('/me/profile/', payload),

    deleteUser: async (id) => await axios.delete(`/users/${id}/`)
}