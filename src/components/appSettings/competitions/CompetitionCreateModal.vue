<template>
  <transition name="fade" appear>
    <div class="backdrop">
      <div class="competition-create-modal__container">
        <CloseButton @onClose="closeModal" />

        <form @submit.prevent="handleCreateSubmit">
          <!-- 대회 이름 -->
          <InputWithLabel
            inputType="text"
            labelText="대회 이름 (10글자)"
            v-model="competitionNm"
            :error="competitionNmError"
            :disabled="isSending"
            :isFocus="true"
          />

          <!-- 대회 시작일 -->
          <InputWithLabel
            inputType="text"
            labelText="대회 시작일 (yyyyMMdd)"
            v-model="startDt"
            :error="startDtError"
            :disabled="isSending"
          />

          <!-- 대회 종료일 -->
          <InputWithLabel
            inputType="text"
            labelText="대회 종료일 (yyyyMMdd)"
            v-model="endDt"
            :error="endDtError"
            :disabled="isSending"
          />

          <!-- 공개 여부 -->
          <InputWithLabel
            inputType="text"
            labelText="공개 여부 (1:공개, 2:비공개)"
            v-model="gubun"
            :error="gubunError"
            :disabled="isSending"
          />

          <!-- 비고 -->
          <InputWithLabel
            inputType="text"
            labelText="비고"
            v-model="remarks"
            :error="remarksError"
            :disabled="isSending"
          />

          <SimpleButton buttonText="대회 생성" />
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
import CloseButton from "@/components/shared/CloseButton.vue";
import InputWithLabel from "@/components/shared/InputWithLabel.vue";
import SimpleButton from "@/components/shared/SimpleButton.vue";
import useCompetition from "@/api/v1/appSettings/useCompetition";

const { createCompetition } = useCompetition();

export default {
  name: "CompetitionCreateModal",

  components: {
    CloseButton,
    InputWithLabel,
    SimpleButton,
  },

  data() {
    return {
      competitionNm: "",
      startDt: "",
      endDt: "",
      gubun: "",
      remarks: "",

      competitionNmError: "",
      startDtError: "",
      endDtError: "",
      gubunError: "",
      remarksError: "",

      isSending: false,
    };
  },

  methods: {
    closeModal() {
      this.setIsShowingCompetitionCreateModal(false);
    },

    ErrorMessageClear() {
      this.competitionNmError = "";
      this.startDtError = "";
      this.endDtError = "";
      this.gubunError = "";
      this.remarksError = "";
    },

    isValid() {
      if (this.competitionNm.length > 10) {
        this.competitionNmError = "대회 이름은 최대 10글자 입니다.";
        return false;
      }
      if (this.startDt.length !== 8) {
        this.startDtError = "대회 시작일은 'yyyyMMdd' 형식으로 입력해주세요.";
        return false;
      }
      if (this.endDt.length !== 8) {
        this.endDtError = "대회 종료일은 'yyyyMMdd' 형식으로 입력해주세요.";
        return false;
      }
      if (!(this.gubun == 1 || this.gubun == 2)) {
        this.gubunError = "공개 여부는 1 혹은 2를 입력해주세요.";
        return false;
      }

      return true;
    },

    async handleCreateSubmit() {
      // 에러 메시지 초기화.
      this.ErrorMessageClear();

      if (!this.isValid()) return;

      const { ok } = await createCompetition(
        this.competitionNm,
        this.startDt,
        this.endDt,
        this.gubun,
        this.remarks
      );
      const title = "대회 생성";
      let message;
      if (ok) {
        message = `${this.competitionNm} 대회를 생성하는데 성공했습니다.`;
        this.setCompetitionsUpdated(true);
        this.closeModal();
      } else {
        message = `${this.competitionNm} 대회 생성을 실패했습니다.`;
      }

      this.toast({
        title,
        message,
      });
    },

    ...mapActions({
      toast: "toast",
      setIsShowingCompetitionCreateModal:
        "updateIsShowingCompetitionCreateModal",
    }),
    ...mapActions("appSettings", {
      setCompetitionsUpdated: "updateCompetitionsUpdated",
    }),
  },
};
</script>

<style scoped>
.competition-create-modal__container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  border-radius: 20px;
  padding: 20px;
  background-color: var(--deep-green);
}
</style>
