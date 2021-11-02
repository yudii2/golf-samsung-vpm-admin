<template>
  <header>
    <form @submit.prevent="handleSearchSubmit">
      <label for="company-code">사업장</label>
      <input
        id="company-code"
        class="input-dark ml"
        type="text"
        :placeholder="companyCdPlaceholder"
        v-model="companyCd"
      />

      <label class="ml" for="use-yn">사용 여부</label>
      <input
        id="use-yn"
        class="input-dark ml"
        type="text"
        :placeholder="useYnPlaceholder"
        v-model="useYn"
      />
      <button class="button-dark ml">Search</button>
    </form>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getTablets } from "@/api/v1/appSettings/useTablet";

export default {
  name: "TabletManageHeader",

  data() {
    return {
      companyCd: "",
      useYn: "",
      companyCdPlaceholder: "",
      useYnPlaceholder: "",
    };
  },

  computed: {
    ...mapGetters("control", {
      companyCode: "getCompanyCode",
    }),
  },

  methods: {
    init() {
      this.initData();
    },

    initData() {
      this.companyCd = this.companyCode;
      this.companyCdPlaceholder = this.companyCode;

      this.useYn = "Y";
      this.useYnPlaceholder = "Y or N";
    },

    async handleSearchSubmit() {
      const { status, data } = await getTablets(this.companyCd, this.useYn);
      if (status && status === "OK") {
        this.setTablets(data);
      }
    },

    ...mapActions("appSettings", {
      setTablets: "updateTablets",
    }),
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
/* Header start */
header form {
  display: flex;
  align-items: center;
}

header form * {
  height: 35px;
}
header form label {
  color: var(--secondary);
  line-height: 35px;
}
header form input {
  text-transform: uppercase;
}
/* Header end */
</style>
