<template>
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
                <h3 class="mb-2">{{ day.name + ', ' + getReadableFormat(day.date) }}</h3>
                <v-card flat>
                    {{ i }}
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-layout>
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
                }
            ],
            exams: [],
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
                if (day.date === this.today) this.activeTab = 'tab-' + i
            })
        },

        getReadableFormat(date) {
            moment.locale('id')
            return moment(date, 'DD/MM/YYYY').format('LL')
        },

        classifyExamsByDate(exams){
            console.log(exams)
        },

        fetchUjian() {
            const startOfWeek = moment().startOf('isoWeek').toDate()
            const startDate = moment(startOfWeek).format('YYYY-MM-DD')
            const endDate = moment(startOfWeek).add('week', 1).format('YYYY-MM-DD')
            axios.get(`/exams/?start_date=${startDate}&end_date=${endDate}`, { headers: { 'Authorization': 'Token ' + this.$store.state.auth.token }})
                .then(r => {
                    this.classifyExamsByDate(r.data)
                })
                .catch(err => {
                    this.showSnackbar({
                        message: err.message,
                        type: 'error'
                    })
                })
        }
    },

    computed: {
        today() {
            moment.locale('id')
            return moment(new Date, 'DD/MM/YYYY').format('DD/MM/YYYY')
        }
    },

    created() {
        this.fetchUjian()
        this.assignDates()
    }
}
</script>

<style>
    .v-tabs__container > .v-tabs__div {
        border-right: 1px solid #eee;
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
</style>

