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

    created() {
        axios.get('/me/profile/', {
            headers: {
                'Authorization': this.$store.getters.authToken
            }
        })
        .then(r => this.user = r.data)
    }
}
</script>
