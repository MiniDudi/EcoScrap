import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true,
    error: null,
  }),
  
  actions: {
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        this.error = null
      } catch (error) {
        this.error = error.message
      }
    },
    
    async logout() {
      try {
        const auth = getAuth()
        await signOut(auth)
        this.user = null
        this.error = null
      } catch (error) {
        this.error = error.message
      }
    },
    
    init() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        this.user = user
        this.loading = false
      })
    },
  },
  
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
})