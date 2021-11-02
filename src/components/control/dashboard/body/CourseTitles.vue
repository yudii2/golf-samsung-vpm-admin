<template>
  <div class="course_body" v-if="courses.length">
    <div class="course" v-for="(course, i) in courses" :key="i">
      <span class="course-name">{{ course.courseNm }}</span>
    </div>
  </div>
  <div class="course_body" v-else>
    <span v-if="isRefreshing" class="text-center">{{ MESSAGE_LOADING }}</span>
    <span v-else class="text-center">No Courses</span>
  </div>
</template>

<script>
import { MESSAGE_LOADING } from "@/utils/constants";
import { mapGetters } from "vuex";

export default {
  name: "CourseTitles",
  props: {
    courses: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      MESSAGE_LOADING,
    };
  },
  computed: {
    ...mapGetters("control/", {
      isRefreshing: "getIsRefreshing",
    }),
  },
};
</script>

<style scoped>
.course_body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.course {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark);
  /* padding-bottom: 20px; */
}
.course span {
  transition: all 0.2s ease;
  cursor: default;
  font-size: 0.8rem;
}
.course span:hover {
  transform: scale(1.2);
}

/* media start */
/* tablet */
@media screen and (min-width: 1080px) {
  .course span {
    font-size: 1rem;
  }
}
/* laptops */
@media screen and (min-width: 1920px) {
  .course span {
    font-size: 1.5rem;
  }
}
/* media end */
</style>
