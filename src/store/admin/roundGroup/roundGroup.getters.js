export default {
  getSelectedGroupAward: (state) => state.selectedGroupAward,
  getRoundGroupTeamList: (state) => state.roundGroupTeamList,
  getSelectedRoundGroup: (state) => state.selectedRoundGroup,
  //  =>competitionSettingList
  getSelectedRoundGroupCompetitionSettingList: (state) => state.selectedRoundGroupCompetitionSettingList,

  getIsCheckedLong: (state) => state.isCheckedLong,
  getIsCheckedNear: (state) => state.isCheckedNear,
  getIsCheckedBuddy: (state) => state.isCheckedBuddy,
  getIsCheckedPar: (state) => state.isCheckedPar,
  getIsCheckedOneOver: (state) => state.isCheckedOneOver,
  getIsCheckedTwoOver: (state) => state.isCheckedTwoOver,
  getIsCheckedThreeOver: (state) => state.isCheckedThreeOver,
  getIsCheckedDoublePar: (state) => state.isCheckedDoublePar,
  getIsCheckedFirstSecondGap: (state) => state.isCheckedFirstSecondGap,
  getIsCheckedLucky: (state) => state.isCheckedLucky,
  getIsCheckedNewPerio: (state) => state.isCheckedNewPerio,
  getIsCheckedFirstSecond: (state) => state.isCheckedFirstSecond,
  getIsCheckedStrokeHandy: (state) => state.isCheckedStrokeHandy,
  getIsCheckedHonest: (state) => state.isCheckedHonest,
  getSelectedRoundGroupName : (state) => state.selectedRoundGroupName,
  getSelectedRoundGroupVisitDt : (state) => state.selectedRoundGroupVisitDt,
};
