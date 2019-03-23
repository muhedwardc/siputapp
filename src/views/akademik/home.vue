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
            activeTab: 0,
        }
    },

    methods: {
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
        }
    },

    computed: {
        today() {
            moment.locale('id')
            return moment(new Date, 'DD/MM/YYYY').format('DD/MM/YYYY')
        }
    },

    created() {
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

