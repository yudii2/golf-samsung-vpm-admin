<template>
  <article id="caddie_evaluation__container">
    <header>
      <CaddieEvaluationSearch/>
    </header>
    <section>
      <CaddieEvaluationTable/>
    </section>
    <footer>
      <Pages/>
    </footer>
  </article>
</template>

<script>
import CaddieEvaluationSearch from "@/views/admin/caddie/CaddieEvaluationSearch";
import CaddieEvaluationTable from "@/views/admin/caddie/CaddieEvaluationTable";
import Pages from "@/components/shared/Pages";
export default {
  name: "CaddieEvaluation",
  components: {Pages, CaddieEvaluationTable, CaddieEvaluationSearch}
}
</script>

<style scoped>
#caddie_evaluation__container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

footer {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
