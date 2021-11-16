export default {
  getSelectedContentViewTitle: (state) => state.selectedContentViewTitle,
  getSelectedContentViewSubtitle: (state) => state.selectedContentViewSubtitle,

  // roundAll all start
  getSelectedRoundAll: (state) => state.selectedRoundAll,
  getSelectedClubCheckImages: (state) => state.selectedClubCheckImages,
  getSelectedPictures: (state) => state.selectedPictures,
  // roundAll all end

  // roundAll roundGroup start
  getSelectedRoundGroup: (state) => state.selectedRoundGroup,
  // roundAll roundGroup end

  // player infos start
  getSelectedPlayer: (state) => state.selectedPlayer,
  // player infos end

  // club things
  getSelectedClubThings: (state) => state.selectedClubThings,

  //club memo
  getSelectedPlayerClubMemo: (state) => state.selectedPlayerClubMemo,

  //roundAll rows
  getRoundAllRows: (state) => state.roundAllRows,
};
