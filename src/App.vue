<template>
  <v-app>
    <app-snackbar></app-snackbar>
    <template v-if="$store.state.auth.token && $store.state.auth.user">
      <app-sidebar v-if="!$router.currentRoute.meta.exam"></app-sidebar>
      <app-top-navbar v-if="!$router.currentRoute.meta.exam"></app-top-navbar>
      <v-content v-if="!$router.currentRoute.meta.exam">
        <app-dashboard>
          <app-error v-if="$store.state.loadError.show"></app-error>
          <router-view v-else></router-view>
        </app-dashboard>
      </v-content>
      <template v-else>
        <app-error v-if="$store.state.loadError.show"></app-error>
        <router-view v-else></router-view>
      </template>
    </template>
    <router-view v-else></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="sass">
  main.v-content
    background: #F8F8F8;
</style>

