<template>
    <!-- NavBar -->
    <v-container fluid style="background-color: #0a1015; height: 14vh">
        <v-row no-gutters>
            <!-- Logo -->
            <v-col cols="4" class="d-flex align-center">
                <v-img src="../../public/logo.svg" cover max-height="100" max-width="250"></v-img>
            </v-col>

            <!-- Texto -->
            <v-col cols="4" class="d-flex flex-column justify-center align-center mt-4">
                <p class="primary-text text-center"
                    style="color: white; font-family: Khand; font-size: 25px; letter-spacing: 3px;">
                    PLATAFORMA DE COTAÇÃO
                </p>
                <p class="development-text text-center"
                    style="color: #5fd136; font-family: Khand; font-size: 40px; font-weight:600;">
                    DESENVOLVIMENTO
                </p>
            </v-col>

            <!-- Site and Login -->
            <v-col cols="4" class="d-flex flex-column justify-center align-end">
                <!-- Site -->
                <v-row no-gutters class="mb-2">
                    <v-avatar class="mr-2" color="green" size="15" />
                    <p class="site-text" style="color: white; font-family: Kdam Thmor Pro;">
                        www.ecoscrap.com.br
                    </p>
                </v-row>

                <!-- Login -->
                <v-container v-if="isAdmin">
                    <v-row no-gutters align="center" class="d-flex">
                        <v-col cols="8" class="d-flex justify-center align-center">
                            <span class="login-text" style="color: white;">OLÁ {{ usuario }}</span>
                        </v-col>
                        <v-col cols="4" class="d-flex justify-center align-center">
                            <v-btn class="" color="#5fd136" dark append-icon="mdi-logout">Sair</v-btn>
                        </v-col>
                    </v-row>
                </v-container>

            </v-col>
        </v-row>
    </v-container>

    <!-- Title -->
    <v-container>
        <p class="text-h3 mt-10 font-weight-medium" style="font-family: Khand">Painel de cotações</p>
        <p class="text-h5 mt-3 font-weight" style="font-family: Khand">Aqui você poderá visualizar e alterar os valores
            dos materiais cadastrados</p>
    </v-container>

    <!-- Input -->
    <!-- /////// TESTAR - FAZER SEM CARD ///////  -->
    <v-container>
        <v-form @submit.prevent="updateMaterials">
            <v-row>
                <v-col v-for="(material, index) in localMaterials" :key="index" cols="12" sm="6" md="4">
                    <v-text-field v-model="material.price" :label="material.name" type="number" step="0.01" min="0"
                        prefix="R$"></v-text-field>
                </v-col>
            </v-row>
            <v-col class="d-flex justify-center mt-5">
                <v-btn color="primary" type="submit">Atualizar cotações</v-btn>
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
                materials: this.localMaterials
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