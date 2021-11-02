<template>
  <section class="message_tag">
    <div class="chips" v-if="getCurrentMessengerTags.length">
      <Chip
        v-for="(tag, idx) in getCurrentMessengerTags"
        :key="idx"
        :content="`# ${tag.message}`"
        @onClick="handleClickedTag"
      />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useMessage from "@/api/v1/monitor/useMessage.js";
import Chip from "@/components/shared/Chip.vue";

export default {
  name: "MessageTag",
  components: { Chip },
  mounted() {
    this.init();
  },
  methods: {
    handleClickedTag(content) {
      this.updateSelectedMessageTag(content);
    },
    init() {
      this.getMessageTags();
    },
    async getMessageTags() {
      const { getMessageTags } = useMessage();
      this.updateMessengerTags(await getMessageTags());
    },
    ...mapActions("control/", {
      updateSelectedMessageTag: "updateSelectedMessageTag",
      updateMessengerTags: "updateMessengerTags",
    }),
  },
  computed: {
    ...mapGetters("control/", ["getCurrentMessengerTags"]),
  },
};
</script>

<style scoped>
.message_tag {
  background-color: var(--dark);
  grid-column: 1/4;
  border: 1px solid var(--primary);
  padding: 5px 5px;
  grid-column: 1/ 11;
  grid-row: 8/11;
  overflow-y: scroll;
}

/* chip start */
.chips span {
  font-size: 0.8rem;
  margin: 6px;
}
/* chip end */

/* media start */
@media screen and (min-width: 1920px) {
  /* chip start */
  .chips span {
    font-size: 1.1rem;
    margin: 8px;
  }
  /* chip end */
}
/* media end */
</style>
