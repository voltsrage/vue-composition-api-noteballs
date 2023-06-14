<template>
	<div class="edit-note">
		<AddEditNote
		v-model="noteContent"
		bgColor='link'
		label='Edit Note'
		placeholder='Edit note...'
			ref='addEditNoteRef'
		>
			<template #buttons>
				<button
				@click='$router.back()'
					class="button is-link is-light mr-2"
					>Cancel
				</button>
				<button
				@click='handleSaveClicked'
					class="button is-link has-background-link"
					:disabled='!noteContent'
					>Save Note
				</button>
			</template>
		</AddEditNote>
	</div>
</template>

<script setup>
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import {useStoreNotes} from '@/stores/storeNotes'
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'


const noteStore = useStoreNotes();
const route = useRoute();
const router = useRouter()

const noteContent = ref(noteStore.getNoteContent(route.params.id))

const handleSaveClicked = () => {
	noteStore.updateNote(route.params.id, noteContent.value)
	router.push('/')
}


</script>