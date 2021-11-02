<template>
  <header>
    <div class="distinction__container">
      <div
        class="current-distinction__wrapper p-1/2 pointer"
        @click="handleDistinctionClick"
      >
        <span>{{ selectedOptionName }}</span>
        <i class="fas fa-arrow-right"></i>
      </div>

      <div
        class="distinction-selector__wrapper"
        :class="{ shown: selectorShown }"
      >
        <span
          class="distinction-option p-1/2 pointer"
          v-for="(option, optionIndex) in distinctionOptionKeys"
          :key="optionIndex"
          @click="handleOptionClick(optionIndex)"
        >
          {{ option }}
        </span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HoleCoordinateManageHeader",

  props: {
    distinctionOptions: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      selectorShown: false,
      pickedIndex: 0,
    };
  },

  computed: {
    // 현재 선택된 옵션의 이름(키).
    selectedOptionName() {
      const option = this.distinctionOptions[this.pickedIndex];
      const [name] = Object.keys(option);
      return name;
    },

    // 구분 옵션 키 목록 반환.
    distinctionOptionKeys() {
      return this.distinctionOptions.map((option) => {
        const [key] = Object.keys(option);
        return key;
      });
    },
  },

  methods: {
    init() {
      // 부모 화면의 데이터 초기화를 위한 초기 실행.
      this.handleOptionClick(0);
    },

    handleOptionClick(optionIndex) {
      // 옵션 인덱스 설정.
      this.pickedIndex = optionIndex;
      // 셀렉터 끔.
      this.selectorShown = false;

      this.setSelectedOption(this.distinctionOptions[optionIndex]);
    },

    handleDistinctionClick() {
      this.selectorShown = !this.selectorShown;
    },

    ...mapActions("appSettings", {
      setSelectedOption: "updateSelectedOption",
    }),
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.distinction__container {
  position: relative;
}
.current-distinction__wrapper {
  position: relative;
  z-index: 1;
  width: 120px;
  border: 1px solid var(--primary);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.current-distinction__wrapper:hover {
  background-color: var(--soft-green);
}

.distinction-selector__wrapper {
  width: 120px;
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  border: 1px solid var(--primary);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--dark);
}
.distinction-selector__wrapper.shown {
  visibility: visible;
  opacity: 1;
  left: 136px;
}
.distinction-option:hover {
  background-color: var(--soft-green);
}
</style>
