<template>
  <div class="backdrop" @click.self="handleClose">
    <section id="messenger_receiver_modal">
      <!-- close button -->
      <CloseButton @onClose="handleClose" />

      <!-- header -->
      <header>
        <!-- view type -->
        <section>
          <button
            :class="{ clicked: viewType === 'receive' }"
            @click="handleClickViewType('receive')"
          >
            받은 메시지
          </button>

          <button
            class="ml"
            :class="{ clicked: viewType === 'send' }"
            @click="handleClickViewType('send')"
          >
            보낸 메시지
          </button>
        </section>

        <!-- search by date -->
        <section>
          <form @submit.prevent="handleSubmit">
            <input
              type="text"
              :placeholder="fromDatePlaceHolder"
              v-model="fromDate"
              ref="fromDateRef"
            />
            <span class="ml-1/2 mr-1/2">-</span>
            <input
              type="text"
              :placeholder="toDatePlaceHolder"
              v-model="toDate"
              ref="toDateRef"
            />
            <img
              @click="handleSubmit"
              class="search_image ml-1/2"
              :src="
                require('@/assets/images/control/dashboard/ico_search2.png')
              "
              alt="search"
            />
            <input type="submit" hidden />
          </form>
        </section>
      </header>

      <!-- body -->
      <section class="messages__container">
        <table v-if="currentMessages.length && !isLoading">
          <colgroup>
            <col width="5%" />
            <col width="20%" />
            <col width="50%" />
            <col width="25%" />
          </colgroup>
          <!-- header -->
          <thead>
            <tr>
              <th>No</th>
              <th>전송시간</th>
              <th>메시지</th>
              <th>대상</th>
            </tr>
          </thead>

          <!-- body -->
          <tbody>
            <tr
              v-for="(message, messageIndex) in currentMessages"
              :key="messageIndex"
            >
              <td>{{ messageIndex + 1 }}</td>
              <td>{{ message.isrtDt }}</td>
              <td>{{ message.message }}</td>

              <!-- 대상 -->
              <td>
                <!-- 멤버 이름 (송신) -->
                <div v-if="message.gubun == 1">
                  <!-- 타이틀 -->
                  <span
                    class="pointer"
                    @click="handleClickedMessageTargetGroupName"
                  >
                    {{ message.groupName }}
                  </span>
                  <!-- 멤버 이름 값 -->
                  <div class="targets hide" ref="targetsRef">
                    <span
                      v-for="(target, jdx) in message.sendTargetVOList"
                      :key="jdx"
                    >
                      {{ target.toName }}
                    </span>
                  </div>
                </div>

                <!-- 멤버 이름 (수신) -->
                <div v-else>
                  <span>
                    {{ message.fromName }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else-if="isLoading" class="messages_empty">
          <h1>Loading...</h1>
        </div>
        <div v-else class="messages_empty">
          <h1>No Messages...</h1>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useDate from "@/composables/useDate.js";
import useMessage from "@/api/v1/monitor/useMessage.js";
import CloseButton from "@/components/shared/CloseButton.vue";
import { ADD, REMOVE } from "@/utils/constants";

const INVALID_TOAST_TITLE_FORMAT = "유효하지 않는 형식";
const INVALID_TOAST_MESSAGE_FORMAT = "날짜 형식을 확인해주세요('yyyy/MM/dd').";

const INVALID_TOAST_TITLE_LENGTH = "유효하지 않는 길이";
const INVALID_TOAST_MESSAGE_LENGTH = "날짜 길이을 확인해주세요('yyyy/MM/dd').";

const { getMessages } = useMessage();

export default {
  name: "MessengerReceiverModal",
  components: {
    CloseButton,
  },
  data() {
    return {
      allMessages: [],
      sendMessages: [],
      receiveMessages: [],
      fromDate: null,
      toDate: null,
      fromDatePlaceHolder: null,
      toDatePlaceHolder: null,
      searched: false,
      viewType: "receive",
      isLoading: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * ### 컴포넌트 초기화.
     * 1. 검색 날짜 초기화 (당년/당월/당일).
     * 2. 초기화된 검색 날짜를 기반으로 메시지 요청.
     */
    async init() {
      await this.initSearchDate();
      await this.requestMessages();
    },

    /**
     * ### 메시지를 전체/송신/수신 메시지로 분할함.
     * @param {Array} newMessages > 전체 메시지 목록.
     */
    updateMessages(newMessages) {
      try {
        this.allMessages = newMessages || [];
        this.sendMessages = newMessages?.filter((m) => m.gubun == 1) || [];
        this.receiveMessages = newMessages?.filter((m) => m.gubun == 2) || [];
      } catch (e) {
        console.error(e.message);
      }
    },

    /**
     * ### 폼 검색 날짜 초기화.
     * - fromDate : 당년/당월/당월의 첫 번째 날(1일)
     * - toDate : 당년/당월/당일
     */
    initSearchDate() {
      const currDate = new Date();
      const currYear = currDate.getFullYear();
      const currMonth = currDate.getMonth();
      const firstDayDate = new Date(currYear, currMonth, 1);
      const { changeDateFormatByChar } = useDate();

      this.fromDate = changeDateFormatByChar(firstDayDate, "/");
      this.toDate = changeDateFormatByChar(currDate, "/");

      this.fromDatePlaceHolder = this.fromDate;
      this.toDatePlaceHolder = this.toDate;
    },
    handleClickViewType(mode) {
      this.$refs.targetsRef?.map((element) => element.classList.add("hide"));
      this.viewType = mode;
    },

    /**
     * ### 메시지 리스트를 요청.
     * @returns {Array} [Message] > 메시지 목록.
     */
    async requestMessages() {
      const startDate = this.fromDate.replaceAll("/", "-");
      const endDate = this.toDate.replaceAll("/", "-");
      const maxCount = 100;
      const gubun = 3;

      const isValidStartDateLength = this.fromDate.length === 10;

      if (!isValidStartDateLength) {
        this.dateInvalidMessage(
          INVALID_TOAST_TITLE_LENGTH,
          INVALID_TOAST_MESSAGE_LENGTH
        );
        return;
      }

      const isValidEndDateLength = this.toDate.length === 10;

      if (!isValidEndDateLength) {
        this.dateInvalidMessage(
          INVALID_TOAST_TITLE_LENGTH,
          INVALID_TOAST_MESSAGE_LENGTH
        );
        this.$refs.toDateRef;
        return;
      }

      const isInvalid = this.isInvalidDateFormat(startDate);
      if (isInvalid) {
        this.dateInvalidMessage(
          INVALID_TOAST_TITLE_FORMAT,
          INVALID_TOAST_MESSAGE_FORMAT
        );
        return;
      }

      const messages = await getMessages(gubun, maxCount, startDate, endDate);
      this.updateMessages(messages);
    },
    async handleSubmit() {
      this.isLoading = true;

      await this.requestMessages();

      this.isLoading = false;
    },
    isInvalidDateFormat(date) {
      return false;
      // return /(?!-)([a-zA-Z]|\W)/g.test(date);
    },
    dateInvalidMessage(title, message) {
      this.toast({ title, message });
    },
    handleClose() {
      this.updateShowMessengerReceiverModal(false);
    },
    handleClickedMessageTargetGroupName(e) {
      const membersElem = e.target.nextElementSibling;
      if (membersElem) {
        const isHide = membersElem.offsetHeight === 0;
        if (isHide) {
          membersElem.style.margin = "10px 0 0 0";
          membersElem.classList.remove("hide");
        } else {
          membersElem.style.margin = "0";
          membersElem.classList.add("hide");
        }
      }
    },
    updateInputClassWhenInvalid(ref, action) {
      switch (action) {
        case ADD:
          ref.classList.add("invalid");
          break;
        case REMOVE:
          ref.classList.remove("invalid");
          break;
      }
    },
    ...mapActions({
      updateShowMessengerReceiverModal:
        "dispatchIsShowingMessengerReceiverModal",
      toast: "toast",
    }),
  },
  computed: {
    currentMessages() {
      return this.viewType === "send"
        ? this.sendMessages
        : this.receiveMessages;
    },
  },
  watch: {
    fromDate(val) {
      // length
      const isLengthInValid = val.length !== 10;
      if (isLengthInValid) {
        this.updateInputClassWhenInvalid(this.$refs.fromDateRef, ADD);
        return;
      }

      // format
      const startDate = this.fromDate.replaceAll("/", "-");
      const isFormatInValid = this.isInvalidDateFormat(startDate);
      if (isFormatInValid) {
        this.updateInputClassWhenInvalid(this.$refs.fromDateRef, ADD);
        return;
      }

      this.updateInputClassWhenInvalid(this.$refs.fromDateRef, REMOVE);
    },
    toDate(val) {
      // length
      const isLengthInValid = val.length !== 10;
      if (isLengthInValid) {
        this.updateInputClassWhenInvalid(this.$refs.toDateRef, ADD);
        return;
      }

      // format
      const endDate = this.toDate.replaceAll("/", "-");
      const isFormatInValid = this.isInvalidDateFormat(endDate);
      if (isFormatInValid) {
        this.updateInputClassWhenInvalid(this.$refs.toDateRef, ADD);
        return;
      }

      this.updateInputClassWhenInvalid(this.$refs.toDateRef, REMOVE);
    },
  },
};
</script>

<style scoped>
#messenger_receiver_modal {
  width: 85%;
  height: 80%;
  padding: 20px;
  background-color: var(--deep-green);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 35px;
  display: flex;
  flex-direction: column;
}

#messenger_receiver_modal header {
  min-height: 80px;
  padding: 20px;
  background-color: var(--soft-green);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

#messenger_receiver_modal header section:first-child button {
  width: 200px;
  height: 50px;
  border-radius: 10px;
  color: var(--secondary);
  font-size: 1.2rem;
  font-weight: 700;
  background-color: var(--dark);
}

