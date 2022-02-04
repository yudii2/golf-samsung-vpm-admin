<template>
  <main id="monitor_manage__container">
    <ProgressTimeStandardSetting v-if="getSelectedContentViewSubtitle === 1" />
    <ProgressTimeLive v-else-if="getSelectedContentViewSubtitle === 2" />
    <ProgressTimeSee v-else-if="getSelectedContentViewSubtitle === 3" />
    <ProgressTimeStatistics v-else-if="getSelectedContentViewSubtitle === 4" />
    <ProgressTimeReports v-else-if="getSelectedContentViewSubtitle === 5" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import ProgressTimeStandardSetting from "@/views/admin/monitor/ProgressTimeStandardSetting.vue";
import ProgressTimeLive from "@/views/admin/monitor/ProgressTimeLive.vue";
import ProgressTimeStatistics from "@/views/admin/monitor/ProgressTimeStatistics.vue";
import ProgressTimeSee from "@/views/admin/monitor/ProgressTimeSee.vue";
import ProgressTimeReports from "@/views/admin/monitor/ProgressTimeReports";

export default {
  name: "MonitorManage",
  components: {
    ProgressTimeReports,
    ProgressTimeStandardSetting,
    ProgressTimeLive,
    ProgressTimeSee,
    ProgressTimeStatistics,
  },
  computed: {
    ...mapGetters("admin/", ["getSelectedContentViewSubtitle"]),
  },
};
</script>

<style>
#monitor_manage__container {
  height: 100%;
}
</style>
