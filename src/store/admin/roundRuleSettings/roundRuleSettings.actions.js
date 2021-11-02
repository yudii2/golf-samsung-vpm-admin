export default {
  /**
   * ### 골프장 게임 설정 정보 병경하는 넘.
   * @param {Object} settingInfo > 설정 정보.
   */
  updateRoundRuleSettingInfo({ commit }, settingInfo) {
    settingInfo
      ? commit("UPDATE_ROUND_RULE_SETTING_INFO", settingInfo)
      : commit("CLEAR_ROUND_RULE_SETTING_INFO");
  },

  /**
   * ### 라운드 룰 설정에 대한 Update API 호출이 필요한 경우.
   * @param {*} status
   */
  updateNeedFetch({ commit }) {
    commit("UPDATE_NEED_FETCH");
  },
};
