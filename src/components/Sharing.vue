
<script setup>
import Popper from "vue3-popper";
import { ref } from "vue";

const isOpen = ref(false);

const props = defineProps({
	url: String,
	closeDelay: Number
})

const onOpen = () => {
	isOpen.value = true;
	setTimeout(() => {
		isOpen.value = false;
	}, props.closeDelay);
};

const copyToClipboard = (url) => {
	navigator.clipboard.writeText(url)
		.then(() => {
			onOpen()
		})
		.catch((e) => {
			console.error('error occurred while service url is copied', e);
		});
}

</script>

<template>
	<Popper
		arrow
		:content="$t('shareResult')"
		class="popper-customized"
		:show="isOpen"
	>
		<button
			type="button"
			class="copy-to-clipboard"
			@click="copyToClipboard(url)"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
				<polyline points="16 6 12 2 8 6" />
				<line
					x1="12"
					x2="12"
					y1="2"
					y2="15"
				/>
			</svg>
		</button>
	</Popper>
</template>

<style>
.copy-to-clipboard {
    box-sizing: border-box;
    border-radius: 25%;
    transition: background-color 0.3s, color 0.3s;
    background-color: unset;
    margin: 0;
    padding: 0;
    border: none;
    cursor: pointer;
}

.copy-to-clipboard svg {
    height: 18px;
    transition: 0.3s;
    color: var(--copy-to-clipboard-btn-color);
}

.copy-to-clipboard:hover svg {
    color: var(--copy-to-clipboard-btn-color-hover);
}

.popper-customized .popper {
    min-width: 160px;
    text-align: center;
}
</style>