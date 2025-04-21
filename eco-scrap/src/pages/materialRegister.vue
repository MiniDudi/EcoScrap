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
                    <v-text-field v-model="newMaterial.titulo" variant="outlined" prepend-icon="mdi-pencil" required />
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
export default {
    data() {
        return {
            newMaterial: {
                userID: '',
                titulo: '',
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
                this.newMaterial.titulo &&
                this.newMaterial.description &&
                this.newMaterial.materialType &&
                this.newMaterial.location &&
                this.newMaterial.qtyType !== null
            ) {
                console.log('Material a ser registrado:', this.newMaterial);
                this.resetNewMaterial();
            } else {
                alert('Preencha todos os campos obrigatórios!');
            }
        },
        resetNewMaterial() {
            this.newMaterial = {
                userID: '',
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
