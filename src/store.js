import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const userData = Cookies.getJSON('_usr')

export default new Vuex.Store({
	state: {
		auth: {
			token: userData && userData.token ? userData.token : '',
			user: userData && userData.user ? userData.user : {},
			loggedIn: false
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
	},
	mutations: {
		logUserIn(state, payload) {
			state.auth.token = payload.token
			state.auth.user = payload.user
			Cookies.set('_usr', payload)
		},
		showSnackbar(state, payload) {
			state.snackbar = {
				show: true,
				message: payload.message ? payload.message : payload,
				type: payload.type ? payload.type : 'success'
			}
		},
		showAlert(state, payload) {
			state.snackbar = {
				show: true,
				message: payload.message ? payload.message : payload,
				type: payload.type ? payload.type : 'success',
				action: payload.action ? payload.action : false
			}
		},
		removeCookies(state) {
			state.auth.token = ''
			state.auth.user = {}
			Object.keys(Cookies.get()).forEach(function(cookieName) {
				Cookies.remove(cookieName)
			})
		}
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
		}
	}
})