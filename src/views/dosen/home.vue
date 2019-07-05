<template>
    <div class="dosen-home">
        <app-loading></app-loading>
        <v-layout column v-if="!$store.state.loadViewContent">
            <h3 class="mb-1">Ujian Tugas Akhir Hari Ini</h3>
            <span v-if="todayExams.length === 0">Hari ini tidak ada ujian</span>
            <v-container v-else grid-list-lg class="no-padding mt-2">
                <v-layout row wrap>
                    <v-flex xs12 sm6 v-for="e in todayExams.slice(0, 3)" :key="e.id">
                        <app-exam-card :item="e"/>
                    </v-flex>
                </v-layout>
            </v-container>
            <h3 class="mb-1 mt-4">Ujian Tugas Akhir yang akan datang</h3>
            <span v-if="nextExams.length === 0">Tidak ada ujian lagi</span>
            <v-container v-else grid-list-lg class="no-padding mt-2">
                <v-layout row wrap>
                    <v-flex xs12 sm6 v-for="e in nextExams" :key="e.id">
                        <app-exam-card :item="e"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-layout>
        <v-dialog v-model="hasFinisedExam" persistent max-width="600px">
            <v-card v-if="hasFinisedExam">
                <v-toolbar color="primary">
                    <span class="white--text">Ujian Tugas Akhir telah diselesaikan</span>
                </v-toolbar>
                <v-card-text>
                    <p>Anda telah menyelesaikan ujian:</p>
                    <v-layout class="exam-detail mb-2" column>
                        <p class="mb-1" v-text="finishedExam.skripsi.judul"></p>
                        <v-layout class="mb-1">
                            <v-icon class="mr-1" small>event</v-icon>
                            <span v-text="finishedExam.tanggal"></span>
                        </v-layout>
                        <v-layout class="mb-1">
                            <v-icon class="mr-1" small>access_time</v-icon>
                            <span v-text="finishedExam.sesi"></span>
                        </v-layout>
                        <v-layout class="mb-1">
                            <v-icon class="mr-1" small>location_on</v-icon>
                            <span v-text="finishedExam.ruang"></span>
                        </v-layout>
                        <v-layout class="mb-1">
                            <v-icon class="mr-1" small>person</v-icon>
                            <span>{{ readableString(finishedExam.skripsi.mahasiswa, 'nama') }}</span>
                        </v-layout>
                    </v-layout>
                    <p class="mb-0">Untuk melihat berkas hasil ujian skripsi dapat dilihat di halaman <router-link :to="'/ujian/' + finishedExam.id">deskripsi ujian</router-link> ketika Ketua Sidang telah menyelesaikan ujian.</p>
                </v-card-text>
                <v-layout justify-center>
                    <v-btn class="primary text-capitalize mb-2" @click="hasFinisedExam = false">selesai</v-btn>
                </v-layout>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import Cookie from 'js-cookie'
import { mapActions } from 'vuex';
import { setTimeout } from 'timers';

export default {
    data() {
        return {
            exams: [],
            todayExams: [],
            nextExams: [],
            newAssignedExams: 0,
            finishedExam: null,
            hasFinisedExam: false
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

        readableString(arr, par) {
            let res = ''
            for (let i = 0; i < arr.length; i ++ ){
                res += arr[i][par] + (i == arr.length-1 ? '' : ', ')
            }
            return res
        },

        async getExams() {
            this.$store.state.loadViewContent = true
            try {
                const response = await this.$thessa.getMyExams()
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
        if (this.$store.state.finishedExam) {
            this.finishedExam = this.$store.state.finishedExam
            setTimeout(() => {
                this.hasFinisedExam = true
            }, 500)
            this.$store.state.finishedExam = null
        }
    }
}
</script>

<style lang="sass" scoped>
    .no-padding 
        padding: 0;

    .exam-detail
        padding: 12px;
        border-radius: 4px;
        background-color: #EBEBEB;
</style>

