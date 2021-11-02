<template>
  <div id="course_info__header">
    <div class="ico_flag"></div>
    <div v-for="number in holeCount" :key="number">
      <span>H{{ number }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ControlDashBoardBodyHeader",
  props: ["holeCount"],
};
</script>

<style scoped>
#course_info__header {
  display: grid;
  grid-template-columns: 0.8fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
}
.ico_flag {
  width: 40px;
  height: 40px;
  background: url("../../../../../assets/images/control/dashboard/ico_flag.png")
    no-repeat 50% 100%;
}
span {
  cursor: default;
}
</style>
