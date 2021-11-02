export default {
  updateMessages({ commit }, messages) {
    commit("UPDATE_MESSAGES", messages);
  },

  clearSearchCaddieNameInput({ commit }) {
    commit("CLEAR_SEARCH_CADDIE_INPUT");
  },

  // course
  updateMessengerSelectedCourseByAll({ commit }) {
    commit("UPDATE_MESSENGER_SELECTED_COURSE_BY_ALL");
  },
  updateMessengerSelectedCourseInfo({ commit }, course) {
    commit("UPDATE_MESSENGER_SELECTED_COURSE", course);
  },
  updateMessengerSelectedCourseByCaddie({ commit }, caddie) {
    commit("UPDATE_MESSENGER_SELECTED_COURSE_BY_CADDIE", caddie);
  },

  // holes
  updateMessengerSelectedHolesByAll({ commit }) {
    commit("UPDATE_MESSENGER_SELECTED_HOLES_BY_ALL");
  },
  updateMessengerSelectedHoleInfo({ commit }, holes) {
    commit("UPDATE_MESSENGER_SELECTED_HOLES", holes);
  },
  updateMessengerSelectedHolesByCaddies({ commit }, caddies) {
    commit("UPDATE_MESSENGER_SELECTED_HOLES_BY_CADDIES", caddies);
  },
  clearMessengerSelectedHolesInfo({ commit }) {
    commit("CLEAR_MESSENGER_SELECTED_HOLES_INFO");
  },

  // caddies
  updateMessengerSelectedCaddieByAll({ commit }) {
    commit("UPDATE_MESSENGER_SELECTED_CADDIE_BY_ALL");
  },
  updateMessengerSelectedCaddiesByHole({ commit }) {
    commit("UPDATE_MESSENGER_SELECTED_CADDIES_BY_HOLE");
  },
  clearMessengerSelectedCaddiesInfo({ commit }) {
    commit("CLEAR_MESSENGER_SELECTED_CADDIES_INFO");
  },

  // messengerSelectedHoleInfo
  updateMessengerSelectedCaddiesByCaddies({ commit }, caddies) {
    commit("UPDATE_MESSENGER_SELECTED_CADDIES_BY_CADDIES", caddies);
  },

  // selectedMessageTag
  updateSelectedMessageTag({ commit }, tag) {
    tag
      ? commit("UPDATE_SELECTED_MESSAGE_TAG", tag)
      : commit("CLEAR_SELECTED_MESSAGE_TAG");
  },

  updateMessengerTags({ commit }, tags) {
    tags
      ? commit("UPDATE_MESSENGER_TAGS", tags)
      : commit("CLEAR_MESSENGER_TAGS");
  },

  /**
   * ### 캐디명으로 캐디 검색.
   */
  updateSearchCaddieName({ commit }, caddieName) {
    commit("UPDATE_SEARCH_CADDIE_NAME", caddieName);
  },
  /**
   * ### 메신저에서 특정 캐디를 선택 했을 경우 업데이트.
   */
  updateMessengerSelectedCaddieInfo({ commit }, caddie) {
    commit("UPDATE_MESSENGER_SELECTED_CADDIE_INFO", caddie);
  },

  // messageListener
  updateMessageListener({ commit }, status) {
    status
      ? commit("ENABLE_MESSAGE_LISTENER")
      : commit("DISABLE_MESSAGE_LISTENER");
  },
};
