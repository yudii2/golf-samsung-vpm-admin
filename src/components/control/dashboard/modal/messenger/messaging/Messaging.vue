<template>
  <section class="messaging" :class="{ alone: alone }">
    <header>
      <h2>메시지</h2>
      <img
        class="ml-1/2"
        :src="require('@/assets/images/control/dashboard/ico_write.png')"
        alt="icon"
      />
    </header>

    <article class="chat__container">
      <!-- message list container -->
      <MessageChatBox :viewingMessages="viewingMessages" />

      <!-- message editor container -->
      <MessageWriter />
    </article>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import MessageChatBox from "./MessageChatBox.vue";
import MessageWriter from "./MessageWriter.vue";
import useCopy from "@/composables/useCopy.js";

export default {
  name: "Message",
  components: {
    MessageChatBox,
    MessageWriter,
  },
  props: {
    alone: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      viewingMessages: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.copyMessages();
    },
    copyMessages() {
      const { objectCopier } = useCopy();
      this.viewingMessages = objectCopier(this.getCurrentMessages);
      this.viewingMessages.reverse();
    },
    ...mapMutations("control/", ["updateMessengerSelectedCaddiesByGroup"]),
  },
  computed: {
    ...mapGetters("control/", [
      "getCurrentMessages",
      "getCurrentSelectedMessageTag",
    ]),
  },
  watch: {
    getCurrentMessages() {
      this.copyMessages();
    },
  },
};
</script>

<style scoped>
.messaging {
  background-color: var(--dark);
  border: 1px solid var(--primary);
  grid-column: 1/7;
  grid-row: 1/8;
}

.messaging.alone {
  grid-column: 1/11;
}

/* header start */
.messaging header {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: var(--soft-green);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 0 20px;
  color: var(--secondary);
}

.messaging header h2 {
  font-size: 1.1rem;
}

/* header end */

/* body start */
.messaging .chat__container {
  height: calc(100% - 40px);
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* body end */

/* media start */
@media screen and (min-width: 1920px) {
  .messaging header {
    height: 60px;
  }

  .messaging header h2 {
    font-size: 1.5rem;
  }

  .messaging .chat__container {
    height: calc(100% - 60px);
  }
}

/* media end */
</style>
