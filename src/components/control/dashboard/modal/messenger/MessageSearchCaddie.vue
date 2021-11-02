<template>
  <section class="message_search_caddie">
    <!-- header -->
    <header>
      <h2>캐디명</h2>
    </header>

    <!-- body -->
    <section class="caddie-search-form__wrapper">
      <!-- search form -->
      <form class="caddie_search__form" @submit.prevent="">
        <input type="text" placeholder="캐디명" v-model="searchCaddieName" />
        <img
          :src="require('@/assets/images/control/dashboard/ico_search.png')"
          alt="search icon"
        />
      </form>

      <!-- caddies container -->
      <div class="caddies__container">
        <!-- caddies -->
        <ul class="caddie__wrapper">
          <li @click="handleClickedCaddie(ALL_COURSE)">
            <div
              class="radio"
              :class="{
                selected: isSelectedAll,
              }"
            ></div>
            <span class="caddie no-drag">전체</span>
          </li>

          <li
            v-for="(caddie, idx) in findMatchedCaddies"
            :key="idx"
            @click="handleClickedCaddie(caddie)"
          >
            <div
              class="radio"
              :class="{
                selected: includedCaddie(caddie),
              }"
            ></div>
            <span
              class="caddie no-drag"
              :class="{ 'i-am-here': searchCaddieName === caddie.caddieName }"
              >{{ caddie.caddieName }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ALL_COURSE } from "@/utils/constants";

export default {
  name: "MessageSearchCaddie",
  data() {
    return {
      ALL_COURSE,
      selectedAll: false,
      searchCaddieName: "",
    };
  },

  methods: {
    parseHoleIndex(holeIndex) {
      if (holeIndex <= 9) {
        return holeIndex;
      } else {
        return holeIndex - 9;
      }
    },
    handleClickedCaddie(caddie) {
      if (caddie === ALL_COURSE) {
        this.selectedAll = !this.selectedAll;

        if (this.selectedAll) {
          if (this.getMessengerSelectedHoles.length) {
            this.setMessengerSelectedCaddiesByHole();
          } else {
            this.toast({
              title: "코스 선택",
              message: "코스를 선택해주세요.",
            });
            this.selectedAll = false;
          }
        } else {
          this.clearMessengerSelectedCaddiesInfo();
        }
        return;
      }

      this.updateMessengerSelectedCaddieInfo({
        caddieName: caddie.caddieName,
        caddieUniqNo: caddie.caddieUniqNo,
        groupNm: caddie.groupNm,
      });

      this.selectedAll = false;
    },
    ...mapActions({
      toast: "toast",
    }),
    ...mapActions("control/", {
      updateMessengerSelectedCourseInfo: "updateMessengerSelectedCourseInfo",
      updateSearchCaddieName: "updateSearchCaddieName",
      updateMessengerSelectedCaddieInfo: "updateMessengerSelectedCaddieInfo",
      setMessengerSelectedHolesByCaddie:
        "updateMessengerSelectedHolesByCaddies",
      setMessengerSelectedCaddiesByHole: "updateMessengerSelectedCaddiesByHole",
      setMessengerSelectedCourseByCaddie:
        "updateMessengerSelectedCourseByCaddie",
      clearMessengerSelectedCaddiesInfo: "clearMessengerSelectedCaddiesInfo",
      clearMessengerSelectedHolesInfo: "clearMessengerSelectedHolesInfo",
    }),
  },

  computed: {
    isSelectedAll() {
      return this.selectedAll && this.hasCaddies;
    },

    hasCaddies() {
      return this.getMessengerSelectedCaddies.length;
    },

    includedCaddie() {
      return (caddie) => {
        const foundCaddie = this.getMessengerSelectedHoleInfo.caddies.find(
          (c) => c.caddieUniqNo === caddie.caddieUniqNo
        );
        return foundCaddie;
      };
    },
    matchedCaddies() {
      const selectedCourse = this.getMessengerSelectedHoleInfo.course;
      const selectedHoles = this.getMessengerSelectedHoleInfo.holes;
      const selectedHolesByIndex = selectedHoles.map((h) => h[0]);
      const filteredCaddies = this.currentCaddies.filter((c) => {
        const isAllCourse = selectedCourse.courseCode == 0;
        if (!isAllCourse) {
          const isNotMatchedCourse =
            c.bookgCourseCd != selectedCourse.courseCode;
          if (isNotMatchedCourse) {
            return false;
          }
        }

        const holeIndex = this.parseHoleIndex(c.currHoleIndex);
        const isMatchedHole = selectedHolesByIndex.includes(holeIndex);
        if (!isMatchedHole) {
          return false;
        }
        return c;
      });

      if (filteredCaddies.length === 0) {
        this.clearMessengerSelectedCaddiesInfo();
      }

      return filteredCaddies;
    },
    ...mapGetters("control/", [
      "getMessengerSelectedHoleInfo",
      "currentCaddies",
      "findCaddieByCaddieName",
      "findCaddieByCaddieNameStartsWith",
      "findCourseNameByCourseCode",
      "getCurrentSearchCaddieName",
      "findMatchedCaddies",
      "getMessengerSelectedCaddies",
      "getMessengerSelectedHoles",
    ]),
  },
  watch: {
    searchCaddieName(caddieName) {
      if (caddieName) {
        this.updateSearchCaddieName(caddieName);
        const foundCaddies = this.findCaddieByCaddieNameStartsWith(caddieName);

        // 코스 전체로 변경.
        if (foundCaddies.length) {
          this.setMessengerSelectedCourseByCaddie(foundCaddies[0]);
        }

        this.setMessengerSelectedHolesByCaddie(foundCaddies);
      } else {
        this.clearMessengerSelectedHolesInfo();
      }
    },

    getCurrentSearchCaddieName: function (caddieName) {
      this.searchCaddieName = caddieName;
    },

    getMessengerSelectedHoles(holes) {
      if (!holes.length) {
        this.selectedAll = false;
      }
    },
  },
};
</script>

