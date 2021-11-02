<template>
  <div class="sa-object">
    <!-- 비활성(Class) : co-disabled / 활성(Class) : co-active -->
    <div
      class="component-date"
      :class="{ 'co-active': isActive, 'co-disabled': disabled }"
      @mousedown="mouseDownEvt"
      :ref="refs"
    >
      <div class="co-body">
        <div class="co-pc">
          <div class="co-b-header">
            <input
              type="text"
              placeholder="0000-00-00"
              v-model="dateValue"
              @keypress.enter="validateDate"
              @keypress="validateLength"
              @keyup="formatValue"
              @focusout="focusOutEvt"
              @focusin="focusInEvt"
            />
            <i @click="setFocusInput"></i>
          </div>
          <div class="co-b-body">
            <div class="co-b-b-body">
              <div class="co-b-b-b-body">
                <div class="co-b-b-b-b-body">
                  <div class="co-b-b-b-b-b-header">
                    <div class="co-b-b-b-b-b-h-header">
                      <button @mousedown="setViewMonth(-1)">
                        <div class="co-item">이전달</div>
                      </button>
                    </div>
                    <div class="co-b-b-b-b-b-h-body">
                      <div class="co-item">
                        {{
                          `${viewDate.getFullYear()}년 ${
                            viewDate.getMonth() + 1
                          }월`
                        }}
                      </div>
                    </div>
                    <div class="co-b-b-b-b-b-h-footer">
                      <button @mousedown="setViewMonth(1)">
                        <div class="co-item">다음달</div>
                      </button>
                    </div>
                  </div>
                  <div class="co-b-b-b-b-b-body">
                    <ul class="co-b-b-b-b-b-b-header">
                      <li>
                        <div class="co-item">일</div>
                      </li>
                      <li>
                        <div class="co-item">월</div>
                      </li>
                      <li>
                        <div class="co-item">화</div>
                      </li>
                      <li>
                        <div class="co-item">수</div>
                      </li>
                      <li>
                        <div class="co-item">목</div>
                      </li>
                      <li>
                        <div class="co-item">금</div>
                      </li>
                      <li>
                        <div class="co-item">토</div>
                      </li>
                    </ul>
                    <ul class="co-b-b-b-b-b-b-body">
                      <!-- 휴일(Class) : co-holiday -->
                      <!-- 오늘(Class) : co-today -->
                      <li
                        v-for="dateObj in dateList"
                        :key="dateObj.date"
                        :class="{ 'co-today': isToday(dateObj.date) }"
                      >
                        <label>
                          <input
                            type="radio"
                            v-model="dateValue"
                            :value="format2DigitDate(dateObj.date)"
                            :disabled="dateObj.disable"
                          />
                          <div class="co-label">
                            <div class="co-item">
                              {{ dateObj.date | formatDay }}
                            </div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <ul class="co-b-b-b-b-footer">
                  <li>
                    <button @click.stop="cancelSelectDate">
                      <div class="co-item">취소</div>
                    </button>
                  </li>
                  <li class="co-strong">
                    <button @click.stop="selectDate">
                      <div class="co-item">확인</div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="co-mobile">
          <div class="co-b-body">
            <input type="date" v-model="dateValue" @change="selectDate"/>
            <input
              type="text"
              placeholder="0000-00-00"
              readonly
              v-model="dateValue"
            />
            <i></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

const MAX_LENGTH = 8;

