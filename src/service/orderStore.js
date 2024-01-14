import { defineStore } from "pinia";

export const DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC'
}

// Comparator should sort the items by ASC always. DESC will be applied in runtime.
const ORDERS = [
  {
    key: 'name',
    textLabel: 'Name',
    comparator: (first, second) => first.name.localeCompare(second.name)
  },
  {
    key: 'date',
    textLabel: 'Date',
    comparator: (first, second) => first.date.localeCompare(second.date)
  }
];

const _buildInitialViewSettings = () => {
  const defaultSettings = ORDERS.reduce((obj, order) => {
    obj[order.key] = DIRECTION.ASC;
    return obj;
  }, {});
  // todo: customize by localStorage data
  return defaultSettings;
}

const _reverted = (direction) => {
  return direction === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC;
}

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: ORDERS,
    orderViewSettings: _buildInitialViewSettings() || {},
    selectedOrder: 'name'
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
    }
  },
})