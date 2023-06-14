<template>
	<nav class="navbar is-success" role="navigation" aria-label="main navigation">
		<div class="container is-max-desktop px-2">
			<div class="navbar-brand">
				<div class="navbar-item is-size-4 is-family-monospace" >
					Noteballs
				</div>

				<a @click.prevent='showMobileNav = !showMobileNav' role="button" class="navbar-burger" :class="{'is-active' : showMobileNav}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
				ref="navBurgerRef"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample"
			class="navbar-menu"
			 :class="{'is-active' : showMobileNav}"
			 ref='navbarMenuRef'
			 >

			 <div class="navbar-start">
				<button
				v-if="storeAuth.user.id"
				@click='logout'
				class="button is-small is-info mt-3 ml-3">
					Log out {{storeAuth.user.email }}
				</button>
			 </div>
				<div class="navbar-end">
					<router-link
					@click.prevent='showMobileNav = false'
					class="navbar-item" :to="{name : 'notes'}" active-class="is-active">
						Notes
					</router-link>

					<router-link
					@click.prevent='showMobileNav = false'
					class="navbar-item" :to="{name : 'stats'}" active-class="is-active">
						Stats
					</router-link>

				</div>
			</div>
		</div>

	</nav>
</template>

<script setup>

	import {ref} from 'vue'
	import {onClickOutside} from '@vueuse/core'
	import {useStoreAuth} from '@/stores/storeAuth'

// auth
const storeAuth = useStoreAuth();

	const showMobileNav = ref(false)

	// click outside to close

	const navbarMenuRef = ref('')
	const navBurgerRef = ref('')

	onClickOutside(navbarMenuRef, (event) => {
		showMobileNav.value = false;
	},{
		ignore:[navBurgerRef]
	})

	// logout
	const logout = () => {
		showMobileNav.value = false;
		storeAuth.logoutUser()
	}

</script>

<style>

@media (max-width: 1023px) {
	.navbar-menu {
		position: absolute;
		left: 0;
		width: 100%;
	}
}

</style>