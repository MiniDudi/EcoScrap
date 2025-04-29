<template>
    <v-container>
        <v-col cols="12">

            <p class="text-h3 mt-5 font-weight-medium" style="font-family: Khand">Denúncias</p>
            <p class="text-h5 mt-3 font-weight" style="font-family: Khand">Aqui você poderá enviar denúncias sobre
                organizações de reciclagem, valores irregulares e questionamentos</p>
            <p class="text-h6 mt-3 font-weight-light" style="font-family: Khand">Seja claro e objetivo. Especifique
                a empresa alvo da denúncia e seus motivos. Nossa equipe trabalhará na análise e publicará sua
                denúncia em anonimato</p>
            <v-row no-gutters>
                <v-col cols="12">
                    <div class="text-subtitle-1 text-medium-emphasis">Título da Denúncia</div>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="title" variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12">
                    <div class="text-subtitle-1 text-medium-emphasis">Descrição da Denúncia</div>
                </v-col>
                <v-col cols="12">
                    <v-textarea v-model="body" variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center" no-gutters>
                <v-btn @click="sendComplaint()" color="red" type="submit">Denunciar</v-btn>
            </v-row>
        </v-col>
    </v-container>
</template>
<script>
import AppFooter from '@/components/AppFooter.vue';


export default {
    data() {
        return {
            title: '',
            body: '',
        }
    },
    methods: {
        sendComplaint() {
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=prefeitura@sorocaba.sp.gov.br&su=${this.title}&body=${this.body}`, '_blank');
        }
    },

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