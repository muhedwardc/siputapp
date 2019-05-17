import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import './plugins/axios'

Vue.use(Vuex)

const userData = Cookies.getJSON('_usr')
const userToken = Cookies.getJSON('_tkn')

export default new Vuex.Store({
	state: {
		auth: {
			token: userToken || null,
			user: userData || null
		},
		snackbar: {
			show: false,
			message: '',
			type: 'success'
		},
		alert: {
			show: false,
			message: '',
			type: 'success',
			action: false
		},
		loadError: {
			show: false,
			message: 'Unable to load'
		},
		onExam: {
			id: false
		},
		sidebar: true,
		dashboard: false,
		dialog: false,
		drawer: true,
		loadViewContent: true
	},
	mutations: {
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
	},
	getters: {
		authToken: (state) => 'Token ' + state.auth.token,
		isLoggedIn: (state) => !!state.auth.token && !!state.auth.user,
		authHeaders: (state) => ({headers: {'Authorization': 'Token ' + state.auth.token}})
	},
	actions: {
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
		async get({ commit, state }, payload) {
			const header = {'Authorization': state.auth.token}
			try {
				const response = await axios.get(payload.path, header)
				return response
			} catch (error) {
				return commit('showSnackbar', error.message)
			}
		}
	}
})