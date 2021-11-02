export default {
  currentCaddies: (state) => {
    return state.caddies;
  },
  findCaddieById: (state) => (id) => {
    return state.caddies.find((c) => c.caddieUniqNo === id);
  },
  findCaddieByCaddieName: (state) => (caddieName) => {
    return state.caddies.find((c) => c.caddieName === caddieName);
  },
  findCaddieByCaddieNameStartsWith: (state) => (caddieName) => {
    return state.caddies.filter((c) => c.caddieName == caddieName);
  },
  getSelectedCaddie: (state) => {
    return state.currentSelectedCaddie;
  },
  currentCaddieViewType: (state) => {
    return state.caddieViewType;
  },
  getSelectedCaddies: (state) => {
    return state.selectedCaddies;
  },
  getLookUpCaddies: (state) => {
    return state.lookUpCaddies;
  },
  getSelectedCaddieByChip: (state) => state.selectedCaddieByChip,
  getHoveredCaddie: (state) => state.hoveredCaddie,
};
