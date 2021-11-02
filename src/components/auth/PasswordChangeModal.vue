<template>
  <transition name="fade" appear>
    <div class="backdrop">
      <div class="password-change-modal__container">
        <CloseButton @onClose="closeModal" />

        <h1 class="title">비밀번호 변경</h1>
        <form @submit.prevent="handlePasswordChangeSubmit" autocomplete="off">
          <!-- 현재 비밀번호 -->
          <InputWithLabel
            inputType="text"
            labelText="아이디"
            v-model="username"
            :error="usernameError"
            :disabled="isSending"
          />

          <!-- 현재 비밀번호 -->
          <InputWithLabel
            inputType="password"
            labelText="현재 비밀번호"
            v-model="currentPassword"
            :error="currentPasswordError"
            :disabled="isSending"
            ref="inputPassword"
          />

          <!-- 새 비밀번호 -->
          <InputWithLabel
            inputType="password"
            labelText="새로운 비밀번호"
            v-model="newPassword"
            :error="newPasswordError"
            :disabled="isSending"
            ref="inputNewPassword"
          />

          <!-- 새 비밀번호 확인 -->
          <InputWithLabel
            inputType="password"
            labelText="새로운 비밀번호 확인"
            v-model="confirmPassword"
            :error="confirmPasswordError"
            :disabled="isSending"
          />

          <SimpleButton class="submit-button" buttonText="변경하기" />
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import useAuth from "@/api/v1/auth/useAuth";
import InputWithLabel from "../shared/InputWithLabel.vue";
import SimpleButton from "../shared/SimpleButton.vue";
import { mapActions, mapGetters } from "vuex";
import CloseButton from "../shared/CloseButton.vue";

const { changePassword } = useAuth();

export default {
  name: "PasswordChangeModal",

  components: {
    InputWithLabel,
    SimpleButton,
    CloseButton,
  },

  data() {
    return {
      username: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",

      usernameError: "",
      currentPasswordError: "",
      newPasswordError: "",
      confirmPasswordError: "",

      isSending: false,
    };
  },

  computed: {
    ...mapGetters({
      loginUsername: "getLoginUsername",
      loginPassword: "getLoginPassword",
    }),
  },

  methods: {
    init() {
      this.clearInputs();
      this.initData();
    },

    initData() {
      if (this.loginUsername) {
        this.username = this.loginUsername;

        this.focusByRef(this.$refs.inputPassword);
      }

      if (this.loginPassword) {
        this.currentPassword = this.loginPassword;

        this.focusByRef(this.$refs.inputNewPassword);
      }
    },

    focusByRef(ref) {
      const inputWrapper = ref?.$el;
      const elements = Array.from(inputWrapper.children);
      const inputElement = elements.find(
        (element) => element.tagName === "INPUT"
      );

      inputElement.focus();
    },

    errorClear() {
      this.usernameError = "";
      this.currentPasswordError = "";
      this.newPasswordError = "";
      this.confirmPasswordError = "";
    },

    async handlePasswordChangeSubmit() {
      this.isSending = true;
      // 에러 매시지
      this.errorClear();

      const { status, data } = await changePassword(
        this.username,
        this.currentPassword,
        this.newPassword
      );

      if (status === "OK") {
        // 성공 메시지 띄움.
        this.toast({
          title: "비밀번호 변경",
          message: "성공적으로 비밀번호를 변경했습니다.",
        });

        // 비밀번호 변경 버튼 숨김.
        this.setNeedChangePassword(false);

        // 현 모달창 닫기.
        this.closeModal();
      } else {
        const { errorCode, errorMessage } = data;
        switch (errorCode) {
          case "INVALID_PASS1":
          case "INVALID_PASS4":
          case "INVALID_PASS5":
            this.newPasswordError = errorMessage;
            this.newPassword = "";
            this.confirmPassword = "";
            break;

          case "ID_PASSWORD_MISMATCH":
            this.currentPasswordError = errorMessage;
            this.currentPassword = "";
            break;
        }
      }

      this.isSending = false;
    },

    closeModal() {
      this.setIsShowingPasswordChangeModal(false);
    },

    clearInputs() {
      this.username = "";
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },

    ...mapActions({
      toast: "toast",
      setIsShowingPasswordChangeModal: "updateIsShowingPasswordChangeModal",
      setNeedChangePassword: "updateNeedChangePassword",
    }),
  },

  mounted() {
    this.init();
  },

  destroyed() {
    this.clearInputs();
  },
};
</script>

<style scoped>
.password-change-modal__container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  margin: 0 auto;
  background-color: var(--dark-green);
  border-radius: 35px;
  padding: 10px 20px 30px;
}

.title {
  text-align: center;
}

.submit-button {
  margin-top: 20px;
}
</style>
