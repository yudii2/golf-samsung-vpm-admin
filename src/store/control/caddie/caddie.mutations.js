import useCopy from "@/composables/useCopy";
import store from "@/store/index.js";

const { objectCopier } = useCopy();

export default {
  // old
  UPDATE_CADDIES(state, caddies) {
    state.caddies = caddies;
  },
  updateCurrentSelectedCaddie(state, params) {
    const copiedCaddie = objectCopier(params);
    const isNullCurrentSelectedCaddie = state.currentSelectedCaddie === null;
    const isParamsNull = copiedCaddie === null;

    if (isNullCurrentSelectedCaddie) {
      state.currentSelectedCaddie = copiedCaddie;
      return;
    }

    if (isParamsNull) {
      state.currentSelectedCaddie = copiedCaddie;
      store.dispatch("control/updateCurrentSelectedGroup", null);
      return;
    }

    const isSameCaddie =
      params.data.caddieUniqNo ===
      state.currentSelectedCaddie.data.caddieUniqNo;

    if (isSameCaddie) {
      state.currentSelectedCaddie = null;
      store.dispatch("control/updateCurrentSelectedGroup", null);
      return;
    }

    state.currentSelectedCaddie = copiedCaddie;
  },
  addLookUpCaddie(state, caddieName) {
    if (!state.lookUpCaddies.includes(caddieName)) {
      state.lookUpCaddies.push(caddieName);

      setTimeout(() => {
        state.lookUpCaddies = [];
      }, 1000);
    }
  },
  addSelectCaddie(state, caddie) {
    const isExist = state.selectedCaddies.find(
      (c) => c.caddieUniqNo === caddie.caddieUniqNo
    );

    if (isExist) {
      state.selectedCaddies = state.selectedCaddies.filter(
        (c) => c.caddieUniqNo !== caddie.caddieUniqNo
      );
    } else {
      state.selectedCaddies.push(caddie);
    }
  },
  updateCaddieColorCode(state, groupInfo) {
    const foundCaddie = state.caddies.find(
      (c) => c.roundId === groupInfo.roundId
    );

    foundCaddie.groupCd = groupInfo.groupCd;
    foundCaddie.groupNm = groupInfo.groupName;
    state.caddies = objectCopier(state.caddies);
  },

  /**
   * 캐디 마킹 상태를 업데이트 하는 함수.
   */
  UPDATE_CADDIE_STATUS(state, caddie) {
    const foundCaddie = state.caddies.find(
      (c) => c.caddieName === caddie.data.caddieName
    );

    const isActionUpdate = caddie.action.command === "update";
    const isFirstMark = caddie.action.markType === "first";
    if (isActionUpdate) {
      if (isFirstMark) {
        foundCaddie.mark1 = caddie.data.code;
        state.currentSelectedCaddie.data.mark1 = caddie.data.code;
      } else {
        foundCaddie.mark2 = caddie.data.code;
        state.currentSelectedCaddie.data.mark2 = caddie.data.code;
      }
    } else {
      if (isFirstMark) {
        foundCaddie.mark1 = null;
        state.currentSelectedCaddie.data.mark1 = null;
      } else {
        foundCaddie.mark2 = null;
        state.currentSelectedCaddie.data.mark2 = null;
      }
    }

    store.dispatch("control/updateCaddieInCompanyState");
  },

  // new
  // currentSelectedCaddie start
  SET_CURRENT_SELECTED_CADDIE(state, caddie) {
    state.currentSelectedCaddie = caddie;
  },
  CLEAR_CURRENT_SELECTED_CADDIE(state) {
    state.currentSelectedCaddie = null;
  },
  UPDATE_CADDIE_COLOR_CODE(state, groupInfo) {
    state.currentSelectedCaddie.data.groupNm = groupInfo.groupName;
    state.currentSelectedCaddie.data.groupCd = groupInfo.groupCd;
  },

  // lookUpCaddies start
  ADD_LOOKUP_CADDIES(state, matchedCaddies) {
    state.lookUpCaddies = matchedCaddies;
  },
  CLEAR_LOOKUP_CADDIES(state) {
    state.lookUpCaddies = [];
  },
  // selectedCaddies start
  ADD_SELECTED_CADDIE(state, caddie) {
    const isExist = state.selectedCaddies.find(
      (c) => c.caddieUniqNo === caddie.caddieUniqNo
    );

    if (isExist) {
      state.selectedCaddies = state.selectedCaddies.filter(
        (c) => c.caddieUniqNo !== caddie.caddieUniqNo
      );
    } else {
      state.selectedCaddies.push(caddie);
    }
  },
  CLEAR_SELECTED_CADDIES(state) {
    state.selectedCaddies = [];
  },

  // caddieViewType
  UPDATE_CADDIE_VIEW_TYPE(state, viewType) {
    state.caddieViewType = viewType;
  },

  /**
   *  selectCaddieByChip
   */
  SELECT_CADDIE_BY_CHIP(state, caddie) {
    state.selectedCaddieByChip = caddie;
  },
  CLEAR_SELECT_CADDIE_BY_CHIP(state) {
    state.selectedCaddieByChip = null;
  },

  /**
   * hoveredCaddie
   */
  SET_HOVERED_CADDIE(state, caddie) {
    state.hoveredCaddie = caddie;
  },
  CLEAR_HOVERED_CADDIE(state) {
    state.hoveredCaddie = null;
  },
};
