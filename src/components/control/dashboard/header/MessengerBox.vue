<template>
  <div class="messenger_box">
    <!-- header -->
    <header class="header">
      <div class="header-title__wrapper">
        <!-- 타이틀 -->
        <h2>메신져</h2>

        <!-- 메신져 알림 체크 박스 -->
        <div
          class="message-listener__wrapper ml-1/2 pointer"
          @click="handleMessageListenerCheckBoxClick"
        >
          <span>알림</span>
          <div class="checkbox__wrapper ml-1/2">
            <i v-if="messageListener" class="checker fas fa-check"></i>
          </div>
        </div>
      </div>

      <!-- 아이콘들 -->
      <div class="icons">
        <!-- 메시지 송신 아이콘 -->
        <img
          class="icon_send pointer"
          :src="require('@/assets/images/control/dashboard/ico_write.png')"
          alt="icon send"
          @click="handleClickWrite"
        />
        <!-- 메시지 수신 아이콘 -->
        <img
          class="icon_list pointer"
          :src="require('@/assets/images/control/dashboard/ico_list.png')"
          alt="icon list"
          @click="setShowMessengerReceiverModal(true)"
        />
      </div>
    </header>

    <!-- messages wrapper -->
    <section class="messages__container">
      <ul class="messages__wrapper" v-if="hasMessages">
        <li
          class="message__wrapper pointer"
          @click="handleMessageClick(message)"
          v-for="(message, idx) in showingMessage"
          :key="idx"
        >
          <!-- message header -->
          <div class="message__header">
            <!-- left -->
            <div class="left">
              <!-- icon -->
              <img
                class="message-type"
                :src="require('@/assets/images/control/dashboard/ico_blue.png')"
                alt="receive"
              />

              <!-- target -->
              <span class="member">{{ messageName(message) }}</span>
            </div>

            <!-- right -->
            <span class="time">{{ messageCreatedAt(message) }}</span>
          </div>

          <!-- message wrapper -->
          <div class="message-text__wrapper">
            <span class="txt send">{{ message.message }}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  CHECK_NEW_MESSAGE,
  INDIVIDUAL,
  MESSAGE_CHECKED_TIME_KEY,
} from "@/utils/constants.js";
import useSession from "@/composables/useSession";
import useDate from "@/composables/useDate";

const { writeItemByKeyValue, readItemByKey } = useSession();
const { toDate } = useDate();

export default {
  name: "MessengerBox",

  data() {
    return {
      INDIVIDUAL,
      refreshTimer: null,
      messageChecker: null,
    };
  },

  computed: {
    /**
     * ### 실제 화면에 보여질 메시지 데이터.
     */
    showingMessage() {
      return this.receivedMessages;
    },

    firstReceivedMessageText() {
      const { message } = this.firstReceivedMessage;
      return message;
    },

    hasMessages() {
      return this.currentMessages?.length || 0;
    },

    isSendMessage() {
      return (type) => {
        return type == 1 ? true : false;
      };
    },

    messageCreatedAt() {
      return (message) => {
        return message.isrtDt.slice(10).trim();
      };
    },

    messageName() {
      return (message) => {
        switch (message.gubun) {
          // 송신
          case 1:
          case "1":
            if (message.sendTargetVOList.length) {
              // v1
              // const hasName = message.sendTargetVOList[0].toName;
              // if (hasName) return hasName;

              // v2
              const names = message.sendTargetVOList?.map((target) => {
                return target.toName;
              });
              if (names && names.length > 1) return `${names[0]}...`;
              else return names[0];
            }

            return message.groupName;

          // 수신
          case 2:
          case "2":
            const hasName = message.fromName;
            if (hasName) return message.fromName;
            return message.groupName;
        }
      };
    },

    ...mapGetters("control/", {
      currentMessages: "getCurrentMessages",
      currentIsMultiSelectMode: "getIsMultiSelectMode",
      isAutoRefreshMode: "getAutoRefreshMode",
      findCaddieByCaddieName: "findCaddieByCaddieName",
      messageListener: "getMessageListener",
      receivedMessages: "getReceivedMessages",
      firstReceivedMessage: "getFirstReceivedMessage",
    }),
  },

  methods: {
    handleMessageListenerCheckBoxClick() {
      this.setMessageListener(!this.messageListener);
    },

    handleMessageClick(message) {
      const { fromName } = message;
      const foundCaddie = this.findCaddieByCaddieName(fromName);
      this.selectCaddie(foundCaddie);
      this.setShowMessengerSendModal(true);
    },

    handleClickWrite() {
      if (!this.currentIsMultiSelectMode) {
        this.clearSelectedCaddie();
      }
      this.setShowMessengerSendModal(true);
    },
    ...mapActions({
      setShowMessengerSendModal: "updateIsShowingMessengerSendModal",
      setShowMessengerReceiverModal: "dispatchIsShowingMessengerReceiverModal",
      setIsShowingSimpleMessageModal: "updateIsShowingSimpleMessageModal",
      setSimpleMessageModalText: "updateSimpleMessageModalText",
      setSimpleMessageModalCallBack: "updateSimpleMessageModalCallBack",
    }),

    ...mapActions("control/", {
      selectCaddie: "addSelectedCaddie",
      clearSelectedCaddie: "clearSelectedCaddie",
      setMessageListener: "updateMessageListener",
    }),

    /**
     * ### 새로운 메시지 존재 여부 체크 로직.
     */
    checkHasNewMessage() {
      const refTime = Number(readItemByKey(MESSAGE_CHECKED_TIME_KEY));

      this.receivedMessages.filter(({ isrtDt }) => {
        const { ok, data } = toDate(isrtDt);
        if (ok) {
          if (refTime < data.getTime()) {
            // 콜백 메소드 추가.
            this.setSimpleMessageModalCallBack(this.simpleMessageModalCallback);
            // 심플 메시지 텍스트 설정
            this.setSimpleMessageModalText(this.firstReceivedMessageText);
            // 심플 메시지 모달 킴.
            this.setIsShowingSimpleMessageModal(true);
          }
        }
      });
    },

    /**
     * ### 심플 메시지 클릭 시 콜백 메소드.
     */
    simpleMessageModalCallback() {
      // 오버라이드 True
      writeItemByKeyValue(MESSAGE_CHECKED_TIME_KEY, new Date().getTime(), true);
    },

    /**
     * ### 메시지 체커 시작.
     */
    messageCheckerStart() {
      if (this.messageChecker) return;
      this.messageChecker = setInterval(this.checkHasNewMessage, 1000);
    },

    /**
     * ### 메시지 체커 종료.
     */
    messageCheckerStop() {
      clearInterval(this.messageChecker);
      this.messageChecker = null;

      this.setIsShowingSimpleMessageModal(false);
    },
  },

  mounted() {
    if (this.messageListener) {
      this.messageCheckerStart();
    }
  },

  destroyed() {
    this.messageCheckerStop();
  },

  watch: {
    messageListener(status) {
      if (status) {
        this.messageCheckerStart();
      } else {
        this.messageCheckerStop();
      }
    },
  },
};
</script>

