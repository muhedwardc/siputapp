<template>
	<v-navigation-drawer 
		v-model="$store.state.sidebar" 
		width="220px" 
		app
		persistent
		mobile-break-point="991" 
		class="sidebar">
		<v-list class="profile pa-3">
			<v-layout justify-center class="pa-1">
				<img width="50px" height="50px" src="/static/images/ugm-logo.png" alt="ugm-logo">
			</v-layout>
		</v-list>
		<v-list>
			<v-list-tile
				v-for="route in routes" 
				:key="route.title"
				:to="route.path"
				exact>
				<v-list-tile-action>
				<v-icon>{{ route.icon }}</v-icon>
				</v-list-tile-action>

				<v-list-tile-content>
				<v-list-tile-title>{{ route.title }}</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
			<v-list-tile @click="logout()">
				<v-list-tile-action>
				<v-icon>logout</v-icon>
				</v-list-tile-action>

				<v-list-tile-content>
				<v-list-tile-title>Keluar</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import Cookies from 'js-cookie'
import { mapActions } from 'vuex'

export default {
	data() {
		return {
			dosenRoutes: [
				{
					title: 'Beranda',
					icon: 'home',
					path: '/dosen'
				},
				{
					title: 'Daftar Ujian',
					icon: 'list',
					path: '/dosen/ujian'
				},
				{
					title: 'Profil',
					icon: 'person',
					path: '/dosen/profil'
				}
			],
			akademikRoutes: [
				{
					title: 'Beranda',
					icon: 'home',
					path: '/akademik',
				},
				{
					title: 'Buat Ujian',
					icon: 'add',
					path: '/ujian/tambah'
				},
				{
					title: 'Daftar Ujian',
					icon: 'list',
					path: '/ujian'
				},
				{
					title: 'Daftar Pengguna',
					icon: 'list',
					path: '/daftar-pengguna'
				},
				{
					title: 'Profil',
					icon: 'person',
					path: '/akademik/profil'
				}
			]
		}
	},

	computed: {
		routes() {
			return this.$store.state.auth.user.role  == 1 ? this.akademikRoutes : this.dosenRoutes
		},

		thispath() {
			return this.$router.currentRoute.path
		}
	},

	methods: {
		...mapActions([
			'removeCookies',
			'showSnackbar'
		]),

		logout() {
			axios.post('/auth/logout/', {}, {
				headers: {
					'Authorization': 'Token ' + this.$store.state.auth.token
				}
			})
			.then(() => {
				this.removeCookies()
				this.$store.state.snackbar.show = false
				this.$router.replace('/login')
			})
			.catch(err => this.showSnackbar({
				message: err.message,
				type: 'error'
			}))
		}
	}
}
</script>


<style lang="sass">
	.sidebar .v-list__tile--active 
		background: rgba(0, 0, 0, .02) !important
		color: #3f51b5 !important
		font-weight: bold !important

	.sidebar 
		min-width: 220px
		width: 220px
		background-color: white

		.profile
			display: flex
			flex-direction: column
			cursor: pointer

		.v-list:not(:first-of-type)
			padding: 0
			cursor: pointer

			> div:hover
				background-color: rgba(0, 0, 0, .05)
</style>

