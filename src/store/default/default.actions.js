export default {
  async SAMPLE_SEARCH({ commit, state }, searchName) {
    // 목록 조회. List 화면 진입 / 검색할 때, 상단 '리스트' 클릭할 때 호출됨
    commit("SET_SAMPLE_SEARCH_NAME", searchName);
    state.sampleSearchList = await ProjectService.fetchSampleList(searchName);
  },
};
