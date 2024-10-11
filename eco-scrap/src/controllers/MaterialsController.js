import { db } from '@/firebase'
import { getDoc, doc, updateDoc } from 'firebase/firestore'

export default class MaterialsController {
    async getMaterials() {
        try {
            const ref = doc(db, 'materials/mainMaterials')
            return getDoc(ref)
        } catch (e) {
            console.log(e)
        }
    }

    async updateMaterials(payload) {
        try {
            const ref = doc(db, 'materials/mainMaterials')
            return updateDoc(ref, payload)
        } catch (e) {
            console.log(e)
        }
    }

}