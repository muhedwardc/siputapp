<template>
    <div class="dosen-home">
        <v-container grid-list-lg class="no-padding">
            <v-layout row wrap>
                <v-flex xs12 sm6 column>
                    <h3 class="mb-1">UJIAN HARI INI</h3>
                    <span v-if="todayExams.length === 0">Hari ini tidak ada ujian</span>
                    <v-layout row wrap v-else>
                        <v-flex xs12 v-for="e in todayExams.slice(0, 3)" :key="e.id">
                            <app-exam-card :item="e"/>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 sm6 column>
                    <h3 class="mb-1">UJIAN LAIN</h3>
                    <span v-if="nextExams.length === 0">Tidak ada ujian yang belum direspon</span>
                    <v-layout row wrap v-else>
                        <v-flex xs12 v-for="e in nextExams" :key="e.id">
                            <app-exam-card :item="e"/>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import moment from 'moment'
import Cookie from 'js-cookie'
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            exams: [],
            todayExams: [],
            nextExams: [],
            newAssignedExams: 0
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar',
            'removeCookies'
        ]),

        filterUjian() {
            moment.locale('id')
            this.exams.map(e => {
                if (e.ujian.tanggal == moment().format('L')) return this.todayExams.push(e)
                this.nextExams.push(e)
            })
        },

        async getExams() {
            this.$store.state.loadViewContent = true
            try {
                const response = await axios.get('/me/exams/', this.$store.getters.authHeaders)
                this.exams = response.data.results
                this.exams.length > 0 ? this.filterUjian() : null
                const message = this.todayExams.length > 0 ? 'Hari ini ada ' + this.todayExams.length + ' ujian' : 'Hari ini tidak ada ujian'
                if (!Cookie.get('visit_home')) {
                    this.showSnackbar({
                        message,
                        type: 'info'
                    })
                    Cookie.set('visit_home', true)
                }
                this.$store.state.loadViewContent = false
            } catch (error) {
                const errArr = err.message.split(' ')
                if (errArr[errArr.length-1] == '401') {
                    this.removeCookies()
                    this.$router.replace('/login')
                } else {
                    this.showSnackbar({
                        message: err.message,
                        type: 'error'
                    })
                }
                this.$store.state.loadViewContent = false
            }
        }
    },

    computed: {
        today() {
            moment.locale('id')
            return moment().format('LL')
        }
    },

    created() {
        this.$store.state.auth.token ? this.getExams() : null
    }
}
</script>

<style lang="sass" scoped>
    .no-padding 
        padding: 0;
</style>

