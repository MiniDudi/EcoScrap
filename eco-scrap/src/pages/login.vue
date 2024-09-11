<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row no-gutters class="fill-height">
      <!-- Left side with image -->
      <v-col cols="12" md="8" class="d-flex" style="background-color: #8B4513;">
        <div class="ball">
          <v-img
            src="../../public/logo.svg"
            cover
            height="100vh"
          ></v-img>
        </div>
      </v-col>

      <!-- Right side with login form -->
      <v-col cols="12" md="4" class="d-flex align-center justify-center" style="background-color: #333333;">
        <v-card class="fill-height pa-8" elevation="0" color="transparent" width="100%">
          <v-card-text class="d-flex flex-column justify-center h-100">
            <h1 class="text-h4 font-weight-bold text-center white--text mb-8">Login</h1>

            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                label="Usuario"
                type="text"
                required
                variant="outlined"
                color="brown"
                class="mb-4"
                bg-color="white"
                prepend-inner-icon="mdi-account"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                required
                variant="outlined"
                color="brown"
                class="mb-6"
                bg-color="white"
                prepend-inner-icon="mdi-lock"
              ></v-text-field>

              <v-btn
                type="submit"
                block
                color="brown"
                size="large"
                class="mb-4"
              >
                <v-icon left>mdi-login</v-icon>
                Entrar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore()
      try {
        await authStore.login(this.username, this.password)
        if (authStore.isAuthenticated) {
          // Redirect to home page or dashboard
          this.$router.push('/')
        }
      } catch (error) {
        console.error('Login failed:', error)
        // Handle login error (e.g., show error message to user)
      }
    }
  }
}
</script>

<style scoped>
.v-container {
  max-height: 100vh;
  overflow-y: auto;
}

.v-card {
  max-height: 100vh;
  overflow-y: auto;
}
.ball {
  width: 900px; 
  height: 900px;
  border-radius: 100%;
  background-color: #ffffff;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
</style>