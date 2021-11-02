<template>
  <div class="fab__container" @click.stop="$emit('onClick')">
    <i v-if="icon === 'back'" class="r-180 fas fa-sign-out-alt fa-2x"></i>
    <i v-else-if="icon === 'orders'" class="fas fa-list-ul fa-2x"></i>
    <i v-else-if="icon === 'search'" class="fas fa-search fa-2x"></i>
    <i v-else class="fas fa-plus fa-2x"></i>
  </div>
</template>

<script>
export default {
  name: "CircleFav",
  props: {
    icon: {
      type: String,
    },
  },
};
</script>

<style scoped>
.fab__container {
  position: fixed;
  z-index: 1;
  width: 80px;
  height: 80px;
  background-color: var(--primary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
}
.fab__container.is\-opened {
  transform: rotate(45deg);
  background-color: tomato;
}
</style>
