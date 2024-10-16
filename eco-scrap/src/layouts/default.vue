<template>
  <v-app>
    <template v-if="this.$route.path === '/login'">
      <v-main>
        <router-view />
      </v-main>
    </template>
    <template v-else>
        <v-main>
          <appBar />
          <router-view />
        </v-main>
    </template>
  </v-app>
</template>
<script>
import appBar from '../components/appBar.vue';

export default {
  name: 'App',
  components: {
    appBar,
  }
}
</script>
