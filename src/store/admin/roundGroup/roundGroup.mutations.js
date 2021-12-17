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

  // roundGroup Award competitionSettingList
  setSelectedRoundGroupCompetitionSettingList(state, selectedRoundGroupCompetitionSetting) {
    state.selectedRoundGroupCompetitionSettingList = selectedRoundGroupCompetitionSetting;
  },

  //roundGroup ranking checkYn
  setIsCheckedLong(state, checkYn) { //롱
    state.isCheckedLong = checkYn
  },
  setIsCheckedNear(state, checkYn) { //니어
    state.isCheckedNear = checkYn
  },
  setIsCheckedBuddy(state, checkYn) { //버디
    state.isCheckedBuddy = checkYn
  },
  setIsCheckedPar(state, checkYn) {  //파
    state.isCheckedPar = checkYn
  },
  setIsCheckedOneOver(state, checkYn) { //보기
    state.isCheckedOneOver = checkYn
  },
  setIsCheckedTwoOver(state, checkYn) { //더블보기
    state.isCheckedTwoOver = checkYn
  },
  setIsCheckedThreeOver(state, checkYn) { //트리플보기
    state.isCheckedThreeOver = checkYn
  },
  setIsCheckedDoublePar(state, checkYn) {  // 더블파
    state.isCheckedDoublePar = checkYn
  },
  setIsCheckedFirstSecondGap(state, checkYn) { //전후반차
    state.isCheckedFirstSecondGap = checkYn
  },
  setIsCheckedLucky(state, checkYn) {//행운상
    state.isCheckedLucky = checkYn
  },
  setIsCheckedNewPerio(state, checkYn) {//신페리오
    state.isCheckedNewPerio = checkYn
  },
  setIsCheckedFirstSecond(state, checkYn) {//전,후반
    state.isCheckedFirstSecond = checkYn
  },
  setIsCheckedStrokeHandy(state, checkYn) { //스트로크핸디
    state.isCheckedStrokeHandy = checkYn
  },
  setIsCheckedHonest(state, checkYn) { //어니스트
    state.isCheckedHonest = checkYn
  },
  setIsCheckedSecondClass(state, checkYn) {
    state.isCheckedSecondClass = checkYn
  },
  setIsCheckedThirdClass(state, checkYn) {
    state.isCheckedThirdClass = checkYn
  },

  //roundGroup selectedRoundGroup(시상설정 전페이지)
  setSelectedRoundGroupName(state, groupName) {
    state.selectedRoundGroupName = groupName
  },
  setSelectedRoundGroupVisitDt(state, visitDt) {
    state.selectedRoundGroupVisitDt = visitDt
  },
  clearSelectedRoundGroupName(state) {
    state.selectedRoundGroupName = '';
  },
  clearSelectedRoundGroupVisitDt(state) {
    state.selectedRoundGroupVisitDt = '';
  },


};
