export default {
  UPDATE_PROGRESS_TIME_STANDARD_SETTING_INFO(state, settingInfo) {
    state.progressTimeStandardSettingInfo = settingInfo;
  },
  CLEAR_PROGRESS_TIME_STANDARD_SETTING_INFO(state) {
    state.progressTimeStandardSettingInfo = null;
  },

  UPDATE_PROGRESS_TIME_STANDARD_SETTING_NEED_UPDATE(state) {
    state.progressTimeStandardSettingNeedUpdate = true;
    setTimeout(() => {
      state.progressTimeStandardSettingNeedUpdate = false;
    }, 100);
  },
};
