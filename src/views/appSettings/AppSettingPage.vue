<template>
  <main id="authentication-setting-page">
    <header>
      <CompanyLogo />
    </header>

    <div>
      <aside class="nav__container">
        <AppSettingNavigation
          :tabs="visibleTabs"
          :selectedTab="selectedTab"
          @onItemTitleClick="handleItemTitleClick"
          @onTitleClick="handleTitleClick"
        />
      </aside>

      <section class="content__container">
        <!-- 대회 관리 -->
        <CompetitionManagePage
          v-if="selectedTab === APP_SETTING_COMPETITION_LIST"
        />

        <!-- 태블릿 관리 -->
        <TabletManagePage v-else-if="selectedTab === APP_SETTING_TABLET_LIST" />

        <!-- 좌표 관리 -->
        <HoleCoordinateManagePage
          v-else-if="selectedTab === APP_SETTING_HOLE_COORDINATE_LIST"
        />
        <OtherCoordinateManagePage
          v-else-if="selectedTab === '기타 좌표 목록'"
        />
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import {
  APP_SETTING_AUTH_MANAGE_TAB,
  APP_SETTING_COMPETITION_LIST,
  APP_SETTING_COMPETITION_TITLE,
  APP_SETTING_HOLE_COORDINATE_LIST,
  APP_SETTING_COORDINATE_TITLE,
  APP_SETTING_TABLET_LIST,
  APP_SETTING_TABLET_TITLE,
  COMPANY_CODE_DEFAULT_VALUE,
  APP_SETTING_OTHER_COORDINATE_LIST,
} from "@/utils/constants";
import CompanyLogo from "@/components/shared/CompanyLogo.vue";
import AppSettingNavigation from "./AppSettingNavigation.vue";
import CompetitionManagePage from "./competitionManages/CompetitionManagePage.vue";
import TabletManagePage from "./tabletManages/TabletManagePage.vue";
import HoleCoordinateManagePage from "@/views/appSettings/coordinateManages/holeCoordinate/HoleCoordinateManagePage.vue";
import OtherCoordinateManagePage from "@/views/appSettings/coordinateManages/otherCoordinate/OtherCoordinateManagePage.vue";

export default {
  name: "AppSettingPage",

  components: {
    CompanyLogo,
    AppSettingNavigation,
    CompetitionManagePage,
    TabletManagePage,
    HoleCoordinateManagePage,
    OtherCoordinateManagePage,
  },

  data() {
    return {
      COMPANY_CODE_DEFAULT_VALUE,
      APP_SETTING_AUTH_MANAGE_TAB,
      APP_SETTING_COMPETITION_LIST,
      APP_SETTING_TABLET_LIST,
      APP_SETTING_HOLE_COORDINATE_LIST,
      tabs: [
        {
          title: APP_SETTING_COMPETITION_TITLE,
          items: [
            {
              title: APP_SETTING_COMPETITION_LIST,
            },
          ],
          tabShown: true,
        },
        {
          title: APP_SETTING_TABLET_TITLE,
          items: [
            {
              title: APP_SETTING_TABLET_LIST,
            },
          ],
          tabShown: true,
        },
        {
          title: APP_SETTING_COORDINATE_TITLE,
          items: [
            {
              title: APP_SETTING_HOLE_COORDINATE_LIST,
            },
            {
              title: APP_SETTING_OTHER_COORDINATE_LIST,
            },
          ],
          tabShown: false,
        },
      ],
      selectedTabIndex: 0,
      selectedItemIndex: 0,
    };
  },

  computed: {
    visibleTabs() {
      if (this.isDevMode) {
        return this.tabs || [];
      } else {
        return this.tabs.filter((tab) => tab.tabShown);
      }
    },

    selectedTab() {
      return this.tabs[this.selectedTabIndex]?.items[this.selectedItemIndex]
        ?.title;
    },

    ...mapGetters({
      isDevMode: "getIsDevMode",
    }),
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
#authentication-setting-page > div {
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
