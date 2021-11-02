export default {
  SET_SAMPLE_SEARCH_NAME(state, searchName) {
    state.sampleSearchName = searchName;
  },
  CLEAR_SAMPLE_ALL(state) {
    state.sampleSearchName = null;
    state.sampleSearchList = [];
  },
  // 모든 store clear. 로그아웃 시 호출한다
  CLEAR_ALL(state) {
    state.userId = null;
    state.sampleSearchName = null;
    state.sampleSearchList = [];
  },
};
