<template>
    <div class="dosen-home">
        <v-container grid-list-md class="no-padding">
            <h3 class="mb-1">UJIAN HARI INI</h3>
            <span v-if="todayExams.length === 0">Hari ini tidak ada ujian</span>
            <v-layout row wrap v-else>
                <v-flex xs12 sm4 md4 v-for="e in todayExams.slice(0, 3)" :key="e.id">
                    <app-exam-card :item="e" />
                </v-flex>
            </v-layout>
            <h3 class="mt-3 mb-1">UJIAN LAIN</h3>
            <span v-if="nextExams.length === 0">Tidak ada ujian yang belum direspon</span>
            <v-layout row wrap v-else>
                <v-flex xs12 sm4 md4 v-for="e in nextExams" :key="e.id">
                    <app-exam-card :item="e" class="mb-3" />
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

        getExams() {
            axios.get('/me/exams/', {
                headers: {
                    'Authorization': 'Token ' + this.$store.state.auth.token
                }
            })
                .then(r => {
                    this.exams = r.data
                    console.log(this.exams)
                    this.exams.length > 0 ? this.filterUjian() : null
                    let message = this.todayExams.length > 0 ? 'Hari ini ada ' + this.todayExams.length + ' ujian' : 'Hari ini tidak ada ujian'
                    if (!Cookie.get('visit_home')) {
                        this.showSnackbar({
                            message,
                            type: 'info'
                        })
                        Cookie.set('visit_home', true)
                    }
                })
                .catch(err => {
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
                })
        }
    },

    computed: {
        today() {
            moment.locale('id')
            return moment().format('LL')
        }
    },

    created() {
        this.getExams()
    }
}
</script>

<style lang="scss" scoped>
    .no-padding {
        padding: 0;
    }
</style>

