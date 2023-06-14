<template>
	<div class="notes">

		<AddEditNote
			v-model="newNote"
			ref='addEditNoteRef'
			label='Add Note'
			placeholder='Add a new note...'
		>
			<template #buttons>
				<button
					class="button is-link has-background-success"
					@click='addNote'
					:disabled='!newNote'
					>Add New Note
				</button>
			</template>
		</AddEditNote>
		<!-- <div class="card has-background-success-dark p-4 mb-5">
			<div class="field">
				<div class="control">
					<textarea class="textarea"
					placeholder="Add a new note"
					v-model="newNote"
					ref='newNoteRef'
					></textarea>
				</div>
			</div>

			<div class="field is-grouped is-grouped-right">
				<div class="control">
					<button
					class="button is-link has-background-success"
					@click='addNote'
					:disabled='!newNote'
					>Add New Note</button>
				</div>
			</div>
		</div> -->
		<progress
		v-if='!notesStore.notesLoaded'
		class="progress is-large is-success"
		max="100"></progress>

		<template
			v-else
		>
			<Note
				v-for="note in notesStore.notes"
				:key='note.id'
				:note='note'
			/>

			<div
			v-if='!notesStore.notes.length'
	 		class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
			>
				No notes available yet!
			</div>
		</template>


	</div>
</template>

<script setup>

// imports
import {watch, ref, onMounted} from 'vue'
import {useStoreNotes} from '@/stores/storeNotes'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import {useWatchCharacters} from '@/use/useWatchCharacters'
// notes
const newNote = ref('')
// stores

const notesStore = useStoreNotes()

// mounted

// onMounted(() => {
// 	notesStore.init()
// })

const addEditNoteRef = ref(null)



const addNote = () => {
	notesStore.addNote(newNote.value)

	newNote.value = ''
	addEditNoteRef.value.focusTextArea()
}

// watch

useWatchCharacters(newNote);



</script>