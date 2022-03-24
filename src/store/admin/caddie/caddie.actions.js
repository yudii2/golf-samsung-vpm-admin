export default {
  dispatchContentView({commit}, {title, subtitle}) {
    commit("setContentView", {title, subtitle});
  },
  dispatchUpdateSelectedCaddieInformation({commit}, caddieInfo){
    commit('setSelectedCaddieInformation', caddieInfo)
  }
}
