<template>
  <!-- 포커스 : focus / 비활성 : disabled -->
  <div class="component-input">
    <input
      type="text"
      :name="name"
      v-on:keypress="validate"
      v-model="numberValue"
      :ref="refs"
      :disabled="disabled"
      :style="{ textAlign: align }"
      v-on:keyup="inputNumberAutoComma"
      @keydown="inputkeypressed"
      v-on:blur="blurEvnt"
      v-on:focusin="focusInEvnt"
      v-on:change="hiddenChange"
      autocomplete="off"
    />

    <input type="hidden" :id="id" v-model="resultValue" />
  </div>
</template>

<script>
import modalMixin from "../mixin/modalMixin";

const MAX_LENGTH = 13;
const MAX_UNDER_DOT_LENGTH = 2;
export default {
  name: "inputNumber",
  mixins: [modalMixin],
  props: {
    id: String,
    name: {
      type: String,
      default: "name",
    },
    align: {
      type: String,
      default: "right",
    },
    refs: {
      type: String,
      default: "inputNumber",
    },
    defaultValue: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    allowDot: {
      type: Boolean,
      default: false,
    },
    allowMinus: {
      type: Boolean,
      default: false,
    },
    propMaxLength: {
      type: Number,
      default: MAX_LENGTH,
    },
    propMaxUnderDotLength: {
      type: Number,
      default: MAX_UNDER_DOT_LENGTH,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    nullableNumber: {
      type: Number,
      default: null,
    },
    displayComma: {
      type: Boolean,
      default: true,
    },
    propUsedInGrid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
      data: {},
      lastEmitValue: null,
      isOnChangeEvent: false,
      numberValue: this.getInitValue(this.value),
      maxLength: this.propMaxLength ? this.propMaxLength : MAX_LENGTH,
      maxUnderDotLength: this.propMaxUnderDotLength
        ? this.propMaxUnderDotLength
        : MAX_UNDER_DOT_LENGTH,
    };
  },
  watch: {
    propMaxLength() {
      this.maxLength = this.propMaxLength ? this.propMaxLength : MAX_LENGTH;
    },
    value() {
      this.numberValue = this.getInitValue(this.value);
    },
    numberValue() {
      this.numberValue = this.numberValue.replace(/[ㄱ-ㅎㅏ-ㅣ|가-힣]/gi, "");
    },
  },
  computed: {
    resultValue() {
      return this.getResultValue();
    },
  },
  methods: {
    focus() {
      this.$refs[this.refs].focus();
    },
    hiddenChange() {
      const resultValue = this.getResultValue();

      this.$emit("input", resultValue);
      this.$emit("change", resultValue);
    },
    getResultValue() {
      if (this.allowDot) {
        return Number.parseFloat(
          this.inputNumberMinMaxValue(
            this.inputNumberRemoveZero(
              this.inputNumberRemoveComma(this.numberValue)
            )
          )
        );
      } else {
        return Number.parseInt(
          this.inputNumberMinMaxValue(
            this.inputNumberRemoveZero(
              this.inputNumberRemoveComma(this.numberValue)
            )
          )
        );
      }
    },
    focusInEvnt() {
      this.active = true;
      if (this.numberValue) {
        this.$refs[this.refs].setSelectionRange(0, this.numberValue.length);
      }
    },
    blurEvnt() {
      this.active = false;
      if (
        this.min !== null &&
        this.inputNumberRemoveComma(this.numberValue) < this.min
      ) {
        this.openAlertModal(this.min + "보다 작을 수 없습니다.");
      } else if (
        this.max !== null &&
        this.inputNumberRemoveComma(this.numberValue) > this.max
      ) {
        this.openAlertModal(this.max + "보다 클 수 없습니다.");
      }

      const inputNumberValue = this.inputNumberMinMaxValue(
        this.inputNumberRemoveZero(
          this.inputNumberRemoveComma(this.numberValue)
        )
      );
      this.numberValue = this.inputNumberWithComma(inputNumberValue);
      this.emitData(this.numberValue);

      // 그리드 template으로 사용한 경우 : 숫자 값이 그리드에 저장될 수 있도록 함
      if (this.propUsedInGrid) {
        this.numberValue = inputNumberValue;
      }
      // this.$emit("change", this.getEmittedValue(this.numberValue));
    },
    getInitValue(value) {
      let result = value ? value : this.defaultValue;
      if (this.allowDot) {
        result = parseFloat(
          this.inputNumberRemoveZero(this.inputNumberRemoveComma(value))
        );
      } else {
        result = parseInt(
          this.inputNumberRemoveZero(this.inputNumberRemoveComma(value))
        );
      }
      if (isNaN(result)) {
        this.$emit("input", this.nullableData(this.defaultValue));
        return this.defaultValue;
      } else {
        const initValue = this.inputNumberWithComma(
          this.inputNumberRemoveZero(this.inputNumberRemoveComma(result))
        );
        const emitData = initValue.includes(".")
          ? Number.parseFloat(this.inputNumberRemoveComma(initValue))
          : Number.parseInt(this.inputNumberRemoveComma(initValue));
        this.$emit("input", this.nullableData(emitData));
        return initValue;
      }
    },
    nullableData(data) {
      if (this.nullableNumber !== null && this.nullableNumber === data) {
        return null;
      }
      return data;
    },
    validate(evt) {
      const charCode = evt.which;
      const selection = evt.srcElement.selectionStart;
      const selectionSize = evt.srcElement.selectionEnd - selection;
      const isSelectAll =
        selectionSize !== 0 &&
        selectionSize === this.numberValue.toString().length
          ? true
          : false; //전체 선택된 상태인지 여부
      if (this.allowDot) {
        if (
          charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46 &&
          !(this.allowMinus && charCode === 45)
        ) {
          evt.preventDefault(); //먼저 키보드 키 값으로만 막기
        } else if (this.allowMinus && selection !== 0 && charCode === 45) {
          evt.preventDefault(); //마이너스 표기 위치에 따른 입력 막기
        } else if (
          this.allowMinus &&
          selection === 0 &&
          charCode === 45 &&
          this.numberValue.toString().includes("-") &&
          !isSelectAll
        ) {
          evt.preventDefault(); //마이너스 중복표기 막기
        } else {
          const preValue = evt.target.value.replace("-", "");
          const dotIndex = preValue.indexOf(".");
          const preValueArr = preValue.split(".");
          if (
            this.numberValue &&
            this.numberValue.toString().includes(".") &&
            charCode === 46
          ) {
            evt.preventDefault(); //dot(.) 두번 입력 못하도록 막기
          } else if (dotIndex >= 0) {
            if (
              selection > dotIndex &&
              preValueArr[1].length >= this.maxUnderDotLength
            ) {
              evt.preventDefault(); //소수점 이하 자리수 체크해서
            } else if (
              selection <= dotIndex &&
              this.inputNumberRemoveComma(preValueArr[0]).length >=
                this.maxLength &&
              !isSelectAll
            ) {
              evt.preventDefault(); //소수점 이상 자리수 체크해서
            }
          } else if (
            dotIndex === -1 &&
            this.inputNumberRemoveComma(preValue).length >= this.maxLength &&
            charCode !== 46 &&
            !isSelectAll
          ) {
            evt.preventDefault(); //소수점 없이 정수일 때 자리수 체크해서 막기
          }
          return true;
        }
      } else {
        if (
          charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          !(this.allowMinus && charCode === 45)
        ) {
          evt.preventDefault(); //먼저 키보드 키 값으로만 막기 (dot 포함)
        } else if (this.allowMinus && selection !== 0 && charCode === 45) {
          evt.preventDefault(); //마이너스 표기 위치에 따른 입력 막기
        } else if (
          this.allowMinus &&
          selection === 0 &&
          charCode === 45 &&
          this.numberValue.toString().includes("-") &&
          !isSelectAll
        ) {
          evt.preventDefault(); //마이너스 중복표기 막기
        } else {
          if (
            this.inputNumberRemoveComma(this.numberValue.replace("-", ""))
              .length >= this.maxLength &&
            !isSelectAll
          ) {
            evt.preventDefault(); //자릿수 체크해서 막기
          }
          return true;
        }
      }
    },
    inputNumberAutoComma(obj) {
      const charCode = obj.which;
      let selection = null;
      const preValueLength = this.numberValue
        ? JSON.parse(JSON.stringify(this.numberValue)).length
        : 0;
      if (
        charCode === 8 ||
        (charCode >= 96 && charCode <= 105) ||
        (charCode >= 48 && charCode <= 57)
      ) {
        selection = obj.srcElement.selectionStart;
      }

      if (this.numberValue !== "-") {
        this.numberValue = this.inputNumberWithComma(
          this.inputNumberRemoveZero(
            this.inputNumberRemoveComma(this.numberValue)
          )
        );
      }

      if (selection) {
        this.$nextTick(() => {
          if (this.numberValue.length - preValueLength === 1) {
            selection += 1; //추가된 다음 포지션으로 세팅
          }
          if (preValueLength - this.numberValue.length === 1) {
            selection -= 1; //삭제된 포지션으로 세팅
          }
          this.$refs[this.refs].setSelectionRange(selection, selection);
        });
      }

      if (this.numberValue !== "-") {
        this.emitData(this.numberValue);
      }
    },
    inputkeypressed(args) {
      // 그리드 template으로 사용한 경우 : 숫자 값이 그리드에 저장될 수 있도록 함
      if (this.propUsedInGrid) {
        if (
          args.key == "Enter" ||
          args.key == "ArrowUp" ||
          args.key == "ArrowDown" ||
          args.key == "Tab"
        ) {
          this.numberValue = this.inputNumberMinMaxValue(
            this.inputNumberRemoveZero(
              this.inputNumberRemoveComma(this.numberValue)
            )
          );
        }
      }
    },
    inputNumberWithComma(str) {
      str = String(str);
      const strArr = str.split(".");
      if (strArr.length > 1) {
        //소숫점 형식은 소숫점으로 나눠서 정수 부분만 Comma 입력
        const firstNum = this.displayComma
          ? strArr[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
          : strArr[0];
        return firstNum + "." + strArr[1];
      } else {
        return this.displayComma
          ? str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
          : str;
      }
    },
    inputNumberRemoveComma(str) {
      str = String(str);
      str = str.replace(/[ㄱ-ㅎㅏ-ㅣ|가-힣]/gi, "");
      const strArr = str.split(".");
      const hasMinus = str.startsWith("-");
      let result = this.defaultValue;
      if (strArr.length > 1) {
        //소숫점 형식은 소숫점으로 나눠서 Comma 삭제 후 소수 부분은 자릿수대로 자르기
        const firstNum = strArr[0].replace(/[^\d]+/g, "");
        const secondNum = strArr[1]
          .replace(/[^\d]+/g, "")
          .slice(0, this.maxUnderDotLength);
        result = firstNum + "." + secondNum;
      } else {
        result = str.replace(/[^\d]+/g, "");
      }
      if (isNaN(result)) {
        return this.defaultValue;
      } else {
        return hasMinus ? "-" + result : result;
      }
    },
    inputNumberRemoveZero(str) {
      const tmpNum = Number.parseInt(str);
      if (str === "-0") {
        return "-0";
      }

      if (this.allowDot) {
        const strArr = str.split(".");
        if (strArr.length > 1) {
          //소숫점으로 시작하면 0으로 시작가능
          const firstNum = Number.parseInt(strArr[0]);
          return (isNaN(firstNum) ? 0 : firstNum) + "." + strArr[1];
        } else {
          if (isNaN(tmpNum)) {
            return this.inputNumberMinMaxValue(this.defaultValue);
          } else {
            return String(tmpNum);
          }
        }
      } else {
        if (isNaN(tmpNum)) {
          return this.inputNumberMinMaxValue(this.defaultValue);
        } else {
          return String(tmpNum);
        }
      }
    },
    inputNumberMinMaxValue(str) {
      const tmpNum = Number.parseInt(str);
      if (this.min !== null && tmpNum < this.min) {
        if (this.defaultValue) {
          return String(this.defaultValue);
        }
        return String(this.min);
      }
      if (this.max !== null && tmpNum > this.max) {
        if (this.defaultValue) {
          return String(this.defaultValue);
        }
        return String(this.max);
      }
      return str;
    },
    emitData(value) {
      this.$emit("input", this.getEmittedValue(value));
    },
    getEmittedValue(value) {
      const emitData = this.allowDot
        ? Number.parseFloat(this.inputNumberRemoveComma(value))
        : Number.parseInt(this.inputNumberRemoveComma(value));
      if (isNaN(emitData)) {
        return this.nullableData(this.defaultValue);
      } else {
        return this.nullableData(emitData);
      }
    },
  },
};
</script>

<style scoped></style>
