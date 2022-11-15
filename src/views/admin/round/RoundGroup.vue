<template>
  <article id="round_group__container">
    <header class="header">
      <div class="search__box">
        <!--  -->
        <div class="search__group_name">
          <label for="search__lookup_date__input">조회일</label>
          <input
            class="input-dark ml"
            id="search__lookup_date__input"
            type="date"
            autocomplete="off"
            v-model="visitDt"
            @keypress.enter="handleClickSearch"
            ref="inputName"
          />

          <label for="search__group_name_input" class="ml">단체팀명</label>
          <input
            class="input-dark ml"
            type="text"
            id="search__group_name_input"
            autocomplete="off"
            v-model="groupNm"
            :placeholder="groupNmPlaceholder"
            @keypress.enter="handleClickSearch"
          />
          <button class="button-dark ml" @click="handleClickSearch">
            Search
          </button>
          <div v-if="isLoading" class="loading">
            <div></div>
          </div>
        </div>
      </div>
    </header>

    <section>
      <RoundGroupTable
        :roundGroups="roundGroups"
        @clearSearchData="clearSearchData"
        :searchParams="searchParams"
      />
    </section>

    <footer class="pages__container mt">
      <Pages
        v-if="pager"
        :currentPage="currentPage"
        :pages="pages"
        :hasNext="pager.hasNext()"
        :hasPrevious="pager.hasPrevious()"
        @handleClickPage="updatePage"
        @onPrevious="handlePreviousPages"
        @onNext="handleNextPages"
      />
    </footer>
  </article>
</template>

<script scoped>
import {mapActions, mapGetters} from "vuex";
import {getGroupRoundByPage} from "@/utils/test/sampleApi";
import Pages from "@/components/shared/Pages.vue";
import RoundGroupTable from "@/components/admin/modal/round/group/RoundGroupTable.vue";
import useAdminGroup from "@/api/v1/admin/round/useAdminGroup";
import DateUtil from "@/utils/datetime/DateUtil";
import {Pager} from "@/utils/usePage";
import {NO_REQUIRED_VISIT_DATE} from "@/utils/constants";

const {getGroup} = useAdminGroup();

