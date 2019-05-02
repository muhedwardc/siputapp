<template>
    <v-layout class="container-404" align-center justify-center column>
        Maaf Halaman yang anda tuju tidak ditemukan.
        <v-btn class="primary" @click="$router.push('/')">Kembali ke beranda</v-btn>
    </v-layout>
</template>

<style>
    .container-404 {
        width: 100%;
        height: 100%;
    }
</style>

