<template>
  <div id="app" class="container center-content">
    <transition name="fade" mode="out-in" appear>
      <RouterView/>
    </transition>

    <div id="modals">
      <transition name="fade">
        <MessengerSendModal v-if="isShowingMessengerSendModal"/>
        <MessengerReceiverModal v-if="isShowingMessengerReceiverModal"/>
        <CaddiePlayTime v-if="isShowingPlayTimeModal"/>
        <RoundAllScoreDetailModal v-if="isShowingRoundAllScoreDetailModal"/>
        <RoundGroupScoreDetailModal
          v-if="isShowingRoundGroupScoreDetailModal"
        />
        <RoundGroupRankingModal v-if="isShowingRoundGroupRankingModal"/>
        <ClubCheckModal v-if="isShowingClubCheckModal"/>
        <ChipBoxModal v-if="isShowingChipBoxModal"/>
        <DashboardStoreModal v-if="isShowingDashboardStoreModal"/>
        <PicturesModal v-if="isShowingPicturesModal"/>
        <CertificationDetailModal v-if="isShowingCertificationDetailModal"/>
        <ClubThingsModal v-if="isShowingClubThingsModal"/>
        <CaddieInformationModal v-if="isShowingCaddieInformationModal"/>
        <RoundAllEtiquetteModal v-if="isShowingEtiquetteModal"/>
      </transition>

      <!-- 캐디 명 찾기 모달 -->
      <CaddieSearchModal/>

      <!-- 주문 목록 모달 -->
      <OrderMessageModal v-if="isShowingOrderMessageModal"/>

      <!-- 메시지 알림 모달 -->
      <SimpleMessageModal/>

      <!-- 전체 라운드 문자 메시지 모달 -->
      <RoundAllSMSModal v-if="isShowingSMSModal"/>

      <RoundAllMemoModal v-if="isShowingClubMemoModal"/>

      <!-- 비밀번호 변경 모달 -->
      <PasswordChangeModal v-if="isShowingPasswordChangeModal"/>

      <!-- 그룹 생성 모달 -->
      <GroupCreateModal v-if="isShowingGroupCreateModal"/>
      <GroupNameUpdateModal v-if="isShowingGroupNameUpdateModal"/>

      <!-- 간단한 테이블 데이터 -->
      <CompetitionParticipantsModal
        v-if="isShowingCompetitionParticipantsModal"
      />
      <CompetitionCreateModal v-if="isShowingCompetitionCreateModal"/>

      <transition name="fade">
        <NewPlayingCaddieInfo/>
      </transition>
      <transition name="fade">
        <OrderInfo/>
      </transition>
    </div>

    <div id="messages">
      <transition name="fade">
        <Toast
          v-if="toastIsShowing"
          :toastInfo="toastInfo"
          @onClick="handleToastClick"
          ref="toast"
        />
      </transition>
    </div>

    <!-- test box (see only development mode) -->
    <div class="dev__container no-pointer no-drag" v-if="isDevMode">
      <span class="window_size">{{ windowSize }}</span>
      <span class="ml-1/2">Refresh : {{ isRefresh }}</span>
      <span class="ml-1/2" v-if="selectedCaddieName"
      >Caddie : {{ selectedCaddieName }}</span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MessengerSendModal from "@/components/control/dashboard/modal/messenger/MessengerSendModal.vue";
import MessengerReceiverModal from "@/components/control/dashboard/modal/messenger/MessengerReceiverModal.vue";
import CaddiePlayTime from "@/components/control/dashboard/modal/messenger/caddiePlayTime/CaddiePlayTime.vue";
import RoundAllScoreDetailModal from "@/components/admin/modal/round/all/RoundAllScoreDetailModal.vue";
import RoundGroupScoreDetailModal from "@/components/admin/modal/round/group/RoundGroupScoreDetailModal.vue";
import RoundGroupRankingModal from "@/components/admin/modal/round/group/ranking/RoundGroupRankingModal.vue";
import ClubCheckModal from "@/components/admin/modal/round/all/ClubCheckModal.vue";
import ChipBoxModal from "@/components/shared/modals/ChipBoxModal.vue";
import DashboardStoreModal from "./components/control/dashboard/mobile/DashboardStoreModal.vue";
import Toast from "@/components/shared/modals/Toast.vue";
import {STORE_TOAST_TITLE} from "./utils/constants";
import NewPlayingCaddieInfo from "./components/control/dashboard/body/course/NewPlayingCaddieInfo.vue";
import CaddieSearchModal from "./components/control/dashboard/modal/CaddieSearchModal.vue";
import OrderMessageModal from "./components/control/dashboard/modal/OrderMessageModal.vue";
import PicturesModal from "@/components/admin/modal/round/all/PicturesModal";
import CertificationDetailModal from "@/components/admin/modal/round/group/certificate/CertificationDetailModal";
import SimpleMessageModal from "./components/control/dashboard/modal/SimpleMessageModal.vue";
import RoundAllSMSModal from "@/components/admin/modal/round/all/RoundAllSMSModal";
import PasswordChangeModal from "@/components/auth/PasswordChangeModal.vue";
import GroupCreateModal from "./components/control/dashboard/modal/groups/GroupCreateModal.vue";
import CompetitionParticipantsModal from "./components/appSettings/competitions/CompetitionParticipantsModal.vue";
import GroupNameUpdateModal from "./components/control/dashboard/modal/groups/GroupNameUpdateModal.vue";
import CompetitionCreateModal from "./components/appSettings/competitions/CompetitionCreateModal.vue";
import ClubThingsModal from "@/components/admin/modal/round/all/ClubThingsModal";
import RoundAllMemoModal from "@/components/admin/modal/round/all/RoundAllMemoModal";
import OrderInfo from "@/components/control/dashboard/body/course/OrderInfo";
import CaddieInformationModal from "@/components/admin/modal/caddie/CaddieInformationModal";
import RoundAllEtiquetteModal from "@/components/admin/modal/round/all/RoundAllEtiquetteModal";

