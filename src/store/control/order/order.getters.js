export default {
  getSelectedStoreType: (state) => state.selectedStoreType,
  //TODO 찾기
  getOrderList: ({orderList}) =>
    (caddieUniqNo) =>
      orderList.find((order)=> order?.caddieUniqNo === caddieUniqNo),
  getSelectedOrder : (state) => state.selectedOrder
}
