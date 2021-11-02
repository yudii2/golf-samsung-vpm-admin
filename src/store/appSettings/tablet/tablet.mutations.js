export default {
  UPDATE_TABLETS(state, tablets) {
    state.tablets = tablets;
  },
  CLEAR_TABLETS(state) {
    state.tablets = [];
  },
};
