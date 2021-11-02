<template>
  <img
    class="close_icon"
    :src="require('@/assets/images/control/dashboard/ico_close.png')"
    alt="x"
    @click="handleClickClose"
  />
</template>

<script>
export default {
  name: "CloseButton",
  methods: {
    handleClickClose() {
      this.$emit("onClose", true);
    },
  },
};
</script>

<style scoped>
.close_icon {
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 1;
}
</style>
