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
        <FloatingContainer @click="handleFloatingAction" />
      </v-main>
    </template>
  </v-app>
</template>

<script>
import appBar from '@/components/appBar.vue'
import FloatingContainer from '@/components/FloatingContainer.vue'

export default {
  name: 'App',
  components: {
    appBar,
    FloatingContainer
  }
}
</script>
