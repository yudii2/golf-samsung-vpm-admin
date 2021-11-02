<template>
  <main class="authentication-page__container">
    <section class="info__container" v-if="accessToken">
      <header class="info-header__wrapper">
        <h1>사용자 인증</h1>
        <div class="info-header-options__wrapper">
          <span class="mr pointer" @click="handleClearClick">Clear</span>
          <span class="pointer" @click="handleGoBackClick">Back</span>
        </div>
      </header>

      <div class="info-content__container">
        <!-- access token -->
        <section class="content__wrapper">
          <header class="content-header__wrapper">
            <h1>토큰 정보</h1>
            <div class="access-token-options__wrapper">
              <span class="pointer" @click="handleCopyClick">{{
                copyText
              }}</span>
            </div>
          </header>

          <div class="content-body__wrapper access-token__wrapper">
            <span class="access-token-text">{{ accessToken }}</span>
          </div>
        </section>

        <!-- user info -->
        <section class="content__wrapper user-info__wrapper">
          <header class="content-header__wrapper">
            <h1>사용자 정보</h1>
          </header>

          <div class="content-body__wrapper">
            <div class="info-row">
              <span>사용자 이름 : </span>
              <span>{{ authUsername }}</span>
            </div>

            <div class="info-row">
              <span>사업장 이름 : </span><span>{{ authCompanyName }}</span>
            </div>
            <div class="info-row">
              <span>매장 이름 : </span><span>{{ authStoreName }}</span>
            </div>
            <div class="info-row">
              <span>권한 정보 : </span><span>{{ authPermissions }}</span>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="need-login__container" v-else>
      <router-link class="heart-beat" :to="{ name: 'Login' }"
        >먼저 로그인을 해주세요</router-link
      >
    </section>
  </main>
</template>

<script>
import useCopy from "@/composables/useCopy";
import useAuth from "@/api/v1/auth/useAuth";
import { mapGetters } from "vuex";

const { clipboard } = useCopy();
const { getAccessToken } = useAuth();

export default {
  name: "AuthenticationPage",

  data() {
    return {
      accessToken: null,
      isCopied: false,
    };
  },

  computed: {
    copyText() {
      return this.isCopied ? "Copied!" : "Copy";
    },

    authUsername() {
      return this.authInfo.username;
    },

    authCompanyName() {
      return `${this.company.name} (${this.company.code})`;
    },

    authStoreName() {
      return `${this.authInfo.storeName} (${this.authInfo.storeCode})`;
    },

    authPermissions() {
      return this.authInfo.permissions;
    },

    ...mapGetters({
      authInfo: "getAuthInfo",
    }),
    ...mapGetters("control/", {
      company: "getCompany",
    }),
  },

  methods: {
    handleClearClick() {
      sessionStorage.removeItem("Authorization");
      this.accessToken = null;
    },
    handleGoBackClick() {
      this.$router.back();
    },
    handleCopyClick() {
      clipboard(this.accessToken);
      this.isCopied = true;
    },
  },

  mounted() {
    this.accessToken = getAccessToken();
  },
};
</script>

<style scoped>
* {
  letter-spacing: 1.5px;
}

.authentication-page__container {
  width: 100%;
  height: 100vh;
}

.info__container {
}

/* header start */
.info-header__wrapper {
  width: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info-header-options__wrapper span {
  text-transform: capitalize;
}
/* header end */

/* body start */
.info-content__container {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  grid-gap: 20px;
}
/* body end */

/* access token start */
.content__wrapper {
  /* width: 500px; */
  padding: 15px;
  border: 1px solid var(--primary);
  border-radius: 15px;
}
.content__wrapper:hover {
  background-color: var(--deep-green);
}
.content-header__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content-body__wrapper {
}
.content-body__wrapper.access-token__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.access-token-text {
  width: 98%;
  word-wrap: break-word;
}
/* access token end */

.need-login__container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.need-login__container a {
  font-size: 4rem;
}

/* user info start */
.info-row {
  padding: 5px 3px;
}
/* user info end */
</style>
