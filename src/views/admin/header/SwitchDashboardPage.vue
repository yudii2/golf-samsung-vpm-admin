<template>
  <div class="change_web_mode__container ml" @click="goDashboard">
    <div class="change_web_mode__wrapper round-md">
      <span>대시보드 <i class="page-arrow fas fa-arrow-right"></i></span>
    </div>

  </div>

</template>

<script>
export default {
  name: "SwitchDashboardPage",
  methods: {
    goDashboard() {
      this.$router.push({ name: "ControlDashBoard" });
    },
  },
}
</script>

<style scoped>
.change_web_mode__container {
  position: relative;
  margin-right: 1rem;
}

.change_web_mode__wrapper {
  width: 100px;
  height: 35px;
  background-color: var(--primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  transition: all 0.3s ease;
}

.change_web_mode__wrapper > span {
  display: flex;
  font-size: 0.8rem;
}

</style>
