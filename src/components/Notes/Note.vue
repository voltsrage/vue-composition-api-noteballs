<template>
		<div class="card mb-4" >
			<div class="card-content">
				<div class="content">
					{{note.content}}
					<div class="columns is-mobile has-text-grey-light mt-2">
						<small class="column"> Date: {{dateFormatted }} </small>
						<small class="column has-text-right"> {{ characterLength }} </small>
					</div>
				</div>
			</div>
			<footer class="card-footer">
				<RouterLink :to="`/editNote/${note.id}`"
				ref="#"
				class="card-footer-item"
				>Edit</RouterLink>
				<a @click.prevent='modals.deleteNote = true ' class="card-footer-item">Delete</a>
			</footer>
			<ModalDeleteNote
			v-if='modals.deleteNote'
			v-model="modals.deleteNote"
			:noteId='note.id'
			/>
		</div>
</template>

<script setup>
import {computed, reactive} from 'vue'
import {useStoreNotes} from '@/stores/storeNotes'
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'
import {useNow, useDateFormat} from '@vueuse/core'
// stores

const notesStore = useStoreNotes()
// props

const props = defineProps ({
	note:{
		type:Object,
		required: true
	}
})

// dates
const dateFormatted = computed(() => {
	let date = new Date(parseInt(props.note.date))
	return useDateFormat(date,'YYYY-MM-DD @ HH:mm ').value
})

const formatted = useDateFormat(useNow(), 'YYYY-MM-DD')

// methods

const deleteNote = (idToDelete) => {
	notesStore.deleteNote(idToDelete)

}

// computed

const characterLength = computed(() => {
	let length = props.note.content.length
	let desc = length > 1 ? 'characters' : 'character'
	return `${length} ${desc}`
})

// modals

const modals = reactive({
	deleteNote: false
})
</script>