#messenger_receiver_modal header section:first-child button:hover {
  border: 1px solid var(--secondary);
}

#messenger_receiver_modal header section:first-child button.clicked {
  background-color: var(--primary);
}

#messenger_receiver_modal header section:last-child form {
  display: flex;
  align-items: center;
}

#messenger_receiver_modal header section:last-child form input {
  width: 170px;
  border-radius: 15px;
  padding: 10px 10px;
  border: none;
  background-color: var(--deep-green);
  color: var(--secondary);
  border: 1px solid var(--dark);
  letter-spacing: 2px;
  text-align: center;
}

#messenger_receiver_modal header section:last-child form input.invalid:focus,
#messenger_receiver_modal header section:last-child form input.invalid:hover,
#messenger_receiver_modal header section:last-child form input.invalid {
  border: 1px solid tomato;
}

#messenger_receiver_modal header section:last-child form input:hover,
#messenger_receiver_modal header section:last-child form input:focus {
  border: 1px solid var(--secondary);
}

#messenger_receiver_modal .search_image {
  cursor: pointer;
}

/* new messages start */
#messenger_receiver_modal .messages__container {
  position: relative;
  flex: 1;
  overflow-y: scroll;
}

#messenger_receiver_modal .messages__container table {
  width: 100%;
}

