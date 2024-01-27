<script setup>
import { DIRECTION, useOrderStore } from "../stores/orderStore.js";
import { computed } from "vue";

const orderStore = useOrderStore();

const viewSettings = computed(() => orderStore.getOrderViewSettings);
const orders = computed(() => orderStore.getOrders);
const selectedOrder = computed(() => orderStore.selectedOrder);

</script>

<template>
	<fieldset class="sorting-fieldbox">
		<legend class="order-legend">
			{{ $t('sortingLegend') }}
		</legend>
		<button
			v-for="order in orders"
			:key="order.key"
			:class="{'hovered': selectedOrder === order.key}"
			@click="orderStore.toggleOrder(order.key)"
		>
			<span>{{ $t(order.textLabelKey) }}</span>
			<span class="arrow">{{ viewSettings[order.key] === DIRECTION.ASC ? '&#8593;' : '&#8595;' }}</span>
		</button>
	</fieldset>
</template>

<style scoped>
.order-legend {
  padding-inline-start: 4px;
  padding-inline-end: 4px;
}

.arrow {
  margin-left: 4px
}

.sorting-fieldbox {
  border-color: #ffffff40;
  border-radius: 5px;
  margin-top: 10px;
  padding-bottom: 0;
  padding-top: 0;
}

.sorting-fieldbox button {
  padding: 5px 10px;
  margin: 7px 5px;
}

.sorting-fieldbox button:hover,
.sorting-fieldbox button.hovered {
  border-left: 4px solid var(--link-color);
  padding: 5px 7px;
}

</style>../stores/orderStore.js