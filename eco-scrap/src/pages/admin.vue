<template>

    <!-- Title -->
    <v-container>
        <p class="text-h3 mt-5 font-weight-medium" style="font-family: Khand">Painel de cotações</p>
        <p class="text-h5 mt-3 font-weight" style="font-family: Khand">Aqui você poderá visualizar e alterar os valores
            dos materiais cadastrados</p>
    </v-container>

    <!-- Input -->
    <v-container>
        <v-form @submit.prevent="updateMaterials">
            <v-row>
                <v-col v-for="(material, index) in localMaterials" :key="index" cols="12" sm="6" md="4">
                    <v-text-field v-model="material.price" :label="material.name" type="number" step="0.01" min="0"
                        prefix="R$"></v-text-field>
                </v-col>
            </v-row>
            <v-col class="d-flex justify-center mt-5">
                <v-btn color="green" type="submit">Atualizar cotações</v-btn>
            </v-col>
        </v-form>
    </v-container>
</template>

<script>
import { useMaterialStore } from '@/stores/material';

export default {
    data() {
        return {
            usuario: "Admin",
            isAdmin: true,
            localMaterials: [],
            showAddMaterialModal: false,
            newMaterial: {
                name: '',
                type: '',
                price: 0
            }
        }
    },
    mounted() {
        useMaterialStore().getMaterials()
    },
    methods: {
        updateMaterials() {
            const materialsObject = {
                materials: this.localMaterials,
                lastUpdated: new Date(Date.now())
            }
            useMaterialStore().updateMaterials(materialsObject)
        },
        initializeLocalMaterials() {
            if (this.materials && this.materials) {
                this.localMaterials = [...this.materials]
            }
        },
        openAddMaterialModal() {
            this.showAddMaterialModal = true
        },
        closeAddMaterialModal() {
            this.showAddMaterialModal = false
            this.resetNewMaterial()
        },
        resetNewMaterial() {
            this.newMaterial = {
                name: '',
                type: '',
                price: 0
            }
        },
        addNewMaterial() {
            if (this.newMaterial.name && this.newMaterial.type && this.newMaterial.price) {
                this.localMaterials.push({ ...this.newMaterial })
                this.closeAddMaterialModal()
            } else {
                alert('Todos os campos são obrigatórios!')
                console.error('All fields are required')
            }
        }
    },
    computed: {
        materials() {
            return useMaterialStore().materials
        }
    },
    watch: {
        materials() {
            this.initializeLocalMaterials()
        },
    },
}
</script>