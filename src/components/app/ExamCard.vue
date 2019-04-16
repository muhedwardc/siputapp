<template>
    <transition name="fade">
        <v-card style="height: 100%;">
            <v-layout style="height: 100%;" column justify-space-between>
                <v-card-title class="pb-0">
                    <v-layout column>
                        <p v-line-clamp:20="2" class="font-weight-bold mb-1 exam-title">
                            {{ item.ujian.skripsi.judul }}
                        </p>
                        <span>{{ dateUjian }} - {{ item.ujian.sesi.start_time + ' - ' + item.ujian.sesi.end_time }} - {{ item.ujian.skripsi.is_capstone ? 'Capstone - ' + item.ujian.ruang.nama : item.ujian.ruang.nama}}</span>
                    </v-layout>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="$router.push(`/ujian/${item.id}`)">Lihat</v-btn>
                </v-card-actions>
            </v-layout>
        </v-card>
    </transition>
</template>

<script>
import moment from 'moment'
import {mapActions} from 'vuex'
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: false
        }
    },

    computed: {
        isToday() {
            return this.item.ujian.tanggal == moment().format('L')
        },

        dateUjian() {
            return moment(this.item.ujian.tanggal, 'DD/MM/YYYY').format('DD MMMM YYYY')
            // return moment(this.item.ujian.tanggal).format('LLLL')
        }
    },

    created() {
        moment.locale('id')
    }
}
</script>

<style lang="sass" scoped>
    .chip 
        background-color: red
        color: white
        padding: 2px 12px
        border-radius: 20px
        font-size: 12px
        margin-left: 8px
        height: auto

    .v-card
        padding: 0 6px
        
    .v-card__actions
        .v-btn 
            padding: 0 8px
            &.hover-success:hover
                color: green

            &.hover-danger:hover
                color: red

    .fade
        &-enter-active,
        &-leave-active
            transition: opacity .5s

        &-enter,
        &-leave
            opacity: 0
    
    .exam-title
        word-break: break-word !important;
</style>

