export default {
  dispatchIsShowingClubCheckModal({commit}, status) {
    commit("updateIsShowingClubCheckModal", status);
  },
  dispatchIsShowingMessengerReceiverModal({commit}, status) {
    commit("updateIsShowingMessengerReceiverModal", status);
  },
  dispatchIsShowingRoundAllScoreDetailModal({commit}, status) {
    commit("updateIsShowingRoundAllScoreDetailModal", status);
  },
  dispatchIsShowingSMSModal({commit}, status) {
    commit("updateIsShowingSMSModal", status);
  },
  dispatchIsShowingRoundGroupScoreDetailModal({commit}, status) {
    commit("updateIsShowingRoundGroupScoreDetailModal", status);
  },
  dispatchIsShowingRoundGroupRankingModal({commit}, status) {
    commit("updateIsShowingRoundGroupRankingModal", status);
  },
  updateIsShowingMessengerSendModal({commit}, status) {
    commit("UPDATE_IS_SHOWING_MESSENGER_SEND_MODAL", status);
  },

  // new
  updateIsShowingPlayTimeModal({commit}, status) {
    status
      ? commit("UPDATE_SHOW_PLAYTIME_MODAL_ON")
      : commit("UPDATE_SHOW_PLAYTIME_MODAL_OFF");
  },

  /**
   * ### 칩 박스
   * updateIsShowingChipBoxModal: 모달 가시성 담당.
   * updateChipBoxItems: 모달에 표시할 아이템 리스트 업데이트.
   */
  updateIsShowingChipBoxModal({commit}, status) {
    if (status) {
      commit("IS_SHOWING_CHIP_BOX_MODAL_VISIBLE");
    } else {
      commit("IS_SHOWING_CHIP_BOX_MODAL_HIDDEN");
      commit("CLEAR_CHIP_BOX_TITLE");
      commit("CLEAR_CHIP_BOX_ITEMS");
      commit("UPDATE_CHIP_BOX_CLICKABLE", false);
    }
  },
  updateChipBoxTitle({commit}, title) {
    title
      ? commit("UPDATE_CHIP_BOX_TITLE", title)
      : commit("CLEAR_CHIP_BOX_TITLE");
  },
  updateChipBoxItems({commit}, items) {
    // 아이템 리스트가 존재하면 업데이트하고, 존재하지 않으면 클리어.
    items && items.length
      ? commit("UPDATE_CHIP_BOX_ITEMS", items)
      : commit("CLEAR_CHIP_BOX_ITEMS");
  },
  updateChipBoxClickable({commit}, status) {
    commit("UPDATE_CHIP_BOX_CLICKABLE", status);
  },
  updateChipBoxFrom({commit}, from) {
    from ? commit("UPDATE_CHIP_BOX_FROM", from) : commit("CLEAR_CHIP_BOX_FROM");
  },

  /**
   * ### 대시보드 (모바일) 주문 상세 모달 화면 가시성(ON/OFF) 처리.
   * @param {boolean} status > true : 모달 킴, false : 모달 끔.
   */
  updateDashboardStoreModal({commit}, status) {
    status
      ? commit("SHOWING_IS_SHOWING_DASHBOARD_STORE_MODAL")
      : commit("CLEAR_IS_SHOWING_DASHBOARD_STORE_MODAL");
  },

  updateIsShowingPlayingCaddieInfoModal({commit}, status) {
    status
      ? commit("SHOWING_PLAYING_CADDIE_INFO_MODAL")
      : commit("CLEAR_PLAYING_CADDIE_INFO_MODAL");
  },

  /**
   * ### 화면 가운데 캐디 명 입력 폼 모달 가시성(On/Off) 처리.
   * @param {boolean} status > true : 모달 킴, false : 모달 끔.
   */
  updateIsShowingCaddieSearchModal({commit}, status) {
    status
      ? commit("SHOWING_CADDIE_SEARCH_MODAL")
      : commit("CLEAR_CADDIE_SEARCH_MODAL");
  },

  /**
   * ### 주문 목록 존재 여부 메시지 모달 가시상(On/Off) 처리.
   * @param {Boolean} status > true: 모달 킴, false: 모달 끔.
   */
  updateIsShowingOrderMessageModal({commit}, status) {
    status
      ? commit("SHOWING_ORDER_MESSAGE_MODAL")
      : commit("CLEAR_ORDER_MESSAGE_MODAL");
  },

  updateOrderMessageCount({commit}, count) {
    count
      ? commit("UPDATE_ORDER_MESSAGE_COUNT", count)
      : commit("CLEAR_ORDER_MESSAGE_COUNT");
  },

  /**
   * ### 증명서 팝업.
   * @param {Boolean} status > true 모달 킴, false: 모달 끔.
   */
  updateIsShowingCertificationDetailModal({commit}, status) {
    status
      ? commit("SHOWING_CERTIFICATION_DETAIL_MODAL")
      : commit("CLEAR_CERTIFICATION_DETAIL_MODAL");
  },

  /**
   * ### 전체라운드 기념사진 팝업.
   * @param {Boolean} status > true 모달 킴, false: 모달 끔.
   */
  updateIsShowingPicturesModal({commit}, status) {
    status ? commit("SHOWING_PICTURES_MODAL") : commit("CLEAR_PICTURES_MODAL");
  },

  /**
   * ### 캐디 설정 모달 가시성 처리.
   */
  updateIsShowingCaddieSettingModal({commit}, status) {
    status
      ? commit("SHOWING_CADDIE_SETTING_MODAL")
      : commit("CLEAR_CADDIE_SETTING_MODAL");
  },

  /**
   * ### 심플 메시지 모달 가시성 처리.
   */
  updateIsShowingSimpleMessageModal({commit}, status) {
    status
      ? commit("SHOWING_SIMPLE_MESSAGE_MODAL")
      : commit("CLEAR_SIMPLE_MESSAGE_MODAL");
  },
  /**
   * ### 심플 메시지 모달에 표시되는 텍스트 설정.
   * @param {String} text > 텍스트 메시지.
   */
  updateSimpleMessageModalText({commit}, text) {
    text
      ? commit("UPDATE_SIMPLE_MESSAGE_MODAL_TEXT", text)
      : commit("CLEAR_SIMPLE_MESSAGE_MODAL_TEXT");
  },
  /**
   * ### 심플 메시지 모달 종료 시 실행되는 콜백 메소드 설정.
   * @param {Function} callback > 콜백 메소드.
   */
  updateSimpleMessageModalCallBack({commit}, callback) {
    callback
      ? commit("UPDATE_SIMPLE_MESSAGE_MODAL_CALL_BACK", callback)
      : commit("CLEAR_SIMPLE_MESSAGE_MODAL_CALL_BACK");
  },

  updateIsShowingPasswordChangeModal({commit}, status) {
    status
      ? commit("SHOWING_PASSWORD_CHANGE_MODAL")
      : commit("CLEAR_PASSWORD_CHANGE_MODAL");
  },

  /**
   * ### 단체 생성 모달창 가시성 처리.
   * @param {Boolean} status > true : 킴, false : 끔.
   */
  updateIsShowingGroupCreateModal({commit}, status) {
    status
      ? commit("SHOWING_GROUP_CREATE_MODAL")
      : commit("CLEAR_GROUP_CREATE_MODAL");
  },

  /**
   * ### 단체명 수정 모달 가시성 처리.
   * @param {*} status > true : 킴, false : 끔
   */
  updateIsShowingGroupNameUpdateModal({commit}, status) {
    status
      ? commit("SHOWING_GROUP_NAME_UPDATE_MODAL")
      : commit("CLEAR_GROUP_NAME_UPDATE_MODAL");
  },

  /**
   * ### 설정 페이지 대회 관리.
   */
  updateIsShowingCompetitionParticipantsModal({commit}, status) {
    status
      ? commit("SHOWING_COMPETITION_PARTICIPANTS_MODAL")
      : commit("CLEAR_COMPETITION_PARTICIPANTS_MODAL");
  },

  /**
   * ### 설정 페이지 대회 생성 모달.
   */
  updateIsShowingCompetitionCreateModal({commit}, status) {
    status
      ? commit("SHOWING_COMPETITION_CREATE_MODAL")
      : commit("CLEAR_COMPETITION_CREATE_MODAL");
  },
  /**
   * ### 전체라운드 클럽항목 모달.
   * @param commit
   * @param status
   */
  dispatchIsShowingClubThingsModal({commit}, status) {
    status
      ? commit("SHOWING_CLUB_THINGS_MODAL")
      : commit("CLEAR_CLUB_THINGS_MODAL")
  },

  /**
   * 전체라운드 클럽항목 메모 모달.
   * @param commit
   * @param status
   */
  dispatchIsShowingClubMemoModal({commit}, status) {
    status
      ? commit("SHOWING_CLUB_MEMO_MODAL")
      : commit("CLEAR_CLUB_MEMO_MODAL")
  }
};
