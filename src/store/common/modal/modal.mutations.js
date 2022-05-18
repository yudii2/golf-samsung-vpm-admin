export default {
  updateIsShowingClubCheckModal(state, status) {
    state.isShowingClubCheckModal = status;
  },
  updateIsShowingMessengerReceiverModal(state, status) {
    state.isShowingMessengerReceiverModal = status;
  },
  updateShowPlayTimeModal(state, status) {
    state.showPlayTimeModal = status;
  },
  updateIsShowingRoundAllScoreDetailModal(state, status) {
    state.isShowingRoundAllScoreDetailModal = status;
  },
  updateIsShowingSMSModal(state, status) {
    state.isShowingSMSModal = status;
  },
  updateIsShowingRoundGroupScoreDetailModal(state, status) {
    state.isShowingRoundGroupScoreDetailModal = status;
  },
  updateIsShowingRoundGroupRankingModal(state, status) {
    state.isShowingRoundGroupRankingModal = status;
  },
  updateIsShowingEtiquetteModal(state, status){
    state.isShowingEtiquetteModal = status;
  },

  // new
  UPDATE_SHOW_PLAYTIME_MODAL_ON(state) {
    state.isShowingPlayTimeModal = true;
  },
  UPDATE_SHOW_PLAYTIME_MODAL_OFF(state) {
    state.isShowingPlayTimeModal = false;
  },
  // isShowingMessengerSendModal
  UPDATE_IS_SHOWING_MESSENGER_SEND_MODAL(state, status) {
    state.isShowingMessengerSendModal = status;
  },

  /**
   * 칩 박스
   */
  IS_SHOWING_CHIP_BOX_MODAL_VISIBLE(state) {
    state.isShowingChipBoxModal = true;
  },
  IS_SHOWING_CHIP_BOX_MODAL_HIDDEN(state) {
    state.isShowingChipBoxModal = false;
  },
  UPDATE_CHIP_BOX_TITLE(state, title) {
    state.chipBoxTitle = title;
  },
  CLEAR_CHIP_BOX_TITLE(state) {
    state.chipBoxTitle = "";
  },
  UPDATE_CHIP_BOX_ITEMS(state, items) {
    state.chipBoxItems = items;
  },
  CLEAR_CHIP_BOX_ITEMS(state) {
    state.chipBoxItems = [];
  },
  UPDATE_CHIP_BOX_CLICKABLE(state, status) {
    state.chipBoxItemClickable = status;
  },
  UPDATE_CHIP_BOX_FROM(state, from) {
    state.chipBoxFrom = from;
  },
  CLEAR_CHIP_BOX_FROM(state) {
    state.chipBoxFrom = "";
  },

  /**
   * isShowingDashboardStoreModal
   * 1. SHOWING_ : 대시보드 (모바일) 주문 모달 킴.
   * 2. CLEAR_ : 대시보드 (모바일) 주문 모달 끔.
   */
  SHOWING_IS_SHOWING_DASHBOARD_STORE_MODAL(state) {
    state.isShowingDashboardStoreModal = true;
  },
  CLEAR_IS_SHOWING_DASHBOARD_STORE_MODAL(state) {
    state.isShowingDashboardStoreModal = false;
  },

  // isShowingPlayingCaddieInfoModal
  SHOWING_PLAYING_CADDIE_INFO_MODAL(state) {
    state.isShowingPlayingCaddieInfoModal = true;
  },
  CLEAR_PLAYING_CADDIE_INFO_MODAL(state) {
    state.isShowingPlayingCaddieInfoModal = false;
  },

  //isShowingOrderInfoModal
  SHOWING_ORDER_INFO_MODAL(state){
    state.isShowingOrderInfoModal= true;
  },
  CLEAR_ORDER_INFO_MODAL(state){
    state.isShowingOrderInfoModal = false
  },

  // isShowingCaddieSearchModal
  SHOWING_CADDIE_SEARCH_MODAL(state) {
    state.isShowingCaddieSearchModal = true;
  },
  CLEAR_CADDIE_SEARCH_MODAL(state) {
    state.isShowingCaddieSearchModal = false;
  },

  // order message start
  SHOWING_ORDER_MESSAGE_MODAL(state) {
    state.isShowingOrderMessageModal = true;
  },
  CLEAR_ORDER_MESSAGE_MODAL(state) {
    state.isShowingOrderMessageModal = false;
  },
  UPDATE_ORDER_MESSAGE_COUNT(state, count) {
    state.orderMessageCount = count;
  },
  CLEAR_ORDER_MESSAGE_COUNT(state) {
    state.orderMessageCount = 0;
  },

  //certification start
  SHOWING_CERTIFICATION_DETAIL_MODAL(state) {
    state.isShowingCertificationDetailModal = true;
  },
  CLEAR_CERTIFICATION_DETAIL_MODAL(state) {
    state.isShowingCertificationDetailModal = false;
  },

  // all-roundAll pictures
  SHOWING_PICTURES_MODAL(state) {
    state.isShowingPicturesModal = true;
  },
  CLEAR_PICTURES_MODAL(state) {
    state.isShowingPicturesModal = false;
  },

  // caddie
  SHOWING_CADDIE_SETTING_MODAL(state) {
    state.isShowingCaddieSettingModal = true;
  },
  CLEAR_CADDIE_SETTING_MODAL(state) {
    state.isShowingCaddieSettingModal = false;
  },

  // isShowingSimpleMessageModal
  SHOWING_SIMPLE_MESSAGE_MODAL(state) {
    state.isShowingSimpleMessageModal = true;
  },
  CLEAR_SIMPLE_MESSAGE_MODAL(state) {
    state.isShowingSimpleMessageModal = false;
  },
  UPDATE_SIMPLE_MESSAGE_MODAL_TEXT(state, text) {
    state.simpleMessageModalText = text;
  },
  CLEAR_SIMPLE_MESSAGE_MODAL_TEXT(state) {
    state.simpleMessageModalText = null;
  },
  UPDATE_SIMPLE_MESSAGE_MODAL_CALL_BACK(state, callback) {
    state.simpleMessageCallBack = callback;
  },
  CLEAR_SIMPLE_MESSAGE_MODAL_CALL_BACK(state) {
    state.simpleMessageCallBack = null;
  },

  /**
   * ### 비밀번호 변경 모달 가기성 처리 메소드.
   */
  SHOWING_PASSWORD_CHANGE_MODAL(state) {
    state.isShowingPasswordChangeModal = true;
  },
  CLEAR_PASSWORD_CHANGE_MODAL(state) {
    state.isShowingPasswordChangeModal = false;
  },

  /**
   * ### 단체 생성 모달 가시성 처리 메소드.
   */
  SHOWING_GROUP_CREATE_MODAL(state) {
    state.isShowingGroupCreateModal = true;
  },
  CLEAR_GROUP_CREATE_MODAL(state) {
    state.isShowingGroupCreateModal = false;
  },

  /**
   * ### 단체명 수정 모달 가시성 처리 메소드.
   */
  SHOWING_GROUP_NAME_UPDATE_MODAL(state) {
    state.isShowingGroupNameUpdateModal = true;
  },
  CLEAR_GROUP_NAME_UPDATE_MODAL(state) {
    state.isShowingGroupNameUpdateModal = false;
  },

  /**
   * ### 대회 참가자 목록 모달 가시성 처리 메소드.
   */
  SHOWING_COMPETITION_PARTICIPANTS_MODAL(state) {
    state.isShowingCompetitionParticipantsModal = true;
  },
  CLEAR_COMPETITION_PARTICIPANTS_MODAL(state) {
    state.isShowingCompetitionParticipantsModal = false;
  },

  /**
   * ### 대회 생성 모달 가시성 처리 메소드.
   */
  SHOWING_COMPETITION_CREATE_MODAL(state) {
    state.isShowingCompetitionCreateModal = true;
  },
  CLEAR_COMPETITION_CREATE_MODAL(state) {
    state.isShowingCompetitionCreateModal = false;
  },

  /**
   * ## 클럽 항목 가시성 처리 메소드.
   * @param state
   * @constructor
   */
  SHOWING_CLUB_THINGS_MODAL(state) {
    state.isShowingClubThingsModal = true;
  },
  CLEAR_CLUB_THINGS_MODAL(state) {
    state.isShowingClubThingsModal = false
  },

  /**
   *  ## 클럽 항목 플레이어별 메모 가시성 처리 메소드.
   * @param state
   * @constructor
   */
  SHOWING_CLUB_MEMO_MODAL(state) {
    state.isShowingClubMemoModal = true;
  },
  CLEAR_CLUB_MEMO_MODAL(state) {
    state.isShowingClubMemoModal = false;
  },

  // isShowingCaddieInformationModal
  /**
   * ## 캐디 정보 모달
   * @param state
   * @constructor
   */
  SHOWING_CADDIE_INFORMATION_MODAL(state){
    state.isShowingCaddieInformationModal = true;
  },
  CLEAR_CADDIE_INFORMATION_MODAL(state){
    state.isShowingCaddieInformationModal = false;
  }

};
