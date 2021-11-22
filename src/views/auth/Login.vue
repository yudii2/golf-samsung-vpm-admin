<template>
  <div id="login__container">
    <!-- 배경화면 -->
    <div class="login__background"></div>

    <!-- 로고 -->
    <section class="logo__container">
      <ControlDashBoardHeaderLogo/>
    </section>

    <!-- 로그인 폼 -->
    <section class="login__form__container">
      <div class="login__form__background"></div>
      <div>
        <header>
          <div class="login__form__header__container">
            <img
              :src="require('@/assets/images/control/dashboard/ico_hole.png')"
              alt="icon"
              ref="loginHeaderIcon"
              :class="{ sending: isSending }"
            />
            <span class="no-drag" @click="handleClickLogin">Login</span>
          </div>
        </header>
        <form class="login__form" @submit.prevent="handleLoginSubmit">
          <InputWithLabel
            labelText="ID"
            :disabled="isSending"
            :error="idError"
            :isFocus="true"
            v-model="id"
          />

          <InputWithLabel
            labelText="Password"
            :disabled="isSending"
            :error="passwordError"
            inputType="password"
            v-model="password"
          />

          <button hidden></button>
        </form>
      </div>

      <div class="buttons">
        <SimpleButton
          v-if="needChangePassword"
          @onClick="handleChangePasswordClick"
          buttonText="비밀번호 변경"
        />

        <SimpleButton @onClick="handleLoginSubmit" buttonText="로그인"/>
      </div>
    </section>
    <h1 class="hello no-drag">Hello</h1>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ControlDashBoardHeaderLogo from "@/views/control/dashboard/header/logo/ControlDashBoardHeaderLogo.vue";
import useAuth from "@/api/v1/auth/useAuth.js";
import usePermission from "@/composables/usePermission";
import {
  PERMISSION_KEY_DASHBOARD_ADMIN_PAGE,
  PERMISSION_KEY_DASHBOARD_DESKTOP,
  PERMISSION_KEY_DASHBOARD_MOBILE,
  PERMISSION_KEY_DASHBOARD_MOBILE_ORDERABLE,
  PERMISSION_KEY_DASHBOARD_SETTING_PAGE,
} from "@/utils/constants";
import InputWithLabel from "@/components/shared/InputWithLabel.vue";
import SimpleButton from "@/components/shared/SimpleButton.vue";

const {signIn} = useAuth();
const {setPermissions} = usePermission();

