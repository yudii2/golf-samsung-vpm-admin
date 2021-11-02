export default {
  UPDATE_ROUND_RULE_SETTING_INFO(state, settingInfo) {
    state.roundRuleSettingInfo = settingInfo;
  },
  CLEAR_ROUND_RULE_SETTING_INFO(state) {
    state.roundRuleSettingInfo = null;
  },

  UPDATE_NEED_FETCH(state) {
    state.needFetch = true;
    setTimeout(() => {
      state.needFetch = false;
    }, 100);
  },
};
