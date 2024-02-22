import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useRootFilterStore } from "./rootFilterStore.js";

export const DIRECTION = {
	ASC: 'ASC',
	DESC: 'DESC'
};

// Comparator should sort the items by ASC always. DESC will be applied in runtime.
const ORDERS = [
	{
		key: 'name',
		textLabelKey: 'sortingByName',
		comparator: (first, second) => first.name.localeCompare(second.name)
	},
	{
		key: 'date',
		textLabelKey: 'sortingByDate',
		comparator: (first, second) => first.date.localeCompare(second.date)
	}
];

const DEFAULT_ORDER = [ 'date', DIRECTION.DESC ];

const _parseSavedState = (state) => {
	if (!state) {
		return DEFAULT_ORDER;
	}

	const parts = state.split('-');

	if (parts.length !== 2) {
		return DEFAULT_ORDER;
	}

	const direction = (DIRECTION.DESC.toLowerCase() === parts[1].toLowerCase()) ? DIRECTION.DESC : DIRECTION.ASC;

	return [ parts[0], direction ];
};

const _buildInitialViewSettings = (savedState) => {
	const defaultSettings = ORDERS.reduce((obj, order) => ({
		...obj,
		[order.key]: DIRECTION.ASC
	}), {});
	const [ field, direction ] = _parseSavedState(savedState);

	defaultSettings[field] = direction;

	return defaultSettings;
};

const _reverted = (direction) => {
	return direction === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC;
};

export const useOrderStore = defineStore('orderStore', () => {
	const rootFilterStore = useRootFilterStore();

	// state
	const orderViewSettings = ref(_buildInitialViewSettings(rootFilterStore.order) || {});
	const selectedOrder = ref(_parseSavedState(rootFilterStore.order)[0]);

	// getters
	const getOrderViewSettings = computed(() => orderViewSettings.value);
	const getSelectedOrder = computed(() => selectedOrder.value);
	const getSelectedComparator = computed(() => {
		const comparator = ORDERS.find(order => order.key === selectedOrder.value).comparator;

		if (orderViewSettings.value[selectedOrder.value] === DIRECTION.ASC) {
			return comparator;
		}

		return (first, second) => -comparator(first, second);
	});

	// actions
	const toggleOrder = (orderKey) => {
		if (selectedOrder.value === orderKey) {
			// just revert direction
			orderViewSettings.value = {
				...orderViewSettings.value,
				[orderKey]: _reverted(orderViewSettings.value[orderKey])
			};
		} else {
			selectedOrder.value = orderKey;
		}

		rootFilterStore.setOrder(`${selectedOrder.value}-${orderViewSettings.value[selectedOrder.value]}`);
	};

	return {
		getOrderViewSettings,
		getOrders: ORDERS,
		getSelectedComparator,
		getSelectedOrder,
		toggleOrder
	};
})