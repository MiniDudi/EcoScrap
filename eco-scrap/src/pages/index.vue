<template>
    <v-app>
        <v-container fluid class="pa-0">
            <!-- Header -->
            <v-app-bar height="100"color="black" dark>
                <v-app-bar-title> <v-img src="../../public/logo.svg" cover max-height="100" max-width="250"></v-img></v-app-bar-title>
                <v-spacer></v-spacer>
                <div class="mr-10">
                    <v-btn text @click="$router.push('/menu')"><v-icon class="mr-2">mdi-chart-timeline-variant</v-icon> Ver Cotações</v-btn>
                    <v-btn text @click="$router.push('/login')"><v-icon class="mr-2">mdi-account</v-icon>Entrar</v-btn>
                </div>
            </v-app-bar>

            <!-- Hero Section -->
            <v-container class="text-center">
                <v-row class="my-16" align="center" justify="center">
                    <v-col cols="12" md="8" class="mt-16">
                        <h1 class="display-1">Bem-vindo(a) ao EcoScrap!</h1>
                        <p class="subtitle-1">A melhor app para suas necessidades de reciclagem!</p>
                        <v-btn color="green" class="mt-6" large @click="$router.push('/menu')">Ver Cotações</v-btn>
                    </v-col>
                </v-row>
            </v-container>

            <!-- Reciclagem Section with Text Overlay -->
            <v-container class="pa-0 my-16" fluid>
                <v-img src="../assets/reciclagem.png" cover height="60vh" width="100vw">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-col cols="11" class="text-start white--text">
                            <p class="text-h2 mb-2">Seja parte da revolução da reciclagem!</p>
                            <p class="text-h5">Faça uma diferença com a EcoScrap hoje!</p>
                        </v-col>
                    </v-row>
                </v-img>
            </v-container>

            <!-- Features Section -->
            <v-container class="my-16">
                <h2 class="text-center mb-16">Recursos</h2>
                <v-row class="my-16">
                    <v-col cols="12" md="4" class="text-center">
                        <v-icon size="48">mdi-rocket</v-icon>
                        <h3>Fácil de usar</h3>
                        <p>Navegue rapidamente por nossa interface amigável e intuitiva, otimizada para a melhor
                            experiência do usuário.</p>
                    </v-col>
                    <v-col cols="12" md="4" class="text-center">
                        <v-icon size="48">mdi-chart-timeline-variant</v-icon>
                        <h3>Histórico de cotação</h3>
                        <p>Veja o histórico de cotação dos materiais e faça uma análise mais precisa do mercado.</p>
                    </v-col>
                    <v-col cols="12" md="4" class="text-center">
                        <v-icon size="48">mdi-calculator</v-icon>
                        <h3>Cálculos no app</h3>
                        <p>Desfrute de cálculos de cotação automaticamente feitos para você, economizando tempo e
                            esforço.</p>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
        <appFooter />
    </v-app>
</template>

<script>
export default {
    name: "LandingPage",
};
</script>

<style scoped>
.text-center {
    text-align: center;
}

.white--text {
    color: white !important;
}
</style>
