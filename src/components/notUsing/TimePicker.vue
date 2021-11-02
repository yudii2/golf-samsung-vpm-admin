<template>
  <div class="sa-object">
    <!-- 비활성(Class) : co-disabled / 활성(Class) : co-active -->
    <div
      class="component-time"
      :class="{ 'co-active': isActive, 'co-disabled': disabled }"
      @mousedown="mouseDownEvt"
      :ref="refs"
    >
      <div class="co-body">
        <div class="co-pc">
          <div class="co-b-header">
            <input
              type="text"
              placeholder="00:00"
              v-model="timeValue"
              @keypress="validateLength"
              @keypress.enter="validateTime"
              @keyup="formatValue"
              @focusout="focusOutEvt"
              @focusin="focusInEvt"
            />
            <i @mousedown="setFocusInput"></i>
          </div>
          <div class="co-b-body">
            <div class="co-b-b-body">
              <div class="co-b-b-b-body">
                <ul class="co-b-b-b-b-body">
                  <li>
                    <ul class="co-b-b-b-b-b-body">
                      <li>
                        <label>
                          <input type="radio" v-model="isAM" :value="true" />
                          <div class="co-label">
                            <div class="co-item">오전</div>
                          </div>
                        </label>
                      </li>
                      <li>
                        <label>
                          <input type="radio" v-model="isAM" :value="false" />
                          <div class="co-label">
                            <div class="co-item">오후</div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul class="co-b-b-b-b-b-body">
                      <li v-for="hour in 12" :key="hour">
                        <label>
                          <input
                            type="radio"
                            v-model="hourValue"
                            :value="format2Digit(filterAM(hour - 1))"
                          />
                          <div class="co-label">
                            <div class="co-item">
                              {{ format2Digit(hour - 1) }}
                            </div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul class="co-b-b-b-b-b-body">
                      <li v-for="minute in 60" :key="minute">
                        <label>
                          <input
                            type="radio"
                            v-model="minuteValue"
                            :value="format2Digit(minute - 1)"
                          />
                          <div class="co-label">
                            <div class="co-item">
                              {{ format2Digit(minute - 1) }}
                            </div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul class="co-b-b-b-b-footer">
                  <li>
                    <button @click.stop="cancelSelectTime">
                      <div class="co-item">취소</div>
                    </button>
                  </li>
                  <li class="co-strong">
                    <button @click.stop="validateTime">
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
            <input type="time" v-model="timeValue" @change="selectTime" />
            <input
              type="text"
              placeholder="00:00"
              v-model="timeValue"
              readonly
            />
            <i></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "../mixin/modalMixin";

const MAX_LENGTH = 5;

export default {
  name: "TimePicker",
  mixins: [modalMixin],
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
      default: "timePicker",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
      isAM: true,
      timeValue: "",
      hourValue: "",
      minuteValue: "",
      beforeTimeValue: "",
    };
  },
  mounted() {
    this.timeValue = this.formatDate(this.value);
    this.emitData();
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
      if (this.value.length > MAX_LENGTH) {
        this.openAlertModal("올바른 시간을 입력해 주세요.");
        this.timeValue = this.defaultValue;
        this.emitData();
      }
      if (!this.isFocusOut) {
        this.isActive = true;
        this.$refs[this.refs].querySelector("input").focus();
      } else {
        this.cancelSelectTime();
      }
    },
    setFocusInput() {
      this.$refs[this.refs].querySelector("input").focus();
    },
    formatNumber(value) {
      return value.replace(/[^0-9]/g, "");
    },
    format2Digit(value) {
      return ("00" + value).slice(-2);
    },
    validateTime() {
      this.hourValue = this.format2Digit(this.hourValue);
      this.minuteValue = this.format2Digit(this.minuteValue);
      if (Number(this.hourValue) >= 24 || Number(this.minuteValue) > 59) {
        this.cancelSelectTime();
      } else {
        this.timeValue = `${this.hourValue}:${this.minuteValue}`;
        this.selectTime();
      }
    },
    validateLength(evt) {
      const charCode = evt.charCode;
      const selection = evt.srcElement.selectionStart;
      const selectionSize = evt.srcElement.selectionEnd - selection;
      const isSelectAll =
        selectionSize !== 0 &&
        selectionSize === this.timeValue.toString().length
          ? true
          : false; //전체 선택된 상태인지 여부
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else if (this.value.length >= MAX_LENGTH && !isSelectAll) {
        evt.preventDefault();
      }
      return true;
    },
    emitData() {
      this.$emit("input", this.timeValue);
    },
    formatValue(evt) {
      this.emitData();
      this.setSelectionPosition(evt);
    },
    cancelSelectTime() {
      this.isActive = false;
      this.timeValue = this.beforeTimeValue;
      this.hourValue = this.formatNumber(this.beforeTimeValue).substr(0, 2);
      this.minuteValue = this.formatNumber(this.beforeTimeValue).substr(2, 2);
      this.emitData();
    },
    selectTime() {
      this.isActive = false;
      this.beforeTimeValue = this.timeValue;
      this.emitData();
    },
    filterAM(value) {
      value = Number(value);
      return this.isAM ? value : value + 12;
    },
    formatDate(value) {
      value = value ? this.formatNumber(value) : this.defaultValue;
      const hour = value.substr(0, 2);
      const minute = value.substr(2, 2);
      this.hourValue = hour;
      this.minuteValue = minute;
      return `${hour}${minute && ":" + minute}`;
    },
    setSelectionPosition(evt) {
      const charCode = evt.which;
      let selection = null;
      const preValueLength = this.timeValue
        ? JSON.parse(JSON.stringify(this.timeValue)).length
        : 0;
      if (
        charCode === 8 ||
        (charCode >= 96 && charCode <= 105) ||
        (charCode >= 48 && charCode <= 57)
      ) {
        selection = evt.srcElement.selectionStart;
      }

      this.timeValue = this.formatDate(this.timeValue);

      if (selection) {
        this.$nextTick(() => {
          if (this.timeValue.length - preValueLength === 1) {
            selection += 1; //추가된 다음 포지션으로 세팅
          }
          if (preValueLength - this.timeValue.length === 1) {
            selection -= 1; //삭제된 포지션으로 세팅
          }
          this.$refs[this.refs]
            .querySelector("input")
            .setSelectionRange(selection, selection);
        });
      }
    },
  },
  watch: {
    isAM(value) {
      if (value && this.hourValue >= 12) {
        this.hourValue = this.format2Digit(Number(this.hourValue) % 12);
      } else if (!value && this.hourValue < 12) {
        this.hourValue = this.format2Digit(Number(this.hourValue) + 12);
      }
    },
    timeValue() {
      this.timeValue = this.timeValue.replace(/[ㄱ-ㅎㅏ-ㅣ|가-힣]/gi, "");
      if (this.timeValue === "") {
        this.hourValue = "";
        this.minuteValue = "";
      }
    },
    hourValue(value) {
      this.isAM = value < 12;
      this.timeValue = this.formatDate(`${this.hourValue}${this.minuteValue}`);
      this.emitData();
    },
    minuteValue(value) {
      if (value) {
        this.hourValue = this.hourValue || "00";
      }
      this.timeValue = this.formatDate(`${this.hourValue}${this.minuteValue}`);
      this.emitData();
    },
  },
};
</script>
