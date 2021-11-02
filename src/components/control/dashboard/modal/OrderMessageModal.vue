<template>
  <transition name="fade" appear>
    <!-- 텍스트 -->
    <div class="order-message-modal__container" @click="handleMessageClick">
      <span class="message-title heart-beat">{{ STORE_TOAST_TITLE }}</span>
      <span class="message-subtitle mt heart-beat">{{
        STORE_TOAST_SUBTITLE
      }}</span>

      <!-- 주문 목록 오디오 -->
      <audio
        ref="audioRef"
        :src="require('@/assets/audios/staff-bell-ring.mp3')"
        muted
        autoplay="true"
      />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { STORE_TOAST_TITLE, STORE_TOAST_SUBTITLE } from "@/utils/constants";
export default {
  name: "OrderMessageModal",

  data() {
    return {
      STORE_TOAST_TITLE,
      STORE_TOAST_SUBTITLE,
    };
  },

  computed: {
    ...mapGetters("control/", {
      isRefreshing: "getIsRefreshing",
    }),
  },

  methods: {
    /**
     * ### 메시지 클릭 시,
     * - 대시보드 주문 목록 모달 킴.
     * - 현 모달 끔.
     */
    handleMessageClick() {
      this.setDashboardStoreModal(true);
      this.setIsShowingOrderMessageModal(false);
    },

    ...mapActions({
      setIsShowingOrderMessageModal: "updateIsShowingOrderMessageModal",
      setDashboardStoreModal: "updateDashboardStoreModal",
    }),
  },

  watch: {
    /**
     * ### 주문 목록 있는 경우 오디오 파일 실행.
     */
    isRefreshing(isRefreshing) {
      try {
        if (isRefreshing && this.isShowingOrderMessageModal) {
          this.$refs.audioRef.muted = false;
          this.$refs.audioRef.play();
        }
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.order-message-modal__container {
  position: absolute;
  top: 25px;
  right: 25px;
  width: 25%;
  height: 100px;
  background-color: var(--deep-green);
  z-index: 5;
  border: 1px solid var(--primary);
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.message-title {
  font-size: 0.8rem;
  font-weight: 600;
}
.message-subtitle {
  font-size: 0.7rem;
}

@media screen and (min-width: 1080px) {
  .message-title {
    font-size: 0.9rem;
    font-weight: 600;
  }
  .message-subtitle {
    font-size: 0.8rem;
  }
}

@media screen and (min-width: 1920px) {
  .message-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .message-subtitle {
    font-size: 1rem;
  }
}
</style>
