<template>
  <div>
    <div class="search-caddie-name">
      <label
        for="search__caddie_name__input"
      >캐디이름<input
        class="input-dark ml"
        id="search__caddie_name__input"
        type="text"
        placeholder="캐디이름"
        autocomplete="off"
        v-model="searchedCaddieName"
        @keypress.enter="handleFetchCaddieInfo"
      /></label>
    </div>
    <div class="search-caddie-phone-number">
      <label
        for="search__caddie_phone_number__input"
      >휴대폰 번호<input
        class="input-dark ml"
        id="search__caddie_phone_number__input"
        type="text"
        placeholder="뒷번호 4자리 입력"
        autocomplete="off"
        maxlength="4"
        @input="inputMobileNo"
        v-model="searchedCaddieMobileNo"
        @keypress.enter="handleFetchCaddieInfo"
      /></label>
    </div>
    <button class="button-dark ml" @click="handleFetchCaddieInfo">Search</button>
    <button class="button-dark ml" @click="handleFetchLatest">최신화</button>
    <div v-if="isLoading" class="loading">
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CaddieInformationSearch",
  data() {
    return {
      isLoading: false,
      searchedCaddieName: '',
      searchedCaddieMobileNo: '',
    }
  },
  methods: {
    handleFetchCaddieInfo() {
      this.$emit('handleFetchCaddieInfo', this.searchedCaddieName, this.searchedCaddieMobileNo)
    },
    handleFetchLatest() {
      this.$emit('handleFetchLatest')
    },
    handleSave() {
      this.$emit('handleSave', !this.isUpdatable)
    },
    inputMobileNo(event) {
      const nextValue = `${Number(
        event.target.value.replace(/[^\d]/gi, "") || "0"
      )}`;

      if (nextValue === '0') {
        this.searchedCaddieMobileNo = ''
      }
    }
  },
}
</script>

<style scoped>
#search__caddie_name__input,
#search__caddie_phone_number__input {
  width: 180px;
}

.search-caddie-name {
  display: inline-block;
}

.search-caddie-phone-number {
  display: inline-block;
  margin-left: 10px;
}
</style>
