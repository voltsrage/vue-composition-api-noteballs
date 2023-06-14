<template>
		<div class='p-4 mb-5'
		:class="`has-background-${bgColor}-dark`"
		>
		<label
		v-if='label'
		class="label has-text-white"
		>{{label}}</label>

			<div class="field">
				<div class="control">
					<textarea
					:value="modelValue"
					class="textarea"
					@input="$emit('update:modelValue', $event.target.value)"
					:placeholder="placeholder"
					v-autofocus
					maxlength="100"
					ref='textAreaRef'
					></textarea>
				</div>
			</div>

			<div class="field is-grouped is-grouped-right">
				<div class="control">
					<slot name="buttons" />
				</div>
			</div>
		</div>
</template>

<script setup>
import {ref} from 'vue'
import {vAutofocus} from '@/directives/vAutofocus'

const props = defineProps({
	modelValue: {
		type: String,
		required: true
	},
	bgColor: {
		type: String,
		default: 'success'
	},
	placeholder: {
		type: String,
		default: 'Type something...'
	},
	label: {
		type: String,
	}
})

const emit = defineEmits(['update:modelValue'])

// foce textArea


const textAreaRef = ref('')

const focusTextArea = () => {
	textAreaRef.value.focus()
}

// Used to expose functions to parent component
defineExpose({
	focusTextArea
})

</script>