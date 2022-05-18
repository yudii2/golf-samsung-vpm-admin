export default {
  dispatchContentView({commit}, {title, subtitle}) {
    commit("setContentView", {title, subtitle});
  },

  // roundAll all start
  dispatchSelectedRound({commit}, round) {
    commit("updateSelectedRoundAll", round);
  },
  dispatchClearSelectedRound({commit}) {
    commit("clearSelectedRoundAll");
  },

  // club check images.
  dispatchUpdateClubCheckImages({commit}, images) {
    commit("updateClubCheckImages", images);
  },
  dispatchClubCheckImagesClear({commit}) {
    commit("clearClubCheckImages");
  },
  dispatchUpdatePictures({commit}, pictures) {
    commit("updatePictures", pictures);
  },
  dispatchClearPictures({commit}) {
    commit("clearPictures");
  },
  // roundAll all end

  // roundAll roundGroup start
  dispatchUpdateSelectedRoundGroup({commit}, round) {
    commit("updateSelectedRoundGroup", round);
  },
  dispatchClearSelectedRoundGroup({commit}) {
    commit("clearSelectedRoundGroup");
  },
  // roundAll roundGroup end

  // player infos
  dispatchUpdateSelectedPlayer({commit}, info) {
    commit("updateSelectedPlayer", info);
  },
  dispatchClearSelectedPlayer({commit}) {
    commit("clearSelectedPlayer");
  },
  // player infos end

  // club things
  dispatchUpdateSelectedClubThings({commit}, things) {
    commit("updateSelectedClubThings", things);
  },
  dispatchClearSelectedClubThings({commit}) {
    commit("clearSelectedClubThings");
  },

  //club memo
  dispatchUpdateSelectedPlayerClubMemo({commit}, memo) {
    commit("updateSelectedPlayerClubMemo", memo);
  },
  dispatchClearSelectedPlayerClubMemo({commit}) {
    commit("clearSelectedPlayerClubMemo");
  },

  //roundAll rows
  dispatchSetRoundAllRows({commit}, rows) {
    commit("setRoundAllRows", rows);
  },

  //roundAll etiquette pictures
  dispatchSetEtiquettePictures({commit}, rows){
    commit('setEtiquettePictures', rows)
  }


};
