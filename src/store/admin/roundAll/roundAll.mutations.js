export default {
  setContentView(state, { title, subtitle }) {
    state.selectedContentViewTitle = title;
    state.selectedContentViewSubtitle = subtitle;
  },

  // roundAll all start
  updateSelectedRoundAll(state, round) {
    state.selectedRoundAll = round;
  },
  clearSelectedRoundAll(state) {
    state.selectedRoundAll = null;
  },

  // club check images.
  updateClubCheckImages(state, images) {
    state.selectedClubCheckImages = images;
  },
  clearClubCheckImages(state) {
    state.selectedClubCheckImages = [];
  },
  updatePictures(state, pictures) {
    state.selectedPictures = pictures;
  },
  clearPictures(state) {
    state.selectedPictures = [];
  },
  // roundAll all end

  // roundAll roundGroup start
  updateSelectedRoundGroup(state, round) {
    state.selectedRoundGroup = round;
  },
  clearSelectedRoundGroup(state) {
    state.selectedRoundGroup = null;
  },
  // roundAll roundGroup end

  // player infos
  updateSelectedPlayer(state, info) {
    state.selectedPlayer = info;
  },
  clearSelectedPlayer(state) {
    state.selectedPlayer = null;
  },
  // player infos end

  // club things
  updateSelectedClubThings(state, things) {
    state.selectedClubThings = things;
  },
  clearSelectedClubThings(state) {
    state.selectedClubThings = null;
  },

  //club memo
  updateSelectedPlayerClubMemo(state, memo) {
    state.selectedPlayerClubMemo = memo;
  },
  clearSelectedPlayerClubMemo(state) {
    state.selectedPlayerClubMemo = null;
  },

  // roundAll rows
  setRoundAllRows(state, rows) {
    state.roundAllRows = rows;
  },

  //roundAll etiquetteRows
  setEtiquettePictures(state, rows){
    state.etiquettePictures = rows;
  }



};
