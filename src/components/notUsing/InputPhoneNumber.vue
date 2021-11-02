<template>
  <div class="component-input">
    <input
      type="text"
      placeholder="00-000-0000"
      v-model="numberValue"
      :ref="refs"
      :disabled="disabled"
      @keypress="validate"
      @keyup="formatValue"
      @focusout="blurEvt"
    />
  </div>
</template>

<script>
import modalMixin from "../mixin/modalMixin";

const MAX_LENGTH = 11;

export default {
  name: "InputPhoneNumber",
  mixins: [modalMixin],
  props: {
    refs: {
      type: String,
      default: "inputPhoneNumber",
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    value: {
      type: String,
      default: "",
    },
    defaultValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      numberValue: this.formatTel(this.value),
      isBackspace: false,
    };
  },
  mounted() {
    this.emitData();
  },
  methods: {
    validate(evt) {
      const charCode = evt.charCode;
      const selection = evt.srcElement.selectionStart;
      const selectionSize = evt.srcElement.selectionEnd - selection;
      const isSelectAll =
        selectionSize !== 0 &&
        selectionSize === this.numberValue.toString().length
          ? true
          : false; //전체 선택된 상태인지 여부
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else if (this.value.length >= MAX_LENGTH && !isSelectAll) {
        evt.preventDefault();
      }
      return true;
    },
    blurEvt() {
      if (this.value.length > MAX_LENGTH) {
        alert("올바른 전화번호를 입력해 주세요.");
        this.numberValue = this.defaultValue;
        this.emitData();
      }
    },
    formatValue(evt) {
      this.emitData();
      this.setSelectionPosition(evt);
    },
    formatNumber(value) {
      return value.replace(/[^0-9]/g, "");
    },
    formatTel(value) {
      value = value ? this.formatNumber(value) : "";
      if (value[0] === "0") {
        if (value[1] === "2") {
          // 지역번호 02
          if (value.length > 6) {
            return `${value.substr(0, 2)}-${value.substr(
              2,
              value.length - 6
            )}-${value.substr(-4)}`;
          } else if (value.length > 2) {
            return `${value.substr(0, 2)}-${value.substr(2)}`;
          }
        } else {
          if (value.length > 7) {
            return `${value.substr(0, 3)}-${value.substr(
              3,
              value.length - 7
            )}-${value.substr(-4)}`;
          } else if (value.length > 3) {
            return `${value.substr(0, 3)}-${value.substr(3)}`;
          }
        }
      } else {
        if (value.length > 4) {
          return `${value.substr(0, 4)}-${value.substr(4)}`;
        }
      }
      return value;
    },
    emitData() {
      this.$emit("input", this.formatNumber(this.numberValue));
    },
    setSelectionPosition(evt) {
      const charCode = evt.which;
      let selection = null;
      const preValueLength = this.numberValue
        ? JSON.parse(JSON.stringify(this.numberValue)).length
        : 0;
      if (
        charCode === 8 ||
        (charCode >= 96 && charCode <= 105) ||
        (charCode >= 48 && charCode <= 57)
      ) {
        selection = evt.srcElement.selectionStart;
      }

      this.numberValue = this.formatTel(this.numberValue);

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
    },
  },
  watch: {
    numberValue() {
      this.numberValue = this.numberValue.replace(/[ㄱ-ㅎㅏ-ㅣ|가-힣]/gi, "");
    },
  },
};
</script>
