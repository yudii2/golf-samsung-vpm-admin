<template>
  <div class="change_web_mode__container ml" @click="goManagement">
    <div class="change_web_mode__wrapper round-md">
      <span>관리자페이지 <i class="page-arrow fas fa-arrow-right"></i></span>
    </div>

  </div>

</template>

<script>
export default {
  name: "SwitchAdminPage",
  methods: {
    goManagement() {
      this.$router.push({ name: "AdminManagement" });
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
  width: 120px;
  height: 35px;
  background-color: var(--primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  transition: all 0.3s ease;
}

.change_web_mode__wrapper > span {
  font-size: 0.8rem;
}
</style>
