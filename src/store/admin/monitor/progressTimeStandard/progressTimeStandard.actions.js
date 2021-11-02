export default {
  /**
   * ### 진생히간 표준설정 값 설정하는 넘.
   */
  updateProgressTimeStandardSettingInfo({ commit }, settingInfo) {
    settingInfo
      ? commit("UPDATE_PROGRESS_TIME_STANDARD_SETTING_INFO", settingInfo)
      : commit("CLEAR_PROGRESS_TIME_STANDARD_SETTING_INFO");
  },

  /**
   * ### 진행시간 표준설정 업데이트 신호.
   */
  updateProgressTimeStandardSettingNeedUpdate({ commit }) {
    commit("UPDATE_PROGRESS_TIME_STANDARD_SETTING_NEED_UPDATE");
  },
};
