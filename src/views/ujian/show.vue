<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-text v-if="exam">
                        <h3 class="headline font-weight-regular mt-1 text-capitalize">{{ exam.ujian.skripsi.judul }} <i>{{ exam.ujian.skripsi.is_capstone ? ' (Capstone)' : '' }}</i></h3>
                        <v-layout align-center wrap class="mt-2">
                            <template>
                                <v-btn depressed color="info" class="ma-0 mt-2 mr-2" @click="openThesis()"><v-icon left>open_in_new</v-icon> lihat naskah</v-btn>
                                <v-btn depressed color="info" class="ma-0 mt-2 mr-2" @click="startUjian(exam.id)"><v-icon left>send</v-icon> masuk ujian</v-btn>
                            </template>
                        </v-layout>
                        <hr class="mt-3 mb-3">
                        <v-layout row justify-start align-center wrap>
                            <v-chip v-if="exam.is_leader" color="warning" class="white--text ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon>verified_user</v-icon>
                                </v-avatar>
                                Ketua
                            </v-chip>
                            <v-chip class="ml-0" :class="isToday ? 'white--text' : ''" :color="isToday ? 'purple' : ''">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">calendar_today</v-icon>
                                </v-avatar>
                                {{ isToday ? date + ' (Hari Ini)' : date }}
                            </v-chip>
                            <v-chip class="ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">access_time</v-icon>
                                </v-avatar>
                                {{ exam.ujian.sesi.start_time }}
                            </v-chip>
                            <v-chip class="ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">place</v-icon>
                                </v-avatar>
                                {{ exam.ujian.ruang.nama }}
                            </v-chip>
                        </v-layout>
                        <v-layout column class="mt-4">
                            <h6 class="title font-weight-regular mb-2">Intisari</h6>
                            <p class="ma-0 mb-2">{{ exam.ujian.skripsi.intisari }}</p>
                        </v-layout>
                        <v-layout class="mt-3" column>
                            <h6 class="title font-weight-regular">Informasi Mahasiswa</h6>
                            <v-data-table
                                :headers="headers"
                                :items="exam.ujian.skripsi.mahasiswa"
                                hide-actions
                                class="elevation-1 mt-2"
                                id="primary-table">
                                <template v-slot:items="props">
                                    <td>{{ props.item.nama }}</td>
                                    <td>{{ props.item.nim }}</td>
                                    <td>{{ props.item.prodi }}</td>
                                    <td>{{ props.item.konsentrasi }}</td>
                                </template>
                            </v-data-table>
                        </v-layout>
                    </v-card-text>
                </v-card>   
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            exam: null,
            headers: [
                {
                    text: 'Nama',
                    sortable: false,
                    align: 'left',
                    value: 'nama',
                },
                {
                    text: 'NIM',
                    sortable: false,
                    value: 'nim'
                },
                {
                    text: 'Program Studi',
                    sortable: false,
                    value: 'prodi'
                },
                {
                    text: 'Konsentrasi',
                    sortable: false,
                    value: 'konsentrasi'
                },
            ]
        }
    },

    computed: {
        date() {
            return moment(this.exam.ujian.tanggal, 'DD/MM/YYYY').format('LL')
        },

        isToday() {
            const today = moment().format('DD/MM/YYYY')
            return this.exam.ujian.tanggal === today
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),

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
            })

            this.exam = exam
        },

        openThesis() {
            window.open('http://www.africau.edu/images/default/sample.pdf', '_blank')
        },

        startUjian(id) {
            this.$store.state.onExam.id = id
            this.$router.push(`/ujian/${id}/mulai`)
        }
    },

    created() {
        this.getExam()
    }
}
</script>

<style lang="sass" scoped>
    .container 
        padding: 0;
</style>


