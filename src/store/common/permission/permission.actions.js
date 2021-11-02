export default {
  /**
   * ### 대시보드에서 주문처리가 가능한 식음 관리자 권한에 대한 업데이트.
   * @param {boolean} status > 식음관리자 여부.
   */
  updatePermissions({ commit }, permissions) {
    const [
      dashboardDesktop,
      dashboardMobile,
      dashboardMobileOrderable,
      adminPage,
      settingPage,
    ] = permissions.split("");

    if (dashboardDesktop === "Y") {
      commit("UPDATE_HAS_DASHBOARD_DESKTOP", true);
    }
    if (dashboardMobile === "Y") {
      commit("UPDATE_HAS_DASHBOARD_MOBILE", true);
    }
    if (dashboardMobileOrderable === "Y") {
      commit("UPDATE_HAS_DASHBOARD_MOBILE_ORDERABLE", true);
    }
    if (adminPage === "Y") {
      commit("UPDATE_HAS_ADMIN_PAGE", true);
    }
    if (settingPage === "Y") {
      commit("UPDATE_HAS_SETTING_PAGE", true);
    }
  },

  updateHasDashboardDesktop({ commit }, status = false) {
    commit("UPDATE_HAS_DASHBOARD_DESKTOP", status);
  },
  updateHasDashboardMobile({ commit }, status = false) {
    commit("UPDATE_HAS_DASHBOARD_MOBILE", status);
  },
  updateHasDashboardMobileOrderable({ commit }, status = false) {
    commit("UPDATE_HAS_DASHBOARD_MOBILE_ORDERABLE", status);
  },
  updateHasAdminPage({ commit }, status = false) {
    commit("UPDATE_HAS_ADMIN_PAGE", status);
  },
  updateHasSettingPage({ commit }, status = false) {
    commit("UPDATE_HAS_SETTING_PAGE", status);
  },
};
