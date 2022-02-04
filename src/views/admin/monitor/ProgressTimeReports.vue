<template>
  <article>
    <ProgressTimeReportsSearch />
    <ProgressTimeReportsTable />
  </article>
</template>

<script>
import ProgressTimeReportsSearch from "@/components/admin/monitor/reports/ProgressTimeReportsSearch";
import ProgressTimeReportsTable from "@/components/admin/monitor/reports/ProgressTimeReportsTable";
export default {
  name: "ProgressTimeReports",
  components: { ProgressTimeReportsTable, ProgressTimeReportsSearch },
};
</script>

<style scoped></style>
