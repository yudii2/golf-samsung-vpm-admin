<template>
  <div id="control_dashboard_header__container">
    <div class="top_wrap">
      <CompanyLogo />
      <ControlDashBoardHeaderContents />
      <SwitchAdminPage />
    </div>
  </div>
</template>

<script>
import CompanyLogo from "@/components/shared/CompanyLogo.vue";
import ControlDashBoardHeaderContents
  from "@/views/control/dashboard/header/contents/ControlDashBoardHeaderContents.vue";
import SwitchAdminPage from "@/views/control/dashboard/header/contents/SwitchAdminPage";


export default {
  name: "ControlDashBoardHeader",
  components: {
    CompanyLogo,
    ControlDashBoardHeaderContents,
    SwitchAdminPage,
  },
};
</script>

<style scoped>
#control_dashboard_header__container {
  grid-row: 1/2;
  grid-template-columns: repeat(12, 1fr);
  background-color: #002b2d;
  position: relative;
}
#control_dashboard_header__container .top_wrap {
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #002123;
  align-self: center;
  justify-content: space-between;
}
</style>
