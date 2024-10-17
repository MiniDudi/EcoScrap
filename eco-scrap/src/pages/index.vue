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
      <v-col cols="5" class="pa-0 mt-8">
        <v-card color="#005D98">
          <v-card-title class="text-h6 white--text py-2">
            RECICLAGEM PESO MEDIO (R$/kg)
          </v-card-title>
          <v-data-table :headers="headers" :items="materials" hide-default-footer></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="5" class="mt-6">
        <v-container>
          <VueApexCharts type="line" :options="chartOptions" :series="series"></VueApexCharts>
        </v-container>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import { useAuthStore } from '@/stores';
import { useMaterialStore } from '@/stores/material';
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    VueApexCharts,
  },
  data() {
    return {
      usuario: "Admin",
      isAdmin: false,
      lastUpdate: new Date(Date.now()),
      selectedTab: 0,
      localMaterials: [],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 3,
          curve: 'straight'
        },
        title: {
          text: 'Montanha-Russa dos Preços de Materiais',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
    categories: ['01/10', '02/10', '03/10', '04/10', '05/10', '06/10', '07/10', '08/10'],
    title: {
      text: 'Data (Outubro)'
    }
  },
        yaxis: {
          title: {
            text: 'Preço (R$)'
          },
          min: 0
        },
        // legend: {
        //   position: 'top',
        //   horizontalAlign: 'right',
        //   floating: true,
        //   offsetY: -25,
        //   offsetX: -5
        // },
        tooltip: {
          y: {
            formatter: function (val) {
              return "R$ " + val.toFixed(2)
            }
          }
        }
      },
      series: [{
        name: "FERRO",
        data: [0, 0.9, 0.95, 2.00, 1.45, 4.10, 0.75, 2.30]
      },
      {
        name: "PLÁSTICO",
        data: [0, 0.015, 0.03, 0.51, 0.025, 0.22, 0.035, 0.018]
      },
      {
        name: "METAL",
        data: [0, 2.10, 1.50, 3.90, 2.30, 1.70, 2.20, 1.80]
      },
      {
        name: "ALUMÍNIO",
        data: [0, 0.018, 0.025, 0.015, 0.03, 0.022, 0.028, 0.019]
      },
      {
        name: "PAPELÃO",
        data: [0, 0.008, 0.015, 0.005, 0.012, 0.009, 0.018, 0.007]
      },
      {
        name: "LATÃO",
        data: [0, 0.022, 0.018, 0.03, 0.025, 0.015, 0.028, 0.02]
      },
      {
        name: "COBRE",
        data: [0, 2.50, 3.20, 2.80, 3.50, 2.90, 3.80, 3.10]
      }],
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
  },
};

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
