<template>
  <main id="vehicle_manage__container">
    <VehicleCreateAndList v-if="selectedContentViewSubtitle === 1" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import VehicleCreateAndList from "./VehicleCreateAndList.vue";

export default {
  name: "VehicleManage",
  components: {
    VehicleCreateAndList,
  },
  computed: {
    ...mapGetters("admin/", {
      selectedContentViewSubtitle: "getSelectedContentViewSubtitle",
    }),
  },
};
</script>

<style scoped>
#vehicle_manage__container {
  height: 100%;
}
</style>
