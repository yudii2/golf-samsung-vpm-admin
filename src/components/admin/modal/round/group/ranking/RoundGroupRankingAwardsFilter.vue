<template>
  <ul class="awards_filter" v-if="awardKeys.length">
    <li class="mr-1/2" v-for="(key, i) in awardKeys" :key="i">
      <button
        class="button-dark"
        :class="{ 'button-dark-clicked': key.selected }"
        @click="handleClickItem($event, key.index)"
        ref="awardButton"
      >
        {{ key.index + 1 }} 번째 항목
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RoundGroupRankingAwardsFilter",
  props: {
    awardKeys: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleClickItem(event, index) {
      this.$emit("handleClickAwardItem", {
        index,
        buttonElement: event.target,
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
.awards_filter {
  display: flex;
  align-items: center;
}

.awards_filter button {
  font-size: 0.9rem;
  text-transform: capitalize;
}
</style>
