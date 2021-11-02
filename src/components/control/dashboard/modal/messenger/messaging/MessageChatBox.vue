<template>
  <section class="messages__container" ref="messages">
    <div
      v-for="(message, idx) in viewingMessages"
      :key="idx"
      class="message__container"
      :class="{ send_message: message.gubun == 1 }"
    >
      <!-- message header (receive) -->
      <div class="target__container" v-if="message.gubun == 2">
        <span class="target_name">{{ message.fromName }} </span>
        <span>이(가) 본부에게</span>
      </div>
      <!-- message header (send) -->
      <div class="target__container" v-if="message.gubun == 1">
        <!-- 개별인 경우 첫 번째 캐디 특정하여 표시 -->
        <span class="target_name" v-if="message.groupName === '개별'"
          >{{ message.sendTargetVOList[0].toName }}
        </span>
        <!-- 아닌 경우 단체명으로 표시 -->
        <span class="target_name" v-else>{{ message.groupName }} </span>
        <span>에게</span>
      </div>

      <!-- message payload -->
      <div
        class="payload__container"
        :class="{ send: message.gubun == 1, receive: message.gubun == 2 }"
      >
        <span class="payload">{{ message.message }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MessageChatBox",
  data() {
    return {
      autoScrollDownMode: true,
      firstTime: true,
    };
  },
  props: {
    viewingMessages: {
      type: Array,
      require: true,
    },
  },
  updated() {
    this.scrollDown();
  },
  methods: {
    scrollDown() {
      if (this.autoScrollDownMode) {
        const messages = this.$refs.messages;
        messages.scrollTop = messages.scrollHeight;
      }

      if (this.firstTime) {
        this.firstTime = false;
      }
      this.autoScrollDownMode = false;
    },
  },
  watch: {
    viewingMessages(newMessages, oldMessages) {
      const isSameSize = newMessages.length === oldMessages.length;
      if (!isSameSize) {
        this.autoScrollDownMode = true;
      }
    },
  },
};
</script>

<style scoped>
.messages__container {
  max-height: 70%;
  height: 100%;
  overflow-y: scroll;
}
.message__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 15px 0px;
  padding: 0px 10px;
}

.message__container.send_message {
  align-items: flex-end;
}

/* target start */
.target_name {
  color: var(--purple);
  font-size: 0.9rem;
}
.target__container span:last-child {
  font-size: 0.8rem;
}
/* target end */

/* payload start */
.payload__container {
  margin-top: 6px;
  border: 1px solid var(--soft-green);
  border-radius: 6px;
  padding: 4px 10px;
}
.payload__container.send {
  background-color: var(--soft-green);
}
.payload {
  font-size: 0.9rem;
  letter-spacing: 1.5px;
  line-height: 25px;
}
/* payload end */

/* media start */
@media screen and (min-width: 1920px) {
  /* target start */
  .target_name {
    font-size: 1.1rem;
  }
  .target__container span:last-child {
    font-size: 1rem;
  }
  /* target end */

  /* payload start */
  .payload__container {
    margin-top: 12px;
    padding: 8px 20px;
  }
  .payload {
    font-size: 1.2rem;
  }
  /* payload end */
}
/* media end */
</style>
