export default {
  setContentView(state, { title, subtitle }) {
    state.selectedContentViewTitle = title;
    state.selectedContentViewSubtitle = subtitle;
  },

  setSelectedCaddieInformation(state, caddieInfo){
    state.selectedCaddieInformation = caddieInfo
  }
}
