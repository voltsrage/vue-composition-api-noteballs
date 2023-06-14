import { defineStore } from 'pinia'
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef;
let getNotesSnapshot = null;

export const useStoreNotes = defineStore('storeNotes', {
    state: () => {
        return {
            notes: [],
            notesLoaded: false
        }
    },
    actions: {
        init() {
            // auth
            const storeAuth = useStoreAuth();
            notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes");
            this.getNotes()
        },
        async getNotes() {
            // live updates
            this.notesLoaded = false

            const q = query(notesCollectionRef, orderBy('date', 'desc'))
            getNotesSnapshot = onSnapshot(q, (querySnapshot) => {
                let notes = []
                querySnapshot.forEach((doc) => {
                    let note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date,
                    }
                    notes.push(note)
                });
                this.notes = notes
            }, error => {
                console.log('error.message', error.message)
            });
            this.notesLoaded = true
        },
        clearNotes() {
            this.notes = []
            if (getNotesSnapshot) getNotesSnapshot(); // unsubscribe from any active listener
        },
        async addNote(newNote) {
            let currentDate = new Date().getTime()
            let date = currentDate.toString();

            await addDoc(notesCollectionRef, {
                    date: date,
                    content: newNote
                })
                //this.notes.unshift(note)

        },
        async deleteNote(noteId) {
            //this.notes = this.notes.filter(note => { return note.id !== noteId })
            await deleteDoc(doc(notesCollectionRef, noteId));
        },
        async updateNote(noteId, content) {
            //let index = this.notes.findIndex(note => note.id === noteId)
            //this.notes[index].content = content

            await updateDoc(doc(notesCollectionRef, noteId), {
                content: content
            })
        }
    },
    getters: {
        getNoteContent: (state) => {

            return (noteId) => {
                return state.notes.filter(note => {
                    return note.id === noteId
                })[0].content
            }
        },
        totalNotesCount: (state) => {
            return state.notes.length
        },
        totalCharactersCount: (state) => {
            let count = 0;
            state.notes.forEach(note => {
                count += note.content.length
            })

            return count;
        }
    }
})