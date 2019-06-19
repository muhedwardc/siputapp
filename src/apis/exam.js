import axios from './instance'
import store from '../store'

export default {
    getAllExams: async () => await axios.get('/exams/'),
    getMyExams: async () => await axios.get('/me/exams/'),
    getMyExamsHistory: async () => await axios.get('/me/exams/history/'),
    getExamsByDate: async (date) => await axios.get(`/exams/?tanggal=${date}`),
    getExamsBetweenDate: async (start, end) => await axios.get(`/exams/?mulai=${start}&selesai=${end}`),
    getExamById: async (id) => await axios.get(`/${store.state.auth.user.is_admin ? '' : 'me/'}exams/${id}/`),
    getExamComments: async (id) => await axios.get(`/me/exams/${id}/comments/`),
    getExamGrades: async (id) => await axios.get(`/me/exams/${id}/grades/`),
    getExamRevision: async (id) => await axios.get(`/me/exams/${id}/revision/`),
    getExamRecap: async (id) => await axios.get(`/exams/${id}/recap/`),

    createNewExam: async (payload) => await axios.post('/exams/', payload),
    addThesis: async (name, formData) => await axios.post(`/exams/upload-skripsi/${name}`, formData),
    submitComments: async (id, payload) => await axios.post(`/me/exams/${id}/comments/`, payload),
    submitGrades: async (id, payload) => await axios.post(`/me/exams/${id}/grades/`, payload),
    submitRevision: async (id, payload) => await axios.post(`/me/exams/${id}/revision/`, payload),
}