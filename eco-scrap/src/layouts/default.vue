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
        <!-- <FloatingContainer @click="handleFloatingAction" /> -->
      </v-main>
    </template>
  </v-app>
</template>

<script>
import appBar from '@/components/appBar.vue'
import GlobalLoading from '@/components/GlobalLoading.vue'
import { useAppStore } from '@/stores/app'

export default {
  name: 'App',
  components: {
    appBar,
    GlobalLoading
  },
  computed: {
    isLoading() {
      return useAppStore().loading
    }
  },
  mounted() {
    if (!['/login', '/', '/register'].includes(this.$route.path)) {
      this.injectBotpressScripts()
    }
  },
  watch: {
    '$route.path'(newPath) {
      if (!['/login', '/', '/register'].includes(newPath)) {
        this.injectBotpressScripts()
      }
    }
  },
  methods: {
    injectBotpressScripts() {
      if (document.getElementById('bp-inject')) return // evita múltiplas injeções

      const script1 = document.createElement('script')
      script1.src = 'https://cdn.botpress.cloud/webchat/v2.4/inject.js'
      script1.async = true
      script1.defer = true
      script1.id = 'bp-inject'

      const script2 = document.createElement('script')
      script2.src = 'https://files.bpcontent.cloud/2025/04/29/23/20250429232218-PR048Z3U.js'
      script2.async = true
      script2.defer = true

      document.body.appendChild(script1)
      document.body.appendChild(script2)
    }
  }
}
</script>


