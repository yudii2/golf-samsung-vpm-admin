<template>
  <div class="course_name">
    <span>{{ course.courseNm }}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CourseInfo",
  props: ["course", "companyCode"],
  methods: {},
  computed: {
    ...mapState("control/", {
      company: (state) => state.company,
    }),
  },
};
</script>

<style scoped>
.course_name {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: var(--dark-green);
  font-weight: 800;
  font-size: 26px;
  font-family: "NanumSquare", sans-serif;
}
</style>
