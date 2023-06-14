import { defineStore } from 'pinia'
import { httpsCallable } from 'firebase/functions';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { collection, setDoc, doc, onSnapshot, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { auth } from '@/js/firebase'
import { db, functions } from '@/js/firebase'
import { useStoreNotes } from '@/stores/storeNotes'


export const useStoreAuth = defineStore('storeAuth', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        init() {
            const notesStore = useStoreNotes()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    user.getIdTokenResult().then(IdTokenResult => {
                        console.log(IdTokenResult.claims)
                    })
                    this.user.id = user.uid
                    this.user.email = user.email
                    this.router.push('/')
                    notesStore.init()
                } else {
                    this.user = {}
                    this.router.replace('/auth')
                    notesStore.clearNotes()
                }
            })
        },
        registerUser(credentials) {
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then(async(userCredential) => {
                    const user = userCredential.user;
                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        name: credentials.name
                    })
                    const setCustomClaimsFunc = httpsCallable(functions, 'setCustomClaims');
                    let uid = userCredential.user.uid;
                    let customClaims = {
                        role: 'normal'
                    }
                    setCustomClaimsFunc({ uid: uid, customClaims: customClaims })
                        .then((result) => {
                            console.log(result.data); // { status: 'success' }
                        })
                        .catch((error) => {
                            console.error('Error setting custom claims:', error);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        },
        async signInWithGoogle() {
            const provider = new GoogleAuthProvider();
            const credential = await auth.signInWithPopup(provider)
        },
        loginUser(credentials) {
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user;

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        },
        logoutUser() {
            signOut(auth).then(() => {

            }).catch((error) => {

            })
        }
    },
    getters: {}
})