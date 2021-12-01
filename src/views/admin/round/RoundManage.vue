<template>
  <main id="round_manage__container">
    <RoundAll v-if="getSelectedContentViewSubtitle === 1" />
    <RoundGroup v-else-if="getSelectedContentViewSubtitle === 2" />
    <RoundRuleSetting v-else-if="getSelectedContentViewSubtitle === 3"
    />
    <CertificateIssue v-else-if="getSelectedContentViewSubtitle === 4" />
    <HoleOut v-else-if="getSelectedContentViewSubtitle === 5" />
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RoundAll from "@/views/admin/round/RoundAll.vue";
import RoundGroup from "@/views/admin/round/RoundGroup.vue";
import RoundRuleSetting from "@/views/admin/round/roundRuleSettings/RoundRuleSetting.vue";
import CertificateIssue from "@/views/admin/round/CertificateIssue.vue";
import HoleOut from "@/views/admin/round/HoleOut";

export default {
  name: "RoundManage",
  components: {
    HoleOut,
    RoundAll,
    RoundGroup,
    RoundRuleSetting,
    CertificateIssue,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("admin/", {
      updateContentView: "dispatchContentView",
    }),
  },
  computed: {
    ...mapGetters("admin/", ["getSelectedContentViewSubtitle"]),
  },
};
</script>

<style>
#round_manage__container {
  height: 100%;
}
</style>
