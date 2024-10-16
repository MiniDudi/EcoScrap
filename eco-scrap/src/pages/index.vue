<template>
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
  
  methods: {
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