<style>
.message_search_caddie {
  background-color: var(--dark);
  border: 1px solid var(--primary);
  grid-column: 9/11;
  grid-row: 1/8;
}

/* header start */
.message_search_caddie header {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: var(--soft-green);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 0 20px;
  color: var(--secondary);
}

.message_search_caddie header h2 {
  font-size: 1.1rem;
}
/* header end */

/* body start */
.message_search_caddie .caddie-search-form__wrapper {
  height: calc(100% - 40px);
  padding: 8px;
  overflow-y: scroll;
}

/* caddie search start */

.caddie_search__form {
  width: 100%;
  height: 25px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--dark);
  border: 1px solid var(--primary);
}
.caddie_search__form input {
  width: 80%;
  background-color: transparent;
  border: none;
  color: var(--secondary);
  letter-spacing: 2px;
  font-size: 0.8rem;
}
.caddie_search__form img {
  width: 17px;
  height: 17px;
}
/* caddie search end */

/* caddies container start */
.caddies__container {
  margin: 5px 2px;
  font-weight: 800;
}

.caddies__container > span {
  color: var(--purple);
}

.caddie__wrapper li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.caddie__wrapper li .radio {
  width: 12px;
  height: 12px;
  background-color: var(--secondary);
  border-radius: 5px;
  transition: all 0.3s ease;
}
.caddie__wrapper li .radio.selected {
  background-color: var(--primary);
}
.caddie__wrapper li .caddie {
  margin-left: 10px;
  font-size: 0.9rem;
}
/* caddies container end */

/* body end */

/* media start */
@media screen and (min-width: 1920px) {
  /* header start */
  .message_search_caddie header {
    height: 60px;
  }
  .message_search_caddie header h2 {
    font-size: 1.5rem;
  }
  /* header end */

  /* body start */
  .message_search_caddie .caddie-search-form__wrapper {
    height: calc(100% - 60px);
  }

  /* caddie search start */
  .caddie_search__form {
    height: 45px;
  }
  .caddie_search__form input {
    font-size: 1.1rem;
  }
  .caddie_search__form img {
    width: 22px;
    height: 22px;
  }
  /* caddie search end */

  /* caddies container start */
  .caddies__container {
    margin: 10px 5px;
    box-sizing: border-box;
  }
  .caddies__container > span {
    font-size: 1rem;
  }
  .caddie__wrapper li {
    margin-bottom: 20px;
  }
  .caddie__wrapper li .radio {
    width: 17px;
    height: 17px;
  }
  .caddie__wrapper li .caddie {
    margin-left: 15px;
    font-size: 1.2rem;
  }
  /* caddies container end */

  /* body end */
}
/* media end */
</style>
