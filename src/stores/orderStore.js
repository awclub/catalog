import { defineStore } from "pinia";

const ORDER_KEY = 'sortingOrder';

export const DIRECTION = {
	ASC: 'ASC',
	DESC: 'DESC'
}

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

const _parseSavedState = () => {
	const state = localStorage.getItem(ORDER_KEY);

	if (!state) {
		return [ 'date', DIRECTION.DESC ];
	}

	const parts = state.split('-');

	if (parts.length !== 2) {
		localStorage.removeItem(ORDER_KEY);

		return [ 'date', DIRECTION.DESC ];
	}

	const direction = (DIRECTION.DESC.toLowerCase() === parts[1].toLowerCase()) ? DIRECTION.DESC : DIRECTION.ASC;

	return [ parts[0], direction ];
};

const _buildInitialViewSettings = () => {
	const defaultSettings = ORDERS.reduce((obj, order) => {
		obj[order.key] = DIRECTION.ASC;

		return obj;
	}, {});
	const [ field, direction ] = _parseSavedState();

	defaultSettings[field] = direction;

	return defaultSettings;
}

const _reverted = (direction) => {
	return direction === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC;
}

export const useOrderStore = defineStore('orderStore', {
	state: () => ({
		orders: ORDERS,
		orderViewSettings: _buildInitialViewSettings() || {},
		selectedOrder: _parseSavedState()[0]
	}),
	getters: {
		getOrderViewSettings: state => state.orderViewSettings,
		getOrders: state => state.orders,
		getSelectedOrder: state => state.selectedOrder,
		getSelectedComparator: state => {
			const comparator = ORDERS.find(order => order.key === state.selectedOrder).comparator;

			if (state.orderViewSettings[state.selectedOrder] === DIRECTION.ASC) {
				return comparator;
			}

			return (first, second) => -comparator(first, second);
		}
	},
	actions: {
		toggleOrder(orderKey) {
			if (this.selectedOrder === orderKey) {
				// just revert direction
				this.orderViewSettings = {
					...this.orderViewSettings,
					[orderKey]: _reverted(this.orderViewSettings[orderKey])
				}
			} else {
				this.selectedOrder = orderKey;
			}

			localStorage.setItem(ORDER_KEY, `${this.selectedOrder}-${this.orderViewSettings[this.selectedOrder]}`)
		}
	},
})