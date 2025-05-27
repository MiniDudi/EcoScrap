import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import User from '@/models/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: new User(),
    loading: true,
  }),

  actions: {
    async login(email, password) {
      try {
        const userCretential = await signInWithEmailAndPassword(auth, email, password)
        console.log(userCretential);
        
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', userCretential.user.email)));
        const userDoc = querySnapshot.docs[0];
        this.user = userDoc.exists() ? userDoc.data() : null;
      } catch (error) {
        console.error('Erro no Login:', error);
        alert('Erro no Login: Credenciais inválidas!')
      }
    },

    async register(userData) {
      try {
        console.log('Registering user:', userData.email);
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        const firebaseUser = userCredential.user;
        console.log('User registered in Firebase:', firebaseUser.uid);

        const newUser = new User({
          id: firebaseUser.uid,
          name: userData.username,
          email: userData.email,
          createdAt: new Date(),
          userType: 'user'
        });

        await setDoc(doc(db, 'users', newUser.id), newUser.toJson());
        console.log('User data saved in Firestore:', newUser.id);

        this.user = newUser;
        console.log('User registered successfully:', newUser);
      } catch (error) {
        this.error = error.message;
        console.error('Error during registration:', error);
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