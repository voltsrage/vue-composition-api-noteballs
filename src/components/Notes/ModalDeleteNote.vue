<template>
	<div class="modal is-active p-2">
		<div class="modal-background"></div>
		<div class="modal-card" ref='modalCardRef'>
			<header class="modal-card-head">
				<p class="modal-card-title">Delete Note?</p>
				<button
				class="delete"
				@click='closeModal'
				aria-label="close"
				></button>
			</header>
			<section class="modal-card-body">
				Are you sure you want to delete this note?
			</section>
			<footer class="modal-card-foot is-justify-content-flex-end">
				<button
				@click='closeModal'
				class="button"
				>Cancel
			</button>
				<button
				@click='notesStore.deleteNote(noteId)'
				class="button is-danger"
				>Delete</button>

			</footer>
		</div>
	</div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import {onClickOutside} from '@vueuse/core'
import {useStoreNotes} from '@/stores/storeNotes'

// stores

const notesStore = useStoreNotes()

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	noteId: {
		type: String,
		required: true
	}
})

// emites

const emit = defineEmits(['update:modelValue'])

// close modal
const closeModal = () => {
	emit('update:modelValue',false)
}

// click outside to close

const modalCardRef = ref('')

onClickOutside(modalCardRef, (event) => {
	closeModal()
})

// keyboard control to close modal

const handleKeyboard = e => {
	if(e.key === "Escape"){
			closeModal()
		}
}

onMounted(() => {
	document.addEventListener('keyup', handleKeyboard)
})

onUnmounted(() => {
	document.removeEventListener('keyup', handleKeyboard)
})

</script>