<template>
    <transition name="fade">
        <v-card v-if="type == 0" class="exam-card mb-3" :to="`/ujian/${item.id}`">
            <v-layout style="height: 100%;" column justify-start>
                <v-card-title class="pb-0">
                    <v-layout row align-start class="ma-0">
                        <p v-line-clamp:20="2" class="font-weight-bold mb-1 exam-title">
                            <span class="warning--text" v-if="item.ujian.skripsi.is_capstone">Capstone: </span>{{ item.ujian.skripsi.judul }}
                        </p>
                        <v-spacer></v-spacer>
                        <v-tooltip v-if="isLeader(item.ujian.skripsi.pembimbing_satu)" top>
                            <template v-slot:activator="{ on }">
                                <v-avatar color="warning" style="flex-shrink: 0" size=24 v-on="on">
                                    <i class="fas fa-crown fa-sm" style="color: white;"></i>
                                </v-avatar>
                            </template>
                            <span>Ketua</span>
                        </v-tooltip>
                    </v-layout>
                </v-card-title>
                <v-card-text class="pt-2 pl-4">
                    <v-layout class="mb-1">
                        <v-icon class="mr-1" small>event</v-icon>
                        <span>
                            <span class="mr-2" :class="isToday(item.ujian.tanggal) ? 'purple--text' : null"><b>{{ item.ujian.status == 3 ? 'SEDANG BERLANGSUNG' : isToday(item.ujian.tanggal) ? 'HARI INI' : formatDate(item.ujian.tanggal) }}</b></span>
                            <v-icon class="mr-1" small>access_time</v-icon>
                            <span :class="item.ujian.status == 2 ? 'purple--text font-weight-bold' : null">{{ item.ujian.status == 1 ? item.ujian.sesi : 'Sedang Berlangsung' }}</span>
                        </span>
                    </v-layout>
                    <v-layout class="mb-1">
                        <v-icon class="mr-1" small>location_on</v-icon>
                        <span v-text="item.ujian.ruang"></span>
                    </v-layout>
                    <v-layout class="mb-1">
                        <v-icon class="mr-1" small>person</v-icon>
                        <span>{{ joinToString(item.ujian.skripsi.mahasiswa, 'nama') }}</span>
                    </v-layout>
                </v-card-text>
            </v-layout>
        </v-card>
        <v-card v-if="type == 1" flat class="exam-item mb-3" column @click="$router.push(`/ujian/${item.id}`)">
            <v-layout class="ml-0 mr-0" row justify-space-between align-start>
                <h4><span class="warning--text" v-if="item.skripsi.is_capstone">Capstone: </span>{{item.skripsi.judul}}</h4>
                <v-chip label class="ma-0 exam-status" :color="item.status == 1 ? 'primary' : item.status == 2 ? 'warning' : 'success'" text-color="white">{{examStatus(item.status)}}</v-chip>
            </v-layout>
            <p class="mb-0"><span :class="isToday(item.ujian) ? 'purple--text font-weight-bold' : ''">{{ isToday(item.ujian) ? 'Hari ini' : formatDate(item.tanggal, 'LL') }}</span> - {{ item.sesi }} - {{ item.ruang }}</p>
            <p class="mb-0">Mahasiswa: {{ joinToString(item.skripsi.mahasiswa, 'nama') }}</p>
            <p class="mb-0">Penguji: {{ joinToString(item.penguji, 'dosen') }}</p>
        </v-card>
    </transition>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: false
        },
        type: {
            type: Number,
            default: 0
        }
    },
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
        min-height: 100px
        border-radius: 8px
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1)
        cursor: pointer

        &:hover
            transform: scale(1.01)
    
    .exam-item
        padding: 8px
        border-radius: 8px
        box-shadow: 0 0 10px 5px rgba(0, 0, 0, .03)
        cursor: pointer

    .exam-status > .v-chip__content
        height: auto
        padding-top: 2px
        padding-bottom: 2px
</style>

