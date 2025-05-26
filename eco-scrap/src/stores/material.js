import { defineStore } from 'pinia'
import MaterialsController from '@/controllers/MaterialsController'
import { doc, collection, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase' // Verifique o caminho correto para seu firebase.js

export const useMaterialStore = defineStore('material', {
  state: () => ({
    materials: [],
    history: []
  }),

  actions: {
    async getMaterials() {
      const controller = new MaterialsController()
      try {
        const document = await controller.getMaterials()
        if (document.exists()) {
          this.materials = document.data().materials
        } else {
          console.log('No materials found')
        }
      } catch (error) {
        console.error('Error fetching materials:', error)
      }
    },

    async getHistory() {
      const controller = new MaterialsController()
      try {
        const document = await controller.getHistory()
        if (document.exists()) {
          this.history = document.data().history
        } else {
          console.log('No history found')
        }
      } catch (error) {
        console.error('Error fetching history:', error)
      }
    },

    async updateMaterials(payload) {
      const controller = new MaterialsController()
      try {
        await controller.updateMaterials(payload)
        await this.getMaterials()
      } catch (error) {
        console.error('Error updating materials:', error)
      }
    },

    async registerMaterialToCollect(payload) {
      const controller = new MaterialsController()
      try {
        await controller.registerMaterialToCollect(payload)
      } catch (error) {
        console.error('Error registering material to collect:', error)
      }
    },

    async deleteMaterial(payload) {
      const controller = new MaterialsController()
      try {
        await controller.deleteMaterial(payload)
        await this.getMaterials()
      } catch (error) {
        console.error('Error deleting material:', error)
      }
    },

    async createNewMaterial(payload) {
      const controller = new MaterialsController()
      try {
        await controller.createNewMaterial(payload)
        await this.getMaterials()
      } catch (error) {
        console.error('Error creating new material:', error)
      }
    },

    async editMaterial(originalMaterial, payload) {
      const controller = new MaterialsController()
      try {
        await controller.editMaterial(originalMaterial, payload)
        await this.getMaterials()
      } catch (error) {
        console.error('Error editing material:', error)
      }
    },

    async resetMaterialHistory() {
      try {
        const docRef = doc(collection(db, 'materialHistory'), 'history');
        await deleteDoc(docRef);
        this.history = [];
        console.log('Histórico de materiais resetado com sucesso');
      } catch (error) {
        console.error('Erro ao resetar histórico de materiais:', error);
      }
    },
  }
})
