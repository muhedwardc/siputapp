<template>
    <div class="dosen-home">
        <app-loading></app-loading>
        <v-layout column v-if="!$store.state.loadViewContent">
            <h3 class="mb-1">UJIAN HARI INI</h3>
            <span v-if="todayExams.length === 0">Hari ini tidak ada ujian</span>
            <v-container v-else grid-list-lg class="no-padding mt-2">
                <v-layout row wrap>
                    <v-flex xs6 v-for="e in todayExams.slice(0, 3)" :key="e.id">
                        <app-exam-card :item="e"/>
                    </v-flex>
                </v-layout>
            </v-container>
            <h3 class="mb-1 mt-4">UJIAN LAIN</h3>
            <span v-if="nextExams.length === 0">Tidak ada ujian lagi</span>
            <v-container v-else grid-list-lg class="no-padding mt-2">
                <v-layout row wrap>
                    <v-flex xs6 v-for="e in nextExams" :key="e.id">
                        <app-exam-card :item="e"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-layout>
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
            'logUserOut'
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
                const response = await this.$thesa.getMyExams()
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
                if (error.response && error.response.status == 401) {
                    this.logUserOut()
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

