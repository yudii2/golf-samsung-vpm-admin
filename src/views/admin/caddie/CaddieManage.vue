<template>
  <main id="caddie_manage__container">
    <CaddieInformation v-if="selectedContentViewSubtitle===1"/>
    <CaddieEvaluation v-if="selectedContentViewSubtitle ===2"/>
  </main>
</template>

<script>
import CaddieInformation from "@/views/admin/caddie/CaddieInformation";
import {mapGetters} from "vuex";
import CaddieEvaluation from "@/views/admin/caddie/CaddieEvaluation";
export default {
  name: "CaddieManage",
  components: {CaddieEvaluation, CaddieInformation},
  computed :{
    ...mapGetters('admin/', {
      selectedContentViewSubtitle: "getSelectedContentViewSubtitle",
    })
  }
}
</script>

<style scoped>
#caddie_manage__container {
  height: 100%;
}
</style>
