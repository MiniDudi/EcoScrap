<template>
  <!-- Cards -->
  <!-- <v-container fluid class="py-0">
    <v-row class="mt-3 mx-16">
      <v-col cols="4">
        <v-sheet @click="$router.push('/materials')"
          class="d-flex flex-column justify-space-between material-card cursor-pointer"
          style="background-color: #F78386; height: 150px;">
          <v-img src="../assets/garrafa.svg" contain min-height="100" min-width="80" max-height="80" max-width="200"
            class="mt-2"></v-img>
          <div class="pa-2" style="background-color: #E5686B; width: 100%;">
            <span style="color: white; font-weight: 700;">PLÁSTICO</span>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet @click="$router.push('/materials')"
          class="d-flex flex-column justify-space-between material-card cursor-pointer"
          style="background-color: #F7E386; height: 150px;">
          <v-img src="../assets/lata.svg" contain min-height="80" min-width="80" max-height="80" max-width="200"
            class="mt-4"></v-img>
          <div class="pa-2" style="background-color: #E5D16B; width: 100%;">
            <span style="color: white; font-weight: 700;">ALUMÍNIO</span>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet @click="$router.push('/materials')"
          class="d-flex flex-column justify-space-between material-card cursor-pointer"
          style="background-color: #5FD136; height: 150px;">
          <v-img src="../assets/ferro.svg" contain min-height="80" min-width="80" max-height="80" max-width="200"
            class="mt-4"></v-img>
          <div class="pa-2" style="background-color: #4DB02B; width: 100%;">
            <span style="color: white; font-weight: 700;">FERRO</span>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container> -->

  <!-- Tabelas -->
  <v-container fluid class="pa-0 d-flex justify-space-between" align-center>
    <v-row class="justify-center">
      <!-- <v-col cols="5" class="pa-0 mt-8">
        <v-card color="#005D98">
          <v-card-title class="text-h6 white--text py-2">
            RECICLAGEM PESO MEDIO (R$/kg)
          </v-card-title>
          <v-data-table :headers="headers" :items="materials" hide-default-footer>
            <template #item.price="{ item }">
              R$ {{ item.price }}
            </template>
<template #item.actions="{ item }">
              <v-btn v-if="user.userType == 'admin' && user" @click="$router.push('/admin')" icon color="transparent"
                flat>
                <v-icon color="grey-darken-2" size="24">mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="convertMaterial(item)" icon color="transparent" flat>
                <v-icon color="grey-darken-2" size="24">mdi-calculator</v-icon>
              </v-btn>
            </template>
</v-data-table>
</v-card>
</v-col> -->
      <v-col cols="9" class="ma-6">
        <VueApexCharts type="line" ref="chart" :options="chartOptions" :series="series" width="100%" height="600" />
      </v-col>
      <v-col cols="2" class="ma-6">
        <div v-for="item in priceChanges" :key="item.name" class="my-16 d-flex align-center">
          <div class="mr-2" style="width: 12px; height: 12px;"
            :style="{ backgroundColor: item.up ? 'green' : 'red', borderRadius: '50%' }"></div>
          <span class="font-weight-bold">{{ item.name }}</span>
          <span class="ml-auto">R$: {{ item.currentPrice }}</span>
          <v-icon color="green" v-if="item.up" class="ml-2">mdi-arrow-up</v-icon>
          <v-icon color="red" v-else class="ml-2">mdi-arrow-down</v-icon>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <ConvertDialog @updateModalState="updateModal" :isDialogVisible="isConvertDialog" :material="selectedMaterial" />
</template>

<script>
import ConvertDialog from '@/components/convertDialog.vue';
import { useAuthStore } from '@/stores';
import { useMaterialStore } from '@/stores/material';
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    VueApexCharts,
    ConvertDialog
  },
  data() {
    return {
      usuario: "Admin",
      isAdmin: false,
      lastUpdate: new Date(Date.now()),
      selectedTab: 0,
      localMaterials: [],
      priceChanges: [],
      selectedMaterial: null,
      isConvertDialog: false,
      headers: [
        { title: 'Nome', value: 'name' },
        { title: 'Tipo', value: 'type' },
        { title: 'Preço', value: 'price' },
        { title: 'Ações', value: 'actions' },
      ],
      chartOptions: {
        chart: {
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
          text: 'Grafico dos Preços de Materiais',
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
          labels: { show: false }, // Ocultar rótulos
          axisTicks: { show: false }, // Ocultar ticks
          axisBorder: { show: false }, // Ocultar borda
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
      series: []
    }
  },

  async mounted() {
    await useMaterialStore().getMaterials()
    await useMaterialStore().getHistory()
    console.log(this.history);
    this.configChart()
    this.calculatePriceChanges()
  },

  methods: {
    calculatePriceChanges() {
      const data = this.series;
      this.priceChanges = [];

      data.forEach(item => {
        const values = item.data;
        if (values.length < 2) return;

        const last = parseFloat(values[values.length - 1]);
        const prev = parseFloat(values[values.length - 2]);
        const variation = last - prev;

        this.priceChanges.push({
          name: item.name,
          currentPrice: variation.toFixed(2),
          up: variation > 0
        });
      });
    },
    updateModal(isDialogVisible) {
      this.isConvertDialog = isDialogVisible
    },
    formatDateTime(date) {
      const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
      const mm = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
      const yy = date.getFullYear().toString().slice(-2);
      const hh = date.getHours();
      const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      return `${dd}/${mm}/${yy} - ${hh}:${min}`;
    },
    convertMaterial(material) {
      this.selectedMaterial = material
      console.log(this.selectedMaterial);

      this.isConvertDialog = true
    },
    configChart() {
      const pricesByName = {};

      this.history.forEach(entry => {
        entry.price.forEach(item => {
          if (!pricesByName[item.name]) {
            pricesByName[item.name] = { prices: [], dates: [] };
          }
          pricesByName[item.name].prices.push(parseFloat(item.price));
          pricesByName[item.name].dates.push(entry.date); // Adicionar a data correspondente
        });
      });

      this.series = Object.keys(pricesByName).map(name => ({
        name,
        data: pricesByName[name].prices
      }));

      const xAxisDates = Object.values(pricesByName)[0]?.dates || [];

      this.$refs.chart.updateOptions(
        {
          xaxis: {
            categories: xAxisDates,
            labels: {
              show: true,
              rotate: -45,
              formatter: val => {
                const date = new Date(val);
                return date.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                });
              },
            },
          },
          series: this.series,
        },
        false,
        true
      );
    },
  },

  computed: {
    materials() {
      return useMaterialStore().materials
    },
    history() {
      return useMaterialStore().history
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
