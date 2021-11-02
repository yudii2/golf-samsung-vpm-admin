<template>
  <div class="header__logo mx" @click="goHome">
    <img
      class="header__logo_image mr-3/4"
      :src="require('@/assets/images/control/dashboard/logo.png')"
      alt=""
    />
    <span>{{ currentCompany.name }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ControlDashBoardHeaderLogo",
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

<style>
/* logo start */
.header__logo {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
}
.header__logo > img {
  width: 65px;
  height: 36px;
}
.header__logo > span {
  color: #fff;
  font-size: 1.05rem;
  font-weight: 600;
}
/* logo end */
</style>
