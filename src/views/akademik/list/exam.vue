<template>
    <app-list-container>
        <template v-slot:header>
            <v-btn color="primary" class="ma-0" dark @click="$router.push('/ujian/tambah')">Tambah ujian</v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <app-search-box @on-search="onSearch($event)"></app-search-box>
        </template>
        <template v-slot:list>
            <v-data-table
                class="solid-container zebra-column"
                hide-actions
                :search="search"
                :headers="headers"
                :items="exams"
                :rows-per-page-items="perPage"
                :loading="loading">
                <template slot="headerCell" slot-scope="props">
                    <span class="black--text font-weight-bold" style="font-size: 13px">
                        {{ props.header.text }}
                    </span>
                </template>
                <template v-slot:no-data>
                    <v-layout :value="loaded" class="pa-2" column align-center>
                        Tidak ada ujian untuk ditampilkan.
                        <v-btn color="primary" @click="getExam()">Muat ulang</v-btn>
                    </v-layout>
                </template>
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ readableDate(props.item.tanggal) }}</td>
                    <td @click="$router.push(`/ujian/${props.item.id}`)" style="cursor: pointer;" class="text-xs-left">{{ props.item.skripsi.judul }}</td>
                    <td class="text-xs-left">{{ props.item.sesi }}</td>
                    <td class="text-xs-left">{{ props.item.ruang }}</td>
                    <td class="text-xs-left">{{ props.item.status ? status[props.item.status] : status[0] }}</td>
                </template>
                <template v-slot:footer>
                    <app-pagination-footer :page="page" :totalItems="totalItems" :td="headers.length" @on-page-change="getExam($event)"></app-pagination-footer>
                </template>
            </v-data-table>
        </template>
    </app-list-container>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            loaded: false,
            loading: false,
            search: '',
            headers: [
                { text: 'Tanggal', value: 'tanggal', sortable: true, width: '150' },
                { text: 'Judul', align: 'left', sortable: false, value: 'skripsi.judul' },
                { text: 'Jam', value: 'sesi.start_time', sortable: false },
                { text: 'Ruangan', value: 'ruang.nama', sortable: false },
                { text: 'Status', value: 'status', sortable: false },
            ],
            status: ['belum mulai', 'sedang berlangsung', 'selesai'],
            exams: [],
            page: 1,
            perPage: [ 10 ],
            totalItems: 0,
            textSearch: '',
        }
    },

    created () {
        this.loaded = false
        this.$store.state.auth.token ? this.getExam() : null
    },

    methods: {
        ...mapActions([
			'showSnackbar'
        ]),

        jsdateformat(date, time) {
            return moment(date + ' ' + time, 'DD/MM/YYYY HH:mm::ss').format()
        },

        readableDate(date) {
            moment.locale('id')
            return moment(date, 'DD/MM/YYYY').format('DD MMMM YYYY')
        },

        async onSearch (text = '') {
            this.page = 1
            this.textSearch = text
            if (this.$store.state.cancelTokenSource) this.$store.state.cancelTokenSource.cancel()
            this.loading = true
            this.$store.state.useUploadProgress = true
            try {
                const response = await this.$thessa.getAllExams('search=' + text)
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
        
        async getExam(page = 1) {
            this.loading = true
            let qs = 'page=' + page
            if (this.textSearch) qs += '&search=' + this.textSearch
            try {
                const response = await this.$thessa.getAllExams(qs)
                this.totalItems = response.data.count
                this.exams = response.data.results
                this.page = page
                this.loading = false
                this.loaded = true
            } catch (error) {
                this.showSnackbar(error.message)
                this.loading = false
                this.loaded = true
            }
        },
    }
}
</script>
