<template>
    <v-container>
        <p class="text-h3 mt-10 font-weight-medium" style="font-family: Khand">Materiais</p>
        <p class="text-h5 mt-3 font-weight" style="font-family: Khand">Aqui você poderá visualizar os materiais que
            trabalhamos</p>
        <v-row class="mt-10">
            <v-col cols="4">
                <div style="border-radius: 20px; background-color: #5FD136; padding-left: 3vw; padding-right: 3vw;">
                    <v-img src="../assets/ferro.svg" cover></v-img>
                </div>
            </v-col>
            <v-col cols="8" class="d-flex justify-end">
                <v-col cols="8">
                    <h2>Ferro</h2>
                    <p>Importância: O ferro é fundamental para a produção de aço, um material essencial para a
                        construção de infraestruturas e máquinas.</p>
                    <p>Encontrado em: Minas de ferro, sucata de aço.</p>
                    <p>Preço por kg: <strong>R$ {{getPriceByName('FERRO')}}</strong>.</p>
                </v-col>
            </v-col>

            <v-divider class="my-10"></v-divider>

            <v-col cols="8" class="d-flex justify-start">
                <v-col cols="8">
                    <h2>Plástico</h2>
                    <p>Importância: O plástico é amplamente utilizado em embalagens, reduzindo o desperdício de
                        alimentos e
                        facilitando o transporte.</p>
                    <p>Encontrado em: Embalagens de alimentos, objetos domésticos.</p>
                    <p>Preço por kg: <strong>R$ {{getPriceByName('PLÁSTICO')}}</strong>.</p>
                </v-col>
            </v-col>
            <v-col cols="4">
                <div style="border-radius: 20px; background-color: #F78386; padding-left: 3vw; padding-right: 3vw;">
                    <v-img src="../assets/garrafa.svg" cover></v-img>
                </div>
            </v-col>

            <v-divider class="my-10"></v-divider>

            <v-col cols="4">
                <div style="border-radius: 20px; background-color: #F7E386; padding-left: 3vw; padding-right: 3vw;">
                    <v-img src="../assets/lata.svg" cover></v-img>
                </div>
            </v-col>
            <v-col cols="8" class="d-flex justify-end">
                <v-col cols="8">
                    <h2>Alumínio</h2>
                    <p>Importância: O alumínio é um material leve e resistente, amplamente utilizado em embalagens e
                        componentes de aeronaves.</p>
                    <p>Encontrado em: Latas de bebidas, componentes de aeronaves.</p>
                    <p>Preço por kg: <strong>R$ {{getPriceByName('ALUMÍNIO')}}</strong>.</p>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { useMaterialStore } from '@/stores/material';

export default {
    data() {
        return {
            selectedTab: 1,
            lastUpdate: new Date(Date.now()),
        }
    },
    created() {
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
        },
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
        getPriceByName(name) {
            const material = this.materials.find(material => material.name === name);
            return material ? material.price : 'Preço não disponível';
        }
    },
    computed: {
        materials() {
            return useMaterialStore().materials
        }
    }
}
</script>
<style scoped>
.login-text {
    color: white;
    font-size: 20px;
    font-family: Khand;
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
    font-family: Khand;
}

.tab-text.font-weight-bold {
    font-weight: 700;
}
</style>