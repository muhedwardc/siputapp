<template>
    <h1>Profil</h1>
</template>

<script>
export default {
    data() {
        return {
            user: {}
        }
    },

    methods: {
        async fetchUserProfile() {
            try {
                const r = await this.$thesa.getMyProfile()
                this.user = r.data
            } catch (error) {
                this.$store.dispatch('showSnackbar', {message: error.message, type: 'error'})
            }
        }
    },

    created() {
        this.$store.state.auth.token ? this.fetchUserProfile() : null
    }
}
</script>
