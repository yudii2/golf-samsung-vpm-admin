export default {
  UPDATE_AUTH_INFO(state, authInfo) {
    const {
      kname: username,
      storeCd: storeCode,
      storeNm: storeName,
      menuUsingList: permissions,
    } = authInfo;

    state.authInfo = {
      username,
      storeCode,
      storeName,
      permissions,
    };
  },
  CLEAR_AUTH_INFO(state) {
    state.authInfo = null;
  },

  // loginUsername
  UPDATE_LOGIN_USERNAME(state, username) {
    state.loginUsername = username;
  },
  CLEAR_LOGIN_USERNAME(state) {
    state.loginUsername = null;
  },

  // loginPassword
  UPDATE_LOGIN_PASSWORD(state, password) {
    state.loginPassword = password;
  },
  CLEAR_LOGIN_PASSWORD(state) {
    state.loginPassword = null;
  },

  // needChangePassword
  UPDATE_NEED_CHANGE_PASSWORD(state) {
    state.needChangePassword = true;
  },
  CLEAR_NEED_CHANGE_PASSWORD(state) {
    state.needChangePassword = false;
  },
};
