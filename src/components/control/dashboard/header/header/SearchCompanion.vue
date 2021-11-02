<template>
  <div id="search_companion__container" class="round-md ml">
    <form class="px-1/2" @submit.prevent="handleSearchCompanionSubmit">
      <img
        class="mr-1/2"
        :src="require('@/assets/images/control/dashboard/ico_search.png')"
        alt="search"
      />
      <input
        type="text"
        placeholder="내장객 검색"
        v-model="companionSearchValue"
      />
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SearchCompanion",
  data() {
    return {
      companionSearchValue: "",
    };
  },
  methods: {
    handleSearchCompanionSubmit() {
      this.findCaddieWhichHasCompanion(this.companionSearchValue);

      this.companionSearchValue = "";
    },
    ...mapActions("control/", {
      findCaddieWhichHasCompanion: "findCaddieWhichHasCompanion",
    }),
  },
  computed: {
    ...mapGetters("control/", {
      currentCompanyCourses: "getCompanyCourses",
    }),
  },
};
</script>

<style scoped>
#search_companion__container {
  display: flex;
  align-items: center;
  background-color: var(--dark-green);
  border: 1px solid var(--primary);
}
#search_companion__container > form {
  display: flex;
  align-items: center;
}
#search_companion__container > form > img {
  width: 20px;
  height: 20px;
}
#search_companion__container > form > input {
  outline: none;
  color: var(--secondary);
  background-color: var(--dark-green);
  border: none;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1.25px;
  max-width: 90px;
}
</style>
