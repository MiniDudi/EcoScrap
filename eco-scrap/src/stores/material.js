import { defineStore } from 'pinia'
import MaterialsController from '@/controllers/MaterialsController'

export const useMaterialStore = defineStore('material', {
  state: () => ({
    materials: [],
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

    async updateMaterials(payload) {
      const controller = new MaterialsController()
      try {
        await controller.updateMaterials(payload)
        await this.getMaterials()
      } catch (error) {
        console.error('Error updating materials:', error)
      }
    }
  }
})