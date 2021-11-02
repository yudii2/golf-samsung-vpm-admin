<template>
  <div class="caddie-view-type-button__container">
    <div class="buttons__wrapper">
      <button
        :class="{ selected: isSelected(CADDIE_VIEW_TYPE_CADDIE_NAME) }"
        @click="handleButtonClick(CADDIE_VIEW_TYPE_CADDIE_NAME)"
      >
        <span class="button-text">이름</span>
      </button>

      <button
        :class="{ selected: isSelected(CADDIE_VIEW_TYPE_BOOKG_TIME) }"
        @click="handleButtonClick(CADDIE_VIEW_TYPE_BOOKG_TIME)"
      >
        <span class="button-text">시간</span>
      </button>
    </div>
  </div>
</template>

<script>
import {
  CADDIE_VIEW_TYPE_CADDIE_NAME,
  CADDIE_VIEW_TYPE_BOOKG_TIME,
} from "@/utils/constants";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CaddieViewTypeButton",
  data() {
    return {
      CADDIE_VIEW_TYPE_CADDIE_NAME,
      CADDIE_VIEW_TYPE_BOOKG_TIME,
    };
  },

  computed: {
    /**
     * ### 현재 선택된 버튼에 대한 여부 확인.
     */
    isSelected() {
      return (viewTypeText) => {
        return viewTypeText === this.caddieViewType;
      };
    },

    ...mapGetters("control/", {
      caddieViewType: "currentCaddieViewType",
    }),
  },

  methods: {
    // handler
    handleButtonClick(button) {
      this.setCaddieViewType(button);
    },

    ...mapActions("control/", {
      setCaddieViewType: "updateCaddieViewType",
    }),
  },
};
</script>

<style scoped>
.caddie-view-type-button__container {
  position: absolute;
  z-index: 1;
}

/* buttons wrapper start */
.buttons__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* button start */
button {
  width: 60px;
  height: 70px;
  background-color: var(--deep-green);
  border: 1px solid var(--primary);
  transition: all 0.3s ease;
}
button:hover {
  background-color: var(--soft-green);
}
button:first-child {
  border-top-left-radius: 40%;
  border-top-right-radius: 40%;
}
button:last-child {
  border-bottom-left-radius: 40%;
  border-bottom-right-radius: 40%;
}
button.selected {
  background-color: var(--primary);
}
.button-text {
  font-size: 1rem;
  color: var(--secondary);
}
/* button end */
/* buttons wrapper end */
</style>
