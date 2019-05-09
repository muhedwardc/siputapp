<template>
    <transition name="fade">
        <v-card class="exam-card" :to="`/ujian/${item.id}`">
            <v-layout style="height: 100%;" column justify-start>
                <v-card-title class="pb-0">
                    <v-layout row align-start class="ma-0">
                        <p v-line-clamp:20="2" class="font-weight-bold mb-1 exam-title">
                            <span class="warning--text" v-if="item.ujian.skripsi.is_capstone">Capstone: </span>{{ item.ujian.skripsi.judul }}
                        </p>
                        <v-spacer></v-spacer>
                        <v-tooltip v-if="item.ujian.penguji[0].dosen == $store.state.auth.user.nama" top>
                            <template v-slot:activator="{ on }">
                                <v-avatar color="warning" style="flex-shrink: 0" size=24 v-on="on">
                                    <i class="fas fa-crown fa-sm" style="color: white;"></i>
                                </v-avatar>
                            </template>
                            <span>Ketua</span>
                        </v-tooltip>
                    </v-layout>
                </v-card-title>
                <v-card-text class="pt-0">
                    <span><span :class="isToday ? 'indigo--text font-weight-bold' : ''">{{ isToday ? 'Hari ini' : dateUjian }}</span> - {{ item.ujian.sesi }} - Ruang {{ item.ujian.ruang }}</span>
                </v-card-text>
                <v-spacer></v-spacer>
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
            // return true
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
            text-transform: capitalize
            &:before
                background: none !important

            &:hover
                background: rgba(0, 0, 0, .03)
                border-radius: 8px

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
    
    .exam-card 
        height: 100%
        border-radius: 8px
        box-shadow: 0 0 10px 5px rgba(0, 0, 0, .03)
        cursor: pointer

        &:hover
            transform: scale(1.025)

</style>

