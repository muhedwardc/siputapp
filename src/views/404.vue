<template>
    <v-layout class="container-404" align-center justify-center column>
        <img src="@/assets/404-error.svg" class="img-404">
        Maaf, halaman yang Anda tuju tidak ditemukan.
        <v-btn class="primary mt-2" @click="$router.push('/')">Kembali ke beranda</v-btn>
    </v-layout>
</template>

<style>
    .container-404 {
        width: 100%;
        height: 100%;
    }

    .img-404 {
        max-width: 200px;
        margin-bottom: 16px;
        display: block;
    }
</style>

