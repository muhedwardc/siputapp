<template>
    <h1>Profil</h1>
</template>

<script>
export default {
    created() {
        axios.get('/me/profil', {
            headers: {
                'Authorization': 'Token ' + this.$store.state.auth.token
            }
        })
        .then(r => console.log(r.data))
    }
}
</script>
