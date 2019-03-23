<template>
    <v-snackbar
        v-model="$store.state.snackbar.show"
        :timeout="$store.state.snackbar.action ? 5000 : 4000"
        :color="$store.state.snackbar.type"
        top
        right>
        {{ $store.state.snackbar.message }}
        <v-btn
            color="white"
            flat
            @click="$store.state.snackbar.show = false">
            <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

