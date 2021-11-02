<template>
  <div
    class="color-circle"
    :class="{ 'heart-beat': index == isSelectedColor }"
    ref="colorCircle"
    @click="handleClickColor"
  ></div>
</template>

<script>
export default {
  name: "ColorCircle",
  props: {
    color: {
      type: String,
      require: true,
    },

    index: {
      type: Number,
      require: true,
    },

    isSelectedColor: {
      type: Number | String,
    },
  },

  methods: {
    handleClickColor() {
      this.$emit("onSelectColor", this.index);
    },
  },

  mounted() {
    const colorCircle = this.$refs.colorCircle;
    colorCircle.style.backgroundColor = this.color;
  },
};
</script>

<style>
.color-circle {
  width: 20px;
  height: 20px;
  margin: 3px;
  border-radius: 50%;
  cursor: pointer;
  border: 4px solid var(--dark);
  transition: all 0.4s ease;
}
.color-circle:hover {
  border: 4px solid var(--secondary);
}
.color-circle.selected {
}

/* media start */
@media screen and (min-width: 1920px) {
  .color-circle {
    width: 30px;
    height: 30px;
    margin: 9px;
  }
}
/* media end */
</style>
