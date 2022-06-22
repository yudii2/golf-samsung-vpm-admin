<template>
  <div>
    <label for="search__evaluation__input">기간조회</label>
    <input
      type="date"
      id="search__evaluation__input"
      autocomplete="off"
      class="input-dark ml"
      ref="input_from_date"
      v-model="parsedVisitFromDt"
    />
    <span class="mx">-</span>
    <input
      type="date"
      id="search__to_evaluation__input"
      class="input-dark"
      autocomplete="off"
      v-model="parsedVisitToDt"
      required
    />
    <button class="button-dark ml" @click="onSearchClick">Search</button>
    <div class="loading" v-if="isLoading">
      <div></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CaddieEvaluationSearch",
  props: {
    visitFromDt: {
      type: String,
      required: false
    },
    visitToDt: {
      type: String,
      required: false
    },
    isLoading: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    onSearchClick() {
      const visitFromDt = this.visitFromDt.split('-').join("");
      const visitToDt = this.visitToDt.split('-').join("");
      this.$emit('onSearchClick', visitFromDt, visitToDt)
    }
  },
  computed: {
    parsedVisitFromDt: {
      get() {
        const year = this.visitFromDt.substring(0, 4);
        const day = this.visitFromDt.substring(6, 8);
        const month = this.visitFromDt.substring(4, 6);
        return `${year}-${month}-${day}`
      },
      set(newValue) {
        const changedVisitFromDt = newValue.replaceAll('-', '');
        this.$emit('changVisitFromDt', changedVisitFromDt)
      }

    },
    parsedVisitToDt: {
      get() {
        const year = this.visitToDt.substring(0, 4);
        const month = this.visitToDt.substring(4, 6);
        const day = this.visitToDt.substring(6, 8);

        return `${year}-${month}-${day}`
      },
      set(newValue) {
        const changedVisitToDt = newValue.replaceAll('-', '')
        this.$emit('changVisitToDt', changedVisitToDt)
      }
    },
  }
}
</script>

<style scoped>
#search__evaluation__input,
#search__to_evaluation__input {
  width: 180px;
}

</style>
