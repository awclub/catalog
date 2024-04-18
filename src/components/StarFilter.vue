<script>
import { useRanksStore } from "../stores/ranksStore.js";

export default {
	props: {
		initialRank: {
			type: Number,
			default: 0,
		},
	},
	emits: ['update:rank'],
	data() {
		return {
			rank: this.initialRank,
		};
	},
	mounted() {
		const ranksStore = useRanksStore();

		this.rank = ranksStore.getSelectedRanks;
	},
	methods: {
		setRank(newRank) {
			this.rank = newRank;
			this.$emit('update:rank', this.rank);
		},
		reset() {
			this.rank = 0;
			this.$emit('update:rank', this.rank);
		},
	},
};
</script>

<template>
	<div class="star-filter">
		<span v-for="star in 5" :key="star" class="star" @click="setRank(star)">
			<i class="icon" :class="{'filled': star <= rank}">★</i>
		</span>
		<input
			v-show="rank > 0"
			class="reset-button"
			type="button"
			title="reset"
			value="&#8634;"
			@click="reset"
		>
	</div>
</template>

<style scoped>
.star-filter {
	text-align: right;
}

.star-filter .star .icon {
  margin-right: 4px;
  cursor: pointer;
  color: #ccc;
  font-style: normal;  
  font-size: 1.3em;
}

.star-filter .star .icon.filled {
  margin-right: 4px;
  color: #ffc107;
  -webkit-text-stroke: 1px #ffc107;
}

.reset-button {
  font-size: 1em;
  display: inline;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  font-weight: bold;
  background-color: var(--reset-btn-bg-color);
  color: var(--reset-btn-text-color);
  width: 24px;
  height: 24px;
}

.reset-button:hover {
  background-color: var(--reset-btn-bg-color-hover);
  color: var(--reset-btn-text-color);
  transition: 0.3s;
}
</style>
../stores/ranksStore.js