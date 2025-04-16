<template>
  <v-app>
    <template v-if="$route.path === '/login' || $route.path === '/' || $route.path === '/register'">
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
import AppFooter from '@/components/AppFooter.vue';
import appBar from '../components/appBar.vue';

export default {
  name: 'App',
  components: {
    appBar,
  }
}
</script>
