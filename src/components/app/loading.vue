<template>
    <v-layout v-if="$store.state.loadViewContent" justify-center>
        <v-progress-circular
            indeterminate
            color="purple"
            ></v-progress-circular>
    </v-layout>
</template>
