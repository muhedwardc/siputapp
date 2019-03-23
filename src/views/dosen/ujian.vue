<template>
    <v-container grid-list-lg class="pa-0">
        <v-layout row wrap>
            <v-flex xs12 sm12 md8>
                <div>
                    <v-data-table
                        :headers="headers"
                        :items="exams"
                        :rows-per-page-items="perPage"
                        class="elevation-1"
                        :loading="loading"
                    >
                    <template slot="headerCell" slot-scope="props">
                        <v-tooltip bottom>
                        <span slot="activator">
                            {{ props.header.text }}
                        </span>
                        <span>
                            {{ props.header.text }}
                        </span>
                        </v-tooltip>
                    </template>
                    <template v-slot:items="props">
                        <td>{{ props.item.ujian.judul }}</td>
                        <td>{{ props.item.ujian.tanggal }}</td>
                        <td>{{ props.item.ujian.jam }}</td>
                        <td>{{ props.item.ujian.ruang }}</td>
                        <td>{{ props.item.is_ketua ? 'Ketua' : 'Anggota' }}</td>
                        <td><v-chip :color="getStatus(props.item)" text-color="white">{{ props.item.ujian.is_finish ? 'Selesai' : props.item.is_attending == null ? 'belum konfirmasi' : props.item.is_attending ? 'menghadiri' : 'menolak' }}</v-chip></td>
                    </template>
                    </v-data-table>
                </div>
            </v-flex>
            <v-flex xs12 sm12 md4>
                <v-card
                    class="mx-auto"
                    color="#26c6da"
                    dark >
                    <v-card-title class="pb-0">
                        <v-icon large left>
                            assessment
                        </v-icon>
                        <span class="title font-weight-light">Laporan Bulan {{ thisMonth }}</span>
                    </v-card-title>

                    <v-card-text class="headline font-weight-light">
                        <table>
                            <tr>
                                <td>Selesai</td>
                                <td>: 1</td>
                            </tr>
                            <tr>
                                <td>Diterima</td>
                                <td>: 2</td>
                            </tr>
                            <tr>
                                <td>Ditolak</td>
                                <td>: 3</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>: 5</td>
                            </tr>
                        </table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import moment from 'moment'

export default {
    data() {
        return {
            loading: false,
            headers: [
                {
                    text: 'Nama Ujian',
                    value: 'ujian.judul',
                    sortable: false,
                    align: 'left'
                },
                {
                    text: 'Tanggal',
                    value: 'ujian.tanggal',
                    sortable: true
                },
                {
                    text: 'Jam',
                    value: 'ujian.jam',
                    sortable: true
                },
                {
                    text: 'Ruangan',
                    value: 'ujian.ruang',
                    sortable: true
                },
                {
                    text: 'Ketua',
                    value: 'is_ketua',
                    sortable: true
                },
                {
                    text: 'Status',
                    value: 'ujian.is_finish',
                    sortable: true
                }
            ],
            exams: [],
            perPage: [
                10,
                15,
                25,
                {
                    "text": "$vuetify.dataIterator.rowsPerPageAll",
                    "value": -1
                }
            ]
        }   
    },

    computed: {
        thisMonth() {
            moment.locale('id')
            return moment().format('MMMM')
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),

        fetchExams() {
            axios.get('/me/', {
                headers: {
                    'Authorization': 'Token ' + this.$store.state.auth.token
                }
            })
            .then(r => this.exams.push.apply(this.exams, r.data))
            .then(() => {
                axios.get('/me/history/', {
                    headers: {
                        'Authorization': 'Token ' + this.$store.state.auth.token
                    }
                })
                .then(r => {
                    this.exams.push.apply(this.exams, r.data)
                })
                .catch(err => {
                    this.exams = []
                    this.showSnackbar({
                        message: err,
                        type: 'error'
                    })                
                })
            })
            .catch(err => {
                this.exams = []
                this.showSnackbar({
                    message: err,
                    type: 'error'
                })                
            })
        },

        getStatus(status) {
            return status.ujian.is_finish ? 'green' : status.is_attending == null ? 'gray' : status.is_attending ? 'primary' : 'red'
        }
    },

    mounted() {
        this.fetchExams()
    }
}
</script>

