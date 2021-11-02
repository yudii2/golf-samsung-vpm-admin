<template>
  <section class="authentication-setting-navigation__container">
    <NavigationBox
      v-for="(tab, tabIndex) in tabs"
      :key="tabIndex"
      :tabIndex="tabIndex"
      :title="tab.title"
      :items="tab.items"
      :selectedTab="selectedTab"
      @onTitleClick="handleTitleClick"
      @onItemTitleClick="handleItemTitleClick"
    />
  </section>
</template>

<script>
import NavigationBox from "@/components/shared/navigations/NavigationBox.vue";

export default {
  name: "AuthenticationSettingNavigation",

  props: {
    tabs: {
      type: Array,
    },
    selectedTab: {
      type: String,
    },
  },

  components: {
    NavigationBox,
  },

  methods: {
    handleTitleClick(tabIndex) {
      this.$emit("onTitleClick", tabIndex);
    },

    handleItemTitleClick(item) {
      this.$emit("onItemTitleClick", item);
    },
  },

  mounted() {},
};
</script>

<style scoped>
.authentication-setting-navigation__container {
  display: flex;
  flex-direction: column;
}
</style>
