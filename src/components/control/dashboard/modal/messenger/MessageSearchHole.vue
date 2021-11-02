<template>
  <section class="message_search_hole">
    <!-- header -->
    <header>
      <img
        :src="require('@/assets/images/control/dashboard/ico_hole.png')"
        alt="hole icon"
      />
      <h2>홀</h2>
    </header>

    <!-- body -->
    <section>
      <!-- course -->
      <div class="course_selector__container">
        <div
          class="course_selector"
          v-if="courses.length"
          @click="toggleIsShowingCourseSelectBox"
        >
          <span>{{ selectedCourse.courseName }}</span>
          <div>
            <img
              :src="require('@/assets/images/control/dashboard/ico_down.png')"
              alt="down icon"
            />
          </div>
        </div>

        <!-- select box -->
        <transition name="fade">
          <div
            class="course_selector__item__container"
            v-if="isShowingCourseSelectBox"
          >
            <span
              class="course_selector__item"
              v-for="(course, idx) in courses"
              :key="idx"
              @click="handleClickedCourse(course)"
            >
              {{ course.courseName }}
            </span>
          </div>
        </transition>
      </div>

      <!-- hole -->
      <div class="holes__container" v-if="selectedCourse">
        <ul class="holes__wrapper">
          <li @click="handleClickedHole('전체')">
            <div class="radio" :class="{ selected: selectedAll }"></div>
            <span class="hole no-drag">전체</span>
          </li>

          <li
            v-for="(hole, idx) in holes"
            :key="idx"
            @click="handleClickedHole(hole)"
          >
            <div
              class="radio"
              :class="{ selected: selectedHoles.includes(hole) }"
            ></div>
            <span class="hole no-drag">{{ hole }}</span>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "MessageSearchHole",
  data() {
    return {
      selectedAll: false,
      isShowingCourseSelectBox: false,
      courses: [],
      holes: ["1홀", "2홀", "3홀", "4홀", "5홀", "6홀", "7홀", "8홀", "9홀"],
      selectedCourse: null,
      selectedHoles: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initCourses();
    },

    initCourses() {
      this.courses.push({ courseCode: "0", courseName: "코스 전체" });
      this.currentCompanyCourses.forEach((c) => {
        this.courses.push({ courseCode: c.courseCd, courseName: c.courseNm });
      });
      this.selectedCourse = this.courses[0];
    },

    toggleIsShowingCourseSelectBox() {
      this.isShowingCourseSelectBox = !this.isShowingCourseSelectBox;
    },

    handleClickedCourse(course) {
      this.selectedCourse = course;
      this.clearSearchCaddieNameInput();
      this.updateMessengerSelectedCourseInfo(this.selectedCourse);

      this.toggleIsShowingCourseSelectBox();
    },

    handleClickedHole(hole) {
      if (hole === "전체") {
        this.selectedAll = !this.selectedAll;

        if (this.selectedAll) {
          this.selectedHoles = this.holes;
        } else {
          this.selectedHoles = [];
          this.clearMessengerSelectedCaddiesInfo();
        }

        this.updateMessengerSelectedHoleInfo(this.selectedHoles);
        return;
      }

      const isExists = this.selectedHoles.includes(hole);
      if (isExists) {
        this.selectedHoles = this.selectedHoles.filter((h) => h !== hole);
      } else {
        this.selectedHoles.push(hole);
      }

      this.updateMessengerSelectedHoleInfo(this.selectedHoles);

      this.selectedAll = false;
    },
    ...mapActions("control/", {
      updateMessengerSelectedCourseInfo: "updateMessengerSelectedCourseInfo",
      updateMessengerSelectedHolesByAll: "updateMessengerSelectedHolesByAll",
      updateMessengerSelectedHoleInfo: "updateMessengerSelectedHoleInfo",
      clearSearchCaddieNameInput: "clearSearchCaddieNameInput",
      clearMessengerSelectedCaddiesInfo: "clearMessengerSelectedCaddiesInfo",
    }),
    ...mapMutations("control/", ["updateMessengerSelectedCaddieInfo"]),
  },

  computed: {
    ...mapGetters("control/", {
      currentCompanyCourses: "getCompanyCourses",
      messengerSelectedHoleInfo: "getMessengerSelectedHoleInfo",
      messengerSelectedHoles: "getMessengerSelectedHoles",
      messengerSelectedCourse: "getMessengerSelectedCourse",
    }),
  },

  watch: {
    messengerSelectedCourse(course) {
      this.selectedCourse = course;
    },

    messengerSelectedHoleInfo(val) {
      this.selectedCourse = val.course;
      this.selectedHoles = val.holes;
    },
  },
};
</script>

<style>
.message_search_hole {
  background-color: var(--dark);
  border: 1px solid var(--primary);
  grid-column: 7/9;
  grid-row: 1/8;
}

/* header start */
.message_search_hole header {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: var(--soft-green);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 0 20px;
  color: var(--secondary);
}

.message_search_hole header h2 {
  font-size: 1.1rem;
}

/* header end */

/* body start */
.message_search_hole section {
  height: calc(100% - 40px);
  padding: 8px;
  overflow-y: scroll;
}

/* course selector start */
.course_selector__container {
  position: relative;
}

.course_selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 25px;
  background-color: var(--dark);
  border: 1px solid var(--primary);
  cursor: pointer;
}

.course_selector div {
  background-color: var(--primary);
  width: 25px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.course_selector span {
  color: #a9d3d4;
  font-weight: bolder;
  font-size: 0.8rem;
  margin: 0 10px;
}

.course_selector img {
  width: 17px;
}

.course_selector__item__container {
  position: absolute;
  background-color: var(--dark);
  width: 100%;
}

.course_selector__item {
  display: block;
  padding: 5px 10px;
  transition: all 0.3s ease;
  border: 1px solid var(--primary);
  cursor: pointer;
  font-size: 0.8rem;
}

.course_selector__item:hover {
  background-color: var(--soft-green);
}

/* course selector end */

/* hole start */
.holes__container {
  margin: 5px 2px;
  font-weight: 800;
}

.holes__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.holes__wrapper li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.holes__wrapper li .radio {
  width: 12px;
  height: 12px;
  background-color: var(--secondary);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.holes__wrapper li .radio.selected {
  background-color: var(--primary);
}

.holes__wrapper li .hole {
  margin-left: 10px;
  font-size: 0.9rem;
}

/* hole end */

/* body end */

/* media start */
@media screen and (min-width: 1920px) {
  .message_search_hole header {
    height: 60px;
  }

  .message_search_hole header h2 {
    font-size: 1.5rem;
  }

  /* body start */
  .message_search_hole section {
    height: calc(100% - 60px);
  }

  /* course selector start */
  .course_selector {
    height: 45px;
  }

  .course_selector div {
    width: 35px;
  }

  .course_selector span {
    font-size: 1.1rem;
  }

  .course_selector__item {
    padding: 10px;
    font-size: 1.1rem;
  }

  /* course selector end */
  /* hole start */
  .holes__container {
    margin: 10px 5px;
  }

  .holes__wrapper li {
    margin-bottom: 20px;
  }

  .holes__wrapper li .radio {
    width: 17px;
    height: 17px;
  }

  .holes__wrapper li .hole {
    margin-left: 15px;
    font-size: 1.2rem;
  }

  /* hole end */
  /* body end */
}

/* media end */
</style>
