<template>
  <article>
    <div class="group-select__container" @focusout="handleFocusOut" tabindex="3">
      <!-- 셀렉스 박스 -->
      <div class="selector__wrapper round-md" @click="toggleOptionsShow">
        <template v-if="!currentCourse">
          <span>전반코스조회</span>
        </template>
        <template v-else>
          <span>{{ currentCourse }}</span>
        </template>
        <img :src="arrowUrl" alt="arrow"/>
      </div>

      <transition name="fade">
        옵션 박스
        <DropDownOptions
          v-if="optionsShown"
          :items="companyCourseNames"
          @onOptionClick="handleCourseClick"
          class="drop-down-course-options__container"
        />
      </transition>
    </div>
  </article>
</template>

<script>
import DropDownOptions from "@/components/shared/DropDownOptions";
import {mapGetters} from "vuex";

export default {
  name: "ProgressTimeLiveSearch",

  components: {DropDownOptions},

  data() {
    return {
      optionsShown: false,
      arrowUrl: require("@/assets/images/control/dashboard/ico_select2.png"),
      currentCourse: ''
    }
  },

  computed: {
    companyCourseNames() {
      let courseNames = [];
      if (this.currentCompanyCourses?.length > 0) {
        courseNames = this.currentCompanyCourses?.map(({courseNm}) => courseNm)
      }
      courseNames.unshift('전체');
      return courseNames;
    },
    ...mapGetters("control/", {
      currentCompanyCourses: "getCompanyCourses",
    }),
  },

  methods: {
    toggleOptionsShow() {
      this.optionsShown = !this.optionsShown;
    },
    handleCourseClick(courseName) {
      const foundCourse = this.currentCompanyCourses.find((course) => course.courseNm === courseName)
      if (courseName !== '전체') {
        this.currentCourse = courseName
      } else {
        this.currentCourse = '';
      }
      this.toggleOptionsShow();
      this.$emit('sendSelectedCourse', foundCourse)
    },
    handleFocusOut(event) {
      if (event.relatedTarget) {
        return;
      }
      this.optionsShown = false;
    }
  }
}
</script>

<style scoped>
.group-select__container {
  position: relative;
}

/* selector start */
.selector__wrapper {
  width: 180px;
  height: 40px;
  background-color: var(--primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  transition: all 0.3s ease;
  margin: 0 0 10px 0;
}

.selector__wrapper > span {
  font-size: 17px;
  font-weight: bold;
}

.drop-down-course-options__container {
  left: 20px !important;
}
</style>
