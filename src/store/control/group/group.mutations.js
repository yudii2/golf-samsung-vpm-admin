import useCopy from "@/composables/useCopy";
const { objectCopier } = useCopy();

export default {
  updateGroups(state, groups) {
    state.groups = groups;
  },
  updateCurrentSelectedGroupColorCode(state, colorCode) {
    const foundGroup = state.groups.find(
      (g) => g.groupCd === state.currentSelectedGroup.data.groupCd
    );
    foundGroup.groupColor = colorCode;
    state.groups = objectCopier(state.groups);
  },

  /**
   * 단체 조회 업데이트 함수.
   */
  UPDATE_LOOKUP_GROUP(state, group) {
    state.lookUpGroup = group;
  },
  /**
   * 단체 조회 클리어 함수.
   */
  CLEAR_LOOKUP_GROUP(state) {
    state.lookUpGroup = null;
  },

  // new
  // groups
  UPDATE_GROUPS(state, groups) {
    state.groups = groups;
  },
  UPDATE_SELECTED_GROUP_COLOR_CODE(state, colorCode) {
    const foundGroup = state.groups.find(
      (g) => g.groupCd === state.currentSelectedGroup.data.groupCd
    );
    foundGroup.groupColor = colorCode;
  },
  // currentSelectedGroup
  UPDATE_CURRENT_SELECTED_GROUP(state, group) {
    state.currentSelectedGroup = group;
  },
  CLEAR_SELECTED_GROUP(state) {
    state.currentSelectedGroup = null;
  },
};
