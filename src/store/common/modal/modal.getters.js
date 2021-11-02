export default {
  getIsShowingClubCheckModal: (state) => state.isShowingClubCheckModal,
  getIsShowingMessengerSendModal: (state) => state.isShowingMessengerSendModal,
  getIsShowingMessengerReceiverModal: (state) =>
    state.isShowingMessengerReceiverModal,
  getIsShowingPlayTimeModal: (state) => state.isShowingPlayTimeModal,
  getIsShowingRoundAllScoreDetailModal: (state) =>
    state.isShowingRoundAllScoreDetailModal,
  getIsShowingSMSModal: (state) => state.isShowingSMSModal,
  getIsShowingClubThingsModal: (state) => state.isShowingClubThingsModal,
  getIsShowingClubMemoModal: (state) => state.isShowingClubMemoModal,
  getIsShowingRoundGroupScoreDetailModal: (state) =>
    state.isShowingRoundGroupScoreDetailModal,
  getIsShowingRoundGroupRankingModal: (state) =>
    state.isShowingRoundGroupRankingModal,
  // chip box start
  getIsShowingChipBoxModal: (state) => state.isShowingChipBoxModal,
  getIsShowingPlayingCaddieInfoModal: (state) =>
    state.isShowingPlayingCaddieInfoModal,
  getChipBoxTitle: (state) => state.chipBoxTitle,
  getChipBoxItems: (state) => state.chipBoxItems,
  getChipBoxItemClickable: (state) => state.chipBoxItemClickable,
  getChipBoxFrom: (state) => state.chipBoxFrom,

  // dashboard store start
  getIsShowingDashboardStoreModal: (state) =>
    state.isShowingDashboardStoreModal,

  // order message start
  getIsShowingOrderMessageModal: (state) => state.isShowingOrderMessageModal,
  getOrderMessageCount: (state) => state.orderMessageCount,

  getIsShowingCaddieSearchModal: (state) => state.isShowingCaddieSearchModal,

  //certification start
  getIsShowingCertificationDetailModal: (state) =>
    state.isShowingCertificationDetailModal,

  // all-roundAll pictures
  getIsShowingPicturesModal: (state) => state.isShowingPicturesModal,

  // caddie
  getIsShowingCaddieSettingModal: (state) => state.isShowingCaddieSettingModal,

  // isShowingSimpleMessageModal
  getIsShowingSimpleMessageModal: (state) => state.isShowingSimpleMessageModal,
  getSimpleMessageModalText: (state) => state.simpleMessageModalText,
  getSimpleMessageCallBack: (state) => state.simpleMessageCallBack,

  // isShowingPasswordChangeModal
  getIsShowingPasswordChangeModal: (state) =>
    state.isShowingPasswordChangeModal,

  // group
  getIsShowingGroupCreateModal: (state) => state.isShowingGroupCreateModal,
  getIsShowingGroupNameUpdateModal: (state) =>
    state.isShowingGroupNameUpdateModal,

  // App settings.
  getIsShowingCompetitionParticipantsModal: (state) =>
    state.isShowingCompetitionParticipantsModal,

  getIsShowingCompetitionCreateModal: (state) =>
    state.isShowingCompetitionCreateModal,
};
