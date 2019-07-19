<template>
    <app-list-container>
        <template v-slot:header>
            <h3>DAFTAR UJIAN ANDA</h3>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <app-search-box @on-search="onSearch($event)"></app-search-box>
        </template>
        <template v-slot:list>
            <v-data-table
                class="zebra-column solid-container"
                hide-actions
                :headers="headers"
                :search="search"
                :items="exams"
                :rows-per-page-items="perPage"
                :loading="loading">
                <template slot="headerCell" slot-scope="props">
                    <span @click="props.header.text == 'Tanggal' ? fetchExams(1, 'tanggal') : null" class="black--text font-weight-bold" style="font-size: 13px">
                        {{ props.header.text }}
                    </span>
                </template>
                <template v-slot:no-data>
                    <v-layout :value="!exams" class="pa-2" align-center column>
                        Tidak ada ujian untuk ditampilkan.
                        <v-btn color="primary" @click="fetchExams()">Muat ulang</v-btn>
                    </v-layout>
                </template>
                <template v-slot:items="props">
                    <td>{{ formatDate(props.item.ujian.tanggal) }}</td>
                    <router-link style="cursor: pointer; text-decoration: none; color: black;" tag="td" :to="`/ujian/${props.item.id}`"><b>{{ props.item.ujian.skripsi.judul}}</b> <br> oleh: {{ joinToString(props.item.ujian.skripsi.mahasiswa, 'nama') }}</router-link>
                    <td>{{ props.item.ujian.sesi }}</td>
                    <td>{{ props.item.ujian.ruang }}</td>
                    <td>{{ isLeader(props.item.ujian.ketua) ? 'Ketua' : 'Anggota' }}</td>
                    <td :class="props.item.ujian.status == 3 ? 'success--text font-weight-bold' : props.item.ujian.status == 2 ? 'warning--text' : null">{{ examStatus(props.item.ujian.status) }}</td>
                </template>
                <template v-slot:footer>
                    <app-pagination-footer :page="page" :totalItems="totalItems" :td="headers.length" @on-page-change="getExam($event)"></app-pagination-footer>
                </template>
            </v-data-table>
        </template>
    </app-list-container>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            loading: false,
            sort: null,
            search: '',
            headers: [
                {
                    text: 'Tanggal',
                    value: 'ujian.tanggal',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Nama Ujian',
                    value: 'ujian.skripsi.judul',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Jam',
                    value: 'ujian.jam',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Ruangan',
                    value: 'ujian.ruang',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Peran',
                    value: 'is_ketua',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Status',
                    value: 'ujian.status',
                    sortable: false,
                    align: 'center'
                },
            ],
            exams: [],
            perPage: [ 10 ],
            page: 1,
            totalItems: 0,
            textSearch: '',
        }   
    },

    computed: {
        thisMonth() {
            moment.locale('id')
            return moment().format('MMMM')
        }
    },

    methods: {
        async onSearch (text = '') {
            this.page = 1
            this.textSearch = text
            if (this.$store.state.cancelTokenSource) this.$store.state.cancelTokenSource.cancel()
            this.loading = true
            this.$store.state.useUploadProgress = true
            try {
                const response = await this.$thessa.getMyExamsHistory('search=' + text)
                this.totalItems = response.data.count
                this.exams = response.data.results
                this.page = 1
                this.loading = false
                this.$store.state.useUploadProgress = false
            } catch (error) {
                this.showSnackbar({
                    message: error.message,
                    type: 'error'
                })
                this.loading = false
                this.$store.state.useUploadProgress = false
            }
        },

        async fetchExams(page = 1, sort = null) {
            this.loading = true
            if (sort) this.sort = sort
            let qs = 'page=' + (page ? page : 1)
            if (this.textSearch) qs += '&search=' + this.textSearch
            if (this.sort) qs += '&ordering=' + this.sort
            try {
                const history = await this.$thessa.getMyExamsHistory(qs)
                this.exams = history.data.results
                this.totalItems = history.data.count
                this.page = page
                this.loading = false
            } catch (error) {
                this.exams = []
                this.showSnackbar(error.message)                
                this.loading = false
            }
        },
    },

    mounted() {
        this.$store.state.auth.token ? this.fetchExams() : null
    }
}
</script>