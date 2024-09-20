<template>
    <!-- Main -->
    <!-- NavBar -->
    <v-container fluid style="background-color: #0a1015; width: 95vw; height: 16vh" class="ma-10">
        <v-row no-gutters>

            <!-- Logo -->
            <v-col cols="4">
                <!-- PROBLEMA COM TAMANHO DA LOGO ----- PROCURAR CSS ----- SEM MARGIN NEGATIVA -->
                <v-img src="../../public/logo.svg" contain height="250" width="250" style="margin-top: -50px;"
                    class="logo-overlay"></v-img>
            </v-col>

            <!-- Texto -->
            <v-col cols="4" class="mt-4">
                <p class="primary-text" style="color: white; font-family: Khand; font-size: 25px; letter-spacing: 3px;">
                    PLATAFORMA DE COTAÇÃO
                </p>
                <p class="development-text"
                    style="color: #5fd136; font-family: Khand; font-size: 40px; font-weight:600;">DESENVOLVIMENTO</p>
            </v-col>

            <!-- Site and Login -->
            <v-col cols="4">

                <!-- Site -->
                <v-row no-gutters style="position: fixed; top: 10; right: 10;">
                    <v-avatar class="mr-1" color="green" size="20" />
                    <p class="site-text" style="color: white; font-family: Kdam Thmor Pro; f">www.ecoscrap.com.br</p>
                </v-row>

                <!-- Login -->
                <v-row no-gutters>
                    <v-col align-self="end">
                        <p class="login-text">OLÁ {{ usuario }}, LOGOUT</p>

                    </v-col>
                </v-row>

            </v-col>
        </v-row>

        <!-- Utils Container -->
        <v-container style="width: 96vw; height: 6vh; color: #d9d9d9; border-radius: 50px50 50px 50px 50px;">
            <p>aaaaa</p>
        </v-container>

    </v-container>


    <!-- Notícias -->
    <v-container class="news-container mx-10" fluid>
        <v-row style="background: #0A1015;">
            <v-col cols="8">
                <div>
                    <span style="color:white; font-weight: 700;">RELATORIO DE PRECO</span>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="pl-4"
                    style="background-color: #f36f6f; border-top-left-radius: 50px; border-bottom-left-radius: 50px;">
                    <span style="color:white;">ULTIMA ATUALIZAÇÃO: {{ lastUpdate.toString() }}</span>
                </div>
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
                {
                    name: "FERRO",
                    price: 0,
                    type: "Metal"
                },
                {
                    name: "PLÁSTICO",
                    price: 0,
                    type: "Plastico"
                },
                {
                    name: "METAL",
                    price: 0,
                    type: "Metal"
                },
                {
                    name: "ALUMÍNIO",
                    price: 0,
                    type: "Metal"
                },
                {
                    name: "PAPELÃO",
                    price: 0,
                    type: "Papel"
                },
                {
                    name: "LATÃO",
                    price: 0,
                    type: "Metal"
                },
                {
                    name: "COBRE",
                    price: 0,
                    type: "Metal"
                }
            ]
        }
    },
}
</script>

<style scoped>
.login-text {
    color: white;
    font-family: Khula;
    font-size: 10px;
}

.news-container {
    width: 95vw;
}
</style>
