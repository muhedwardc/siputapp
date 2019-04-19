<template>
    <h1>Profil</h1>
</template>

<script>
export default {
    created() {
        axios.get('/me/profile/', {
            headers: {
                'Authorization': this.$store.getters.authToken
            }
        })
        .then(r => console.log(r.data))
    }
}
</script>
