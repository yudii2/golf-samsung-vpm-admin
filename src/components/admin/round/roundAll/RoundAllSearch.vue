<template>
  <article>
    <section class="inputs">
      <div class="search-lookup-date">
        <label
        >조회일<input
          class="input-dark ml"
          id="search-lookup-date__input"
          type="date"
          v-model="searchLookUpDate"
          autocomplete="off"
          @keypress.enter="handleSubmitSearch"
          ref="inputDate"
        /></label>
      </div>

      <div class="search__companion ml">
        <label
        >내장객<input
          class="input-dark ml"
          id="search__companion__input"
          type="text"
          placeholder="내장객"
          v-model="searchCompanion"
          autocomplete="off"
          @keypress.enter="handleSubmitSearch"
        /></label>
      </div>

      <div class="search__caddie_name ml">
        <label
        >캐디명<input
          class="input-dark ml"
          id="search__caddie_name__input"
          type="text"
          placeholder="캐디명"
          v-model="searchCaddieName"
          autocomplete="off"
          @keypress.enter="handleSubmitSearch"
        /></label>
      </div>

      <div class="search__group ml">
        <label
        >단체팀<input
          class="input-dark ml"
          id="search__group__input"
          type="text"
          placeholder="단체팀"
          v-model="searchGroup"
          autocomplete="off"
          @keypress.enter="handleSubmitSearch"
        /></label>
      </div>
      <div class="button__container ml">
        <button class="button-dark" @click="handleSubmitSearch">Search</button>
      </div>
    </section>
  </article>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DateUtil from "@/utils/datetime/DateUtil";
import {
  NO_REQUIRED_VISIT_DATE,
} from "@/utils/constants";

const now = new Date();
const {year, month, day} = DateUtil.dateDivider(now);
const visitDt = year + month + day;

export default {
  name: "RoundAllSearch",
  data() {
    return {
      visitDt,
      searchLookUpDate: "",
      searchCompanion: "",
      searchCaddieName: "",
      searchGroup: "",
    };
  },

  computed: {
    ...mapGetters("control/", {
      company: "getCompany",
    }),
  },

  methods: {
    init() {
      this.initData();
    },

    initData() {
      this.initLookUpDate();
    },

    initLookUpDate() {
      const now = new Date();
      const {year, month, day} = DateUtil.dateDivider(now);
      this.searchLookUpDate = `${year}-${month}-${day}`;
    },

    /**
     * search 버튼이벤트
     * emit 으로 submit 이벤트를 발생시킴.
     * @param e
     */
    handleSubmitSearch() {
      const searchLookupDateIsEmpty = this.searchLookUpDate.length === 0;

      if (searchLookupDateIsEmpty) {
        this.dateInvalidMessage(NO_REQUIRED_VISIT_DATE);

        this.clearSearchData();
        this.$refs.inputDate.focus();
      } else {
        let oldLookupDate = this.searchLookUpDate;
        const newLookupDate = oldLookupDate.split("-").join("");

        this.$emit("submit", {
          caddieNm: this.searchCaddieName,
          companyCd: this.company.code,
          groupNm: this.searchGroup,
          playerNames: this.searchCompanion,
          visitDt: newLookupDate,
        });
      }
    },

    /**
     * input 값 초기화 메소드.
     */
    clearSearchData() {
      this.searchLookUpDate = "";
      this.searchCompanion = "";
      this.searchCaddieName = "";
      this.searchGroup = "";
    },
    dateInvalidMessage(title, message) {
      this.toast({title, message});
    },
    ...mapActions({
      toast: "toast",
    }),

  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
/* search start */
.search__container .button__container button {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid var(--soft-green);
  background-color: transparent;
  color: var(--secondary);
  transition: all 0.3s ease;
}

.search__container .button__container button:hover {
  background-color: var(--primary);
}

.inputs {
  display: flex;
  align-items: center;
}

#search-lookup-date__input {
  width: 180px;
}

.refresh_icon__container {
  top: 10px;
  right: 10px;
  transform: scale(0.8);
}


/* search end */
</style>
