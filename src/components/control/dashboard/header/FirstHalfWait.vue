<template>
  <div class="start_wait__container">
    <!-- header -->
    <header>
      <img
        class="mr-1/2"
        src="@/assets/images/control/dashboard/ico_info.png"
        alt="info"
      />
      <h2>스타트 대기</h2>
    </header>

    <!-- 대기 명단 -->
    <CaddieWaitList :courses="isValidCourses" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  CADDIE_PLAY_STEP_ABNORMAL,
  CADDIE_PLAY_STEP_FIRST_WAIT,
  CADDIE_VIEW_TYPE_BOOKG_TIME,
  CADDIE_VIEW_TYPE_CADDIE_NAME,
  CADDIE_VIEW_TYPE_CART_NUMBER,
  CADDIE_VIEW_TYPE_PLAY_TIME,
} from "@/utils/constants";
import CaddieWaitList from "./CaddieWaitList.vue";

export default {
  name: "FirstHalfWait",

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
     * ### 스타트 대기 코스 및 캐디 목록.
     */
    isValidCourses() {
      const newCourses = this.alwaysHasCourses.map((course) => ({
        courseCode: course.courseCd,
        courseName: course.courseNm,
      }));

      return newCourses.map((newCourse) => {
        const caddies = this.currentCaddies.filter((caddie) =>
          this.isFirstHalfWait(newCourse.courseCode, caddie)
        );

        return {
          ...newCourse,
          caddies,
        };
      });
    },

    /**
     * 캐디 예약 시간
     * - 구문 분석 후 포맷 변경하여 반환.
     * - 캐디 텍스트를 예약 시간으로 보는 경우.
     */
    parsedCaddieTime() {
      return (bookgTime) => {
        const pos = String(bookgTime).lastIndexOf(":");
        return bookgTime.substring(0, pos);
      };
    },

    isFirstHalfWait() {
      return (courseCode, caddie) => {
        // v2

        // 전반 코스 여부
        const isFirstCourse = courseCode === caddie.firstCourseCd;

        // 스타트 대기 여부
        const isFirstWait = caddie.playStep == CADDIE_PLAY_STEP_FIRST_WAIT;

        // 비정상 카트 여부
        const isNotAbnormal = caddie.playStep != CADDIE_PLAY_STEP_ABNORMAL;

        return isFirstCourse && isFirstWait && isNotAbnormal;
      };
    },

    ...mapGetters("control/", {
      currentCaddies: "currentCaddies",
      caddieViewType: "currentCaddieViewType",
      alwaysHasCourses: "getAlwaysHasCourses",
    }),
  },
};
</script>

<style scoped>
/* container start */
.start_wait__container {
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
}
header > h2 {
  font-size: 0.9rem;
  color: white;
}
/* header end */

/* contents start */
.first_wait__list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.first_wait__item {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0px 10px;
}

.first_wait__item:nth-child(odd) {
  /* background-color: #d2f4fb; */
  /* background-color: #d2f4fb; */
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
  transition: all 0.3s ease;
}

.caddie_name:hover {
  color: gold;
}
/* contents end */

/* media start */
@media screen and (min-width: 1920px) {
  /* container start */
  .start_wait__container {
    border-radius: 15px;
    height: 250px;
  }
  /* container end */

  /* header start */
  header {
    padding: 15px;
  }
  /* header end */

  header > h2 {
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
