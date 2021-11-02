<template>
  <ul
    class="drop-down-options__container round-sm"
    v-if="items && items.length"
  >
    <li
      v-for="(item, idx) in items"
      :key="idx"
      class="p-1/2"
      @click="handleClickItem(item)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "DropDownOptions",
  props: {
    items: {
      type: Array,
    },
  },
  methods: {
    handleClickItem(item) {
      this.$emit("onOptionClick", item);
    },
  },
};
</script>

<style scoped>
/* options start */
.drop-down-options__container {
  width: 120px;
  position: absolute;
  top: 45px;
  left: 0;
  background-color: var(--dark);
  border: 1px solid var(--primary);
  z-index: 1;
}
.drop-down-options__container > li {
  transition: all 0.3s ease;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}
.drop-down-options__container > li:hover {
  background-color: var(--primary);
}
.drop-down-options__container > li:first-child:hover {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.drop-down-options__container > li:last-child:hover {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
/* options end */
</style>
