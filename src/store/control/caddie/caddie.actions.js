export default {
  /**
   * ### 캐디 목록 데이터 업데이트 메소드.
   * @param {Array} caddies > 새로운 캐디 목록.
   */
  updateCaddies({ commit }, caddies) {
    commit("UPDATE_CADDIES", caddies);
  },

  updateSelectedCaddie({ commit }, caddie) {
    caddie
      ? commit("SET_CURRENT_SELECTED_CADDIE", caddie)
      : commit("CLEAR_CURRENT_SELECTED_CADDIE");
  },

  updateCurrentSelectedCaddie({ state, commit, dispatch }, data) {
    // 캐디 데이터 널 체크.
    const isNull = state.currentSelectedCaddie === null;
    if (isNull) {
      // 비어있는 경우 데이터 업데이트.
      commit("SET_CURRENT_SELECTED_CADDIE", data);
    } else {
      const isSameCaddie =
        state.currentSelectedCaddie.data.caddieUniqNo ===
        data.data.caddieUniqNo;

      // 기존 캐디와 현재 캐디의 동일성 체크 로직.
      switch (isSameCaddie) {
        case true: // note. 동일한 캐디일 경우 모달창 닫기.
          commit("CLEAR_CURRENT_SELECTED_CADDIE");
          break;

        case false:
          // note. 아닌 경우 캐디 데이터 업데이트.
          commit("SET_CURRENT_SELECTED_CADDIE", data);

          // 현재 선택된 그룹 데이터 초기화.
          dispatch("clearCurrentSelectedGroup");
          break;
      }
    }
  },
  clearSelectedCaddie({ commit, dispatch }) {
    commit("CLEAR_CURRENT_SELECTED_CADDIE");
    dispatch("clearCurrentSelectedGroup");
  },
  findCaddieWhichHasCompanion({ state, dispatch }, companionSearchValue) {
    if (!state.caddieSearchTimer) {
      state.caddies?.forEach((caddie) => {
        caddie.playerNameVOList.forEach((player) => {
          if (companionSearchValue === player.name) {
            dispatch("addLookUpCaddies", caddie.caddieName);
          }
        });
      });
    }
  },
  addLookUpCaddies({ state, commit }, caddieSearchValue) {
    const matchedCaddies = [];
    state.caddies?.forEach((caddie) => {
      if (String(caddie.caddieName).includes(caddieSearchValue)) {
        matchedCaddies.push(caddie);
      }
    });

    if (matchedCaddies.length) {
      commit("ADD_LOOKUP_CADDIES", matchedCaddies);

      if (!state.caddieSearchTimer) {
        state.caddieSearchTimer = setTimeout(() => {
          commit("CLEAR_LOOKUP_CADDIES");
          state.caddieSearchTimer = null;
        }, 1000);
      }
    }
  },

  /**
   * selectedCaddies start
   */
  addSelectedCaddie({ commit }, caddie) {
    commit("ADD_SELECTED_CADDIE", caddie);
  },
  clearSelectedCaddies({ commit }) {
    commit("CLEAR_SELECTED_CADDIES");
  },

  /**
   * caddies start
   */
  async updateCaddieColorCode({ commit, dispatch }, groupInfo) {
    await commit("UPDATE_CADDIE_COLOR_CODE", groupInfo);
    dispatch("updateCaddieInCompanyState");
  },

  /**
   * caddieViewType start
   */
  updateCaddieViewType({ commit }, viewType) {
    commit("UPDATE_CADDIE_VIEW_TYPE", viewType);
  },

  /**
   *  selectCaddieByChip
   */
  updateCaddieByChip({ commit }, caddie) {
    caddie
      ? commit("SELECT_CADDIE_BY_CHIP", caddie)
      : commit("CLEAR_SELECT_CADDIE_BY_CHIP");
  },

  updateCaddieStatus({ commit }, caddie) {
    commit("UPDATE_CADDIE_STATUS", caddie);
  },

  /**
   * ### 대시보드의 캐디 이름에 마우스 오버 시 업데이트.
   * @param {Object} caddie > 현재 마우스 오버중인 캐디.
   */
  updateHoveredCaddie({ commit }, caddie) {
    caddie
      ? commit("SET_HOVERED_CADDIE", caddie)
      : commit("CLEAR_HOVERED_CADDIE");
  },
};
