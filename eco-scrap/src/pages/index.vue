<template>
  <!-- NavBar -->
  <v-container fluid style="background-color: #0a1015; height: 14vh">
    <v-row no-gutters>
      <!-- Logo -->
      <v-col cols="4" class="d-flex align-center">
        <v-img src="../../public/logo.svg" cover max-height="100" max-width="250"></v-img>
      </v-col>

      <!-- Texto -->
      <v-col cols="4" class="d-flex flex-column justify-center align-center mt-4">
        <p class="primary-text text-center"
          style="color: white; font-family: Khand; font-size: 25px; letter-spacing: 3px;">
          PLATAFORMA DE COTAÇÃO
        </p>
        <p class="development-text text-center"
          style="color: #5fd136; font-family: Khand; font-size: 40px; font-weight:600;">
          DESENVOLVIMENTO
        </p>
      </v-col>

      <!-- Site and Login -->
      <v-col cols="4" class="d-flex flex-column justify-center align-end">
        <!-- Site -->
        <v-row no-gutters class="mb-2">
          <v-avatar class="mr-2" color="green" size="15" />
          <p class="site-text" style="color: white; font-family: Kdam Thmor Pro;">
            www.ecoscrap.com.br
          </p>
        </v-row>

        <!-- Login -->
        <v-container v-if="!user">
          <v-row no-gutters align="center" class="d-flex">
            <v-col cols="12" class="d-flex justify-end align-center">
              <v-btn @click="$router.push('/login')" color="#5fd136" dark append-icon="mdi-logout">Entrar</v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else>
          <v-row no-gutters align="center" class="d-flex">
            <v-col cols="12" class="d-flex justify-end align-center">
              <v-btn @click="$router.push('/admin')" color="#5fd136" dark append-icon="mdi-calculator">Cotações</v-btn>
            </v-col>
          </v-row>
        </v-container>

      </v-col>
    </v-row>
  </v-container>

  <!-- Menu -->
  <v-container fluid class="pa-0 ml-5 mr-5">
    <v-col cols="12" class="pa-0">
      <v-card flat color="white" width="100%" rounded="100" outlined class="border-thin">
        <v-card-text class="pa-2">
          <div class="d-flex justify-space-around">
            <span @click="selectTab(0)" :class="['tab-text', { 'font-weight-bold': selectedTab === 0 }]"
              class="cursor-pointer">
              Cotação
            </span>
            <v-divider vertical thickness="3"></v-divider>
            <span @click="selectTab(1)" :class="['tab-text', { 'font-weight-bold': selectedTab === 1 }]"
              class="cursor-pointer">
              Material
            </span>
            <v-divider vertical thickness="3"></v-divider>
            <span @click="selectTab(2)" :class="['tab-text', { 'font-weight-bold': selectedTab === 2 }]"
              class="cursor-pointer">
              Denúncias
            </span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>

  <!-- News -->
  <v-container fluid class="pt-3">
    <v-row style="background: #0A1015;">
      <v-col cols="8">
        <span class="ml-5" style="color:white; font-weight: 700;">RELATORIO DE PRECO</span>
      </v-col>
      <v-col cols="4" class="pa-0 d-flex align-center justify-center"
        style="background-color: #F78386; clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%);">
        <span style="color:white;">ULTIMA ATUALIZAÇÃO: {{ formatDateTime(lastUpdate) }}</span>
      </v-col>
    </v-row>
  </v-container>

  <!-- Cards -->
  <v-container fluid class="py-0">
    <v-row class="mt-3 mx-16">
      <v-col cols="4">
        <v-sheet class="d-flex flex-column justify-space-between material-card cursor-pointer"
          style="background-color: #F78386; height: 150px;">
          <v-img src="../assets/garrafa.svg" contain min-height="100" min-width="80" max-height="80" max-width="200"
            class="mt-2"></v-img>
          <div class="pa-2" style="background-color: #E5686B; width: 100%;">
            <span style="color: white; font-weight: 700;">PLÁSTICO</span>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet class="d-flex flex-column justify-space-between material-card cursor-pointer"
          style="background-color: #F7E386; height: 150px;">
          <v-img src="../assets/lata.svg" contain min-height="80" min-width="80" max-height="80" max-width="200"
            class="mt-4"></v-img>
          <div class="pa-2" style="background-color: #E5D16B; width: 100%;">
            <span style="color: white; font-weight: 700;">ALUMÍNIO</span>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet class="d-flex flex-column justify-space-between material-card cursor-pointer"
          style="background-color: #5FD136; height: 150px;">
          <v-img src="../assets/ferro.svg" contain min-height="80" min-width="80" max-height="80" max-width="200"
            class="mt-4"></v-img>
          <div class="pa-2" style="background-color: #4DB02B; width: 100%;">
            <span style="color: white; font-weight: 700;">FERRO</span>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <!-- Tabelas -->
  <v-container fluid class="pa-0 d-flex justify-space-between" align-center>
    <v-row class="justify-center">
      <v-col cols="11" class="pa-0 mt-8 mr-5">
        <v-card color="#005D98">
          <v-card-title class="text-h6 white--text py-2">
            RECICLAGEM PESO MEDIO (R$/kg)
          </v-card-title>
          <v-data-table :headers="headers" :items="materials" hide-default-footer></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import { useAuthStore } from '@/stores';
import { useMaterialStore } from '@/stores/material';

export default {
  data() {
    return {
      usuario: "Admin",
      isAdmin: false,
      lastUpdate: new Date(Date.now()),
      selectedTab: 0
    }
  },
  mounted() {
    useMaterialStore().getMaterials()
  },
  created() {
    if (this.$route.path == '/index') {
      this.selectedTab = 0
    } else if (this.$route.path == '/materials') {
      this.selectedTab = 1
    } else if (this.$route.path == '/complaint') {
      this.selectedTab = 2
    }
  },
  methods: {
    selectTab(index) {
      this.selectedTab = index;
      switch (index) {
        case 0:
          this.$router.push('/');
          break;
        case 1:
          this.$router.push('/materials');
          break;
        case 2:
          this.$router.push('/complaint');
          break;
        default:
          console.warn('Tab index out of range');
          break;
      }
    },
    formatDateTime(date) {
      const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
      const mm = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
      const yy = date.getFullYear().toString().slice(-2);
      const hh = date.getHours();
      const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      return `${dd}/${mm}/${yy} - ${hh}:${min}`;
    }
  },
  computed: {
    materials() {
      return useMaterialStore().materials
    },
    user() {
      return useAuthStore().user
    }
  }
}
</script>

<style scoped>
.login-text {
  color: white;
  font-size: 20px;
}

v-application {
  background-color: #818181;
}

.tab-text {
  color: rgb(48, 48, 48);
  font-size: 24px;
  margin: 0 20px;
  cursor: pointer;
  transition: font-weight 0.3s ease;
}

.tab-text.font-weight-bold {
  font-weight: 700;
}

.material-card {
  transition: transform 0.3s ease;
}

.material-card:hover {
  transform: scale(1.05);
}
</style>
