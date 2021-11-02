<template>
  <main
    class="simple-message-modal__container pointer"
    :class="{ shown: isShowingSimpleMessageModal }"
    @click="handleContainerClick"
    @mouseover="handleContainerMouseOver"
    @mouseleave="handleContainerMouseLeave"
  >
    <h1 class="heart-beat-sm" ref="textRef">
      {{ simpleMessage }}
    </h1>

    <!-- 새로운 메시지 오디오 -->
    <audio
      ref="audioRef"
      :src="require('@/assets/audios/staff-bell-ring.mp3')"
      muted
      autoplay="true"
    />
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SimpleMessageModal",

  computed: {
    simpleMessage() {
      return this.simpleMessageModalText;
    },

    ...mapGetters({
      isShowingSimpleMessageModal: "getIsShowingSimpleMessageModal",
      simpleMessageModalText: "getSimpleMessageModalText",
      simpleMessageCallBack: "getSimpleMessageCallBack",
    }),
  },

  methods: {
    clearStore() {
      // 콜백 클리어.
      this.setSimpleMessageModalCallBack();
    },

    trigSound(status) {
      try {
        if (status) {
          this.$refs.audioRef.muted = false;
          this.$refs.audioRef.play();
        } else {
          this.$refs.audioRef.muted = true;
          this.$refs.audioRef.pause();
          this.$refs.audioRef.currentTime = 0;
        }
      } catch (e) {}
    },

    async handleContainerClick() {
      // 콜백 메소드 실행.
      await this.simpleMessageCallBack();

      // 모달 창 종료.
      await this.setIsShowingSimpleMessageModal(false);
    },

    handleContainerMouseOver() {
      this.$refs.textRef.style.color = "gold";
    },
    handleContainerMouseLeave() {
      this.$refs.textRef.style.color = "inherit";
    },

    ...mapActions({
      setIsShowingSimpleMessageModal: "updateIsShowingSimpleMessageModal",
      setSimpleMessageModalText: "updateSimpleMessageModalText",
      setSimpleMessageModalCallBack: "updateSimpleMessageModalCallBack",
    }),
  },

  destroyed() {
    // 스토어 클리어.
    this.clearStore();
  },

  watch: {
    /**
     * ### 메시지 알림 소리 컨트롤러.
     */
    isShowingSimpleMessageModal(status) {
      this.trigSound(status);
    },

    simpleMessageModalText(newText) {
      if (newText) {
        this.trigSound(true);
      }
    },
  },
};
</script>

<style scoped>
.simple-message-modal__container {
  position: absolute;
  z-index: 1;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--deep-green);
  border-radius: 10px;

  padding: 20px 100px;

  border: 4px solid var(--primary);

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-out;
}

.simple-message-modal__container.shown {
  top: 80px;
}
.simple-message-modal__container.shown:hover {
  transform: scale(1.1) translateX(-45%);
  border: 1px solid gold;
}

.simple-message-modal__container h1 {
  font-size: 1rem;
  letter-spacing: 1.5px;
  transition: all 0.5s ease-out;
}
</style>
