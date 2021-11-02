<template>
  <!-- 코스 목록 -->
  <div class="course-list__container">
    <div
      class="course-name__wrapper pointer p-1/2"
      :class="{ selected: selectedIndex === courseIndex }"
      v-for="(course, courseIndex) in courses"
      :key="courseIndex"
      @click="handleCourseOptionClick(courseIndex)"
    >
      <span>{{ course.courseNm }}</span>
      <i class="fas fa-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HoleCoordinateManageCourses",

  props: {
    courses: {
      type: Array,
      require: true,
    },

    holes: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    };
  },

  methods: {
    handleCourseOptionClick(courseIndex) {
      this.selectedIndex = courseIndex;
      this.setSelectedCourse(this.courses[courseIndex]);
    },

    ...mapActions("appSettings", {
      setSelectedCourse: "updateSelectedCourse",
    }),
  },

  mounted() {
    this.handleCourseOptionClick(this.selectedIndex);
  },
};
</script>

<style scoped>
.course-list__container {
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}
.course-name__wrapper {
  border: 1px solid var(--primary);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}
.course-name__wrapper:hover {
  background-color: var(--soft-green);
}
.course-name__wrapper.selected {
  background-color: var(--primary);
}
</style>