export default {
  name: "RoundGroup",

  components: {
    RoundGroupTable,
    Pages,
  },

  data() {
    return {
      rows: [],
      pages: [],
      currentPage: 1,
      pager: null,
      visitDt: "",
      groupNm: "",
      groupNmPlaceholder: "단체 이름",
      searchParams: {},

      isLoading: false,
      take: 15
    };
  },

  computed: {
    datePlaceholder() {
      const now = new Date();
      return `${String(now.getFullYear()).padStart(2, 0)}${String(
        now.getMonth() + 1
      ).padStart(2, 0)}${String(now.getDate()).padStart(2, 0)}`;
    },

    ...mapGetters("admin/", {
      roundGroups: "getRoundGroupTeamList",
      selectedRoundGroupName: "getSelectedRoundGroupName",
      selectedRoundGroupVisitDt: "getSelectedRoundGroupVisitDt",
    }),
  },

  methods: {
    init() {
      const visitDt = this.selectedRoundGroupVisitDt
      const groupNm = this.selectedRoundGroupName
      if (visitDt || groupNm) {
        this.visitDt = visitDt;
        this.refreshGroups({visitDt, groupNm})
      } else {
        this.initData();
      }
    },

    async initData() {
      // 조회일 초기화.
      this.initVisitDt();
      await this.refreshGroups({visitDt: this.visitDt});
    },

    initVisitDt() {
      const now = new Date();
      const {year, month, day} = DateUtil.dateDivider(now);
      this.visitDt = `${year}-${month}-${day}`;
    },

    /**
     * ### Search 버튼 클릭 이벤트 핸들러.
     */
    handleClickSearch() {
      const hasVisitDt = this.visitDt.length !== 0;

      this.searchParams = {
        visitDt: this.visitDt,
        groupNm: this.groupNm,
      }

      if (hasVisitDt) {
        this.isLoading = true;
        this.refreshGroups(this.searchParams);
      } else {
        this.dateInvalidMessage(NO_REQUIRED_VISIT_DATE);

        this.clearSearchData();
        this.$refs.inputName.focus();
      }
    },
    /**
     * 단체팀명 초기화.
     * */
    async clearSearchData() {
      this.groupNm = "";
      await this.refreshGroups({
        visitDt: this.visitDt,
        groupNm: this.groupNm,
      });
    },

    dateInvalidMessage(title, message) {
      this.toast({title, message});
    },

    updateRoundsByPage(page) {
      const res = getGroupRoundByPage(page);
      if (res.ok) {
        this.rows = res.data;
        this.pages = res.pages;
      } else {
        this.toast({
          title: "데이터 새로고침",
          message: res.error,
          duration: 5000,
        });
      }
    },

    /**
     * 단체라운드 조회 메소드 호출.
     * @param visitDt
     * @param groupNm
     * @returns {Promise<void>}
     */
    async refreshGroups({visitDt, groupNm}) {
      const parsedVisitDt = visitDt?.includes('-') ? visitDt?.replaceAll("-", "") : visitDt;
      const list = await this.requestGroups({
        visitDt: parsedVisitDt,
        groupNm,
      });


      this.updatePager(list);
      this.setRoundGroupTeamList(list);

    },
    /**
     * 단체라운드 조회 API 호출.
     * @param visitDt
     * @param groupNm
     * @returns {Promise<*>}
     */
    async requestGroups({visitDt, groupNm}) {
      const res = await getGroup({visitDt, groupNm});
      const {status} = res;
      this.isLoading = false;
      if (status !== "OK") return;

      const {
        data: {roundGroupTeamVOList},
      } = res;

      this.updateSelectedRoundGroupVisitDt();
      this.updateSelectedRoundGroupName();
      return roundGroupTeamVOList;
    },

    /* paging methods start */
    updatePage(page) {
      this.currentPage = page;
    },

    updatePager(list) {
      this.pager = new Pager({
        list,
        take: this.take,
      });
      const res = this.pager.generate();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },

    handlePreviousPages() {
      const res = this.pager.previousPages();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },

    handleNextPages() {
      const res = this.pager.nextPages();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },
    /* paging methods end */

    ...mapActions({
      toast: "toast",
      toastPreparing: "toastPreparing",
    }),
    ...mapActions("admin/", {
      setRoundGroupTeamList: "updateRoundGroupTeamList",
      updateSelectedRoundGroupName: "dispatchSetSelectedRoundGroupName",
      updateSelectedRoundGroupVisitDt: "dispatchSetSelectedRoundGroupVisitDt",
      clearRoundGroupTeamList: "updateRoundGroupTeamList"
    }),
  },

  mounted() {
    this.init();
    this.isLoading = true;
  },
  destroyed() {
    this.clearRoundGroupTeamList();
  },
  watch: {
    currentPage(newPage) {
      this.rows = this.pager?.getPageRowsByPage(newPage);
    },
  },
};
</script>

<style scoped>
#round_group__container {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

#round_group__container section {
  text-align: center;
}

/* header start */
#round_group__container .search__box {
  display: flex;
  align-items: center;
}

#round_group__container .search__box form {
  display: flex;
  align-items: center;
}

/*#round_group__container .search__box > div:first-child {*/
/*  margin-right: 20px;*/
/*}*/

#round_group__container .search__box .button-dark {
  margin-right: 10px;
}

/* header end */
#search__lookup_date__input {
  width: 180px;
}

.refresh_icon__container {
  transform: scale(0.8);
}

.loading {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
}

.loading div {
  box-sizing: border-box;
  width: 15px;
  height: 15px;
  border: 3px solid transparent;
  border-left-width: 2px;
  border-top-color: var(--secondary);
  border-radius: 50%;
  animation: spinnerOne 2s infinite linear;
  margin-left: 10px;
}
</style>
