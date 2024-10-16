<template>
    <v-container>
        <v-col cols="12">
            <v-container>
                <p class="text-h3 mt-10 font-weight-medium" style="font-family: Khand">Denúncias</p>
                <p class="text-h5 mt-3 font-weight" style="font-family: Khand">Aqui você poderá enviar denúncias sobre
                    organizações</p>
            </v-container>
            <v-container>
                <v-row no-gutters>
                    <v-label></v-label>
                    <v-text-field label="E-mail" placeholder="Digite seu e-mail" variant="outlined"></v-text-field>
                </v-row>
                <v-row no-gutters>
                    <v-text-field label="Título" variant="outlined"></v-text-field>
                </v-row>
                <v-row no-gutters>
                    <v-textarea label="Descrição" variant="outlined"></v-textarea>
                </v-row>
            </v-container>
        </v-col>
    </v-container>
</template>
<script>

export default {
    data() {
        return {
        }
    },
    methods: {
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