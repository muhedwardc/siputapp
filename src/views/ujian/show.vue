<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-text v-if="exam">
                        <h3 class="headline font-weight-regular mt-1 text-capitalize">{{ exam.ujian.judul }} <i>{{ exam.ujian.is_capstone ? ' (Capstone)' : '' }}</i></h3>
                        <v-layout align-center wrap class="mt-2">
                            <template v-if="exam.is_attending == null">
                                <v-btn depressed color="success" class="ma-0 mt-2 mr-2">Terima</v-btn>
                                <v-btn depressed color="error" class="ma-0 mt-2 mr-2">Tolak</v-btn>
                            </template>
                            <template v-else-if="exam.is_attending">
                                <v-btn depressed color="info" class="ma-0 mt-2 mr-2" @click="openThesis()"><v-icon left>open_in_new</v-icon> lihat naskah</v-btn>
                                <v-btn depressed color="info" class="ma-0 mt-2 mr-2" @click="startUjian(exam.id)"><v-icon left>send</v-icon> mulai ujian</v-btn>
                            </template>
                        </v-layout>
                        <hr class="mt-3 mb-3">
                        <v-layout row justify-start align-center wrap>
                            <v-chip v-if="exam.is_attending" color="success" class="white--text ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                Anda menerima menghadiri ujian
                            </v-chip>
                            <v-chip v-if="exam.is_ketua" color="warning" class="white--text ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon>verified_user</v-icon>
                                </v-avatar>
                                Ketua
                            </v-chip>
                            <v-chip class="ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">calendar_today</v-icon>
                                </v-avatar>
                                {{ date }}
                            </v-chip>
                            <v-chip class="ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">access_time</v-icon>
                                </v-avatar>
                                {{ exam.ujian.jam }}
                            </v-chip>
                            <v-chip class="ml-0">
                                <v-avatar class="mr-0">
                                    <v-icon class="subheading">place</v-icon>
                                </v-avatar>
                                {{ exam.ujian.ruang }}
                            </v-chip>
                        </v-layout>
                        <v-layout column class="mt-4">
                            <h6 class="title font-weight-regular mb-2">Intisari</h6>
                            <p class="ma-0 mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat deserunt eius dolor minus ea maiores nostrum aliquid consequatur laborum incidunt quod ut, obcaecati rerum dignissimos aut voluptate iusto fuga aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus deserunt consequatur facilis tempora, harum quisquam nihil eligendi iure nisi debitis molestiae impedit ratione quos ullam consectetur! Sed vitae maxime facilis? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam fuga delectus molestias quo at obcaecati blanditiis hic accusantium earum ex praesentium, fugit, illum eligendi sequi quasi, reiciendis incidunt debitis magni.</p>
                        </v-layout>
                        <v-layout class="mt-3" column>
                            <h6 class="title font-weight-regular">Informasi Mahasiswa</h6>
                            <v-data-table
                                :headers="headers"
                                :items="mahasiswa"
                                hide-actions
                                class="elevation-1 mt-2"
                                id="primary-table">
                                <template v-slot:items="props">
                                    <td>{{ props.item.nama }}</td>
                                    <td>{{ props.item.subtitle ? props.item.subtitle : '-' }}</td>
                                    <td>{{ props.item.nim }}</td>
                                    <td>{{ props.item.prodi }}</td>
                                    <td>{{ props.item.ipk }}</td>
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
                    text: 'Sub Judul',
                    sortable: false,
                    value: 'subtitle'
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
                    text: 'IPK',
                    sortable: false,
                    value: 'ipk'
                },
            ],
            mahasiswa: [
                {
                    nama: 'Muhamamad Ashil Al-Latief',
                    nim: '15/385406/TK/44068',
                    ipk: 3.56,
                    prodi: 'Teknologi Informasi',
                    subtitle: 'Pengembangan back-end & API'
                },
                {
                    nama: 'Muhamamad Edward Chakim',
                    nim: '15/385407/TK/44069',
                    ipk: 3.98,
                    prodi: 'Teknologi Informasi',
                    subtitle: 'Pengembangan front-end'
                },
                {
                    nama: 'Muhamamad Edward Chakim',
                    nim: '15/385407/TK/44061',
                    ipk: 3.51,
                    prodi: 'Teknologi Informasi',
                    subtitle: 'Pengembangan UI/UX'
                }
            ]
        }
    },

    computed: {
        date() {
            const dateArr = this.exam.ujian.tanggal.split('/')
            const momentDateFormat = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`
            moment.locale('id')
            return moment(momentDateFormat).format('LL')
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),

        async getExam() {
            const exam = await axios.get(`/me/${this.$router.currentRoute.params.id}/`, {
                headers: {
                    'Authorization': 'Token ' + this.$store.state.auth.token
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
            window.open('www.africau.edu/images/default/sample.pdf', '_blank')
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


