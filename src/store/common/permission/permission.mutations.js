export default {
  UPDATE_HAS_DASHBOARD_DESKTOP(state, status) {
    state.hasDashboardDesktop = status;
  },
  UPDATE_HAS_DASHBOARD_MOBILE(state, status) {
    state.hasDashboardMobile = status;
  },
  UPDATE_HAS_DASHBOARD_MOBILE_ORDERABLE(state, status) {
    state.hasDashboardMobileOrderable = status;
  },
  UPDATE_HAS_ADMIN_PAGE(state, status) {
    state.hasAdminPage = status;
  },
  UPDATE_HAS_SETTING_PAGE(state, status) {
    state.hasSettingPage = status;
  },
};
