<template>
  <div id="authentication__container">
    <section class="authentication__header__container">
      <h1 class="title" @click="logAuthentication">Authentication</h1>
      <div class="option__items">
        <span @click="clearAuthenticationData" class="pointer mr">{{
          clearText
        }}</span>
        <span @click="goBack" class="pointer">Back</span>
      </div>
    </section>

    <section class="authentication__body__container" v-if="authentication">
      <!-- Access token -->
      <div class="authentication__access_token__container mt-2">
        <div class="mb header__container">
          <h2 class="title">Access token</h2>
          <div
            class="authentication__access_token__header__options__container option__items"
          >
            <span @click="copyAccessToken" class="pointer ml">{{
              copyText
            }}</span>
          </div>
        </div>
        <div class="authentication__access_token__body">
          <span>{{ authentication }}</span>
        </div>
      </div>
    </section>
    <section v-else class="login_guide_message mt-2">
      <router-link :to="{ name: 'Login' }">먼저 로그인을 해주세요.</router-link>
    </section>
  </div>
</template>

<script>
import useCopy from "@/composables/useCopy.js";

export default {
  name: "Authentication",
  data() {
    return {
      isCopied: false,
      authentication: null,
      clipboard: null,
    };
  },
  mounted() {
    const { clipboard } = useCopy();
    this.clipboard = clipboard;

    this.parseAuthentication();
  },
  methods: {
    logAuthentication() {
      console.info(this.authentication);
    },
    parseAuthentication() {
      this.authentication = JSON.parse(sessionStorage.getItem("Authorization"));
    },
    goBack() {
      this.$router.go(-1);
    },
    copyAccessToken() {
      if (this.clipboard !== null) {
        this.clipboard(this.authentication);
        this.isCopied = true;
      }
    },
    clearAuthenticationData() {
      sessionStorage.removeItem("Authorization");
      this.authentication = null;
    },
  },
  computed: {
    copyText() {
      return this.isCopied ? "Copied" : "Copy";
    },
    clearText() {
      return this.authentication === null ? "Cleared" : "Clear";
    },
  },
};
</script>

<style>
/* authentication container start */
#authentication__container {
  position: absolute;
  transform: translateX(-50%);
  top: 100px;
  left: 50%;
  width: 500px;
  letter-spacing: 2px;
}
/* authentication container end */

/* authentication header container start */
.authentication__header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* authentication header container end */

/* access token start */
.authentication__access_token__body {
  position: relative;
  display: flex;
  justify-content: center;
}
.authentication__access_token__body > span {
  position: absolute;
  text-overflow: ellipsis;
  word-wrap: break-word;
  max-width: 450px;
  overflow: hidden;
  display: block;
  /* white-space: nowrap; */
}
.login_guide_message {
  text-align: center;
  font-size: 2rem;
  transition: all 0.3s ease;
}
.login_guide_message:hover {
  transform: scale(1.1);
}
/* access token end */

/* common start */
.title {
  cursor: default;
}
.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.option__items > span {
  transition: all 0.3s ease;
}
.option__items > span:hover {
  color: dodgerblue;
}
/* common end */
</style>
