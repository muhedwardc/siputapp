import Vue from 'vue'
import moment from 'moment'
import store from '@/store'
import { mapActions } from 'vuex'

Vue.mixin({
    data() {
        return {
            userId: store.state.auth.token ? store.state.auth.user.id : null
        }
    },

    computed: {
        isLeader() {
            return function(ketua) {
                const id = ketua.id
                if (typeof id == 'string' || typeof id == 'number') {
                    if (this.userId) {
                        return id == this.userId
                    }
                }
                return false
            }
        },

        isToday() {
            return function(date, format = 'DD/MM/YYYY') {
                moment.locale('id')
                return moment().format(format) === date
            }
        },

        isAdmin() {
            if (this.userId) {
                return store.state.auth.user.is_admin
            }
            return false
        },

        isPembimbing() {
            return function(a, b) {
                if (this.userId) {
                    return this.userId == a || this.userId == b
                }
                return false
            }
        },

        examStatus() {
            return function(status) {
                status -= 1
                let list = ['Belum mulai', 'Sedang Berlangsung', 'Selesai']
                return list[status]
            }
        }
    },

    methods: {
        ...mapActions([
            'showSnackbar'
        ]),

        formatDate(date, to = 'DD MMMM YYYY', from = 'DD/MM/YYYY') {
            moment.locale('id')
            return moment(date, from).format(to)
        },

        readableString(arr, par) {
            let res = ''
            for (let i = 0; i < arr.length; i ++ ){
                res += arr[i][par] + (i == arr.length-1 ? '' : ', ')
            }
            return res
        },

        joinToString(value, prop, joiner = ', ') {
            if (prop) {
                let valueMap = value.map(val => val[prop])
                return valueMap.join(joiner)
            } else {
                return value.join(joiner)
            }
        }
    }
})