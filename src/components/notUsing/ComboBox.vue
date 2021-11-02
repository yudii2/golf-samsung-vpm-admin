<template>
  <div class="sa-object">
    <!-- 비활성(Class) : co-disabled / 활성(Class) : co-active -->
    <div
      class="component-select"
      :class="{ 'co-active': isActive, 'co-disabled': disabled }"
      :ref="refs"
      @mousedown="mouseDownEvt"
      @focusout="blurEvt"
      @keydown="keyDownEvt"
    >
      <div class="co-body">
        <div class="co-pc">
          <div class="co-b-header">
            <input
              type="text"
              placeholder="선택하세요."
              readonly
              :value="pickedOption ? pickedOption.text : ''"
              @focusout="focusOutEvt"
            />
            <i></i>
          </div>
          <div class="co-b-body">
            <div class="co-b-b-body">
              <div class="co-b-b-b-body">
                <ul class="co-b-b-b-b-body">
                  <li
                    v-for="(option, i) in filteredOptions"
                    @mousedown="pickOption(i)"
                    :key="i"
                  >
                    <label>
                      <input
                        type="radio"
                        v-model="pickedOption"
                        :value="option"
                      />
                      <div class="co-label">
                        <div class="co-item">
                          {{ option ? option.text : "" }}
                        </div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="co-mobile">
          <div class="co-b-body">
            <select required v-model="pickedOption" @change="emitData">
              <option :value="{}" disabled hidden selected>선택하세요.</option>
              <option
                v-for="(option, i) in filteredOptions"
                :key="i"
                :value="option"
              >
                {{ option.text }}
              </option>
            </select>
            <i></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComboBox",
  props: {
    value: {
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    refs: {
      type: String,
      default: "comboBox",
    },
    noSelect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
      isFocus: false,
      pickedOption: this.initPickedOption(this.value),
    };
  },
  methods: {
    focusOutEvt() {
      if (this.isFocus) {
        this.isFocus = false;
        this.$nextTick(() => {
          this.$refs[this.refs].querySelector("input").focus();
        });
      }
    },
    mouseDownEvt() {
      this.isActive = !this.isActive;
      this.isFocus = true;
    },
    blurEvt() {
      if (this.isActive) {
        this.isActive = !this.isActive;
      }
    },
    keyDownEvt(e) {
      const optionIndex = this.filteredOptions.findIndex(
        (option) => option === this.pickedOption
      );
      if (
        e.key === "ArrowDown" &&
        this.filteredOptions.length - 1 > optionIndex
      ) {
        e.preventDefault();
        this.pickOption(optionIndex + 1);
      } else if (e.key === "ArrowUp" && optionIndex > 0) {
        e.preventDefault();
        this.pickOption(optionIndex - 1);
      } else if (e.key === "Enter") {
        this.isActive = !this.isActive;
      } else if (e.key === "Escape") {
        this.isActive = false;
      }
    },
    pickOption(i) {
      this.pickedOption = this.filteredOptions[i];
      this.emitData();
    },
    emitData() {
      this.$emit("input", this.pickedOption.value);
    },
    initPickedOption(value) {
      return this.options.find((option) => option.value === value);
    },
  },
  computed: {
    filteredOptions() {
      if (this.noSelect) {
        const options = this.options.map((el) => el);
        options.unshift({ text: "선택없음", value: null });
        return options;
      }
      return this.options;
    },
  },
};
</script>
