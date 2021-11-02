export default {
  // isMultiSelectMode
  toggleMultiSelectMode({ commit }) {
    commit("TOGGLE_MULTI_SELECT_MODE");
  },
  // viewType
  updateViewType({ commit }, viewType) {
    commit("UPDATE_VIEW_TYPE", viewType);
  },
  // autoRefreshMode
  toggleAutoRefreshMode({ commit }) {
    commit("TOGGLE_AUTO_REFRESH_MODE");
  },

  /**
   * 자동 새로고침 모드 변경.
   */
  updateIsRefreshing({ commit }, status) {
    commit("UPDATE_IS_REFRESHING", status);
  },
  /**
   * 자동 새로고침 모드 종료.
   */
  clearAutoRefreshMode({ commit }) {
    commit("CLEAR_AUTO_REFRESH_MODE");
  },
  /**
   * 현재 윈도우 모드(풀화면/축소형) 업데이트.
   */
  updateIsMiniModeStatus({ commit }, status) {
    commit("UPDATE_IS_MINI_MODE_STATUS", status);
  },
};
