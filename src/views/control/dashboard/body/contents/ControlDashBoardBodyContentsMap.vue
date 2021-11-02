<template>
  <main id="control-dashboard-body-contents-map__container">
    <CourseMap />
  </main>
</template>

<script>
import CourseMap from "@/components/control/dashboard/body/map/CourseMap.vue";

export default {
  name: "ControlDashBoardBodyContentsMap",

  components: {
    CourseMap,
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
#control-dashboard-body-contents-map__container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
