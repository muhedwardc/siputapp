<template>
    <transition name="fade">
        <v-card style="height: 100%;">
            <v-layout style="height: 100%;" column justify-space-between>
                <v-card-title>
                    <v-layout column>
                        <p v-line-clamp:20="2" class="font-weight-bold mb-1 exam-title">{{ item.ujian.judul }} <span v-if="isToday" class="chip">hari ini</span></p>
                        <span>{{ dateUjian }} - {{ item.ujian.jam }} - {{ item.ujian.is_capstone ? 'Capstone - ' + item.ujian.ruang : item.ujian.ruang}}</span>
                    </v-layout>
                </v-card-title>
                <v-card-actions>
                    <template v-if="item.is_attending == null">
                        <v-btn class="ml-1" color="success" depressed @click="attendingStatus(true)">
                            Datang
                        </v-btn>
                        <v-btn color="error" depressed @click="attendingStatus(false)">
                            Tolak
                        </v-btn>
                    </template>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="$router.push(`/ujian/${item.id}`)">Lihat</v-btn>
                </v-card-actions>
            </v-layout>
            <v-layout row justify-center v-if="action">
                <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                        <template v-if="!loading">
                            <v-card-text>Anda yakin untuk <b>{{ status ? '' : 'tidak' }} menghadiri</b> ujian tugas akhir?</v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click="dialogAction(true)">Ya</v-btn>
                            <v-btn color="red darken-1" flat @click="dialogAction(false)">Tidak</v-btn>
                            </v-card-actions>
                        </template>
                        <v-layout v-else align-center justify-content-center>
                            <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate>
                            </v-progress-circular>
                        </v-layout>
                    </v-card>
                </v-dialog>
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
        },
        action: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            dialog: false,
            loading: false,
            status: null
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),

        dialogAction(agree) {
            this.loading = true
            if (agree) {
                this.setAttendingStatus(this.status)
                this.loading = false
                this.dialog = false
                this.status = null
            } else {
                this.loading = false
                this.dialog = false
                this.status = null
            }
        },

        async setAttendingStatus(status) {
            if (!isNaN(this.index)) {
                let index = this.index
                this.$emit('status-has-change', { status, index })

                axios.post(`me/exams/${this.item.id}/${status ? 'terima' : 'tolak'}/`, {}, {
                    headers: {
                        'Authorization': 'Token ' + this.$store.state.auth.token
                    }
                })
                .then(r => {
                    this.showSnackbar({
                        message: `Anda telah mengkonfirmasi untuk ${status ? '' : 'tidak'} menghadiri ujian`,
                        type: 'success',
                        action: true
                    })
                    if (this.index) {
                        let index = this.index
                        this.$emit('status-has-change', { status,  index })
                    }
                })
                .catch(err => {
                    this.showSnackbar({
                        message: err.message,
                        type: 'error'
                    })
                })
            }
        },

        attendingStatus(status) {
            this.dialog = true
            this.status = status
        }
    },

    computed: {
        isToday() {
            return this.item.ujian.tanggal == moment().format('L')
        },

        dateUjian() {
            return this.item.ujian.tanggal
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

