<template>
  <div class="change_web_mode__container ml" @click="goManagement">
    <div class="change_web_mode__wrapper round-md">
      <i class="page-arrow fas fa-arrow-up"></i>
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
  background-color: var(--primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  transition: all 0.3s ease;
  border-radius: 50%;
}

</style>
