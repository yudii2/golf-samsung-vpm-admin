<template>
  <!--  날짜(기간검색) 코스구분 캐디검색 엑셀다운로드-->
  <div>
    <label for="search__report__input">기간조회</label>
    <input
      type="date"
      id="search__report__input"
      autocomplete="off"
      class="input-dark ml"
      v-model="parsedVisitFromDt"
      ref="input_from_date"
    />
    <span class="mx">-</span>
    <input
      type="date"
      id="search__to_report__input"
      class="input-dark"
      autocomplete="off"
      v-model="parsedVisitToDt"
      required
    />
    <!-- 셀렉스 박스 -->
    <div
      class="select__container"
      id="course-option-box"
      @focusout="onCourseOptionBoxFocusOut"
      tabindex="3"
    >
      <div class="selector__wrapper round-md" @click="toggleOptionsShow">
        <template v-if="!currentCourseName">
          <span>전체</span>
        </template>
        <template v-else>
          <span>{{ currentCourseName }}</span>
        </template>
        <img :src="arrowUrl" alt="arrow"/>
      </div>
      <transition name="fade">
        <DropDownOptions
          v-if="optionsShown"
          :items="getCourseName"
          @onOptionClick="handleCourseClick"
          class="drop-down-course-options__container"
        />
      </transition>
    </div>
    <input
      class="input-dark ml"
      id="search__caddie_name__input"
      type="text"
      placeholder="캐디명"
      autocomplete="off"
      v-model="caddieName"
      @keypress.enter="onSearchClick"
    />
    <button class="button-dark ml" @click="onSearchClick">Search</button>
    <button class="button-dark ml" @click="onExcelDownloadClick">엑셀다운로드</button>
    <div class="loading" v-if="isLoading">
      <div></div>
    </div>
  </div>
</template>

<script>
import DropDownOptions from "@/components/shared/DropDownOptions";
import {mapGetters} from "vuex";


export default {
  name: "ProgressTimeReportsSearch",
  components: {DropDownOptions},
  props: {
    isLoading: {
      type: Boolean,
      required: true
    },
    visitFromDt: {
      type: String,
      required: false
    },
    visitToDt: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      arrowUrl: require("@/assets/images/control/dashboard/ico_select2.png"),
      optionsShown: false,
      currentCourseName: "",

      caddieName: "",
    };
  },
  methods: {
    handleCourseClick(courseName) {
      this.currentCourseName = courseName;
      this.toggleOptionsShow();
    },
    toggleOptionsShow() {
      this.optionsShown = !this.optionsShown;
    },
    onCourseOptionBoxFocusOut(event) {
      if (
        event.relatedTarget &&
        !(event.relatedTarget instanceof HTMLInputElement)
      ) {
        return;
      }
      this.optionsShown = false;
    },
    onSearchClick() {
      const visitFromDt = this.visitFromDt.split('-').join("");
      const visitToDt = this.visitToDt.split('-').join("");
      const caddieName = this.caddieName
      const currentCourseName = this.currentCourseName
      this.$emit('onSearchClick', {visitFromDt, visitToDt, caddieName, currentCourseName})
    },
    onExcelDownloadClick() {
      this.$emit('onExcelDownloadClick');
    }
  },
  computed: {
    getCourseName() {
      const companyCourseList = this.currentCompanyCourses?.map(
        ({courseNm}) => courseNm
      );
      companyCourseList.unshift('전체')
      return companyCourseList;
    },
    parsedVisitFromDt: {
      get() {
        const year = this.visitFromDt.substring(0, 4);
        const day = this.visitFromDt.substring(6, 8);
        const month = this.visitFromDt.substring(4, 6);
        return `${year}-${month}-${day}`
      },
      set(newValue) {
        const changedVisitFromDt = newValue.replaceAll('-', '');
        this.$emit('changVisitFromDt', changedVisitFromDt)
      }

    },
    parsedVisitToDt: {
      get() {
        const year = this.visitToDt.substring(0, 4);
        const month = this.visitToDt.substring(4, 6);
        const day = this.visitToDt.substring(6, 8);

        return `${year}-${month}-${day}`
      },
      set(newValue) {
        const changedVisitToDt = newValue.replaceAll('-', '')
        this.$emit('changVisitToDt', changedVisitToDt)
      }
    },
    ...mapGetters("control/", {
      currentCompanyCourses: "getCompanyCourses",
    }),
  },
};
</script>

<style scoped>
header {
  margin-bottom: 16px;
}

#search__report__input,
#search__to_report__input {
  width: 180px;
}

/* selector start */
.selector__wrapper {
  width: 125px;
  height: 35px;
  background-color: var(--primary);
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  transition: all 0.3s ease;
  margin: 0 0 0 15px;
}

.selector__wrapper > span {
  font-size: 17px;
  font-weight: bold;
  position: relative;
}

.selector__wrapper > img {
  font-size: 17px;
  font-weight: bold;
  position: absolute;
  right: 11px;
  top: 11px;
}

.select__container {
  position: relative;
  display: inline-block;
}

.drop-down-course-options__container {
  left: 20px !important;
}
</style>
