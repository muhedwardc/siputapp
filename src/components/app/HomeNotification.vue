<template>
    <v-layout row align-start class="notification" @click="$router.push('/ujian/' + id)">
        <v-icon class="pa-1 pr-2" :class="type == 'info' ? 'primary--text' : 'error--text'">{{ type == 'info' ? 'error' : 'warning' }}</v-icon>
        <v-layout column>
            <p v-text="text" class="mb-0"></p>
            <p class="mb-0">{{room}} - {{time}}</p>
        </v-layout>
    </v-layout>
</template>

<script>
export default {
    props: {
        text: {
            type: String
        },
        type: {
            type: String
        },
        room: {
            type: String
        },
        time: {
            type: String
        },
        id: {
            type: String | Number,
            required: true
        }
    }
}
</script>

<style lang="sass">
    .container.grid-list-md .notification.layout:not(:only-child)
        padding: 4px
        border-radius: 4px
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, .1)
        margin-left: unset !important
        margin-right: unset !important
        margin-bottom: 8px !important
        cursor: pointer
</style>
