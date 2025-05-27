import { db } from '@/firebase'
import Material from '@/models/material'
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore'

export default class MaterialsController {
    async getMaterials() {
        try {
            const ref = doc(db, 'materials/mainMaterials')
            return getDoc(ref)
        } catch (e) {
            console.log(e)
        }
    }

    async getHistory() {
        try {
            const ref = doc(db, 'materials/materialHistory')
            return getDoc(ref)
        } catch (e) {
            console.log(e)
        }
    }

    async registerMaterialToCollect(payload) {
        try {
            let materialToCollect = new Material(payload)
            const ref = doc(db, 'materials/materialsToCollect')
            return setDoc(ref, materialToCollect.toJson())
        } catch (e) {
            console.log(e)
        }
    }

    async deleteMaterial(payload) {
        try {
            const ref = doc(db, 'materials/mainMaterials')
            const ref2 = doc(db, 'materials/materialHistory')
            const docSnap = await getDoc(ref)
            const materials = docSnap.data().materials || []
            const index = materials.findIndex(material => material.name === payload.name)
            if (index > -1) materials.splice(index, 1)
            await updateDoc(ref, { materials })
            const docSnap2 = await getDoc(ref2)
            const history = docSnap2.data().history || []
            const newHistory = history.filter(item => item.name !== payload.name)
            await updateDoc(ref2, { history: newHistory })
        } catch (e) {
            console.log(e)
        }
    }

    async createNewMaterial(payload) {
        try {
            const ref = doc(db, 'materials/mainMaterials')
            const docSnap = await getDoc(ref)
            const materials = docSnap.data().materials || []
            materials.push(payload)
            await updateDoc(ref, { materials })
        } catch (e) {
            console.log(e)
        }
    }

    async editMaterial(originalMaterial, payload) {
        try {
            
            const ref = doc(db, 'materials/mainMaterials')
            const docSnap = await getDoc(ref)
            const materials = docSnap.data().materials || []
            const index = materials.findIndex(material => material.name === originalMaterial.name)

            if (index > -1) materials[index] = payload
            await updateDoc(ref, { materials })
        } catch (e) {
            console.log(e)
        }
    }

    async updateMaterials(payload) {
        try {
            const ref = doc(db, 'materials/mainMaterials')
            const ref2 = doc(db, 'materials/materialHistory')
            const doc2 = await getDoc(ref2)
            const history = doc2.data().history || []
            history.push({
                date: new Date(Date.now() + 86400000).toISOString(),
                price: payload.materials,
            })
            await updateDoc(ref2, { history })
            return updateDoc(ref, payload)
        } catch (e) {
            console.log(e)
        }
    }
}