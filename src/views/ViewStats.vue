<template>
	<div class="stats">
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>
						Stat
					</th>
					<th>
						Value
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Number of Notes</td>
					<td>{{ notesStore.totalNotesCount }}</td>
				</tr>
				<tr>
					<td>Number of Character (of all notes)</td>
					<td>{{ notesStore.totalCharactersCount }}</td>
				</tr>
			</tbody>
		</table>

		<input
		v-model="loveNoteballs"
		type="text"
		class="input"
		placeholder="Do you love noteballs??"
		v-autofocus
		>
	</div>
</template>

<script setup>
import {ref} from 'vue'
import {useStoreNotes} from '@/stores/storeNotes'
import {vAutofocus} from '@/directives/vAutofocus'
import {useWatchCharacters} from '@/use/useWatchCharacters'
// stores

const notesStore = useStoreNotes()

// watch
const loveNoteballs = ref('')
useWatchCharacters(loveNoteballs,50);
</script>