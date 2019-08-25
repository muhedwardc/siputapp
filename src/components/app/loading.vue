<template>
    <v-layout v-if="loadingState == false || loadingState == true ? loadingState : $store.state.loadViewContent" justify-center>
        <v-progress-circular
            indeterminate
            color="primary"
            ></v-progress-circular>
    </v-layout>
</template>

<script>
export default {
    props: {
        loadingState: {
            type: Boolean,
            required: false,
            default: null
        }
    }
}
</script>
