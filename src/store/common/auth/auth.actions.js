export default {
  updateAuthInfo({ commit }, authInfo) {
    authInfo ? commit("UPDATE_AUTH_INFO", authInfo) : commit("CLEAR_AUTH_INFO");
  },

  updateLoginUsername({ commit }, username) {
    username
      ? commit("UPDATE_LOGIN_USERNAME", username)
      : commit("CLEAR_LOGIN_USERNAME");
  },

  updateLoginPassword({ commit }, password) {
    password
      ? commit("UPDATE_LOGIN_PASSWORD", password)
      : commit("CLEAR_LOGIN_PASSWORD");
  },

  updateNeedChangePassword({ commit }, status) {
    status
      ? commit("UPDATE_NEED_CHANGE_PASSWORD")
      : commit("CLEAR_NEED_CHANGE_PASSWORD");
  },
};
