<template>
  <v-container fluid class="pa-0 fill-height login-container">
    <v-row no-gutters class="fill-height">
      <!-- Lado esquerdo com fundo animado ecológico aprimorado -->
      <v-col cols="12" md="7" class="d-none d-md-flex">
        <div class="eco-background">
          <div v-for="i in 10" :key="i" class="falling-leaf" :style="randomLeafStyle()"></div>
          <div class="sun"></div>
          <v-img src="../../public/logo.svg" contain height="250" width="250" class="logo-overlay"></v-img>
        </div>
      </v-col>

      <!-- Lado direito com formulário de login aprimorado -->
      <v-col cols="12" md="5" class="d-flex align-center justify-center login-form-col">
        <v-card class="login-card" elevation="10" max-width="450" width="100%">
          <v-card-text>
            <h1 class="text-h3 font-weight-bold text-center eco-primary--text mb-6">EcoScrap</h1>
            <p class="text-subtitle-1 text-center mb-8">Login de acesso ao painel de Administrador</p>

            <v-form @submit.prevent="handleLogin">
              <v-text-field v-model="username" label="Usuário" prepend-inner-icon="mdi-account" variant="outlined"
                color="eco-primary" class="mb-4 input-field"></v-text-field>

              <v-text-field v-model="password" label="Senha" prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
                @click:append-inner="showPassword = !showPassword" variant="outlined" color="eco-primary"
                class="mb-6 input-field"></v-text-field>

              <v-btn type="submit" block color="eco-primary" size="x-large" class="mb-4 eco-btn" elevation="2">
                Entrar
              </v-btn>

              <div class="text-center">
                <a href="#" class="text-decoration-none eco-link">Esqueceu a senha?</a>
              </div>
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
      password: '',
      showPassword: false
    }
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore()
      try {
        await authStore.login(this.username, this.password)
        if (authStore.isAuthenticated) {
          alert('Login successful')
          this.$router.push('/admin')
        }
      } catch (error) {
        console.error('Login failed:', error)
        alert('Login failed')
      }
    },
    randomLeafStyle() {
      const size = Math.random() * (100 - 50) + 50;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * (15 - 10) + 10;
      const animationDelay = Math.random() * 10;

      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `${animationDelay}s`
      };
    }
  }
}
</script>

<style scoped>
.login-container {
  background-color: #e8f5e9;
}

.eco-background {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #3a9e3f, #8bff8d, #ffffff);
  overflow: hidden;
}

.falling-leaf {
  position: absolute;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23006400" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/></svg>');
  background-repeat: no-repeat;
  opacity: 0.4;
  animation: fall linear infinite;
  top: -100px;
  z-index: 9999;
  pointer-events: none;
}

@keyframes fall {
  0% {
    transform: translateY(-100%) rotate(0deg);
    opacity: 0.4;
  }

  100% {
    transform: translateY(1000px) rotate(360deg);
    opacity: 0;
  }
}


@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  100% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.logo-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
}

.login-form-col {
  background-color: rgba(255, 255, 255, 0.9);
}

.login-card {
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.8);
}

.login-card .v-card-text {
  color: #333333;
}

.eco-btn {
  text-transform: none;
  font-weight: bold;
  color: white;
  letter-spacing: 1px;
  background-color: #4caf50 !important;
  transition: all 0.3s ease;
  border-radius: 30px;
}

.eco-btn:hover {
  background-color: #388e3c !important;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.eco-primary--text {
  color: #4caf50 !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.eco-link {
  color: #388e3c;
  transition: all 0.3s ease;
  font-weight: 500;
}

.eco-link:hover {
  color: #4caf50;
  text-decoration: underline !important;
}
</style>