<template>
<v-container grid-list-md class="pa-0">
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg8>
            <v-layout column>
                <h3>Minggu Ini</h3>
                <v-tabs
                    id="days-select"
                    v-model="activeTab"
                    grow
                    icons-and-text
                    active-class="day-active primary"
                    class="mt-2"
                    slider-color="primary">
                    <v-tab v-for="(week, i) in days" :key="i" :href="'#tab-' + i">
                        <span>{{ week.name }}</span>
                    </v-tab>
                    
                    <v-tab-item
                        class="mt-3"
                        v-for="(day, i) in days"
                        :key="day.date"
                        :value="'tab-' + i"
                        :transition="false" 
                        :reverse-transition="false">
                        <h3 class="mb-2">{{ i == days.length-1 ? day.name : readableDate(day.date) }}</h3>
                        <v-card flat v-if="day.exams.length > 0" class="mt-3">
                            <v-layout class="exam-item" column v-for="exam in day.exams" :key="exam.id" @click="$router.push(`/ujian/${exam.id}`)">
                                <v-layout class="ml-0 mr-0" row justify-space-between>
                                    <h4><span class="warning--text" v-if="exam.skripsi.is_capstone">Capstone: </span>{{exam.skripsi.judul}}</h4>
                                    <v-chip label class="ma-0 exam-status" color="primary" text-color="white">Belum mulai</v-chip>
                                </v-layout>
                                <p class="mb-0"><span :class="isToday(exam.tanggal) ? 'purple--text font-weight-bold' : ''">{{ isToday(exam.tanggal) ? 'Hari ini' : readableDate(exam.tanggal) }}</span> - {{ exam.sesi }} - {{ exam.ruang }}</p>
                                <p class="mb-0">Mahasiswa: {{ readableString(exam.skripsi.mahasiswa, 'nama') }}</p>
                                <p class="mb-0">Penguji: {{ readableString(exam.penguji, 'dosen') }}</p>
                            </v-layout>
                        </v-card>
                        <p v-else>Tidak ada ujian.</p>
                    </v-tab-item>
                </v-tabs>
            </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg4></v-flex>
    </v-layout>
</v-container>
</template>


<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            days: [
                {
                    name: 'Senin',
                    day: '',    
                    date: '',
                    exams: []
                },
                {
                    name: 'Selasa',
                    day: '',    
                    date: '',
                    exams: []
                },
                {
                    name: 'Rabu',
                    day: '',    
                    date: '',
                    exams: []
                },
                {
                    name: 'Kamis',
                    day: '',    
                    date: '',
                    exams: []
                },
                {
                    name: 'Jumat',
                    day: '',    
                    date: '',
                    exams: []
                },
                {
                    name: 'Selanjutnya',
                    exams: []
                }
            ],
            todayDate: '',
            activeTab: 0,
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),

        assignDates() {
            const startOfWeek = moment().startOf('isoWeek').toDate();
            this.days.map((day, i) => {
                let theDay = moment(startOfWeek).add('day', i)
                day.date = moment(theDay, 'DD/MM/YYYY').format('DD/MM/YYYY')
            })
            const index = this.days.findIndex(day => day.date == this.todayDate)
            if (index !== -1) this.activeTab = 'tab-' + index
            else this.activeTab = 'tab-' + (this.days.length - 1)
        },

        readableString(arr, par) {
            let res = ''
            for (let i = 0; i < arr.length; i ++ ){
                res += arr[i][par] + (i == arr.length-1 ? '' : ', ')
            }
            return res
        },

        readableDate(date) {
            moment.locale('id')
            return moment(date, 'DD/MM/YYYY').format('dddd, DD MMMM YYYY')
        },

        classifyExamsByDate(exams){
            exams.map(exam => {
                let assigned = false
                this.days.map(day => {
                    if (exam.tanggal == day.date) {
                        day.exams.push(exam)
                        assigned = true
                    }
                })

                if (!assigned) {
                    this.days[this.days.length-1].exams.push(exam)
                    assigned = false
                }
            })
        },

        isToday(date) {
            moment.locale('id')
            return moment().format('DD/MM/YYYY') === date
        },

        fetchUjian() {
            const startOfWeek = moment().startOf('isoWeek').toDate()
            const startDate = moment(startOfWeek).format('YYYY-MM-DD')
            const endDate = moment(startOfWeek).add(2, 'week').format('YYYY-MM-DD')
            axios.get(`/exams/?mulai=${startDate}&selesai=${endDate}`, { headers: { 'Authorization': this.$store.getters.authToken }})
                .then(r => {
                    this.classifyExamsByDate(r.data.results)
                })
                .catch(err => {
                    this.showSnackbar({
                        message: err.message,
                        type: 'error'
                    })
                })
        }
    },

    created() {
        moment.locale('id')
        this.todayDate = moment().format('DD/MM/YYYY')
        this.fetchUjian()
        this.assignDates()
    }
}
</script>

<style>
    .v-tabs__container {
        height: 48px;
        border: 1px solid #eee;
    }

    .v-tabs__container > .v-tabs__div {
        border-right: 1px solid #eee;
        min-width: 50px;
    }

    .v-tabs__container .v-tabs__div:last-of-type {
        border-right: none;
    }

    .v-tabs__bar {
        border-radius: 4px;
        overflow: hidden;
    }

    .day-active {
        color: white;
    }

    .exam-item {
        padding: 8px;
        border-radius: 8px;
        box-shadow: 0 0 10px 5px rgba(0, 0, 0, .03);
        margin-top: 16px;
        cursor: pointer;
    }

    .exam-status > .v-chip__content {
        height: auto;
        padding-top: 2px;
        padding-bottom: 2px;
    }
</style>

