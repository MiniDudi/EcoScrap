<template>
  <v-app>
    <GlobalLoading v-if="isLoading" />
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
import GlobalLoading from '@/components/GlobalLoading.vue'
import { useAppStore } from '@/stores/app';

export default {
  name: 'App',
  components: {
    appBar,
    FloatingContainer,
    GlobalLoading
  },
  computed: {
    isLoading() {
      return useAppStore().loading
    }
  }
}
</script>
