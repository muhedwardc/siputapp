<template>
    <v-dialog v-model="appear" persistent max-width="600px">
        <v-card v-if="appear">
            <v-toolbar color="primary">
                <span class="white--text" v-text="title"></span>
            </v-toolbar>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
            <v-layout justify-center>
                <v-btn class="primary text-capitalize mb-2" @click="$emit('close')">selesai</v-btn>
            </v-layout>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        appear: {
            type: Boolean,
        },
        width: {
            type: String,
            default: '600px'
        },
        title: {
            type: String,
            default: 'Info Box'
        }
    }
}
</script>