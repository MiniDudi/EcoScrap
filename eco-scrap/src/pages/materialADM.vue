<template>
    <v-container>
        <!-- Title -->
        <p class="text-h3 mt-5 font-weight-medium" style="font-family: Khand">
            Controle de materiais
        </p>
        <p class="text-h5 mt-3 mb-5 font-weight" style="font-family: Khand">
            Aqui você poderá criar/editar os materiais que trabalhamos
        </p>

        <!-- Materiais existentes -->
        <template v-for="(material, index) in materials" :key="'existing-' + material.name">
            <v-row class="mt-10">
                <v-col cols="12" class="d-flex justify-end">
                    <v-col cols="12">
                        <template v-if="editingMaterialName === material.name">
                            <v-text-field v-model="editedMaterial.name" label="Nome"></v-text-field>
                            <v-text-field type="number" v-model="editedMaterial.price" label="Preço"></v-text-field>
                            <v-text-field v-model="editedMaterial.type" label="Tipo"></v-text-field>
                            <v-btn color="green" class="mr-2" @click="saveEditedMaterial()">Salvar</v-btn>
                            <v-btn color="grey" @click="cancelEdit">Cancelar</v-btn>
                        </template>
                        <template v-else>
                            <h2>{{ material.name }}</h2>
                            <p>Preço: {{ material.price }}</p>
                            <p>Tipo: {{ material.type }}</p>
                            <v-btn color="blue" class="mr-2" @click="editMaterial(material)">Editar</v-btn>
                            <v-btn color="red" @click="deleteMaterial(material)">Eliminar</v-btn>
                        </template>
                    </v-col>
                </v-col>
                <v-divider class="my-10"></v-divider>
            </v-row>
        </template>


        <!-- Materiais em criação -->
        <template v-for="(material, index) in newMaterials" :key="'new-' + index">
            <v-row class="mt-10">
                <v-col cols="12" class="d-flex justify-end">
                    <v-col cols="12">
                        <v-text-field v-model="material.name" label="Nome"></v-text-field>
                        <v-text-field v-model="material.price" label="Preço"></v-text-field>
                        <v-text-field v-model="material.type" label="Tipo"></v-text-field>
                        <v-btn color="green" class="mr-2" @click="saveNewMaterial(material)">Salvar</v-btn>
                        <v-btn color="grey" @click="cancelNewMaterial(index)">Cancelar</v-btn>
                    </v-col>
                </v-col>
                <v-divider class="my-10"></v-divider>
            </v-row>
        </template>

        <!-- Botão para adicionar -->
        <v-row class="justify-center mt-5 mb-10">
            <v-btn color="green" @click="addEmptyMaterial">Adicionar novo material</v-btn>
        </v-row>

        <v-row class="justify-center mt-5 mb-10">
            <v-btn color="red-darken-1" class="mb-4" @click="resetChart">
                Resetar Gráfico
            </v-btn>
        </v-row>

    </v-container>
</template>


<script>
import { useMaterialStore } from '@/stores/material';

export default {
    data() {
        return {
            newMaterials: [],
            editingMaterialName: '',
            editedMaterial: {
                name: '',
                price: '',
                type: '',
            },
            originalMaterial: null,
        };
    },
    methods: {
        deleteMaterial(material) {
            if (confirm('Tem certeza que deseja eliminar este material?')) {
                useMaterialStore().deleteMaterial(material);
            }
        },
        editMaterial(material) {
            this.editingMaterialName = material.name;
            this.originalMaterial = { ...material };
            this.editedMaterial = { ...material }; // cópia para edição
        },
        cancelEdit() {
            this.editingMaterialName = null;
            this.editedMaterial = {
                name: '',
                price: '',
                type: '',
            };
            this.originalMaterial = null;
        },
        saveEditedMaterial() {
            if (
                this.editedMaterial.name &&
                this.editedMaterial.price &&
                this.editedMaterial.type
            ) {
                useMaterialStore().editMaterial(this.originalMaterial, this.editedMaterial);
                this.cancelEdit();
            } else {
                alert('Preencha todos os campos obrigatórios!');
            }
        },
        addEmptyMaterial() {
            this.newMaterials.push({
                name: '',
                price: '',
                type: '',
            });
        },
        cancelNewMaterial(index) {
            this.newMaterials.splice(index, 1);
        },
        saveNewMaterial(material) {
            if (material.name && material.price && material.type) {
                console.log('Salvando novo material:', material);
                useMaterialStore().createNewMaterial(material);
                this.cancelNewMaterial(this.newMaterials.indexOf(material));
            } else {
                alert('Preencha todos os campos obrigatórios!');
            }
        },
        resetChart() {
            if (confirm('Tem certeza que deseja resetar o gráfico? Esta ação não pode ser desfeita.')) {
                useMaterialStore().resetMaterialHistory();
                this.series = [];
                if (this.$refs.chart) {
                    this.$refs.chart.updateSeries([]);
                    this.$refs.chart.updateOptions({
                        xaxis: {
                            categories: [],
                        }
                    });
                }
            }
        }
    },

    computed: {
        materials() {
            return useMaterialStore().materials;
        },
    },
    created() {
        useMaterialStore().getMaterials()
    }

};
</script>
