<template>
  <div class="play_done__container">
    <header>
      <div class="header-column">
        <img
          class="mr-1/2"
          src="@/assets/images/control/dashboard/ico_info.png"
          alt="info"
        />
        <h2>플레이 종료</h2>
      </div>

      <div
        class="abnormal-carts__wrapper"
        v-if="abnormalCaddies.length"
        @click="handleAbnormalCartsClick"
      >
        <span>비정상 카트 : </span>
        <span>{{ abnormalCaddies.length }}</span>
      </div>
    </header>

    <!-- 대기 명단 -->
    <CaddieWaitList :courses="isValidCourses" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  CADDIE_PLAY_STEP_ABNORMAL,
  CADDIE_PLAY_STEP_PLAY_DONE,
  CADDIE_VIEW_TYPE_BOOKG_TIME,
  CADDIE_VIEW_TYPE_CADDIE_NAME,
  CADDIE_VIEW_TYPE_CART_NUMBER,
  CADDIE_VIEW_TYPE_PLAY_TIME,
} from "@/utils/constants";
import CaddieWaitList from "./CaddieWaitList.vue";

export default {
  name: "PlayDone",

  components: {
    CaddieWaitList,
  },

  data() {
    return {
      CADDIE_VIEW_TYPE_BOOKG_TIME,
      CADDIE_VIEW_TYPE_CADDIE_NAME,
      CADDIE_VIEW_TYPE_CART_NUMBER,
      CADDIE_VIEW_TYPE_PLAY_TIME,
    };
  },
  computed: {
    /**
     * ### 스타트 대기 코스 및 캐디 목록.
     */
    isValidCourses() {
      const newCourses = this.alwaysHasCourses.map((course) => ({
        courseCode: course.courseCd,
        courseName: course.courseNm,
      }));

      return newCourses.map((newCourse) => {
        const caddies = this.currentCaddies.filter((caddie) =>
          this.isRoundFinished(newCourse.courseCode, caddie)
        );

        return {
          ...newCourse,
          caddies,
        };
      });
    },

    /**
     * ### 현재 비정상 캐디(카트) 반환.
     * @returns {Array} playStep 값이 9 인 캐디를 리스트 형식으로 반환.
     */
    abnormalCaddies() {
      return this.currentCaddies.filter((caddie) => caddie.playStep == 9);
    },

    /**
     * ### 비정상 카트를 칩으로 반환.
     */
    abnormalCaddieChips() {
      const caddies = this.abnormalCaddies;
      const chips = caddies.map((caddie, caddieIndex) => {
        return {
          id: caddie.caddieUniqNo,
          index: caddieIndex,
          title: caddie.caddieName,
        };
      });
      return chips;
    },

    /**
     * ### 현재 캐디 보기 설정에 따라 옵션 타이틀 설정.
     * @param {string} caddie.caddieName > 캐디 명.
     * @param {string} caddie.bookgTime > 예약 시간.
     * @param {string} caddie.cartNo > 카트 번호.
     * @param {string} caddie.lastReceivedTerm > 경과 시간.
     */
    prettyCaddieViewType() {
      return (caddie) => {
        switch (this.caddieViewType) {
          case CADDIE_VIEW_TYPE_BOOKG_TIME:
            return caddie.bookgTime
              ? this.parsedCaddieTime(caddie.bookgTime)
              : caddie.caddieName;
          case CADDIE_VIEW_TYPE_CADDIE_NAME:
            return caddie.caddieName;
          case CADDIE_VIEW_TYPE_CART_NUMBER:
            return caddie.cartNo ? caddie.cartNo : caddie.caddieName;
          case CADDIE_VIEW_TYPE_PLAY_TIME:
            return caddie.lastReceivedTerm
              ? this.parsedCaddieTime(caddie.lastReceivedTerm)
              : caddie.caddieName;
          default:
            return caddie.caddieName;
        }
      };
    },

    /**
     * 캐디 예약 시간
     * - 구문 분석 후 포맷 변경하여 반환.
     * - 캐디 텍스트를 시간으로 보는 경우.
     */
    parsedCaddieTime() {
      return (bookgTime) => {
        const pos = String(bookgTime).lastIndexOf(":");
        return bookgTime.substring(0, pos);
      };
    },

    /**
     * ### 캐디의 현재 라운드 종료 여부를 판별하는 로직.
     * @returns {boolean} true : 화면에 표시함, false : 화면에 표시 안함.
     */
    isRoundFinished() {
      return (courseCode, caddie) => {
        // v2

        // 전반 코스 여부
        const isSecondCourse = courseCode === caddie.secondCourseCd;

        // 플레이 종료 여부
        const isPlayDone = caddie.playStep == CADDIE_PLAY_STEP_PLAY_DONE;

        // 비정상 카트 여부
        const isNotAbnormal = caddie.playStep != CADDIE_PLAY_STEP_ABNORMAL;

        return isSecondCourse && isPlayDone && isNotAbnormal;
      };
    },
    ...mapGetters("control/", {
      currentCaddies: "currentCaddies",
      caddieViewType: "currentCaddieViewType",
      alwaysHasCourses: "getAlwaysHasCourses",
    }),
  },
  methods: {
    async handleAbnormalCartsClick() {
      await this.setChipBoxTitle("비정상 카트");
      await this.setChipBoxItems(this.abnormalCaddieChips);
      await this.setChipBoxClickable(true);
      await this.setChipBoxFrom("PlayDone");

      await this.setIsShowingChipBoxModal(true);
    },

    ...mapActions({
      setIsShowingChipBoxModal: "updateIsShowingChipBoxModal",
      setChipBoxTitle: "updateChipBoxTitle",
      setChipBoxItems: "updateChipBoxItems",
      setChipBoxClickable: "updateChipBoxClickable",
      setChipBoxFrom: "updateChipBoxFrom",
    }),
  },
};
</script>

<style scoped>
/* container start */
.play_done__container {
  border-radius: 10px;
  border: 1px solid var(--primary);
  height: 200px;

  display: flex;
  flex-direction: column;
  overflow: hidden;
}
/* container end */

/* header start */
header {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
header .header-column {
  display: flex;
  align-items: center;
}
.header-column h2 {
  font-size: 0.9rem;
  color: white;
}
/* header end */

/* contents start */
.play_done__list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.play_done__item {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.play_done__item:nth-child(odd) {
  background-color: #132525;
}

.course_name {
  font-size: 0.85rem;
}

.caddie_names__wrapper {
  position: relative;
}

.caddie_name {
  font-size: 0.8rem;
}

.caddie_name:hover {
  color: gold;
}
/* contents end */

/* abnormal carts start */
.abnormal-carts__wrapper {
  cursor: pointer;
  transition: all 0.3s ease;
}
.abnormal-carts__wrapper:hover {
  transform: scale(1.05);
}
/* abnormal carts end */

/* media start */
@media screen and (min-width: 1920px) {
  /* container start */
  .play_done__container {
    border-radius: 15px;
    height: 250px;
  }
  /* container end */

  /* header start */
  header {
    padding: 15px;
  }
  /* header end */

  .header-column h2 {
    font-size: 1.2rem;
  }
  .course_name {
    font-size: 1.2rem;
  }

  .caddie_name {
    font-size: 1rem;
  }
}
/* media end */
</style>
