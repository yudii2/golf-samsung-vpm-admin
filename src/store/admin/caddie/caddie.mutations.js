export default {
  setContentView(state, { title, subtitle }) {
    state.selectedContentViewTitle = title;
    state.selectedContentViewSubtitle = subtitle;
  },
}
