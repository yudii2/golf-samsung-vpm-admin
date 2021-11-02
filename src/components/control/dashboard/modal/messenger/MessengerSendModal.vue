<template>
  <div class="backdrop" @click.self="handleClose">
    <main id="messenger_modal">
      <!-- close button -->
      <CloseButton @onClose="handleClose" />

      <!-- message send component -->
      <Messaging :alone="!showSearchComponents" />

      <!-- search hole component -->
      <MessageSearchHole v-if="showSearchComponents" />

      <!-- search caddie component -->
      <MessageSearchCaddie v-if="showSearchComponents" />

      <!-- message tags component -->
      <MessageTag />
    </main>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Messaging from "@/components/control/dashboard/modal/messenger/messaging/Messaging.vue";
import MessageSearchHole from "@/components/control/dashboard/modal/messenger/MessageSearchHole.vue";
import MessageSearchCaddie from "@/components/control/dashboard/modal/messenger/MessageSearchCaddie.vue";
import MessageTag from "@/components/control/dashboard/modal/messenger/MessageTag.vue";
import CloseButton from "@/components/shared/CloseButton.vue";

export default {
  name: "MessengerSendModal",
  components: {
    Messaging,
    MessageSearchHole,
    MessageSearchCaddie,
    MessageTag,
    CloseButton,
  },
  mounted() {
    this.updateMessengerSelectedCaddiesByCaddies(this.getSelectedCaddies);
  },
  methods: {
    handleClose() {
      this.updateShowMessengerSendModal(false);
    },
    ...mapActions({
      updateShowMessengerSendModal: "updateIsShowingMessengerSendModal",
    }),
    ...mapActions("control/", {
      updateMessengerSelectedCaddiesByCaddies:
        "updateMessengerSelectedCaddiesByCaddies",
      clearMessengerSelectedHolesInfo: "clearMessengerSelectedHolesInfo",
      clearMessengerSelectedCaddiesInfo: "clearMessengerSelectedCaddiesInfo",
      updateMessengerTags: "updateMessengerTags",
      clearSelectedCaddies: "clearSelectedCaddies",
    }),
    ...mapMutations("control/", {
      clearSelectedMessageTag: "clearSelectedMessageTag",
    }),
  },
  computed: {
    showSearchComponents() {
      return !this.getSelectedCaddies.length;
    },
    ...mapGetters("control/", [
      "getSelectedCaddie",
      "getIsMultiSelectMode",
      "getSelectedCaddies",
      "getIsMultiSelectMode",
      "getSelectedCaddies",
    ]),
  },
  destroyed() {
    this.updateMessengerTags();
    this.clearMessengerSelectedCaddiesInfo();
    this.clearMessengerSelectedHolesInfo();
    this.clearSelectedCaddies();
  },
};
</script>

<style scoped>
#messenger_modal {
  max-width: 85%;
  width: 100%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  background-color: var(--deep-green);
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 10px;
}

#messenger_modal > section {
  border-radius: 20px;
}

/* media start */
@media screen and (min-width: 1920px) {
  #messenger_modal {
    max-width: 65%;
  }
}

/* media end */
</style>