export default {
  name: "App",
  components: {
    RoundAllEtiquetteModal,
    CaddieInformationModal,
    OrderInfo,
    RoundAllMemoModal,
    ClubThingsModal,
    RoundAllSMSModal,
    CertificationDetailModal,
    PicturesModal,
    MessengerSendModal,
    MessengerReceiverModal,
    CaddiePlayTime,
    RoundAllScoreDetailModal,
    ClubCheckModal,
    RoundGroupScoreDetailModal,
    RoundGroupRankingModal,
    ChipBoxModal,
    DashboardStoreModal,
    CaddieSearchModal,
    OrderMessageModal,
    SimpleMessageModal,
    PasswordChangeModal,
    GroupCreateModal,
    GroupNameUpdateModal,
    CompetitionParticipantsModal,
    CompetitionCreateModal,
    NewPlayingCaddieInfo,
    Toast,
  },

  data() {
    return {
      windowInfo: null,
    };
  },

  computed: {
    windowSize() {
      if (!this.windowInfo) return null;
      const {width, height} = this.windowInfo;
      return `${width}px x ${height}px`;
    },

    selectedCaddieName() {
      if (!this.selectedCaddie) return null;
      const {data} = this.selectedCaddie;
      if (!data) return null;
      const {caddieName} = data;
      return caddieName;
    },

    ...mapGetters({
      isDevMode: "getIsDevMode",
      toastInfo: "getToast",
      toastIsShowing: "getToastIsShowing",
      isShowingMessengerSendModal: "getIsShowingMessengerSendModal",
      isShowingMessengerReceiverModal: "getIsShowingMessengerReceiverModal",
      isShowingPlayTimeModal: "getIsShowingPlayTimeModal",
      isShowingClubCheckModal: "getIsShowingClubCheckModal",
      isShowingRoundAllScoreDetailModal: "getIsShowingRoundAllScoreDetailModal",
      isShowingRoundGroupScoreDetailModal:
        "getIsShowingRoundGroupScoreDetailModal",
      isShowingRoundGroupRankingModal: "getIsShowingRoundGroupRankingModal",
      isShowingChipBoxModal: "getIsShowingChipBoxModal",
      isShowingDashboardStoreModal: "getIsShowingDashboardStoreModal",
      isShowingCaddieSearchModal: "getIsShowingCaddieSearchModal",
      isShowingOrderMessageModal: "getIsShowingOrderMessageModal",
      isShowingPicturesModal: "getIsShowingPicturesModal",
      isShowingCertificationDetailModal: "getIsShowingCertificationDetailModal",
      isShowingPasswordChangeModal: "getIsShowingPasswordChangeModal",
      isShowingSMSModal: "getIsShowingSMSModal",
      isShowingGroupCreateModal: "getIsShowingGroupCreateModal",
      isShowingGroupNameUpdateModal: "getIsShowingGroupNameUpdateModal",
      isShowingCompetitionParticipantsModal:
        "getIsShowingCompetitionParticipantsModal",
      isShowingCompetitionCreateModal: "getIsShowingCompetitionCreateModal",
      isShowingClubThingsModal: "getIsShowingClubThingsModal",
      isShowingClubMemoModal: "getIsShowingClubMemoModal",
      isShowingCaddieInformationModal: "getIsShowingCaddieInformationModal",
      isShowingEtiquetteModal: "getIsShowingEtiquetteModal",

    }),
    ...mapGetters("control/", {
      isRefresh: "getIsRefreshing",
      selectedCaddie: "getSelectedCaddie",
    }),
  },
  methods: {
    init() {
      this.initEvent();
    },

    initEvent() {
      if (this.isDevMode) {
        window.addEventListener("resize", this.getWindowSize, true);
      }
    },

    getWindowSize() {
      this.windowInfo = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    /**
     * 토스트 클릭 이벤트 핸들링 메소드.
     */
    handleToastClick() {
      const {title} = this.toastInfo;
      if (!title) {
        this.clearToast();
        return;
      }

      switch (title) {
        // 대시보드에서 새로운 주문 토스트 메시지 클릭 시 발생.
        case STORE_TOAST_TITLE:
          // 새로운 주문 관련 모달 스테이트 하나 만들고
          this.setDashboardStoreModal(true);
          // 현재 토스트 메시지 위에(z-index) 모달 창 띄우기.
          this.foldToast(true);

          // 레이아웃 구조는 그 이후에 잡고

          // 본부장님한테 newOrderCnt 설정하는 방법 배워서 테스팅 하면됨.
          break;
        default:
          this.clearToast();
      }
    },
    ...mapActions({
      clearToast: "clearToast",
      setDashboardStoreModal: "updateDashboardStoreModal",
      foldToast: "foldToast",
    }),
  },

  mounted() {
    this.init();
  },

  destroyed() {
    window.removeEventListener("resize", this.getWindowSize, true);
  },

  watch: {
    isShowingDashboardStoreModal(status) {
      if (!status) {
        this.foldToast(false);
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-color: var(--dark);
}

.dev__container {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
