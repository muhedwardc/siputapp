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
                        <h3 class="mb-2">{{ i == days.length-1 ? day.name : formatDate(day.date, 'dddd, DD MMMM YYYY') }}</h3>
                        <app-loading></app-loading>
                        <template v-if="!$store.state.loadViewContent">
                            <template v-if="day.exams.length > 0">
                                <v-layout column v-for="exam in day.exams" :key="exam.id">
                                    <app-exam-card :item="exam" :type="1"></app-exam-card>
                                </v-layout>
                            </template>
                            <p v-else>Tidak ada ujian.</p>
                        </template>
                    </v-tab-item>
                </v-tabs>
            </v-layout>
        </v-flex>
        <v-flex class="notifications pl-4" hidden-md-and-down lg4>
            <!-- <h3 class="mb-2">Rekap {{ thisMonth }}</h3> -->
            <v-layout column>
                <!-- <app-home-notification
                    v-for="n in notifications"
                    :key="n.id"
                    :id="n.id"
                    :time="n.time"
                    :room="n.room"
                    :text="n.text"
                    :type="n.type">
                </app-home-notification> -->
            </v-layout>
        </v-flex>
    </v-layout>
</v-container>
</template>


<script>
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
            notifications: [
                {
                    text: 'Ujian Sedang Berlangsung',
                    room: 'E6',
                    time: '08.00 WIB',
                    type: 'info',
                    id: 1
                },
                {
                    text: 'Dosen Kurang',
                    room: 'E8',
                    time: '08.00 WIB',
                    type: 'error',
                    id: 2
                },
            ],
            todayDate: '',
            activeTab: 0,
        }
    },

    computed: {
        thisMonth() {
            moment.locale('id')
            return moment().format('MMMM YYYY')
        }
    },

    methods: {
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

        async fetchUjian() {
            this.$store.state.loadViewContent = true
            const startOfWeek = moment().startOf('isoWeek').toDate()
            const startDate = moment(startOfWeek).format('YYYY-MM-DD')
            const endDate = moment(startOfWeek).add(2, 'week').format('YYYY-MM-DD')
            try {
                const response = await this.$thessa.getExamsBetweenDate(startDate, endDate)
                this.classifyExamsByDate(response.data.results)
                this.$store.state.loadViewContent = false
            } catch (error) {
                this.showSnackbar({
                    message: error.message,
                    type: 'error'
                })
                this.$store.state.loadViewContent = false   
            }
        }
    },

    created() {
        moment.locale('id')
        this.todayDate = moment().format('DD/MM/YYYY')
        this.$store.state.auth.token ? this.fetchUjian() : this.$router.push('/login')
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

    .notifications .layout.column:not(:only-child) {
        margin: unset !important;
    }

    .v-tabs__bar {
        border-radius: 4px;
        overflow: hidden;
    }

    .day-active {
        color: white;
    }
</style>

