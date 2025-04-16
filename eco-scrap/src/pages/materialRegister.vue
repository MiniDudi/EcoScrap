<template>
    <v-container>
        <!-- Title -->
        <p class="text-h3 mt-5 font-weight-medium" style="font-family: Khand">Registrar novo material</p>
        <p class="text-h5 mt-3 font-weight" style="font-family: Khand">Preencha os dados do material para registrá-lo
        </p>

        <!-- Formulário de Registro -->
        <v-form @submit.prevent="addNewMaterial">
            <v-row>
                <v-col cols="12" sm="12" md="12">
                    <v-row>

                        <v-col cols="12" sm="6" md="6">

                            <v-text-field v-model="newMaterial.titulo" label="Título do material"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">

                            <v-text-field v-model="newMaterial.photoUrl" label="URL da foto (opcional)"></v-text-field>
                        </v-col>
                    </v-row>

                </v-col>
                <!-- Descrição -->
                <v-col cols="12" sm="12" md="12">
                    <v-textarea v-model="newMaterial.description" label="Descrição do material" auto-grow
                        required></v-textarea>
                </v-col>

            </v-row>


            <!-- Tipo de material -->
            <v-col cols="12" sm="6" md="6">
                <v-select v-model="newMaterial.materialType" :items="materialTypes" label="Tipo de material"
                    required></v-select>
            </v-col>

            <!-- Localização -->
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="newMaterial.location" label="Localização" required></v-text-field>
            </v-col>

            <!-- Tipo de quantidade -->
            <v-col cols="12" sm="6" md="3">
                <v-select v-model="newMaterial.qtyType" :items="qtyTypes" label="Tipo de unidade (ex: kg, unidade)"
                    required></v-select>
            </v-col>

            <!-- Quantidade (opcional) -->
            <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="newMaterial.qty" type="number" step="0.01" min="0"
                    label="Quantidade (opcional)"></v-text-field>
            </v-col>

            <!-- Botão de envio -->
            <v-row justify="center" class="mt-5">
                <v-btn color="primary" type="submit">Registrar material</v-btn>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            newMaterial: {
                userID: '', // Pode ser preenchido dinamicamente com o usuário logado
                titulo: '',
                description: '',
                photoUrl: '',
                materialType: '',
                location: '',
                qtyType: null,
                qty: null
            },
            materialTypes: ['Plástico', 'Metal', 'Vidro', 'Papel', 'Eletrônico'], // Exemplo
            qtyTypes: ['kg', 'g', 'unidade', 'litro']
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
                // Aqui você pode enviar o material para o store ou backend
                console.log('Material a ser registrado:', this.newMaterial);

                // Limpar o formulário após o envio
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
