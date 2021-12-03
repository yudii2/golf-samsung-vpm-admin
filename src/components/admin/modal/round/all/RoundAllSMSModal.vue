<template>
  <div class="backdrop">
    <div id="score_sms__container">
      <CloseButton @onClose="handleClickClose"/>
      <article>
        <section class="mobile_no__wrapper">
          <div class="mobile_no_upper_wrapper">
            <label for="mobileNumber">휴대폰 번호 :</label>
            <input
              v-if="isUpdatable"
              id="mobileNumber"
              type="number"
              class="mobile_no_input"
              v-model="changedMobileNo"
              ref="inputMobileNo"
              :disabled="isSending"
              @keypress.enter="isUpdateMode"
            />
            <span class="mobile_no" v-else>{{
                getPlayerMobileNo(getSelectedPlayer.mobileNo)
              }}</span>
            <button class="button-dark" @click="isUpdateMode"
                    :class="{'save_button' : isUpdatable}"
            >
              {{ isUpdatable ? "저장" : "수정" }}
            </button>

          </div>
          <div>
            <button
              class="button-dark send_button"
              @click="handleSendButton"
              v-if="!isUpdatable"
              :disabled="isSending"
            >
              SMS전송
            </button>
          </div>
          <div class="message_area" v-if="resultMessage">
            {{ resultMessage }}
          </div>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CloseButton from "@/components/shared/CloseButton";
import useSMS from "@/api/v1/admin/sms/useSMS";
import useRound from "@/api/v1/admin/round/useRound";
import {useInput} from "@/utils/string";
import {
  SUCCESS_SMS_SEND_MESSAGE,
  FAIL_SMS_SEND_MESSAGE,
} from "@/utils/constants";

const {sendPlayerScore, updatePlayerMobileNo} = useSMS();
const {getRoundDetail} = useRound();
const {lengthIsInvalid, getValidText} = useInput(11);

