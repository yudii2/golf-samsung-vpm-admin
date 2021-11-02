<template>
  <div class="search-caddie__container ml">
    <form
      class="caddie-search-form round-md px-1/2"
      @submit.prevent="handleSubmitSearchCompanion"
    >
      <img
        class="mr-1/2"
        :src="require('@/assets/images/control/dashboard/ico_search.png')"
        alt="search"
      />

      <input
        type="text"
        placeholder="캐디명 검색"
        v-model="caddieSearchValue"
      />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SearchCaddie",
  data() {
    return {
      caddieSearchValue: "",
    };
  },
  methods: {
    handleSubmitSearchCompanion() {
      this.addLookUpCaddie(this.caddieSearchValue);
      this.caddieSearchValue = "";
    },
    updateSearchType(type) {
      this.updateCaddieViewType(type);
    },
    ...mapActions("control/", {
      updateCaddieViewType: "updateCaddieViewType",
    }),
    ...mapActions("control/", {
      addLookUpCaddie: "addLookUpCaddies",
    }),
  },
  computed: {
    ...mapGetters("control/", {
      viewType: "currentCaddieViewType",
    }),
  },
};
</script>

<style scoped>
.search-caddie__container {
}
/* form start */
.caddie-search-form {
  width: 150px;
  height: 35px;
  display: flex;
  align-items: center;
  border: 1px solid var(--primary);
}
.caddie-search-form img {
  width: 20px;
  height: 20px;
}
.caddie-search-form input {
  width: 80%;
  /* height: 100%; */
  background-color: var(--dark-green);
  color: var(--secondary);
  border: none;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1.25px;
}
/* form end */
</style>
