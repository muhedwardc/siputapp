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
        fetchUserProfile() {
            axios.get('/me/profile/', {
                headers: {
                    'Authorization': this.$store.getters.authToken
                }
            })
            .then(r => this.user = r.data)
        }
    },

    created() {
        this.$store.state.auth.token ? this.fetchUserProfile() : null
    }
}
</script>