<style>
.messenger_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid var(--primary);
}

/* header start */
.messenger_box header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--primary);
  border-radius: 8px 8px 0 0;
  padding: 5px 10px;
}

.header-title__wrapper {
  display: flex;
  align-items: center;
}

/* message listener start */
.message-listener__wrapper {
  display: flex;
  align-items: center;
}
.message-listener__wrapper .checkbox__wrapper {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.checkbox__wrapper .checker {
  color: tomato;
}
/* .message-listener__wrapper listener-checkbox.selected {
  background-color: gold;
} */
/* message listener end */

.messenger_box header h2 {
  text-transform: capitalize;
  letter-spacing: 1.25px;
  cursor: default;
  font-size: 0.9rem;
}

.messenger_box header .icons * {
  width: 20px;
  margin: 0 5px;
}

/* header end */

/* wrapper start */
.messenger_box .messages__container {
  background-color: var(--deep-green);
  overflow-y: scroll;
  height: 100%;
  border-radius: 10px;
}

.messenger_box .messages__container .messages__wrapper li {
  margin: 5px;
  padding: 5px 10px;
  font-size: 1.3rem;
  border-radius: 5px;
}

.messenger_box .messages__container .messages__wrapper li:hover {
  background-color: var(--soft-green);
}

.messenger_box .messages__container .messages__wrapper li .message__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.messenger_box
  .messages__container
  .messages__wrapper
  li
  .message__header
  .left {
  display: flex;
  align-items: center;
}

.messenger_box
  .messages__container
  .messages
  li
  .message__header
  .left
  .message-type {
  transition: all 0.3s ease;
}

.messenger_box
  .messages__container
  .messages
  li
  .message__header
  .left
  .message-type:hover {
  transform: scale(1.2);
}

.messenger_box
  .messages__container
  .messages__wrapper
  li
  .message__header
  .left
  .member {
  font-size: 0.8rem;
  letter-spacing: 1.25px;
  margin-left: 10px;
  transition: all 0.3s ease;
}

.messenger_box
  .messages__container
  .messages
  li
  .message__header
  .left
  .member:hover {
  transform: scale(1.05);
}

.messenger_box
  .messages__container
  .messages__wrapper
  li
  .message__header
  > .time {
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  transition: all 0.3s ease;
}

.messenger_box
  .messages__container
  .messages__wrapper
  li
  .message__header
  > .time:hover {
  transform: scale(1.05);
}

.messenger_box .messages__container .messages__wrapper li .message__header * {
  margin-right: 5px;
}

.messenger_box
  .messages__container
  .messages__wrapper
  li
  .message-text__wrapper
  span {
  padding: 0 10px;
  transition: all 0.3s ease;
  font-size: 0.7rem;
}

/* wrapper end */

/* media start */
@media screen and (min-width: 1620px) {
  /* header start */
  .messenger_box header {
    padding: 15px;
  }
  .messenger_box header h2 {
    font-size: 1.3rem;
  }
  .messenger_box header .icons * {
    width: 25px;
  }
  /* header end */

  .messenger_box .messages__container .messages__wrapper li {
    margin: 5px;
    padding: 10px 15px;
  }

  .messenger_box
    .messages__container
    .messages__wrapper
    li
    .message__header
    .left
    .member {
    font-size: 1.05rem;
  }

  .messenger_box
    .messages__container
    .messages__wrapper
    li
    .message__header
    > .time {
    font-size: 0.9rem;
  }

  .messenger_box
    .messages__container
    .messages__wrapper
    li
    .message-text__wrapper
    span {
    font-size: 0.9rem;
  }
}

/* media end */
</style>
