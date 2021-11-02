<template>
  <li class="drop-down-option__container">
    {{ text }}
  </li>
</template>

<script>
export default {
  name: "DropDownOption",
  props: {
    text: {
      type: String,
      require: true,
    },
  },
};
</script>

<style scoped>
.drop-down-option__container {
}
.drop-down-option__container:hover {
  background-color: var(--primary);
}
</style>
