<template>
  <!--  날짜(기간검색) 코스구분 캐디검색 엑셀다운로드-->
  <header>
    <label for="search__report__input">기간조회</label>
    <input
      type="date"
      id="search__report__input"
      autocomplete="off"
      class="input-dark ml"
      ref="input_from_date"
    />
    <span class="mx">-</span>
    <input
      type="date"
      id="search__to_report__input"
      class="input-dark"
      autocomplete="off"
      required
    />
    <!-- 셀렉스 박스 -->
    <div class="select__container">
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
        옵션 박스
        <DropDownOptions
          v-if="optionsShown"
          :items="getCourseName"
          @onOptionClick="handleCourseClick"
          class="drop-down-course-options__container"
          @focusout="onCourseOptionBoxFocusOut()"
          name="course-option-box"
        />
      </transition>
    </div>
    <input
      class="input-dark ml"
      id="search__caddie_name__input"
      type="text"
      placeholder="캐디명"
      autocomplete="off"
    />
    <button class="button-dark ml">Search</button>
    <button class="button-dark ml">엑셀다운로드</button>
    <!--    <div class="loading">-->
    <!--      <div></div>-->
    <!--    </div>-->
  </header>
</template>

<script>
import DropDownOptions from "@/components/shared/DropDownOptions";
import {mapGetters} from "vuex";

export default {
  name: "ProgressTimeReportsSearch",
  components: {DropDownOptions},
  data() {
    return {
      arrowUrl: require("@/assets/images/control/dashboard/ico_select2.png"),
      optionsShown: false,
      currentCourseName: '',
    };
  },
  methods: {
    handleCourseClick(courseName) {
      //TODO [report] course 필터링
      this.currentCourseName = courseName;
      this.toggleOptionsShow();
    },
    toggleOptionsShow() {
      this.optionsShown = !this.optionsShown;
    },
    onCourseOptionBoxFocusOut() {
      //relatedTarget
    }
  },
  computed: {
    getCourseName() {
      const companyCourseList = this.currentCompanyCourses?.map(({courseNm}) => courseNm)
      companyCourseList.push('전체')
      return companyCourseList
    },
    ...mapGetters("control/", {
      currentCompanyCourses: "getCompanyCourses",
    }),
  }
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
