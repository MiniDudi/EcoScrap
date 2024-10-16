<template>
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
                            <v-btn @click="$router.push('/login')" color="#5fd136" dark
                                append-icon="mdi-logout">Entrar</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container v-else>
                    <v-row no-gutters align="center" class="d-flex">
                        <v-col cols="12" class="d-flex justify-end align-center">
                            <v-btn @click="$router.push('/admin')" color="#5fd136" dark
                                append-icon="mdi-calculator">Cotações</v-btn>
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
                        <span @click="selectTab(0), this.$router.push('/')"
                            :class="['tab-text', { 'font-weight-bold': selectedTab === 0 }]" class="cursor-pointer">
                            Cotação
                        </span>
                        <v-divider vertical thickness="3"></v-divider>
                        <span @click="selectTab(1), this.$router.push('/materials')"
                            :class="['tab-text', { 'font-weight-bold': selectedTab === 1 }]" class="cursor-pointer">
                            Material
                        </span>
                        <v-divider vertical thickness="3"></v-divider>
                        <span @click="selectTab(2), this.$router.push('/complaint')" :class="['tab-text', { 'font-weight-bold': selectedTab === 2 }]"
                            class="cursor-pointer">
                            Denúncias
                        </span>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-container>

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
</template>
<script>
import { useAuthStore } from '@/stores';
import { useMaterialStore } from '@/stores/material';

export default {
    name: 'appBar',
    data() {
        return {
            selectedTab: 0,
            usuario: "Admin",
            isAdmin: false,
            lastUpdate: new Date(Date.now()),
        }
    },
    methods: {
        selectTab(tab) {
            this.selectedTab = tab
        },
        formatDateTime(date) {
            const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            const mm = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
            const yy = date.getFullYear().toString().slice(-2);
            const hh = date.getHours();
            const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            return `${dd}/${mm}/${yy} - ${hh}:${min}`;
        },
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