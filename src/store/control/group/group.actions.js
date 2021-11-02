import useCaddie from "@/api/v1/monitor/useCaddie";
import useGroup from "@/api/v1/monitor/useGroup";

const { updateCaddieGroup } = useCaddie();
const { updateGroupColor } = useGroup();

export default {
  // groups
  updateGroups({ commit }, groups) {
    commit("UPDATE_GROUPS", groups);
  },
  updateSelectedGroupColorCode({ commit }, colorCode) {
    commit("UPDATE_SELECTED_GROUP_COLOR_CODE", colorCode);
  },
  // currentSelectedGroup
  updateCurrentSelectedGroup({ commit }, group) {
    commit("UPDATE_CURRENT_SELECTED_GROUP", group);
  },
  clearCurrentSelectedGroup({ commit }) {
    commit("CLEAR_SELECTED_GROUP");
  },
  /**
   * ### 단체 조회 상태 업데이트.
   */
  updateLookUpGroup({ commit }, group) {
    group ? commit("UPDATE_LOOKUP_GROUP", group) : commit("CLEAR_LOOKUP_GROUP");
  },

  /**
   * ### 단체 지정 시 캐디 아이콘 변경.
   * @param {String} roundId > 캐디 라운드 ID.
   * @param {String} groupCd > 단체 코드.
   * @param {String|Number} groupColor > 단체 색상.
   * @param {String} groupName > 단체 이름.
   */
  modifyGroupWithCaddie(_, { roundId, groupCd, groupColor, groupName }) {
    // 단체의 색상을 변경하는 API 호출 후 스토어 적용.
    updateGroupColor({
      groupCd,
      groupColor,
    });

    // 특정 라운드의 캐디 그룹을 변경하는 API 호출 후 스토어 적용.
    updateCaddieGroup({
      roundId,
      groupCd,
      groupName,
    });
  },
};
