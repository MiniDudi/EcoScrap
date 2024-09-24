<template>
    <!-- Main -->
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
                <v-row no-gutters align="end">
                    <span class="login-text">OLÁ {{ usuario }}</span>
                </v-row>
            </v-col>
        </v-row>
    </v-container>

    <!-- Menu -->
    <v-container fluid class="pa-0">
        <v-col cols="12" class="pa-0">
            <v-card flat color="white" width="100%">
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
                <span style="color:white;">ULTIMA ATUALIZAÇÃO: {{ lastUpdate.toString() }}</span>
            </v-col>
        </v-row>
    </v-container>

    <!-- Cards -->
    <v-container fluid class="py-0">
        <v-row class="mt-3 mx-16">
            <v-col cols="4">
                <v-sheet class="d-flex flex-column justify-space-between material-card cursor-pointer"
                    style="background-color: #F78386; height: 150px;">
                    <v-img src="../assets/garrafa.svg" contain min-height="100" min-width="80" max-height="80"
                        max-width="200" class="mt-2"></v-img>
                    <div class="pa-2" style="background-color: #E5686B; width: 100%;">
                        <span style="color: white; font-weight: 700;">PLÁSTICO</span>
                    </div>
                </v-sheet>
            </v-col>
            <v-col cols="4">
                <v-sheet class="d-flex flex-column justify-space-between material-card cursor-pointer"
                    style="background-color: #F7E386; height: 150px;">
                    <v-img src="../assets/lata.svg" contain min-height="80" min-width="80" max-height="80"
                        max-width="200" class="mt-4"></v-img>
                    <div class="pa-2" style="background-color: #E5D16B; width: 100%;">
                        <span style="color: white; font-weight: 700;">ALUMÍNIO</span>
                    </div>
                </v-sheet>
            </v-col>
            <v-col cols="4">
                <v-sheet class="d-flex flex-column justify-space-between material-card cursor-pointer"
                    style="background-color: #5FD136; height: 150px;">
                    <v-img src="../assets/ferro.svg" contain min-height="80" min-width="80" max-height="80"
                        max-width="200" class="mt-4"></v-img>
                    <div class="pa-2" style="background-color: #4DB02B; width: 100%;">
                        <span style="color: white; font-weight: 700;">FERRO</span>
                    </div>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>

    <v-container class="pa-0">
        <v-row>
            <v-col cols="5" class="px-0 pt-10 pb-0 mt-8 mb-10 mr-10" style="background-color: #005D98;">
                <v-data-table  :headers="headers" :items="materials" :items-per-page="5"
                    class="elevation-1"></v-data-table>
            </v-col>
            <v-col cols="5" class="px-0 pt-10 pb-0 mb-10 mt-8 ml-10" style="background-color: #005D98;">
                <v-data-table :headers="headers" :items="materials" :items-per-page="5" class="elevation-1"></v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            usuario: "dudu e juca",
            lastUpdate: Date.now(),
            materials: [
                { name: "FERRO", price: 0.02, type: "Metal" },
                { name: "PLÁSTICO", price: 0.01, type: "Plastico" },
                { name: "METAL", price: 0.03, type: "Metal" },
                { name: "ALUMÍNIO", price: 0.02, type: "Metal" },
                { name: "PAPELÃO", price: 0.01, type: "Papel" },
                { name: "LATÃO", price: 0.02, type: "Metal" },
                { name: "COBRE", price: 0.03, type: "Metal" }
            ],
            selectedTab: 0
        }
    },
    methods: {
        selectTab(index) {
            this.selectedTab = index;
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
