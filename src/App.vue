<template>
  <v-app>
    <app-snackbar></app-snackbar>
    <template>
      <template v-if="$router.currentRoute.meta.noMenu">
        <app-error v-if="$store.state.loadError.show"></app-error>
        <router-view v-else></router-view>
      </template>
      <template v-else>
        <v-content>
          <app-dashboard>
            <app-error v-if="$store.state.loadError.show"></app-error>
            <router-view v-else></router-view>
          </app-dashboard>
        </v-content>
        <template>
          <app-sidebar></app-sidebar>
          <app-top-navbar></app-top-navbar>
        </template>
      </template>
    </template>
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

