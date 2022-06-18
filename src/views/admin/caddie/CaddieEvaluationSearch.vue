<template>
  <div>
    <label for="search__evaluation__input">기간조회</label>
    <input
      type="date"
      id="search__evaluation__input"
      autocomplete="off"
      class="input-dark ml"
      ref="input_from_date"
    />
    <span class="mx">-</span>
    <input
      type="date"
      id="search__to_evaluation__input"
      class="input-dark"
      autocomplete="off"
      required
    />
    <button class="button-dark ml" @click="onSearchClick">Search</button>
    <div class="loading" >
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CaddieEvaluationSearch",
  methods :{
    onSearchClick(){
      //TODO search
    }
  }
}
</script>

<style scoped>
search__evaluation__input
search__to_evaluation__input {
  width: 180px;
}

</style>
