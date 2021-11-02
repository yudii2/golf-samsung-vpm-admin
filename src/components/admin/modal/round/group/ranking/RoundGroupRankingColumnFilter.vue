<template>
  <ul class="columns_filter" v-if="scoreKeys.length">
    <li class="mr-1/2" v-for="(key, i) in scoreKeys" :key="i">
      <button
        class="button-dark"
        :class="{ 'button-dark-clicked': key.selected }"
        @click="handleClickItem($event, key.index)"
        ref="itemButton"
      >
        {{ key.index + 1 }} 번째 항목
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RoundGroupRankingColumnFilter",
  props: {
    scoreKeys: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClickItem(event, index) {
      this.$emit("handleClickScoreItem", {
        index,
        buttonElement: event.target,
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
.columns_filter {
  display: flex;
}
.columns_filter button {
  font-size: 0.9rem;
  text-transform: capitalize;
}
</style>
