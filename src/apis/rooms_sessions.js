import axios from './instance'
import store from '../store'

export default {
    getRoomsAndSessions: async () => await axios.get('/exams/get_room_session/'),

    createNewRoom: async (payload) => await axios.post('/exams/rooms/', payload),
    createNewSession: async (payload) => await axios.post('/exams/sessions/', payload),

    updateRoom: async (id, payload) => await axios.put(`/exams/rooms/${id}/`, payload),
    updateSession: async (id, payload) => await axios.put(`/exams/sessions/${id}/`, payload),

    deleteRoom: async (id) => await axios.delete(`/exams/rooms/${id}/`),
    deleteSession: async (id) => await axios.delete(`/exams/sessions/${id}/`),
}