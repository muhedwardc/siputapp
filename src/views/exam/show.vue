<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-text v-if="exam">
                        <h3 class="headline font-weight-regular mt-1 text-capitalize">{{ exam.skripsi.judul }} <i>{{ exam.skripsi.is_capstone ? ' (Capstone)' : '' }}</i></h3>
                        <v-layout align-center wrap class="mt-2">
                            <template>
                                <v-btn v-if="is_admin" depressed color="info" class="ma-0 mt-2 mr-2" @click="startUjian(exam.id)"><v-icon left>edit</v-icon> edit ujian</v-btn>
                                <v-btn v-else depressed color="info" class="ma-0 mt-2 mr-2" @click="startUjian(exam.id)"><v-icon left>send</v-icon> masuk ujian</v-btn>
                            </template>
                        </v-layout>
                        <hr class="mt-3 mb-3">
                        <v-layout row justify-start align-center wrap>
                            <v-chip v-if="isLeader" color="warning" class="white--text ml-0">
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
                                {{ exam.sesi }}
                            </v-chip>
                            <v-chip class="ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">place</v-icon>
                                </v-avatar>
                                {{ exam.ruang }}
                            </v-chip>
                        </v-layout>
                        <v-layout column class="mt-4">
                            <h6 class="title font-weight-regular mb-2">Intisari</h6>
                            <p class="ma-0 mb-2">{{ exam.skripsi.intisari }}</p>
                        </v-layout>
                        <v-layout class="mt-3" column>
                            <h6 class="title font-weight-regular">Informasi Mahasiswa</h6>
                            <v-data-table
                                :headers="headers"
                                :items="exam.skripsi.mahasiswa"
                                hide-actions
                                class="elevation-1 mt-2">
                                <template v-slot:items="props">
                                    <td>{{ props.item.nama }}</td>
                                    <td>{{ props.item.nim }}</td>
                                    <td>{{ props.item.prodi }}</td>
                                    <td>{{ props.item.konsentrasi }}</td>
                                </template>
                            </v-data-table>
                        </v-layout>
                        <v-layout class="mt-3" column>
                            <h6 class="title font-weight-regular">Informasi Penguji</h6>
                            <v-data-table
                                :headers="dosenHeaders"
                                :items="exam.penguji"
                                hide-actions
                                class="elevation-1 mt-2">
                                <template v-slot:items="props">
                                    <td>{{ props.item.dosen }}</td>
                                    <td>{{ props.item.is_leader ? 'Ketua Penguji' : props.index == 1 ? 'Pembimbing 2' : 'Penguji' }}</td>
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
            is_admin: false,
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
            ],
            dosenHeaders: [
                {
                    text: 'Nama',
                    sortable: false,
                    align: 'left',
                    value: 'dosen',
                },
                {
                    text: 'Status',
                    sortable: false,
                    align: 'left',
                    value: 'is_leader',
                },
            ]
        }
    },

    computed: {
        date() {
            return moment(this.exam.tanggal, 'DD/MM/YYYY').format('LL')
        },

        isLeader() {
            return this.exam.penguji[0].dosen == this.$store.state.auth.user.nama
        },

        isToday() {
            const today = moment().format('DD/MM/YYYY')
            return this.exam.tanggal === today
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),

        async getExam() {
            try {
                const exam = await axios.get(`/${this.is_admin ? '' : 'me/'}exams/${this.$router.currentRoute.params.id}/`, this.$store.getters.authHeaders)
                this.exam = this.is_admin ? exam.data : exam.data.ujian
            } catch (error) {
                this.showSnackbar(error.message)
                this.$router.go(-1)
            }
        },

        openThesis() {
            window.open('http://www.africau.edu/images/default/sample.pdf', '_blank')
        },

        startUjian() {
            this.$router.push(`/ujian/${this.$router.currentRoute.params.id}/mulai`)
        }
    },

    created() {
        this.is_admin = this.$store.state.auth.user.is_admin
        this.$store.state.auth.token ? this.getExam() : null
    }
}
</script>

<style lang="sass" scoped>
    .container 
        padding: 0;
</style>


