<template>
    <div class="dosen-home">
        <v-container grid-list-md class="no-padding">
            <h3 class="mb-1">
                UJIAN SELANJUTNYA
                <v-chip v-if="newAssignedExams" color="primary font-weight-regular" style="height: 24px; padding-top: 4px; padding-bottom: 4px; margin-top: 1.5px;" text-color="white">
                    + {{ newAssignedExams }} ujian diterima
                </v-chip>
            </h3>
            <span v-if="nextExams.length === 0">Tidak ada jadwal ujian yang telah diterima</span>
            <v-layout row wrap v-else>
                <v-flex xs12 sm4 md4 v-for="e in nextExams.slice(0, 3)" :key="e.id">
                    <app-exam-card :item="e" />
                </v-flex>
            </v-layout>
            <h3 class="mt-3 mb-1">UJIAN BARU</h3>
            <span v-if="newExams.length === 0">Tidak ada ujian yang belum direspon</span>
            <v-layout row wrap v-else>
                <v-flex xs12 sm4 md4 v-for="(e, i) in newExams" :key="e.id">
                    <app-exam-card
                        :item="e"
                        :index="i"
                        :action="true"
                        @status-has-change="changeList($event)"
                        class="mb-3" />
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
            newExams: [],
            newAssignedExams: 0
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar',
            'removeCookies'
        ]),

        changeList(payload) {            
            let newExams = this.newExams[payload.index]
            if (payload.status) {
                this.newAssignedExams += 1
                newExams.is_attending = true
                this.nextExams.push(this.newExams[payload.index])
            }

            this.newExams.splice(payload.index, 1)
        },

        filterUjian() {
            moment.locale('id')
            this.exams.map(e => {
                if (e.is_attending && !e.ujian.is_finish) this.nextExams.push(e)
                else if (e.is_attending == null && !e.ujian.is_finish) this.newExams.push(e)

                if (e.ujian.tanggal == moment().format('L')) this.todayExams.push(e)
            })
        },

        getExams() {
            axios.get('/me', {
                headers: {
                    'Authorization': 'Token ' + this.$store.state.auth.token
                }
            })
                .then(r => {
                    this.exams = r.data
                    this.filterUjian()
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
                        this.showSnackbar({
                            type: 'error',
                            message: err.message
                        })
                        this.$router.replace('/login')
                    }
                    this.showSnackbar({
                        message: err.message,
                        type: 'error'
                    })
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

