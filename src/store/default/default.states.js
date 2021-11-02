export default {
  userId: null,
  sampleSearchName: null, // 검색어. 검색할 때 사용. List 화면의 검색 textbox의 값에 양방향 바인딩(v-model) 된다. 'SAMPLE_SEARCH' action 호출 시에도 값이 바뀐다
  sampleSearchList: [], // 검색 결과. List 화면에 바인딩된다
};
