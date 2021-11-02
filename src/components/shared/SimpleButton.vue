<template>
  <button @click="handleButtonClick">{{ buttonText }}</button>
</template>

<script>
export default {
  name: "SimpleButton",

  props: {
    buttonText: {
      type: String,
    },
  },

  methods: {
    handleButtonClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style scoped>
button {
  width: 100%;
  padding: 15px;
  background-color: dodgerblue;
  border-radius: 8px;
  color: var(--secondary);
  font-size: 1.2rem;
  font-weight: 700;
  transition: all 0.3s ease;
}
button:hover {
  color: var(--secondary);
  background-color: var(--primary);
}
</style>
