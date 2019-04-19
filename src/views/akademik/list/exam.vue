<template>
    <div>
        <v-layout row flat color="white" align-center>
            <v-toolbar-title>Daftar Ujian</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="$router.push('/ujian/tambah')">Tambah ujian</v-btn>
        </v-layout>
        <v-data-table
            :headers="headers"
            :items="exams"
            :rows-per-page-items="perPage"
            :loading="loading">
            <template slot="headerCell" slot-scope="props">
                <span class="grey--text font-weight-medium" style="font-size: 13px">
                    {{ props.header.text }}
                </span>
            </template>
            <template v-slot:no-data>
                <v-layout :value="loaded" class="pa-2" column align-center>
                    Tidak ada ujian untuk ditampilkan.
                    <v-btn color="primary" @click="initialize">Muat ulang</v-btn>
                </v-layout>
            </template>
            <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.skripsi.judul }}</td>
                <td class="text-xs-left">{{ readableDate(props.item.tanggal) }}</td>
                <td class="text-xs-left">{{ props.item.sesi.start_time.slice(0, 5) + ' WIB' }}</td>
                <td class="text-xs-left">{{ props.item.ruang.nama }}</td>
                <td class="text-xs-left">{{ props.item.status ? status[props.item.status] : status[0] }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            loaded: false,
            loading: false,
            headers: [
                { text: 'Judul', align: 'left', sortable: false, value: 'skripsi.judul' },
                { text: 'Tanggal', value: 'tanggal', sortable: false },
                { text: 'Jam', value: 'sesi.start_time', sortable: false },
                { text: 'Ruangan', value: 'ruang.nama', sortable: false },
                { text: 'Status', value: 'status', sortable: false },
            ],
            status: ['belum mulai', 'sedang berlangsung', 'selesai'],
            exams: [],
            perPage: [ 10, 15, 25, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ]
        }
    },

    created () {
        this.loaded = false
        this.initialize()
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
        
        async initialize () {
            this.loading = true
            try {
                const exams = await axios.get('/exams/', {
                    headers: {
                        'Authorization': this.$store.getters.authToken
                    }
                }).then(r => r.data)

                this.exams = exams
                this.loading = false
                this.loaded = true
            } catch (e) {
                this.showSnackbar({
                    message: e.message,
                    type: 'error'
                })
                this.loading = false
                this.loaded = true
            }
        },
    }
}
</script>

<style lang="sass">
    .v-datatable 
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
