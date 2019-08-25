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
                    <span @click="props.header.value == 'tanggal' ? getExam(1, 'tanggal') : null" class="black--text font-weight-bold" style="font-size: 13px">
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
                    <td class="text-xs-left">{{ formatDate(props.item.tanggal) }}</td>
                    <router-link tag="td" :to="`/ujian/${props.item.id}`" class="text-xs-left" style="cursor: pointer; text-decoration: none; color: black;"><b>{{ props.item.skripsi.judul}}</b> <br> oleh: {{listMahasiswa(props.item.skripsi.mahasiswa)}}</router-link>
                    <td class="text-xs-left">{{ props.item.sesi }}</td>
                    <td class="text-xs-left">{{ props.item.ruang }}</td>
                    <td class="text-xs-left" :class="props.item.status == 3 ? 'success--text' : props.item.status == 2 ? 'warning--text' : null">{{ props.item.status ? status[props.item.status-1] : status[0] }}</td>
                </template>
                <template v-slot:footer>
                    <app-pagination-footer :page="page" :totalItems="totalItems" :td="headers.length" @on-page-change="getExam($event)"></app-pagination-footer>
                </template>
            </v-data-table>
        </template>
    </app-list-container>
</template>

<script>
export default {
    data() {
        return {
            loaded: false,
            loading: false,
            search: '',
            headers: [
                { text: 'Tanggal', value: 'tanggal', sortable: false, width: '150' },
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

    computed: {
        listMahasiswa() {
            return function(mahasiswa) {
                let str = []
                mahasiswa.forEach(m => str.push(m.nama))
                return str.join(', ')
            }
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
        
        async getExam(page = 1, sort = null) {
            this.loading = true
            if (sort) this.sort = sort
            let qs = 'page=' + page
            if (this.textSearch) qs += '&search=' + this.textSearch
            if (this.sort) qs += '&ordering=' + this.sort
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
