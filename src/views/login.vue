<template>
    <v-layout row wrap>
        <v-flex xs12 sm7 class="banner">
            <v-layout column class="welcome" pa-4>
                <h2>Selamat datang!</h2>
                <h3 class="font-weight-light">Silahkan masuk menggunakan akun UGM Anda</h3>
            </v-layout>
        </v-flex>
        <v-flex xs12 sm5 md5>
            <v-container class="form-container">
                <v-layout align-center>
                    <v-layout column>
                        <h1 class="mb-0 primary--text font-italic">THESSA</h1>
                        <h3 class="mb-4 font-weight-regular black--text">Silahkan masuk dengan akun UGM Anda</h3>
                        <app-google-auth></app-google-auth>
                    </v-layout>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<style lang="scss">
    .banner {
        position: relative;

        &:before {
            background-image: url('~@/assets/banner.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            filter: brightness(100%);
            content: "";
        }
    }

    .form-container {
        width: 100%;
        height: 100%;
        padding-left: 10%;
        padding-right: 10%;
        background-color: white;

        > div {
            height: 100%;
        }

        .login-form {
            button {
                width: 100%;
                height: auto;
                padding-top: 12px;
                padding-bottom: 12px;
                margin: 0;
            }
        }
    }
</style>
