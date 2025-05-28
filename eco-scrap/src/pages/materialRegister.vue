<template>
    <v-container>
        <!-- Title -->
        <p class="text-h3 mt-5 font-weight-medium" style="font-family: Khand">
            Registrar novo material para coleta
        </p>
        <p class="text-h5 mt-3 mb-5 font-weight" style="font-family: Khand">
            Preencha os dados do material para registrá-lo
        </p>

        <!-- Formulário de Registro -->
        <v-form @submit.prevent="addNewMaterial">
            <!-- Título -->
            <v-row no-gutters class="mt-5">
                <v-col cols="12">
                    <div class="text-subtitle-1 text-medium-emphasis">Título do material</div>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="newMaterial.title" variant="outlined" prepend-icon="mdi-pencil" required />
                </v-col>
            </v-row>

            <!-- Imagem -->
            <v-row no-gutters class="">
                <v-col cols="12">
                    <div class="text-subtitle-1 text-medium-emphasis">Imagem do material</div>
                </v-col>
                <v-col cols="12">
                    <v-file-input accept="image/*" variant="outlined" prepend-icon="mdi-camera"
                        @change="onImageSelected" />
                </v-col>
                <v-col cols="12" class="mt-3">
                    <div v-if="imagePreview"
                        style="width: 150px; height: 150px; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center;">
                        <v-img :src="imagePreview" contain width="150" height="150" />
                    </div>
                </v-col>
            </v-row>

            <!-- Descrição -->
            <v-row no-gutters class="">
                <v-col cols="12">
                    <div class="text-subtitle-1 text-medium-emphasis">Descrição do material</div>
                </v-col>
                <v-col cols="12">
                    <v-textarea v-model="newMaterial.description" variant="outlined" prepend-icon="mdi-pencil" auto-grow
                        required />
                </v-col>
            </v-row>

            <!-- Tipo de material, unidade, quantidade -->
            <v-row no-gutters class="mt-5">
                <v-col cols="12" sm="5" class="mx-2"> <!-- Adicionando margem horizontal -->
                    <div class="text-subtitle-1 text-medium-emphasis">Tipo de material</div>
                    <v-select v-model="newMaterial.materialType" :items="materialTypes" variant="outlined"
                        prepend-icon="mdi-delete-circle-outline" required />
                </v-col>

                <v-col cols="12" sm="2" class="mx-2"> <!-- Adicionando margem horizontal -->
                    <div class="text-subtitle-1 text-medium-emphasis">Tipo de unidade</div>
                    <v-select v-model="newMaterial.qtyType" :items="qtyTypes" variant="outlined" required />
                </v-col>

                <v-col cols="12" sm="4" class="mx-2"> <!-- Adicionando margem horizontal -->
                    <div class="text-subtitle-1 text-medium-emphasis">Quantidade (opcional)</div>
                    <v-text-field v-model="newMaterial.qty" type="number" variant="outlined" step="0.01" min="0" />
                </v-col>
            </v-row>


            <!-- Localização -->
            <v-row no-gutters class="">
                <v-col cols="12">
                    <div class="text-subtitle-1 text-medium-emphasis">Localização</div>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="newMaterial.location" variant="outlined" prepend-icon="mdi-map-marker"
                        required />
                </v-col>
            </v-row>

            <!-- Botão -->
            <v-row justify="center" class=" mb-10">
                <v-btn color="#5fd136" type="submit">Registrar solicitação de coleta</v-btn>
            </v-row>
        </v-form>
    </v-container>
</template>


<script>
import { useMaterialStore } from '@/stores/material';
import emailjs from 'emailjs-com';

export default {
    data() {
        return {
            newMaterial: {
                userId: '',
                title: '',
                description: '',
                photoUrl: '',
                materialType: '',
                location: '',
                qtyType: null,
                qty: null
            },
            materialTypes: ['Plástico', 'Metal', 'Vidro', 'Papel', 'Eletrônico'],
            qtyTypes: ['kg', 'g', 'unidade', 'litro'],
        };
    },
    methods: {
        addNewMaterial() {
            if (
                this.newMaterial.title &&
                this.newMaterial.description &&
                this.newMaterial.materialType &&
                this.newMaterial.location &&
                this.newMaterial.qtyType !== null
            ) {
                const templateParams = {
                    to_email: 'rneoxplays@hotmail.com',
                    title: this.newMaterial.title,
                    description: this.newMaterial.description,
                    materialType: this.newMaterial.materialType,
                    location: this.newMaterial.location,
                    qtyType: this.newMaterial.qtyType,
                    qty: this.newMaterial.qty ?? 'Não informado',
                };

                emailjs.send('service_wiemdld', 'template_kmzw6xg', templateParams, 'Qgn42jj7XGdnx-Dif')
                    .then((response) => {
                        console.log('E-mail enviado com sucesso!', response.status, response.text);
                        alert('Material registrado e e-mail enviado com sucesso!');
                        useMaterialStore().registerMaterialToCollect(this.newMaterial);
                        this.resetNewMaterial();
                    }, (err) => {
                        console.error('Falha ao enviar o e-mail:', err);
                        alert('Erro ao enviar o e-mail. Tente novamente.');
                    });
            } else {
                alert('Preencha todos os campos obrigatórios!');
            }
        },
        resetNewMaterial() {
            this.newMaterial = {
                userId: '',
                titulo: '',
                description: '',
                photoUrl: '',
                materialType: '',
                location: '',
                qtyType: null,
                qty: null
            };
        }
    }
};
</script>
