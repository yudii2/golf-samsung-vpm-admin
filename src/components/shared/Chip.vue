<template>
  <span class="chip no-drag" @click="handleChipClick">{{ content }}</span>
</template>

<script>
export default {
  name: "Chip",
  props: {
    content: {
      type: String,
      require: true,
    },
  },
  methods: {
    handleChipClick() {
      this.$emit("onClick", this.content);
    },
  },
};
</script>

<style scoped>
.chip {
  display: inline-block;
  padding: 10px 15px;
  margin: 10px;
  background-color: var(--dark);
  border-radius: 20px;
  border: 1px solid var(--primary);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--secondary);
  cursor: pointer;
}
.chip:hover {
  border: 1px solid var(--secondary);
}
</style>
