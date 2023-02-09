<template>
  <div id="admin__container">
    <header>
      <div class="admin__header_wrap">
        <CompanyLogo />
        <SwitchDashboardPage />
      </div>
    </header>

    <body>
      <aside>
        <RoundNavigation />
      </aside>

      <section
        class="content__container"
        v-if="company.code !== COMPANY_CODE_DEFAULT_VALUE"
      >
        <RoundManage v-if="viewTitle === 'round'" />
        <MonitorManage v-else-if="viewTitle === 'monitor'" />
        <VehicleManage v-else-if="viewTitle === 'vehicle'" />
        <CaddieManage v-else/>
      </section>
    </body>
  </div>
</template>

<script>
import CompanyLogo from "@/components/shared/CompanyLogo.vue";
import RoundManage from "@/views/admin/round/RoundManage.vue";
import MonitorManage from "@/views/admin/monitor/MonitorManage.vue";
import VehicleManage from "./vehicle/VehicleManage.vue";
import {mapActions, mapGetters} from "vuex";
import RoundNavigation from "@/components/admin/nav/RoundNavigation.vue";
import useData from "@/api/v1/monitor/useData";
import {COMPANY_CODE_DEFAULT_VALUE} from "@/utils/constants";
import CaddieManage from "@/views/admin/caddie/CaddieManage";
import SwitchDashboardPage from "@/views/admin/header/SwitchDashboardPage";

const { init } = useData();

export default {
  name: "Admin",
  components: {
    CaddieManage,
    RoundManage,
    MonitorManage,
    VehicleManage,
    CompanyLogo,
    RoundNavigation,
    SwitchDashboardPage
  },
  data() {
    return {
      contentViewTitle: this.getSelectedContentView,
      COMPANY_CODE_DEFAULT_VALUE,
    };
  },
  beforeDestroy() {
    // 관리자 페이지 떠날 때 초기 화면 페이지 설정.
    this.updateContentView({ title: "round", subtitle: 1 });
  },
  created() {
    this.refreshData();
  },
  methods: {
    /**
     * 데이터 새로고침 하는 애.
     */
    async refreshData() {
      // 데이터 새로고침.
      await init();
    },

    ...mapActions("admin/", {
      updateContentView: "dispatchContentView",
    }),
  },
  computed: {
    isMe() {
      return (title, i) => title === this.viewTitle && i === this.viewSubTitle;
    },
    ...mapGetters("control/", {
      company: "getCompany",
    }),
    ...mapGetters("admin/", {
      viewTitle: "getSelectedContentViewTitle",
      viewSubTitle: "getSelectedContentViewSubtitle",
    }),
  },
};
</script>

<style>
#admin__container {
  height: 100vh;
  width: 100%;
  /* overflow: hidden; */
}

/* header start */
#admin__container > header {
  padding: 5px 10px;
  height: 50px;
  /*display: flex;*/
  align-items: center;
  border-bottom: 1px solid var(--primary);
}
.admin__header_wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
/* header end */

/* body start */
#admin__container > body {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: calc(100vh - 50px);
}
/* body end */

/* side-bar start */
#admin__container aside {
  grid-column: 1/3;
  border-right: 1px solid var(--primary);
  height: 100%;
  max-height: calc(100vh - 35px - 30px - 100px);
  overflow-y: scroll;
}

/* side-bar end */

/* content start */
#admin__container .content__container {
  grid-column: 3/13;
}

#admin__container .content__container > main {
  padding: 1rem;
}
/* content end */
</style>
