<template>
  <section class="caddie-wait-list__container">
    <ul class="caddie-wait-list__wrapper" v-if="hasCourses">
      <li
        class="caddie-wait-item"
        v-for="course in sortedCourses"
        :key="course.courseCd"
      >
        <span class="course-name">{{ course.courseName }}</span>
        <ul
          class="caddie-names__wrapper px-1/2 one-line__wrapper no-scrollbar"
          v-if="hasCaddies(course)"
        >
          <li
            class="caddie-name mr-1/4 pointer"
            :class="{
              'i-am-here': isSearched(caddie.caddieName),
              'first-team': isFirstTeam(caddie.mark1),
              'last-team': isLastTeam(caddie.mark1),
              'has-order': hasOrder(caddie),
            }"
            v-for="caddie in course.caddies"
            :key="caddie.caddieUniqNo"
            @click="handleCaddieNameClick(caddie)"
            @mouseover="handleCaddieNameMouseOver(caddie)"
            @mouseleave="handleCaddieNameMouseLeave"
          >
            {{ prettyCaddieViewType(caddie) }}
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  CADDIE_VIEW_TYPE_BOOKG_TIME,
  CADDIE_VIEW_TYPE_CADDIE_NAME,
  CADDIE_VIEW_TYPE_CART_NUMBER,
  CADDIE_VIEW_TYPE_PLAY_TIME,
} from "@/utils/constants";
import useCopy from "@/composables/useCopy";
import TimeUtil from "@/utils/datetime/TimeUtil";
import useRestaurant from "@/api/v1/monitor/useRestaurant";

const { objectCopier } = useCopy();
const { getOrderInfo } = useRestaurant();
export default {
  name: "CaddieWaitList",

  props: {
    courses: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      CADDIE_VIEW_TYPE_BOOKG_TIME,
      CADDIE_VIEW_TYPE_CADDIE_NAME,
      CADDIE_VIEW_TYPE_CART_NUMBER,
      CADDIE_VIEW_TYPE_PLAY_TIME,
    };
  },

  async mounted() {
    const data = await getOrderInfo(this.selectedStoreType);
    this.setOrderList(data);
  },

  computed: {
    /**
     * ### 첫 번째 팀 여부 확인.
     */
    isFirstTeam() {
      return (mark) => {
        return mark == 1;
      };
    },

    /**
     * ### 마지막 팀 여부 확인.
     */
    isLastTeam() {
      return (mark) => {
        return mark == 2;
      };
    },

    /**
     * 현재 캐디가 탐색되었는 지 확인.
     * - 캐디 검색 시.
     */
    isSearched() {
      return (caddieName) => {
        return this.lookUpCaddies.some(
          (caddie) => caddie.caddieName === caddieName
        );
      };
    },

    /**
     * ### 캐디의 예약 시간을 바탕으로 정렬된 코스 목록을 반환.
     */
    sortedCourses() {
      const copiedCourses = objectCopier(this.courses);
      return copiedCourses.map((course) => {
        if (course.caddies.length) {
          course.caddies.sort((a, b) => {
            const { ok: aTimeOk, data: aData } = TimeUtil.toDate(a.bookgTime);
            const { ok: bTimeOk, data: bData } = TimeUtil.toDate(b.bookgTime);
            if (aTimeOk && bTimeOk) {
              if (aData.getTime() > bData.getTime()) return 1;
              else return -1;
            }
          });
        }
        return course;
      });
    },

    /**
     * ### 코스 존재 여부 확인.
     */
    hasCourses() {
      return this.courses && this.courses.length;
    },

    /**
     * ### 캐디 목록 존재 여부 확인.
     */
    hasCaddies() {
      return ({ caddies }) => {
        return caddies && caddies.length;
      };
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
     * - 캐디 텍스트를 예약 시간으로 보는 경우.
     */
    parsedCaddieTime() {
      return (bookgTime) => {
        const pos = String(bookgTime).lastIndexOf(":");
        return bookgTime.substring(0, pos);
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
      caddieViewType: "currentCaddieViewType",
      lookUpCaddies: "getLookUpCaddies",
      getOrder: "getOrderList",
      selectedStoreType: "getSelectedStoreType",
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
    handleCaddieNameClick(caddie) {
      this.selectCaddie(caddie);
      this.setIsShowingMessengerSendModal(true);
    },

    ...mapActions({
      updateIsShowingPlayingCaddieInfoModal:
        "updateIsShowingPlayingCaddieInfoModal",
      setIsShowingMessengerSendModal: "updateIsShowingMessengerSendModal",
    }),
    ...mapActions("control/", {
      updateHoveredCaddie: "updateHoveredCaddie",
      selectCaddie: "addSelectedCaddie",
      setOrderList: "setOrderList",
    }),
  },
};
</script>

<style scoped>
.caddie-wait-list__container {
  height: 100%;
  background-color: var(--deep-green);
}

.caddie-wait-list__wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.caddie-wait-item {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.caddie-wait-item:nth-child(odd) {
  background-color: var(--dark);
}

/* caddie names start */
.caddie-names__wrapper {
  width: 100%;
  display: flex;
  align-items: center;

  overflow-x: scroll;
}

.caddie-name {
  transition: all 0.3s ease;
}

.caddie-name.first-team {
  color: tomato;
}

.caddie-name.last-team {
  color: dodgerblue;
}

.caddie-name:hover {
  color: gold;
}

.has-order {
  color: #ebb87c !important;
  font-weight: 600 !important;
}

/* caddie names end */

@media screen and (min-width: 1080px) {
  .course-name {
    font-size: 1.1rem;
  }
}

@media screen and (min-width: 1920px) {
  .course-name {
    font-size: 1.2rem;
  }
}
</style>
