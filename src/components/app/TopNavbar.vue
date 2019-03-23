<template>
    <v-toolbar class="top-navbar" app flat>
        <v-toolbar-side-icon @click="$store.state.sidebar = !$store.state.sidebar" v-if="!$store.state.onExam.id"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-and-down toolbar-item">
            <v-menu left offset-y overflow-x class="notifications">
                <v-btn flat slot="activator">
                    <v-icon>notifications_none</v-icon>
                    <div class="has-notif" v-if="notifications.length > 0"></div>
                </v-btn>
                <v-list v-if="notifications.length > 0">
                    <v-list-tile v-for="(n, i) in notifications" :key="i">
                        <v-layout align-center class="notification-item pa-2">
                            <v-icon class="mr-2">{{ n.type == 'success' ? 'check_circle' : 'info'}}</v-icon>
                            <span>{{ n.message }}</span>
                        </v-layout>
                    </v-list-tile>
                </v-list>
                <v-list v-else>
                    <v-layout align-center class="notification-item pa-2">
                        <v-icon class="mr-2">info</v-icon>
                        <span>Tidak ada notifikasi</span>
                    </v-layout>
                </v-list>
            </v-menu>
            <v-btn @click="$router.replace(`/${$store.state.auth.user.is_akademik ? 'akademik' : 'dosen'}/profil`)" flat slot="activator" class="pl-4 pr-4 profile">
                <v-avatar class="profile-picture mr-2" size="32">
                    <img src="" alt="">
                </v-avatar>
                <span>{{ $store.state.auth.user.nama }}</span>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            notifications: []
        }
    }
}
</script>


<style lang="scss">
    .top-navbar {
        border-bottom: 1px solid #eee;
        box-shadow: none !important;
        background-color: white !important;

        > div {
            padding-right: 0;
        }
    }

    .toolbar-item > * {
        border-left: 1px solid #eee;
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
        width: 28px;
        height: 28px;
        background-color: #e7e7e7;
        border-radius: 4px;
    }

    .profile-picture + span {
        text-transform: capitalize;
    }
</style>
