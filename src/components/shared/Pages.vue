<template>
  <div class="pages" v-if="pages !== -1">
    <button class="page" v-if="hasPrevious" @click="handlePreviousClick">
      <i class="page-arrow fas fa-arrow-left"></i>
    </button>

    <span
      class="page"
      :class="{ 'page-selected': currentPage === page }"
      v-for="page in pages"
      :key="page"
      @click="handlePagination(page)"
      ref="page"
    >
      {{ page }}
    </span>

    <button class="page" v-if="hasNext" @click="handleNextClick">
      <i class="page-arrow fas fa-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "Pages",
  props: {
    currentPage: {
      type: Number,
      require: true,
    },
    pages: {
      type: Array,
      require: true,
    },
    hasNext: {
      type: Boolean,
    },
    hasPrevious: {
      type: Boolean,
    },
  },
  methods: {
    handlePagination(page) {
      this.$emit("handleClickPage", page);
    },
    handlePreviousClick() {
      this.$emit("onPrevious");
    },
    handleNextClick() {
      this.$emit("onNext");
    },
  },
};
</script>

<style scoped></style>
