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

    async getHistory() {
        try {
            const ref = doc(db, 'materials/materialHistory')
            return getDoc(ref)
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