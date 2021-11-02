<template>
  <div class="input-with-label__container mb">
    <label :class="{ 'focused-label': focused }" :for="labelText">{{
      labelText
    }}</label>
    <input
      :type="inputType"
      :id="labelText"
      :placeholder="`${labelText}을(를) 입력해주세요.`"
      :value="value"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @input="updateValue"
      :disabled="disabled"
      required
      ref="input"
      autocomplete="off"
      autocapitalize="off"
    />
    <transition name="fade">
      <span class="error mt-1/2 ml-1/2" v-if="error">
        {{ error }}
      </span>
    </transition>
  </div>
</template>

<script>
export default {
  name: "InputWithLabel",

  props: {
    labelText: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    error: {
      type: String,
    },
    value: {
      type: String,
    },
    inputType: {
      type: String,
    },
    isFocus: {
      type: Boolean,
    },
  },

  data() {
    return {
      focused: false,
    };
  },

  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value);
    },

    setFocus(status) {
      this.focused = status;
    },
  },

  mounted() {
    if (this.isFocus) {
      this.$refs.input.focus();
    }
  },
};
</script>

<style scoped>
.input-with-label__container {
  width: 100%;
  color: var(--secondary);
}

.input-with-label__container label {
  margin-bottom: 10px;
  margin-left: 5px;
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: 700;
  transition: all 0.3s ease;
}

.input-with-label__container input {
  width: 100%;
  padding: 10px;
  background-color: var(--secondary);
  color: var(--dark);
  border-radius: 7px;
  letter-spacing: 2px;
  margin-top: 10px;
}

.input-with-label__container input:focus {
  border: 2px solid var(--primary);
}
</style>