export default {
  name: "DatePicker",
  props: {
    defaultValue: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    refs: {
      type: String,
      default: "datePicker",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
      isFocusOut: true,
      beforeDateValue: this.defaultValue,
      dateValue: this.formatDate(this.value),
      viewDate: new Date(),
    };
  },
  mounted() {
    this.validateDate();
  },
  methods: {
    mouseDownEvt(e) {
      this.isActive = true;
      if (e.target !== this.$refs[this.refs].querySelector("input")) {
        this.isFocusOut = false;
      }
    },
    focusInEvt() {
      this.isFocusOut = true;
    },
    focusOutEvt() {
      if (!this.isFocusOut) {
        this.isActive = true;
        this.$refs[this.refs].querySelector("input").focus();
      } else {
        this.cancelSelectDate();
      }
    },
    setFocusInput() {
      this.$refs[this.refs].querySelector("input").focus();
    },
    setViewMonth(i) {
      this.viewDate = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth() + i,
        1
      );
    },
    format2DigitDate(date) {
      const [year, month, day] = date.split("-");
      return `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}`;
    },
    cancelSelectDate() {
      this.isActive = false;
      this.dateValue = this.beforeDateValue;
      if (this.dateValue) {
        this.viewDate = new Date(this.dateValue);
      }
      this.emitData();
    },
    selectDate() {
      this.isActive = false;
      this.dateValue = moment(this.dateValue).format("YYYY-MM-DD");
      this.beforeDateValue = this.dateValue;
      this.viewDate = new Date(this.dateValue);
      this.emitData();
    },
    isToday(date) {
      const today = new Date();
      const todayDate = `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`;
      return todayDate === date;
    },
    formatNumber(value) {
      return value.replace(/[^0-9]/g, "");
    },
    emitData() {
      this.$emit("input", this.formatNumber(this.dateValue));
    },
    formatValue(evt) {
      this.emitData();
      this.setSelectionPosition(evt);
    },
    formatDate(value) {
      value = value ? this.formatNumber(value) : this.defaultValue;
      const year = value.substr(0, 4);
      const month = value.substr(4, 2);
      const day = value.substr(6, 2);
      return `${year}${month && "-" + month}${day && "-" + day}`;
    },
    validateDate() {
      if (moment(this.dateValue).format() === "Invalid date") {
        this.cancelSelectDate();
      } else {
        this.selectDate();
      }
    },
    validateLength(evt) {
      const charCode = evt.charCode;
      const selection = evt.srcElement.selectionStart;
      const selectionSize = evt.srcElement.selectionEnd - selection;
      const isSelectAll =
        selectionSize !== 0 &&
        selectionSize === this.dateValue.toString().length
          ? true
          : false; //전체 선택된 상태인지 여부
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else if (this.value.length >= MAX_LENGTH && !isSelectAll) {
        evt.preventDefault();
      }
      return true;
    },
    setSelectionPosition(evt) {
      const charCode = evt.which;
      let selection = null;
      const preValueLength = this.dateValue
        ? JSON.parse(JSON.stringify(this.dateValue)).length
        : 0;
      if (
        charCode === 8 ||
        (charCode >= 96 && charCode <= 105) ||
        (charCode >= 48 && charCode <= 57)
      ) {
        selection = evt.srcElement.selectionStart;
      }

      this.dateValue = this.formatDate(this.dateValue);

      if (selection) {
        this.$nextTick(() => {
          if (this.dateValue.length - preValueLength === 1) {
            selection += 1; //추가된 다음 포지션으로 세팅
          }
          // if (preValueLength - this.dateValue.length === 1) {
          //   selection -= 1; //삭제된 포지션으로 세팅
          // }
          this.$refs[this.refs]
            .querySelector("input")
            .setSelectionRange(selection, selection);
        });
      }
    },
  },
  computed: {
    dateList() {
      const dateList = [];

      //지난 달의 마지막 날 Date
      const prevDate = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth(),
        0
      );
      const prevYear = prevDate.getFullYear();
      const prevMonth = prevDate.getMonth() + 1;
      const prevLastDay = prevDate.getDate();

      //이번 달의 마지막 날 Date
      const targetDate = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth() + 1,
        0
      );
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;
      const targetLastDay = targetDate.getDate();

      const firstDayName = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth(),
        1
      ).getDay();

      const nextDate = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth() + 1,
        1
      );
      const nextYear = nextDate.getFullYear();
      const nextMonth = nextDate.getMonth() + 1;

      let startDayCount = 1;
      let lastDayCount = 1;

      for (let i = 0; i < 6; i++) {
        //일요일 ~ 토요일을 위해 7번 반복합니다.
        for (let j = 0; j < 7; j++) {
          // i == 0: 1주차일 때
          // j < firstDayName: 이번 달 시작 요일 이전 일 때
          if (i === 0 && j < firstDayName) {
            dateList.push({
              disable: true,
              date: `${prevYear}-${prevMonth}-${
                prevLastDay - (firstDayName - 1) + j
              }`,
            });
          }
            // i == 0: 1주차일 때
            // j == firstDayName: 이번 달 시작 요일일 때
            // j > firstDayName: 이번 달 시작 요일 이후 일 때
          // startDayCount <= lastDay: 이번 달의 마지막 날이거나 이전일 때
          else if (
            (i === 0 && j === firstDayName) ||
            (i === 0 && j > firstDayName) ||
            (i > 0 && startDayCount <= targetLastDay)
          ) {
            dateList.push({
              disable: false,
              date: `${targetYear}-${targetMonth}-${startDayCount++}`,
            });
          }
          // startDayCount > lastDay: 이번 달의 마지막 날 이후일 때
          else if (startDayCount > targetLastDay) {
            dateList.push({
              disable: true,
              date: `${nextYear}-${nextMonth}-${lastDayCount++}`,
            });
          }
        }
      }
      return dateList;
    },
  },
  filters: {
    formatDay(date) {
      const [, , day] = date.split("-");
      return day;
    },
  },
  watch: {
    dateValue() {
      this.dateValue = this.dateValue.replace(/[ㄱ-ㅎㅏ-ㅣ|가-힣]/gi, "");
      this.emitData();
    },
  },
};
</script>
