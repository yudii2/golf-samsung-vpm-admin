export default {
  updateSelectedGroupAward({commit}, groupAward) {
    groupAward
      ? commit("SET_SELECTED_GROUP_AWARD", groupAward)
      : commit("CLEAR_SELECTED_GROUP_AWARD");
  },

  updateRoundGroupTeamList({commit}, roundGroupTeamList) {
    roundGroupTeamList
      ? commit("SET_ROUND_GROUP_TEAM_LIST", roundGroupTeamList)
      : commit("CLEAR_ROUND_GROUP_TEAM_LIST");
  },

  updateSelectedRoundGroup({commit}, roundGroup) {
    roundGroup
      ? commit("UPDATE_SELECTED_ROUND_GROUP", roundGroup)
      : commit("CLEAR_SELECTED_ROUND_GROUP");
  },

  // roundGroup Award competitionSettingList
  dispatchSetSelectedRoundGroupCompetitionSettingList({commit}, selectedRoundGroupCompetitionSetting) {
    commit('setSelectedRoundGroupCompetitionSettingList', selectedRoundGroupCompetitionSetting)
  },
  dispatchSetIsCheckedLong({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedLong', true) :
      commit('setIsCheckedLong', false)
  },
  dispatchSetIsCheckedNear({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedNear', true) :
      commit('setIsCheckedNear', false)
  },
  dispatchSetIsCheckedBuddy({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedBuddy', true) :
      commit('setIsCheckedBuddy', false)
  },
  dispatchSetIsCheckedPar({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedPar', true) :
      commit('setIsCheckedPar', false)
  },
  dispatchSetIsCheckedOneOver({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedOneOver', true) :
      commit('setIsCheckedOneOver', false)
  },
  dispatchSetIsCheckedTwoOver({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedTwoOver', true) :
      commit('setIsCheckedTwoOver', false)
  },
  dispatchSetIsCheckedThreeOver({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedThreeOver', true) :
      commit('setIsCheckedThreeOver', false)
  },
  dispatchSetIsCheckedDoublePar({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedDoublePar', true) :
      commit('setIsCheckedDoublePar', false)
  },
  dispatchSetIsCheckedFirstSecondGap({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedFirstSecondGap', true) :
      commit('setIsCheckedFirstSecondGap', false)
  },
  dispatchSetIsCheckedLucky({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedLucky', true) :
      commit('setIsCheckedLucky', false)
  },
  dispatchSetIsCheckedNewPerio({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedNewPerio', true) :
      commit('setIsCheckedNewPerio', false)
  },
  dispatchSetIsCheckedFirstSecond({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedFirstSecond', true) :
      commit('setIsCheckedFirstSecond', false)
  },
  dispatchSetIsCheckedStrokeHandy({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedStrokeHandy', true) :
      commit('setIsCheckedStrokeHandy', false)
  },
  dispatchSetIsCheckedHonest({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedHonest', true) :
      commit('setIsCheckedHonest', false)
  },
  dispatchSetIsCheckedSecondClass({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedSecondClass', true) :
      commit('setIsCheckedSecondClass', false)
  },
  dispatchSetIsCheckedThirdClass({commit}, checkYn) {
    checkYn === 'Y' ?
      commit('setIsCheckedThirdClass', true) :
      commit('setIsCheckedThirdClass', false)
  },
  //"checkYn": "2",    /* 1:스트로크, 2: 신페리오, 3:스트로크(핸디)
  dispatchSetIsCheckedHandyMode({commit}, checkYn) {
    commit('setIsCheckedHandyMode', checkYn);
  },
  dispatchSetSelectedRoundGroupName({commit}, groupName) {
    groupName ?
      commit('setSelectedRoundGroupName', groupName)
      : commit('clearSelectedRoundGroupName')
  },
  dispatchSetSelectedRoundGroupVisitDt({commit}, visitDt) {
    visitDt ?
      commit('setSelectedRoundGroupVisitDt', visitDt)
      : commit('clearSelectedRoundGroupVisitDt')
  }

};
