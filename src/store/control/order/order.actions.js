export default {
  /**
   * ### 현재 선택된 매장 타입을 변경하는 액션.
   * @param {string} storeType > 매장 타입 (expected : "START", "TEE")
   */
  updateSelectedStoreType({ commit }, storeType) {
    commit("UPDATE_SELECTED_STORE_TYPE", storeType);
  },
  setOrderList({commit}, orderList){
    commit('SET_ORDER_LIST', orderList);
  },
  setSelectedOrder({commit}, selectedOrder){
    commit('SET_SELECTED_ORDER', selectedOrder)
  }
};