export default {
  name: "RoundAllSMSModal",

  data() {
    return {
      changedMobileNo: "",
      resultMessage: "",
      isUpdatable: false,
      isSending: false,
    };
  },

  components: {CloseButton},

  computed: {
    ...mapGetters("admin/", {
      getSelectedPlayer: "getSelectedPlayer",
    }),
  },

  methods: {
    /**
     * 초기화메소드
     */
    init() {
      this.changedMobileNo = "";
      this.resultMessage = "";
      this.isUpdatable = false;
    },

    /**
     * sms 전송버튼을 눌렀을 때 발생하는 이벤트.
     * sendPlayerScore 를 호출하고 파라미터로 mobileNo, playerId 를 넘겨줌.
     * @returns {Promise<void>}
     */
    async handleSendButton() {
      this.isSending = true;
      const mobileNo = this.getSelectedPlayer.mobileNo;
      const playerId = this.getSelectedPlayer.playerId;

      const res = await sendPlayerScore({mobileNo, playerId});

      const {status} = res;
      if (status !== "OK") {
        this.resultMessage = FAIL_SMS_SEND_MESSAGE;
      } else {
        this.resultSuccessMessage(SUCCESS_SMS_SEND_MESSAGE);
        this.handleClickClose();
      }
      this.isSending = false;
    },

    /**
     * 수정버튼을 눌렀을 때 발생하는 메소드.
     * 수정모드일 때만 api 호출.
     * @returns {Promise<void>}
     */
    async isUpdateMode() {
      if (this.isUpdatable) {
        const changedMobileNo = this.changedMobileNo;
        const playerId = this.getSelectedPlayer.playerId;

        if (changedMobileNo.length === 0) {
          this.isUpdatable = !this.isUpdatable
          return;
        }
        const playerInfo = {
          roundTeamPlayerList: [
            {
              mobileNo: changedMobileNo,
              playerId: playerId,
            },
          ],
        };


        const res = await updatePlayerMobileNo(playerInfo);
        const {status} = res;

        if (status !== "OK") return this.init();
        await this.requestRoundDetail();
      }
      this.isUpdatable = !this.isUpdatable;
    },

    /**
     * 고객 휴대폰번호를 수정한 후, 전체라운드 상세조회 API 호출하는 메소드.
     *
     * 고객번호를 수정한 후에 response data 가 없기 때문에 한 번 더 조회하여야함.
     * @returns {Promise<void>}
     */
    async requestRoundDetail() {
      const paramRoundId = this.getSelectedPlayer.roundId;
      const res = await getRoundDetail({paramRoundId});

      const {status} = res;
      if (status !== "OK") return;

      const {data} = res;
      const comparedPlayerId = this.getSelectedPlayer.playerId;
      const foundPlayer = data.roundTeamPlayerList.find(
        (player) => player.playerId === comparedPlayerId
      );

      const playerInfo = {
        ...foundPlayer,
        roundId: data.roundId,
      };
      this.dispatchUpdateSelectedPlayer(playerInfo);
    },

    /**
     * 휴대폰 번호를 화면에 표시해주는 메소드.
     * @param mobileNo
     * @returns {string|*}
     */
    getPlayerMobileNo(mobileNo) {
      if (this.changedMobileNo.length === 0) {
        return mobileNo;
      } else {
        return this.changedMobileNo;
      }
    },

    /**
     * close 버튼 이벤트.
     * @param
     */
    handleClickClose() {
      this.dispatchClearSelectedPlayer();
      this.init();
      this.updateIsShowingSMSModal(false);
    },

    resultSuccessMessage(title, message) {
      this.toast({title, message});
    },
    ...mapActions("admin/", {
      dispatchClearSelectedPlayer: "dispatchClearSelectedPlayer",
      dispatchUpdateSelectedPlayer: "dispatchUpdateSelectedPlayer",
    }),
    ...mapActions({
      updateIsShowingSMSModal: "dispatchIsShowingSMSModal",
      toast: "toast",
    }),
  },

  watch: {
    /**
     * 모달창이 뜰 때, 휴대폰 번호가 null 이면 수정모드로 변경.
     * @param newVal
     * @param oldVal
     */
    isShowingSMSModal(newVal, oldVal) {
      if (!oldVal && newVal) {
        if (this.getSelectedPlayer.mobileNo === null) {
          this.isUpdatable = !this.isUpdatable;
        }
      }
    },

    /**
     * 수정모드일 때, input focus watch
     */
    isUpdatable() {
      if (this.isUpdatable) {
        setTimeout(() => {
          this.$refs.inputMobileNo.focus();
        }, 300);
      }
    },

    /**
     * 휴대폰 번호 11자리 수 제한.
     * @param text
     */
    changedMobileNo(text) {
      if (lengthIsInvalid(text)) this.changedMobileNo = getValidText(text);
    },
  },
};
</script>

<style scoped>
.backdrop {
  z-index: 99999999;
}

#score_sms__container {
  width: 35%;
  height: 35%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  padding: 20px;
  border: 1px solid var(--primary);
  border-radius: 20px;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
}

#score_sms__container * {
  color: var(--secondary);
}

#score_sms__container .mobile_no__wrapper {
  text-align: center;
  font-size: 22px;
  margin-top: 25%;
}

#score_sms__container .mobile_no__wrapper .mobile_no_upper_wrapper {
  margin-bottom: 60px;
}

#score_sms__container .mobile_no__wrapper .mobile_no {
  margin: 0 20px;
  letter-spacing: 3px;
}

#score_sms__container .mobile_no__wrapper .mobile_no_input {
  width: 200px;
  height: 45px;
  line-height: 25px;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
  margin: 0 20px;
}

#score_sms__container .mobile_no__wrapper .button-dark {
  font-size: 20px;
  line-height: 20px;
}

#score_sms__container .mobile_no__wrapper .send_button {
  width: 300px;
  height: 60px;
}

#score_sms__container .mobile_no__wrapper .save_button {
  width: 300px;
  height: 60px;
  margin-top: 60px;
}

#score_sms__container .mobile_no__wrapper .message_area {
  margin-top: 30px;
  font-size: 20px;
}

@media screen and (height: 1080px) {
  #score_sms__container .mobile_no__wrapper {
    text-align: center;
    font-size: 22px;
    margin-top: 17%;
  }
}
</style>
