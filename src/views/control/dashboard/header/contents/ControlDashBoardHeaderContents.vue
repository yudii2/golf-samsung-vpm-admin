<template>
  <section id="header__contents">
    <ContentViewType />
    <MultiSelect />
    <SearchCompanion />
    <SearchCaddie class="ml" />
    <GroupSelect class="ml" />
    <CaddieViewType class="ml" />
    <RefreshIcon class="ml" />
  </section>
</template>

<script>
import ContentViewType from "@/components/control/dashboard/header/header/ContentViewType.vue";
import MultiSelect from "@/components/control/dashboard/header/header/MultiSelect.vue";
import SearchCompanion from "@/components/control/dashboard/header/header/SearchCompanion.vue";
import GroupSelect from "@/components/control/dashboard/header/header/GroupSelect.vue";
import SearchCaddie from "@/components/control/dashboard/header/header/SearchCaddie.vue";
import CaddieViewType from "@/components/control/dashboard/header/CaddieViewType.vue";
import RefreshIcon from "@/components/control/dashboard/header/header/RefreshIcon.vue";

export default {
  name: "ControlDashBoardHeaderContent",
  components: {
    ContentViewType,
    MultiSelect,
    SearchCompanion,
    GroupSelect,
    SearchCaddie,
    CaddieViewType,
    RefreshIcon,
  },
};
</script>

<style>
/* content start */
#header__contents {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
#header__contents > div {
  height: 35px;
}

#header__contents > .refresh_icon__container {
  position: relative;
  /* left: -15px; */
  width: 35px;
  height: 35px;
}
</style>
