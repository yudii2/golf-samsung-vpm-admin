<template>
  <article id="round_all__container">
    <header class="search__container">
      <RoundAllSearch @submit="handleSubmit" />
    </header>

    <body>
      <RoundAllTable :rows="rows" />
    </body>

    <footer>
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

<script>
import { mapActions, mapGetters } from "vuex";
import Pages from "@/components/shared/Pages.vue";
import RoundAllSearch from "@/components/admin/round/roundAll/RoundAllSearch.vue";
import RoundAllTable from "@/components/admin/round/roundAll/RoundAllTable.vue";
import useRound from "@/api/v1/admin/round/useRound";
import { Pager } from "@/utils/usePage";
import DateUtil from "@/utils/datetime/DateUtil";

const { getRound } = useRound();

const now = new Date();
const { year, month, day } = DateUtil.dateDivider(now);
const visitDt = year + month + day;

export default {
  name: "RoundAll",
  components: {
    RoundAllSearch,
    RoundAllTable,
    Pages,
  },
  data() {
    return {
      currentPage: 1,
      rows: [],
      pages: [],
      pager: null,
      visitDt,
      startIndex: 0,
    };
  },

  methods: {
    /**
     * search 버튼이벤트.
     * 하위컴포넌트에서 전달받아, 해당이벤트를 실행.
     * */
    handleSubmit({ caddieNm, groupNm, playerNames, visitDt }) {
      if (visitDt) {
        this.requestRounds({
          visitDt,
          playerNames,
          caddieNm,
          groupNm,
        });
      }
    },

    /* methods about paging start */
    updatePage(page) {
      this.currentPage = page;
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

    updatePager(list) {
      this.pager = new Pager({
        list,
        take: 15,
      });
      const res = this.pager.generate();
      this.rows = res.firstPageRows;
      this.pages = res.currentPages;
      this.currentPage = res.currentPage;
    },
    /* methods about paging end*/
    /**
     * 현재 페이지에 머무르면서, 화면 갱신.
     * ex)기념사진, 클럽사진 버튼유무
     * 사진 스위칭 기능이 추가되면서 만든 메소드.
     * @param list
     */
    stayPage(list) {
      this.pager = new Pager({
        list,
        take: 15,
      });
      const res = this.pager.generate();
      this.rows = this.pager.getPageRowsByPage(this.currentPage);
      this.pages = res.currentPages;
    },

    /**
     * 전체라운드 조회 API 호출.
     * @param visitDt
     * @param playerNames
     * @param caddieNm
     * @param groupNm
     * @returns {Promise<*>}
     */
    async requestRounds({ visitDt, playerNames, caddieNm, groupNm }) {
      const res = await getRound({
        visitDt,
        groupNm,
        playerNames,
        caddieNm,
      });

      const { status } = res;
      if (status !== "OK") return;

      const {
        data: { roundTeamList },
      } = res;

      this.setRoundAllRows(roundTeamList);
      this.updatePager(this.originalAllRows);
    },
    ...mapActions({
      toast: "toast",
      toastPreparing: "toastPreparing",
    }),
    ...mapActions("admin/", {
      setRoundAllRows: "dispatchSetRoundAllRows",
    }),
  },
  computed: {
    ...mapGetters("control/", {
      company: "getCompany",
    }),
    ...mapGetters("admin/", {
      originalAllRows: "getRoundAllRows",
    }),
  },

  async mounted() {
    const visitDt = this.visitDt;
    const playerNames = "";
    const caddieNm = "";
    const groupNm = "";

    await this.requestRounds({
      visitDt,
      playerNames,
      caddieNm,
      groupNm,
    });
  },

  watch: {
    currentPage(newPage) {
      this.rows = this.pager.getPageRowsByPage(newPage);
    },
    originalAllRows(rows) {
      this.stayPage(rows);
    },
  },
};
</script>
<style scoped>
#round_all__container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

#round_all__container * {
  color: var(--secondary);
}

#round_all__container body {
  height: 700px;
  text-align: center;
}

#round_all__container header {
  height: 35px;
}

/* footer start */
#round_all__container footer {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
}

/* footer end */
</style>
