export default {
  dispatchContentView({commit}, {title, subtitle}) {
    commit("setContentView", {title, subtitle});
  },
}
