<template>
  <main id="authentication-setting-page">
    <header>
      <CompanyLogo />
    </header>

    <body>
      <aside class="nav__container">
        <AuthenticationSettingNavigation
          :tabs="tabs"
          :selectedTab="selectedTab"
          @onItemTitleClick="handleItemTitleClick"
          @onTitleClick="handleTitleClick"
        />
      </aside>

      <section class="content__container">
        <AccountManagement v-if="selectedTab === APP_SETTING_AUTH_MANAGE_TAB" />
      </section>
    </body>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import {
  APP_SETTING_AUTH_MANAGE_TAB,
  APP_SETTING_AUTH_TITLE,
  COMPANY_CODE_DEFAULT_VALUE,
} from "@/utils/constants";
import CompanyLogo from "@/components/shared/CompanyLogo.vue";
import AuthenticationSettingNavigation from "./AuthenticationSettingNavigation.vue";
import AccountManagement from "@/components/admin/aushSetting/AccountManagement.vue";

export default {
  name: "AuthenticationSettingPage",

  components: {
    CompanyLogo,
    AuthenticationSettingNavigation,
    AccountManagement,
  },

  data() {
    return {
      COMPANY_CODE_DEFAULT_VALUE,
      APP_SETTING_AUTH_MANAGE_TAB,
      tabs: [
        {
          title: APP_SETTING_AUTH_TITLE,
          items: [
            {
              title: APP_SETTING_AUTH_MANAGE_TAB,
            },
          ],
        },
      ],
      selectedTabIndex: 0,
      selectedItemIndex: 0,
    };
  },

  computed: {
    selectedTab() {
      return this.tabs[this.selectedTabIndex].items[this.selectedItemIndex]
        .title;
    },

    ...mapGetters("control/", {
      company: "getCompany",
    }),
  },

  methods: {
    init() {},

    handleTitleClick(tabIndex) {
      this.selectedTabIndex = tabIndex;
      this.selectedItemIndex = 0;
    },

    handleItemTitleClick({ tabIndex, itemIndex }) {
      this.selectedTabIndex = tabIndex;
      this.selectedItemIndex = itemIndex;
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
#authentication-setting-page {
  height: 100vh;
  width: 100%;
  /* overflow: hidden; */
}

/* header start */
#authentication-setting-page > header {
  padding: 5px 10px;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--primary);
}
/* header end */

/* body start */
#authentication-setting-page > body {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: calc(100vh - 50px);
}
/* body end */

/* side-bar start */
#authentication-setting-page .nav__container {
  grid-column: 1/3;
  border-right: 1px solid var(--primary);
  padding: 15px;
}
/* side-bar end */

/* content start */
#authentication-setting-page .content__container {
  grid-column: 3/13;
  padding: 15px;
}

#authentication-setting-page .content__container > main {
  padding: 1rem;
}
/* content end */
</style>
