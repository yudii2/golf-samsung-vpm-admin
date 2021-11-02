export default {
  updateTablets({ commit }, tablets) {
    tablets ? commit("UPDATE_TABLETS", tablets) : commit("CLEAR_TABLETS");
  },
};
