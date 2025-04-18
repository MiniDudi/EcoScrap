<template>
    <v-app>
        <v-container fluid class="pa-0">
            <!-- Header -->
            <v-app-bar height="100" color="black" dark>
                <v-app-bar-title> <v-img src="../../public/logo.svg" cover max-height="100"
                        max-width="250"></v-img></v-app-bar-title>
                <v-spacer></v-spacer>
                <div class="mr-10">
                    <v-btn text @click="$router.push('/menu')"><v-icon class="mr-2">mdi-chart-timeline-variant</v-icon>
                        Ver Cotações</v-btn>
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
                <v-img src="../assets/planta.jpg" cover height="58vh" width="100vw">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-col cols="11" class="text-start white--text">
                            <p class="text-h2 mb-2">Seja parte da revolução da reciclagem!</p>
                            <p class="text-h5">Faça uma diferença com a EcoScrap hoje!</p>
                        </v-col>
                    </v-row>
                </v-img>
            </v-container>

            <!-- Quem Somos Section -->
            <v-container class="my-16">
                <h2 class="text-center mb-10">Quem Somos</h2>
                <v-row class="d-flex justify-center">
                    <v-col cols="10">
                        <p class="text-center" style="text-align: justify; font-size: 18px">O Ecoscrap é um software
                            desenvolvido para modernizar o mercado de
                            reciclagem de
                            metais, promovendo consumo e produção responsáveis. Feito para atender o mercado de
                            reciclagem, o
                            Ecoscrap agiliza processos de orçamento e cotação de materiais recicláveis para
                            ferros-velhos,
                            oferecendo funcionalidades como cotação em tempo real, comparação de preços e denúncia de
                            atividades
                            ilegais. Alinhado ao ODS 12 da ONU, buscamos tornar o mercado mais eficiente, transparente e
                            sustentável.</p>
                    </v-col>
                </v-row>

                <v-row class="d-flex justify-center">
                    <v-col class="text-center mb-6 mt-4 " cols="12">
                        <h2>Nossa equipe</h2>
                    </v-col>

                    <v-col v-for="integrant in integrants" :key="integrant.name" cols="4" md="2">
                        <v-img :src="integrant.photo" cover height="150" width="150"
                            class="rounded-circle d-block mx-auto"></v-img>
                        <p class="text-center font-weight-bold">{{ integrant.name }}</p>
                        <p class="text-center">{{ integrant.cargo }}</p>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>

        <v-divider></v-divider>

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

        <appFooter />
    </v-app>
</template>

<script>
import Lucas_Goulart_PO from '../assets/Lucas_Goulart_PO.jpeg'
import Justem_barros_Tester from '../assets/Justem_barros_Tester.jpeg'
import Henrique_Schuermann_Dev from '../assets/Henrique_Schuermann_Dev.jpeg'
import Thiago_godoy_Scrum from '../assets/Thiago_godoy_Scrum.jpeg'
import Lucas_Oliveira from '../assets/Lucas_Oliveira.jpeg'

export default {
    name: "LandingPage",
    data() {
        return {
            integrants: [
                {
                    name: "Justem Barros",
                    photo: Justem_barros_Tester,
                    cargo: "Tester"
                },
                {
                    name: "Henrique Schuermann",
                    photo: Henrique_Schuermann_Dev,
                    cargo: "Desenvolvedor"
                },
                {
                    name: "Lucas Goulart",
                    photo: Lucas_Goulart_PO,
                    cargo: "Product Manager"
                },
                {
                    name: "Thiago Godoy",
                    photo: Thiago_godoy_Scrum,
                    cargo: "Scrum Master"
                },
                {
                    name: "Lucas Oliveira",
                    photo: Lucas_Oliveira,
                    cargo: "Analista de Requisitos"
                }
            ]
        }
    }
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
