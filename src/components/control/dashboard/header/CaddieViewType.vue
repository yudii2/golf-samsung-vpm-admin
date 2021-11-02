<template>
  <div class="caddie-view-type__container">
    <!-- 셀렉트 박스 -->
    <div class="selector__wrapper round-md" @click="handleSelectorClick">
      <span>{{ prettyCaddieViewTypeName }}</span>
      <img :src="arrowUrl" alt="arrow" />
    </div>

    <transition name="fade">
      <DropDownOptions
        v-if="optionsShown"
        :items="caddieViewTypeNames"
        @onOptionClick="handleOptionClick"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DropDownOptions from "@/components/shared/DropDownOptions.vue";
import {
  CADDIE_VIEW_TYPE_BOOKG_TIME,
  CADDIE_VIEW_TYPE_CADDIE_NAME,
  CADDIE_VIEW_TYPE_CART_NUMBER,
  CADDIE_VIEW_TYPE_PLAY_TIME,
  MAP,
} from "@/utils/constants";

export default {
  name: "CaddieViewType",
  components: {
    DropDownOptions,
  },
  data() {
    return {
      arrowUrl: require("@/assets/images/control/dashboard/ico_select2.png"),
      optionsShown: false,
      CADDIE_VIEW_TYPE_CADDIE_NAME,
      CADDIE_VIEW_TYPE_BOOKG_TIME,
      CADDIE_VIEW_TYPE_PLAY_TIME,
      CADDIE_VIEW_TYPE_CART_NUMBER,
      CADDIE_NAME_TITLE: "캐디명",
      BOOKG_TIME_TITLE: "예약시간",
      PLAY_TIME_TITLE: "경과시간",
      CART_NUMBER_TITLE: "카트번호",
      titles: [],
    };
  },
  computed: {
    /**
     * ### 캐디 보기 설정 이름 목록.
     */
    caddieViewTypeNames() {
      const viewTypeTitles = [];
      this.titles.forEach((title) => {
        const titleAsString = Object.values(title).join("");
        viewTypeTitles.push(titleAsString);
      });
      return viewTypeTitles || [];
    },

    /**
     * ### 캐디 보기 설정 이름.
     */
    prettyCaddieViewTypeName() {
      switch (this.caddieViewType) {
        case CADDIE_VIEW_TYPE_CADDIE_NAME:
          return this.CADDIE_NAME_TITLE;
        case CADDIE_VIEW_TYPE_BOOKG_TIME:
          return this.BOOKG_TIME_TITLE;
        case CADDIE_VIEW_TYPE_PLAY_TIME:
          return this.PLAY_TIME_TITLE;
        case CADDIE_VIEW_TYPE_CART_NUMBER:
          return this.CART_NUMBER_TITLE;
        default:
          return "캐디보기";
      }
    },

    ...mapGetters("control/", {
      caddieViewType: "currentCaddieViewType",
      viewType: "getViewType",
    }),
  },
  methods: {
    /**
     * ### 타이틀로 보기 설정 키 값 가져음.
     * @param {string} title > 보기 설정 옵션 타이틀.
     */
    findViewTypeKeyByTitle(title) {
      const caddieViewType = this.titles.find(
        (t) => Object.values(t).join("") === title
      );
      return Object.keys(caddieViewType).join("");
    },

    // handler
    handleSelectorClick() {
      // 지도로 보기 인 경우 설정 불가.
      if (this.viewType === MAP) {
        this.toast({
          title: "캐디 보기 설정",
          message: "지도 보기에서는 이 기능을 사용할 수 없습니다.",
        });
        return;
      }

      this.optionsShown = !this.optionsShown;
    },
    handleOptionClick(selected) {
      // 선택된 타이틀로 보기 설정 키 값 가져오기.
      const caddieViewTypeKey = this.findViewTypeKeyByTitle(selected);
      // 캐디 보기 설정 적용.
      this.updateCaddieViewType(caddieViewTypeKey);

      // 옵션 래퍼 숨김.
      this.optionsShown = false;
    },

    ...mapActions({
      toast: "toast",
    }),
    ...mapActions("control/", {
      updateCaddieViewType: "updateCaddieViewType",
    }),
  },
  created() {
    this.titles.push({ CADDIE_NAME: this.CADDIE_NAME_TITLE });
    this.titles.push({ BOOKG_TIME: this.BOOKG_TIME_TITLE });
    this.titles.push({ PLAY_TIME: this.PLAY_TIME_TITLE });
    this.titles.push({ CART_NUMBER: this.CART_NUMBER_TITLE });
  },
};
</script>

<style scoped>
.caddie-view-type__container {
  position: relative;
}

/* selector start */
.selector__wrapper {
  width: 120px;
  height: 35px;
  background-color: var(--primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  transition: all 0.3s ease;
}
.selector__wrapper span {
  font-size: 0.8rem;
}
/* selector end */

/* options start */
.options__wrapper {
  width: 120px;
  position: absolute;
  top: 45px;
  left: 0;
  background-color: var(--dark);
  border: 1px solid var(--primary);
  z-index: 1;
}
.options__wrapper li {
  transition: all 0.3s ease;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}
.options__wrapper li:hover {
  background-color: var(--primary);
}
.options__wrapper > li:first-child:hover {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.options__wrapper > li:last-child:hover {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
/* options end */
</style>
