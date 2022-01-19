<template>
  <section id="second-half-wait-horizontal__container">
    <!-- 10T 대기 라벨 -->
    <div class="header-title"><h2>10T 대기</h2></div>

    <!-- 코스 목록 -->
    <section class="courses__wrapper">
      <!-- 각각의 코스 -->
      <div
        class="course"
        :class="convertCourseCodeToClassName(course.courseCd)"
        v-for="course in courses"
        :key="course.courseCd"
      >
        <!-- 코스 명 -->
        <span class="course-name">{{ course.courseNm }}</span>

        <!-- 캐디 목록 -->
        <div
          class="course-caddies"
          v-for="caddie in getCaddiesByCourseCode(course.courseCd)"
          :key="caddie.caddieUniqNo"
        >
          <span
            class="caddie-name pointer"
            :class="{ 'has-order': hasOrder(caddie) }"
            @mouseover="handleCaddieNameMouseOver(caddie)"
            @mouseleave="handleCaddieNameMouseLeave"
            >{{ prettyCaddieText(caddie) }}</span
          >
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import TimeUtil from "@/utils/datetime/TimeUtil";
import { mapActions, mapGetters } from "vuex";
import {
  CADDIE_VIEW_TYPE_CADDIE_NAME,
  CADDIE_VIEW_TYPE_BOOKG_TIME,
} from "@/utils/constants";
export default {
  name: "SecondHalfWaitHorizontal",

  computed: {
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

    /**
     * ### 캐디 정보 텍스트를 보기 설정에 맞게 보여줌.
     */
    prettyCaddieText() {
      return ({ caddieName, bookgTime }) => {
        switch (this.caddieViewType) {
          case CADDIE_VIEW_TYPE_CADDIE_NAME:
            return caddieName;
          case CADDIE_VIEW_TYPE_BOOKG_TIME:
            return this.parsedCaddieTime(bookgTime);
        }
      };
    },

    /**
     * ### 코스 코드에 따른 각각의 클래스 명 반환.
     */
    convertCourseCodeToClassName() {
      return (courseCode) => {
        switch (courseCode) {
          case 1:
          case "1":
            return "course-west";
          case 2:
          case "2":
            return "course-north";
          case 3:
          case "3":
            return "course-south";
          case 4:
          case "4":
            return "course-east";
        }
        return courseCode;
      };
    },

    /**
     * ### 캐디 정보를 표시할 방향을 계산.
     * @param {string} courseCode 1:서, 2:북, 3:남, 4:동
     */
    caddieInfoDirection() {
      return (courseCode) => {
        switch (courseCode) {
          case 1:
          case "1":
          case 2:
          case "2":
            return "right-bottom";

          default:
            return "left-bottom";
        }
      };
    },

    courses() {
      return this.companyCourses;
    },

    getCaddiesByCourseCode() {
      return (courseCode) => {
        let caddies = this.currentCaddies?.filter(
          (caddie) =>
            caddie.playStep == 2 && courseCode === caddie.secondCourseCd
        );

        return caddies.length > 8 ? caddies.slice(0, 8) : caddies;
      };
    },

    hasOrder() {
      return (caddie) => {
        const { caddieUniqNo } = caddie;
        const selectedOrder = this.getOrder(caddieUniqNo);
        if (selectedOrder) {
          return true;
        } else {
          return false;
        }
      };
    },

    ...mapGetters("control/", {
      company: "getCompany",
      currentCaddies: "currentCaddies",
      companyCourses: "getCompanyCourses",
      tempCourses: "currentTempCourses",
      caddieViewType: "currentCaddieViewType",
      getOrder: "getOrderList",
    }),
  },

  methods: {
    setHoveredCaddie(caddie) {
      this.updateIsShowingPlayingCaddieInfoModal(true);
      this.updateHoveredCaddie(caddie);
    },
    clearHoveredCaddie() {
      this.updateIsShowingPlayingCaddieInfoModal(false);
      this.updateHoveredCaddie();
    },

    handleCaddieNameMouseOver(caddie) {
      this.setHoveredCaddie(caddie);
    },
    handleCaddieNameMouseLeave() {
      this.clearHoveredCaddie();
    },

    ...mapActions({
      updateIsShowingPlayingCaddieInfoModal:
        "updateIsShowingPlayingCaddieInfoModal",
    }),
    ...mapActions("control/", {
      updateHoveredCaddie: "updateHoveredCaddie",
    }),
  },

  filters: {
    /**
     * ### 파싱된 예약시간.
     * @param {string} value > 'hh:mm:ss' 형식의 데이터.
     * @returns {string} 'hh:mm' 형식의 데이터.
     */
    filteredBookgTime(value) {
      const removeColon = value.replaceAll(":", "");
      const parsedTime = TimeUtil.parse(removeColon);
      const hours = String(parsedTime.getHours()).padStart(2, "0");
      const minutes = String(parsedTime.getMinutes()).padStart(2, "0");

      return `${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
#second-half-wait-horizontal__container {
  display: none;
  width: 100%;
}

/* second half wait list title start */
.header-title {
  width: 125px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary);
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
}
.header-title h2 {
  font-size: 0.9rem;
}
/* second half wait list title end */

/* second half wait list start */
.header .courses__wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--primary);
  border-radius: 10px;
  padding: 5px;
}
.courses__wrapper .course {
  display: flex;
  align-items: center;
  white-space: nowrap;
  /* overflow: hidden; */
  text-overflow: ellipsis;
}

/* course grid ordering start */
.course.course-west {
  grid-column: 1/2;
  grid-row: 1/2;
}
.course.course-north {
  grid-column: 1/2;
  grid-row: 2/3;
}
.course.course-south {
  grid-column: 2/3;
  grid-row: 1/2;
}
.course.course-east {
  grid-column: 2/3;
  grid-row: 2/3;
}
/* course grid ordering end */

.course .course-name {
  font-size: 0.7rem;
  font-weight: 600;
}

.courses__wrapper .course .course-caddies {
  position: relative;
  margin-left: 10px;
}
.course-caddies .caddie-info {
  position: absolute;
  top: -10px;
  left: 70px;
  z-index: 3;
  opacity: 0;
  visibility: hidden;
  width: 300px;
  background-color: var(--soft-green);
  transition: all 0.2s ease;
  border-radius: 10px;
  padding: 5px;

  display: flex;
  flex-direction: column;
}
.caddie-info .caddie-info-row {
  margin: 5px;
  display: flex;
  align-items: center;
}
.caddie-info .caddie-info-row > span:last-child {
  margin-left: 5px;
}
.caddie-info-row .caddie-players {
  margin-left: 5px;
}

.course-caddies .caddie-name {
  font-size: 0.8rem;
  margin-right: 5px;
}
.course-caddies .caddie-name:hover {
  color: gold;
}
.has-order {
  color: #ebb87c;
  font-weight: 600;
}
/* second half wait list start */

/* media start */
@media screen and (min-width: 500px) {
  #second-half-wait-horizontal__container {
    display: flex;
    align-items: center;
    height: 50px;
  }
  .header-title h2 {
    font-size: 0.9rem;
  }

  .header .courses__wrapper {
    padding: 5px;
  }

  .course .course-name {
    font-size: 0.8rem;
  }

  .course-caddies .caddie-name {
    font-size: 0.8rem;
  }
}

@media screen and (min-width: 1080px) {
  #second-half-wait-horizontal__container {
    display: flex;
    align-items: center;
    height: 70px;
  }
  .header-title h2 {
    font-size: 1rem;
  }

  .header .courses__wrapper {
    padding: 5px;
  }

  .course .course-name {
    font-size: 0.9rem;
  }

  .course-caddies .caddie-name {
    font-size: 0.9rem;
  }
}
/* media end */

@media screen and (min-width: 1920px) {
  #second-half-wait-horizontal__container {
    display: flex;
    align-items: center;
    height: 100px;
  }
  .header-title h2 {
    font-size: 1.2rem;
  }

  .header .courses__wrapper {
    padding: 10px;
  }

  .course .course-name {
    font-size: 1rem;
  }

  .course-caddies .caddie-name {
    font-size: 1.1rem;
  }
}
/* media end */
</style>
