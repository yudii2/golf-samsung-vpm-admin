export default {
  getCurrentGroups: (state) => {
    return state.groups;
  },
  getCurrentSelectedGroup: (state) => {
    return state.currentSelectedGroup;
  },
  getGroupColorByCode: (state) => (groupCode) => {
    const foundGroup = state.groups.find((g) => g.groupCd === groupCode);
    return foundGroup ? foundGroup.groupColor : null;
  },
  currentLookUpGroup: (state) => {
    return state.lookUpGroup;
  },
};