export default {
  name: "Login",

  components: {ControlDashBoardHeaderLogo, InputWithLabel, SimpleButton},

  data() {
    return {
      id: "",
      password: "",
      idError: "",
      passwordError: "",
      currentFocusInput: null,
      isSending: false,
    };
  },

  computed: {
    ...mapGetters({
      needChangePassword: "getNeedChangePassword",
    }),
  },

  methods: {
    init() {
    },

    /**
     * ### 헤더 아이콘 회전시키는 메소드.
     */
    setHeaderIconRotate() {
      this.$refs.loginHeaderIcon.classList.add("sending");
    },

    /**
     * ### 헤더 아이콘 회전멈추는 메소드.
     */
    clearHeaderIconRotate() {
      this.$refs.loginHeaderIcon.classList.remove("sending");
    },

    /**
     * ### 스토어 클리어 메소드.
     */
    clearStore() {
      this.setNeedChangePassword(false);
      this.setLoginUsername(null);
      this.setLoginPassword(null);
    },

    /**
     * ### 비밀번호 변경 모달 킴.
     */
    handleChangePasswordClick() {
      this.password = "";
      this.errorClear();
      this.setIsShowingPasswordChangeModal(true);
    },

    handleClickLogin() {
      this.setHeaderIconRotate();
      setTimeout(() => {
        this.clearHeaderIconRotate();
      }, 1000);
    },

    setFocusBy(by) {
      this.currentFocusInput = by;
    },

    clearFocus() {
      this.currentFocusInput = null;
    },

    errorClear() {
      this.idError = "";
      this.passwordError = "";
    },

    async handleLoginSubmit() {
      this.setNeedChangePassword(false);
      this.isSending = true;

      const res = await signIn(this.id.trim(), this.password);
      this.isSending = false;

      if (res && res.status === "OK") {
        this.errorClear();

        // 스토어 업데이트.
        this.setCompanyName(res?.data?.companyNm);
        this.setCompanyCode(res?.data?.companyCd);
        this.setAuthInfo(res?.data);

        const {ok, error} = setPermissions(
          res?.data?.menuUsingList
        );

        if (ok) {
          return this.$router.push({name: "Home"});
        } else {
          console.error(error)
        }
      } else {
        // 예외 처리
        switch (res.data.errorCode) {
          case "MISMATCH_ID":
            this.idError = res.data.errorMessage;
            break;
          case "ID_PASSWORD_MISMATCH":
            this.passwordError = res.data.errorMessage;
            break;
          case "SERVER_ERROR":
            this.passwordError = res.data.errorMessage;
            break;
          case "PASS_90DAYS_OVER":
            this.passwordError = res.data.errorMessage;
            this.setNeedChangePassword(true);
            this.setLoginUsername(this.id);
            this.setLoginPassword(this.password);
            break;
          case "ACCOUNT_LOCKED":
            this.idError = res.data.errorMessage;
            break;
        }
      }
    },

    navigateByKey(permissionKey) {
      switch (permissionKey) {
        case PERMISSION_KEY_DASHBOARD_DESKTOP:
          this.$router.push({name: "ControlDashBoard"});
          break;
        case PERMISSION_KEY_DASHBOARD_MOBILE:
          this.$router.push({name: "DashboardMobileCommon"});
          break;
        case PERMISSION_KEY_DASHBOARD_MOBILE_ORDERABLE:
          this.$router.push({name: "DashboardMobileOrderable"});
          break;
        case PERMISSION_KEY_DASHBOARD_ADMIN_PAGE:
          this.$router.push({name: "AdminManagement"});
          break;
        case PERMISSION_KEY_DASHBOARD_SETTING_PAGE:
          this.$router.push({name: "AppSettingPage"});
          break;
        default:
          this.$router.push({name: "DashboardMobileCommon"});
          break;
      }
    },

    ...mapActions({
      setAuthInfo: "updateAuthInfo",
      setLoginUsername: "updateLoginUsername",
      setLoginPassword: "updateLoginPassword",
      setNeedChangePassword: "updateNeedChangePassword",
      setIsShowingPasswordChangeModal: "updateIsShowingPasswordChangeModal",
    }),
    ...mapActions("control/", {
      setCompanyName: "updateCompanyName",
      setCompanyCode: "updateCompanyCode",
    }),
  },

  mounted() {
    this.init();
  },

  destroyed() {
    this.clearStore();
  },
};
</script>

<style scoped>
#login__container {
  position: relative;
  padding: 30px;
  height: 100%;
  letter-spacing: 2px;
}

#login__container section {
  position: relative;
}

#login__container .login__background {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/auth/login-bg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

#login__container .login__form__header__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#login__container .login__form__header__container img {
  width: 50px;
  margin-bottom: 20px;
}

#login__container .login__form__header__container span {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
}

#login__container .login__form__container {
  width: 100%;
  height: 90%;
  padding: 20px;
  background-color: transparent;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#login__container .login__form__container .login__form__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark);
  opacity: 0.75;
  border-radius: 10px;
}

#login__container .login__form__container header {
  margin: 20px auto;
}

#login__container .login__form__container header,
#login__container .login__form__container form {
  position: relative;
}

#login__container .login__form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#login__container .login__form .input__container input {
  width: 100%;
  padding: 10px;
  background-color: var(--secondary);
  color: var(--dark);
  border-radius: 7px;
  letter-spacing: 2px;
}

#login__container .login__form .input__container input:focus {
  border: 2px solid var(--primary);
}

#login__container .input__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  color: var(--secondary);
}

#login__container .login__form .input__container > label {
  margin-bottom: 10px;
  margin-left: 5px;
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: 700;
  transition: all 0.3s ease;
}

#login__container .buttons {
  display: flex;
  flex-direction: column;
}

#login__container .buttons button {
  position: relative;
}

#login__container .buttons button:first-child {
  margin-bottom: 10px;
}

#login__container .login__submit_button {
  position: relative;
  padding: 15px;
  background-color: dodgerblue;
  border-radius: 8px;
  color: var(--secondary);
  font-size: 1.2rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

#login__container .login__submit_button:hover {
  color: var(--secondary);
  background-color: var(--primary);
}

#login__container .hello {
  position: absolute;
  top: 30%;
  left: 20%;
  font-size: 6rem;
  color: white;
}

@media screen and (min-width: 1080px) {
  #login__container .login__form__container {
    position: absolute;
    width: 40%;
    right: 50px;
  }
}

@media screen and (min-width: 1920px) {
  #login__container .login__form__container {
    position: absolute;
    width: 30%;
    right: 50px;
  }
}
</style>
