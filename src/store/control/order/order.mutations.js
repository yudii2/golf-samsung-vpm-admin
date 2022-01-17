export default {
  UPDATE_SELECTED_STORE_TYPE(state, storeType) {
    state.selectedStoreType = storeType;
  },
  SET_ORDER_LIST(state, orderList){
    state.orderList = orderList
  },
  SET_SELECTED_ORDER(state, selectedOrder){
    state.selectedOrder = selectedOrder
  }
};
