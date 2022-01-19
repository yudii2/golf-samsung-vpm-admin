export default {
  getSelectedStoreType: (state) => state.selectedStoreType,
  getOrderList: ({orderList}) =>
    (caddieUniqNo) =>
      orderList.find((order)=> order?.caddieUniqNo === caddieUniqNo),
  getSelectedOrder : (state) => state.selectedOrder
}
