<template>
    <v-toolbar class="top-navbar" app color="primary">
        <v-toolbar-side-icon class="white--text" @click="$store.state.sidebar = !$store.state.sidebar"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-and-down toolbar-item">
            <v-btn v-if="$store.state.auth.user" @click="$router.replace(`/profil`)" flat slot="activator" class="pl-4 pr-4 profile">
                <v-avatar tile class="profile-picture mr-2" size="32">
                    <img :src="$store.state.auth.user.foto || ''" alt="">
                </v-avatar>
                <span class="white--text font-weight-bold">{{ $store.state.auth.user.nama }}</span>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<style lang="scss">
    .top-navbar {
        border-bottom: 1px solid #eee;
        box-shadow: none !important;
        background-color: white !important;

        > div {
            padding-right: 0;
        }
    }

    .notifications {
        position: relative;
    }

    .has-notif {
        position: absolute;
        top: 0;
        right: 16px;
        background-color: red;
        border-radius: 50%;
        width: 8px;
        height: 8px;
    }

    .profile-picture {
        background-color: #e7e7e7;
        border-radius: 4px;
        overflow: hidden;
    }

    .profile-picture + span {
        text-transform: capitalize;
    }
</style>
