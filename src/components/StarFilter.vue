<template>
	<div class="star-filter">
		<span class="all-icon" @click="setAll">
			<i class="icon">✨</i>
		</span>

		<span v-for="star in 5" :key="star" class="star" @click="setRank(star)">
			<i class="icon" :class="{'filled': star <= rank}">★</i>
		</span>
	</div>
</template>

<script>
import { useRanksStore } from "../stores/ranks.js";

export default {
	props: {
		initialRank: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			rank: this.initialRank,
		};
	},
	mounted() {
		const ranksStore = useRanksStore();

		this.rank = ranksStore.rank;
	},
	methods: {
		setRank(newRank) {
			this.rank = newRank;
			this.$emit('update:rank', this.rank);
		},
		setAll() {
			this.rank = 0;
			this.$emit('update:rank', this.rank);
		},
	},
};
</script>

<style scoped>
.star-filter .star .icon {
  margin-right: 4px;
  cursor: pointer;
  color: #ccc;
}
.star-filter .star .icon.filled {
  margin-right: 4px;
  color: #ffc107;
  -webkit-text-stroke: 1px #ffc107;
}
.star-filter .all-icon {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
</style>
