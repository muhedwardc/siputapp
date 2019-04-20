<template>
    <v-layout column align-center class="waiting-view" justify-center>
        <template v-if="exam">
            <h2>{{ exam.ujian.skripsi.judul }}</h2>
            <h4 v-for="(dosen, i) in exam.ujian.penguji" :key="i"><span :class="isMe(dosen.dosen.nip) ? 'purple--text' : ''">{{ dosen.dosen.nama }}</span></h4>
            <v-btn class="primary" v-if="exam.is_leader" @click="$router.push(`/ujian/${exam.id}/mulai`)">Mulai</v-btn>
        </template>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            exam: null
        }
    },

    methods: {
        async getExam() {
            const exam = await axios.get(`/me/exams/${this.$router.currentRoute.params.id}/`, {
                headers: {
                    'Authorization': this.$store.getters.authToken
                }
            })
            .then(r => r.data)
            .catch(err => {
                this.showSnackbar({
                    message: err.message,
                    type: 'error'
                })

                this.$router.go(-1)
            })

            this.exam = exam
        },

        isMe(nip) {
            return this.$store.state.auth.user.nip === nip
        }
    },

    created() {
        this.getExam()
    }
}
</script>

<style lang="sass" scoped>
    // .waiting-view
    //     padding-top: 30px
</style>


