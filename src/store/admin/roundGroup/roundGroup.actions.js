export default {
  updateSelectedGroupAward({ commit }, groupAward) {
    groupAward
      ? commit("SET_SELECTED_GROUP_AWARD", groupAward)
      : commit("CLEAR_SELECTED_GROUP_AWARD");
  },

  updateRoundGroupTeamList({ commit }, roundGroupTeamList) {
    roundGroupTeamList
      ? commit("SET_ROUND_GROUP_TEAM_LIST", roundGroupTeamList)
      : commit("CLEAR_ROUND_GROUP_TEAM_LIST");
  },

  updateSelectedRoundGroup({ commit }, roundGroup) {
    roundGroup
      ? commit("UPDATE_SELECTED_ROUND_GROUP", roundGroup)
      : commit("CLEAR_SELECTED_ROUND_GROUP");
  },
};
