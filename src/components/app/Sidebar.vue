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
				<app-logo></app-logo>
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
					path: '/profil'
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
					icon: 'today',
					path: '/ujian'
				},
				{
					title: 'Daftar Dosen',
					icon: 'group',
					path: '/daftar-dosen'
				},
				{
					title: 'Daftar Akademik',
					icon: 'group',
					path: '/daftar-akademik'
				},
				{
					title: 'Ruang dan Sesi',
					icon: 'meeting_room',
					path: '/ruang-sesi'
				},
				{
					title: 'Pengurus',
					icon: 'account_balance',
					path: '/pengurus-departemen'
				},
				{
					title: 'Profil',
					icon: 'person',
					path: '/profil'
				}
			]
		}
	},

	computed: {
		routes() {
			return this.$store.state.auth.user.is_admin ? this.akademikRoutes : this.dosenRoutes
		},

		thispath() {
			return this.$router.currentRoute.path
		}
	},

	methods: {
		...mapActions([
			'logUserOut',
			'showSnackbar'
		]),

		async logout() {
			try {
				await this.$thessa.logout()
				await this.logUserOut()
				await this.$router.replace('/login')
			} catch (error) {
				this.showSnackbar({
					message: error.message,
					type: 'error'
				})
			}
		}
	}
}
</script>


<style lang="sass">
	.sidebar .v-list__tile--active 
		background: rgba(0, 0, 0, .02) !important
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

