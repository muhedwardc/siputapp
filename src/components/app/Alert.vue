<template>
    <transition transition="slide-x-reverse-transition">
        <v-alert
            dismissible
            :value="alert.show"
            :type="alert.type ? alert.type : 'success'">
            {{ alert.message }}
        </v-alert>
    </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            ...mapState([
                alert
            ])
        }
    }
}
</script>