#messenger_receiver_modal .messages__container table thead {
  background-color: var(--soft-green);
  top: 0;
  position: sticky;
}

#messenger_receiver_modal .messages__container table tr {
  border-bottom: 1px solid var(--soft-green);
}

#messenger_receiver_modal .messages__container table th {
  height: 60px;
}

#messenger_receiver_modal .messages__container table td {
  height: 50px;
  padding: 10px 0px;
  text-align: center;
}

/* 메시지 컬럼 */
#messenger_receiver_modal .messages__container table td:nth-child(3) {
  text-align: start;
}

#messenger_receiver_modal .messages__container table .targets {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  transition: all 0.3s ease;
}

#messenger_receiver_modal .messages__container table .targets span {
  justify-content: center;
  font-size: 0.75rem;
}

#messenger_receiver_modal .messages_empty {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* new messages end */

#messenger_receiver_modal .message__column {
  width: 100%;
  display: grid;
  grid-template-columns: 0.07fr 0.15fr 0.5fr 0.28fr;
  border: 1px solid var(--soft-green);
}

#messenger_receiver_modal .message__column.header > span {
  width: 100%;
  padding: 15px 0;
  text-align: center;
  background-color: var(--primary);
  color: var(--secondary);
  font-size: 1.1rem;
  font-weight: 700;
}

#messenger_receiver_modal .message__target__column {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  border-right: 1px solid var(--soft-green);
}

/* media start */
@media screen and (min-width: 1920px) {
  /* message column start */
  #messenger_receiver_modal .messages__container table .targets span {
    font-size: 1rem;
  }

  /* message column end */
}

/* media end */
</style>
