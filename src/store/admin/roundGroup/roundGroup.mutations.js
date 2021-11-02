export default {
  SET_SELECTED_GROUP_AWARD(state, selectedGroupAward) {
    state.selectedGroupAward = selectedGroupAward;
  },
  CLEAR_SELECTED_GROUP_AWARD(state) {
    state.selectedGroupAward = null;
  },
  SET_ROUND_GROUP_TEAM_LIST(state, roundGroupTeamList) {
    state.roundGroupTeamList = roundGroupTeamList;
  },
  CLEAR_ROUND_GROUP_TEAM_LIST(state) {
    state.roundGroupTeamList = [];
  },

  UPDATE_SELECTED_ROUND_GROUP(state, roundGroup) {
    state.selectedRoundGroup = roundGroup;
  },
  CLEAR_SELECTED_ROUND_GROUP(state) {
    state.selectedRoundGroup = null;
  },
};
