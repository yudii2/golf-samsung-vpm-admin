export default {
  updateCompetitions({ commit }, competitions) {
    competitions
      ? commit("UPDATE_COMPETITIONS", competitions)
      : commit("CLEAR_COMPETITIONS");
  },

  updateCompetitionsUpdated({ commit }, status) {
    status
      ? commit("UPDATE_COMPETITIONS_UPDATED")
      : commit("CLEAR_COMPETITIONS_UPDATED");
  },

  /**
   * ### 대회 목록 참가자 모달을 위한 메소드.
   */
  updateParticipants({ commit }, participants) {
    participants
      ? commit("UPDATE_PARTICIPANTS", participants)
      : commit("CLEAR_PARTICIPANTS");
  },

  /**
   * ### 참가자 조회의 대회 타이틀 설정.
   * @param {String} title > 참가자 조회 모달창에 설정할 타이틀.
   */
  updateCompetitionTitle({ commit }, title) {
    title
      ? commit("UPDATE_COMPETITION_TITLE", title)
      : commit("CLEAR_COMPETITION_TITLE");
  },
};
