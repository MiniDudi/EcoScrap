<template>
    <v-container>
        <!-- Title -->
        <p class="text-h3 mt-5 font-weight-medium" style="font-family: Khand">Registrar novo material para coleta</p>
        <p class="text-h5 mt-3 mb-5 font-weight" style="font-family: Khand">Preencha os dados do material para registrá-lo
        </p>

        <!-- Formulário de Registro -->
        <v-form @submit.prevent="addNewMaterial">
            <v-row>
                <v-col cols="12" sm="12" md="12">
                    <v-row>

                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="newMaterial.titulo" label="Título do material" required
                                prepend-icon="mdi-pencil"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                            <v-file-input accept="image/*" label="Imagem do material" prepend-icon="mdi-camera"
                                @change="onImageSelected"></v-file-input>

                            <div v-if="imagePreview" class="mt-3"
                                style="width: 150px; height: 150px; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center;">
                                <v-img :src="imagePreview" contain width="150" height="150" />
                            </div>
                        </v-col>

                    </v-row>

                </v-col>
                <!-- Descrição -->
                <v-col cols="12" sm="12" md="12">
                    <v-textarea v-model="newMaterial.description" label="Descrição do material" auto-grow required
                        prepend-icon="mdi-pencil"></v-textarea>
                </v-col>

            </v-row>

            <v-row>
                <!-- Tipo de material -->
                <v-col cols="12" sm="4" md="4">
                    <v-select v-model="newMaterial.materialType" :items="materialTypes" label="Tipo de material"
                        prepend-icon="mdi-delete-circle-outline" required></v-select>
                </v-col>

                <!-- Tipo de quantidade -->
                <v-col cols="12" sm="4" md="4">
                    <v-select v-model="newMaterial.qtyType" :items="qtyTypes" label="Tipo de unidade (ex: kg, unidade)"
                        prepend-icon="mdi-weight-kilogram" required></v-select>
                </v-col>


                <!-- Quantidade (opcional) -->
                <v-col cols="12" sm="4" md="4">
                    <v-text-field v-model="newMaterial.qty" type="number" step="0.01" min="0"
                        label="Quantidade (opcional)"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <!-- Localização -->
                <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="newMaterial.location" label="Localização" required
                        prepend-icon="mdi-map-marker"></v-text-field>
                </v-col>
            </v-row>

            <!-- Botão de envio -->
            <v-row justify="center" class="mt-5 mb-10">
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
