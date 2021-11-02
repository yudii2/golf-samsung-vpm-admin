<template>
  <div class="company_logo__container ml" @click="goHome">
    <div>
      <img
        class="mr-3/4"
        :src="require('@/assets/images/control/dashboard/logo.png')"
        alt=""
      />
      <h4 class="company_name">{{ currentCompany.name }}</h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CompanyLogo",
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    ...mapGetters("control/", { currentCompany: "getCompany" }),
  },
};
</script>

<style scoped>
.company_logo__container {
  cursor: pointer;
}
.company_logo__container > div {
  display: flex;
  align-items: center;
}
.company_name {
  display: none;
}

/* media start */
@media screen and (min-width: 1500px) {
  .company_name {
    display: inline-block;
    font-size: 1.2rem;
  }
}
/* media end */
</style>
