<template>
    <v-container>
        <v-layout justify-center row>
            <p>{{ $store.state.loadError.message }}</p>
            <v-btn @click="window.location.href=window.location.href" class="primary">Muat ulang halaman</v-btn>
        </v-layout>
    </v-container>
</template>
