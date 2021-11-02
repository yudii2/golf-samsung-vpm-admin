<template>
  <section class="writer__container">
    <!-- target container -->
    <div class="target__container">
      <!-- target selector -->
      <div class="target__container" v-if="!selectedCaddies.length">
        <button class="button-dark mr-1/2" @click="handleAllClick">ALL</button>
      </div>

      <!-- target members -->
      <div class="member-name__container">
        <span class="member-name__suffix" v-if="hasCaddies">TO : </span>
        <span
          v-for="(caddie, idx) in messengerSelectedCaddies"
          :key="idx"
          class="member-name"
          >{{ caddie.caddieName }}</span
        >
      </div>
    </div>

    <!-- send form -->
    <form class="writer__sender" @submit.prevent="handleSubmit">
      <img
        :src="require('@/assets/images/control/dashboard/ico_plus.png')"
        alt="plus icon"
      />
      <input
        type="text"
        placeholder="메시지를 입력해 주세요.."
        v-model="sendText"
        ref="sendInput"
      />
      <img
        class="send_icon"
        @click="handleSubmit"
        :src="require('@/assets/images/control/dashboard/ico_send.png')"
        alt="send icon"
        :class="{ message_sending: isSending }"
      />
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ALL_COURSE, ALL_HOLES, GROUP, INDIVIDUAL } from "@/utils/constants.js";
import useMessage from "@/api/v1/monitor/useMessage";

export default {
  name: "MessageWriter",
  props: {},
  data() {
    return {
      ALL_COURSE,
      ALL_HOLES,
      GROUP,
      INDIVIDUAL,
      targetType: "",
      isSending: false,
      sendText: "",
      isSameType: false,
      isAllClicked: false,
    };
  },
  computed: {
    hasCaddies() {
      return this.messengerSelectedCaddies.length;
    },
    ...mapGetters("control/", {
      getSelectedCaddie: "getSelectedCaddie",
      getIsMultiSelectMode: "getIsMultiSelectMode",
      currentMessengerSelectedHoleInfo: "getMessengerSelectedHoleInfo",
      getCurrentSelectedMessageTag: "getCurrentSelectedMessageTag",
      selectedCaddies: "getSelectedCaddies",
      messengerSelectedCaddies: "getMessengerSelectedCaddies",
    }),
  },
  methods: {
    init() {
      this.sendInputFocus();
    },

    sendInputFocus() {
      this.$refs?.sendInput?.focus();
    },

    handleAllClick() {
      this.isAllClicked = !this.isAllClicked;

      if (this.isAllClicked) {
        this.updateMessengerSelectedCourseByAll();
        this.updateMessengerSelectedHolesByAll();
        this.updateMessengerSelectedCaddieByAll();
      } else {
        this.clearMessengerSelectedHolesInfo();
        this.clearMessengerSelectedCaddiesInfo();
      }
    },

    updateTargetType(type) {
      this.isSameType = this.targetType === type;
      if (this.isSameType) {
        this.targetType = null;
      } else {
        this.targetType = type;
      }
    },

    async handleSubmit() {
      const hasMessage = this.sendText.length > 0;
      if (!hasMessage) return;

      const caddies = this.messengerSelectedCaddies;
      const hasTargets = caddies.length > 0;
      if (!hasTargets) return;

      this.setStatusSending(true);

      await this.textMessageSend(caddies);

      this.clearMessage();
      this.setStatusSending(false);
    },

    setStatusSending(status) {
      this.isSending = status;
      this.$refs.sendInput.disabled = status;
    },

    clearMessage() {
      this.sendText = "";
      this.updateSelectedMessageTag("");
    },

    async textMessageSend(caddies) {
      try {
        const { getMessages, sendMessage } = useMessage();
        const caddieReqList = caddies?.map((c) => {
          return { caddieUniqNo: c.caddieUniqNo };
        });
        const message = this.sendText;

        let groupName = this.getIsMultiSelectMode
          ? this.GROUP
          : this.targetType;

        if (!groupName) {
          groupName = caddies.length > 1 ? this.GROUP : this.INDIVIDUAL;
        }

        await sendMessage(caddieReqList, message, groupName);

        const newMessages = await getMessages();
        this.updateMessages(newMessages);
      } catch (e) {
        console.error(e.message);
      }
    },

    updateTargetByTargetType(newType, oldType) {
      let nt = newType;
      if (!nt) nt = oldType;
      const isAll = nt === ALL_COURSE;
      const isAllHoles = nt === ALL_HOLES;
      const isGroup = nt === GROUP;

      if (isAll) {
        this.updateTargetByAll();
      } else if (isAllHoles) {
        this.updateTargetByAllHole();
      } else if (isGroup) {
        this.updateTargetByGroup();
      }
    },

    updateTargetByAll() {
      if (this.isSameType) {
        this.clearMessengerSelectedHolesInfo();
        this.clearMessengerSelectedCaddiesInfo();
      } else {
        this.updateMessengerSelectedCourseByAll();
        this.updateMessengerSelectedHolesByAll();
        this.updateMessengerSelectedCaddieByAll();
      }
    },

    updateTargetByAllHole() {
      if (this.isSameType) {
        this.clearMessengerSelectedHolesInfo();
        this.clearMessengerSelectedCaddiesInfo();
      } else {
        this.updateMessengerSelectedHolesByAll();
        this.updateMessengerSelectedCaddiesByHole();
      }
    },

    updateTargetByGroup() {
      if (this.isSameType) {
        this.clearMessengerSelectedHolesInfo();
        this.clearMessengerSelectedCaddiesInfo();
      } else {
        this.updateMessengerSelectedCourseByAll();
        this.updateMessengerSelectedCaddiesByGroup();
      }
    },

    ...mapActions("control/", {
      updateMessages: "updateMessages",
      // course
      updateMessengerSelectedCourseByAll: "updateMessengerSelectedCourseByAll",
      // hole
      updateMessengerSelectedHolesByAll: "updateMessengerSelectedHolesByAll",
      clearMessengerSelectedHolesInfo: "clearMessengerSelectedHolesInfo",
      // caddie
      updateMessengerSelectedCaddieByAll: "updateMessengerSelectedCaddieByAll",
      updateMessengerSelectedCaddiesByHole:
        "updateMessengerSelectedCaddiesByHole",
      clearMessengerSelectedCaddiesInfo: "clearMessengerSelectedCaddiesInfo",
      // tag
      updateSelectedMessageTag: "updateSelectedMessageTag",
    }),
  },

  mounted() {
    this.init();
  },

  watch: {
    targetType(newType, oldType) {
      this.updateTargetByTargetType(newType, oldType);
    },
    getCurrentSelectedMessageTag(messageTag) {
      this.sendText = messageTag.replace("# ", "");
    },
  },
};
</script>

