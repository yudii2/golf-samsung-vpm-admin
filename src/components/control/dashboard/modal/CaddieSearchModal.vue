<template>
  <transition name="fade" appear>
    <div
      class="caddie-search-modal__container"
      :class="{ shown: isShowingCaddieSearchModal }"
      ref="container"
    >
      <!-- 타이틀 -->
      <h2>캐디명 검색</h2>

      <CloseButton @onClose="handleCloseClick" />

      <!-- 입력 폼 -->
      <form
        class="caddie-search-form mt"
        @submit.prevent="handleSearchCaddieSubmit"
      >
        <input
          class="input-dark"
          type="text"
          v-model="searchCaddieInput"
          placeholder="캐디명을 입력하세요."
          autocomplete="off"
          ref="searchCaddieRef"
        />
        <button class="button-dark ml-1/2">찾기</button>
      </form>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CloseButton from "@/components/shared/CloseButton.vue";

export default {
  name: "CaddieSearchModal",
  components: {
    CloseButton,
  },

  data() {
    return {
      searchCaddieInput: "",
    };
  },

  computed: {
    ...mapGetters({
      isShowingCaddieSearchModal: "getIsShowingCaddieSearchModal",
    }),
  },

  methods: {
    /**
     * ### 캐디 검색 인풋 클리어
     */
    searchCaddieInputClear() {
      this.searchCaddieInput = "";
    },

    /**
     * ### 아래 레이어 데이터 확인 할 수 있도록 투명도 조정.
     */
    setContainerOpacity() {
      const container = this.$refs.container;
      container.style.opacity = "0.3";
      setTimeout(() => {
        container.style.opacity = "1";
      }, 1000);
    },

    handleCloseClick() {
      this.setIsShowingCaddieSearchModal(false);
    },
    handleSearchCaddieSubmit() {
      // 미입력 시 아무것도 안함.
      if (!this.searchCaddieInput.length) return;

      // 컨데이너 투명도 조정.
      this.setContainerOpacity();

      // 캐디 탐색 목록에 추가.
      this.addLookUpCaddie(this.searchCaddieInput);

      //   폼 인풋 클리어.
      this.searchCaddieInputClear();
    },

    ...mapActions({
      setIsShowingCaddieSearchModal: "updateIsShowingCaddieSearchModal",
    }),
    ...mapActions("control/", {
      addLookUpCaddie: "addLookUpCaddies",
    }),
  },
};
</script>

<style scoped>
.backdrop {
  background-color: inherit;
}

.caddie-search-modal__container {
  position: absolute;
  z-index: 1;
  top: -180px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  background-color: var(--deep-green);
  border: 1px solid var(--primary);
  transition: all 0.8s ease, opacity 0.3s ease;

  border-radius: 10px;
  padding: 20px;
}
.caddie-search-modal__container.shown {
  top: 40px;
}

.caddie-search-form {
  display: flex;
  justify-content: space-between;
}

.caddie-search-form input {
  flex: 1;
}
.caddie-search-form * {
  height: 40px;
}
</style>
