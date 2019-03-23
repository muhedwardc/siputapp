<template>
  <v-app>
    <app-snackbar></app-snackbar>
    <template v-if="$store.state.auth.token && $store.state.auth.user">
      <app-sidebar v-if="!$store.state.onExam.id"></app-sidebar>
      <app-top-navbar></app-top-navbar>
      <v-content>
        <app-dashboard v-if="!$store.state.onExam.id">
          <app-error v-if="$store.state.loadError.show"></app-error>
          <router-view v-else></router-view>
        </app-dashboard>
        <template v-else>
          <app-error v-if="$store.state.loadError.show"></app-error>
          <router-view v-else></router-view>
        </template>
      </v-content>
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
    background: #fafafa;
</style>