<style scoped>
.writer__container {
  max-height: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px 5px;
  border-top: 1px solid var(--primary);
}

.target__container {
  display: flex;
  align-items: center;
}

/* target selector start */
.target_selector {
  display: flex;
  align-items: center;
}
.target_selector .target_label {
  cursor: default;
  margin-right: 5px;
  letter-spacing: 1.5px;
  font-size: 0.8rem;
}
.target_selector .buttons {
  flex: 1;
  display: flex;
  align-items: center;
}
.target_selector .buttons button {
  padding: 5px 10px;
  margin: 0px 5px;
  background-color: var(--dark);
  border-radius: 30px;
  border: 1px solid var(--primary);
  transition: all 0.3s ease;
  color: var(--secondary);
  font-size: 0.8rem;
  font-weight: 600;
}
.target_selector .buttons button:hover {
  border: 1px solid var(--secondary);
}

.target_selector .buttons button.target_selected {
  background-color: var(--soft-green);
}
/* target selector end */

/* target members start */
.target__container {
}

.member-name__container {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all 0.3s;
}
.member-name {
  color: var(--purple);
  font-size: 0.9rem;
  margin-right: 3px;
}
.member-name__suffix {
  margin-left: 2px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  white-space: nowrap;
}
/* target members end */

/* send form start */
.writer__sender {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 5px;
  border: 2px solid var(--primary);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 15px;
  background-color: var(--dark);
}
.writer__sender img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.writer__sender input {
  flex: 1;
  border: none;
  padding: 10px 20px;
  font-size: 0.8rem;
  background-color: transparent;
  letter-spacing: 2px;
  color: var(--secondary);
}
.writer__sender .send_icon {
  cursor: pointer;
  transition: all 0.3s ease;
}
.writer__sender .send_icon:hover {
  transform: scale(1.2);
}
/* send form end */

/* media start */
@media screen and (min-width: 1920px) {
  /* target selector start */
  .target_selector .target_label {
    font-size: 1.2rem;
    margin-right: 10px;
  }
  .target_selector .buttons button {
    font-size: 1rem;
    padding: 10px 15px;
  }
  /* target selector end */

  /* target members start */
  .member-name {
    font-size: 1.1rem;
  }
  .member-name__suffix {
    font-size: 1.2rem;
  }
  /* target members end */

  /* send form start */
  .writer__sender {
    margin-bottom: 8px;
    border-radius: 15px;
  }
  .writer__sender img {
    width: 44px;
    height: 44px;
  }
  .writer__sender input {
    font-size: 1.2rem;
  }
  /* send form end */
}
/* media end */
</style>
