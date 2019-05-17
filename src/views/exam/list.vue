<template>
    <v-layout column>
        <p class="font-weight-bold pb-2 mb-0" style="color: #365075">Daftar Ujian Anda</p>
        <div>
            <v-data-table
                class="no-barrier"
                :headers="headers"
                :items="exams"
                :rows-per-page-items="perPage"
                :loading="loading"
            >
            <template slot="headerCell" slot-scope="props">
                <span class="grey--text font-weight-medium" style="font-size: 13px">
                    {{ props.header.text }}
                </span>
            </template>
            <template v-slot:no-data>
                <v-layout :value="!exams" class="pa-2" justify-center>
                    Tidak ada ujian untuk ditampilkan.
                </v-layout>
            </template>
            <template v-slot:items="props">
                <td @click="$router.push(`/ujian/${props.item.id}`)" style="cursor: pointer;">{{ props.item.ujian.skripsi.judul }}</td>
                <td>{{ readableData(props.item.ujian.tanggal) }}</td>
                <td>{{ props.item.ujian.sesi }}</td>
                <td>{{ props.item.ujian.ruang }}</td>
                <td>{{ props.item.is_leader ? 'Ketua' : 'Anggota' }}</td>
            </template>
            </v-data-table>
        </div>
    </v-layout>
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
                    sortable: true,
                    align: 'left'
                },
                {
                    text: 'Tanggal',
                    value: 'ujian.tanggal',
                    sortable: false
                },
                {
                    text: 'Jam',
                    value: 'ujian.jam',
                    sortable: false
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
            ],
            exams: [],
            perPage: [ 10, 15, 25, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ]
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

        readableData(date) {
            if (moment().format('DD/MM/YYYY') == date) return 'Hari ini'
            return moment(date, 'DD/MM/YYYY').format('DD MMMM YYYY')
        },

        async fetchExams() {
            try {
                const r = await axios.get('/me/exams/', this.$store.getters.authHeaders)
                this.exams.push.apply(this.exams, r.data.results)
                const history = await axios.get('/me/exams/history/', this.$store.getters.authHeaders)
                this.exams.push.apply(this.exams, history.data.results)
            } catch (error) {
                this.exams = []
                this.showSnackbar(error.message)                
            }
        },

        getStatus(status) {
            return status.ujian.is_finish ? 'green' : status.is_attending == null ? 'gray' : status.is_attending ? 'primary' : 'red'
        }
    },

    mounted() {
        this.$store.state.auth.token ? this.fetchExams() : null
    }
}
</script>

<style lang="sass">
    .no-barrier .v-datatable 
        tbody 
            tr 
                td:first-of-type
                    padding-left: 0
                td:last-of-type
                    padding-right: 0
        thead 
            tr 
                th:first-of-type
                    padding-left: 0
                th:last-of-type
                    padding-right: 0
</style>