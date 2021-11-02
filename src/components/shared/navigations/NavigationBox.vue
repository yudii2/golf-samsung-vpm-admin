<template>
  <div class="navigation-box__container">
    <div class="nav__wrapper">
      <!-- 탭 타이틀 -->
      <h4 class="mb-1/2" @click="handleTitleClick">
        {{ title }}
      </h4>

      <!-- 탭 목록 -->
      <ul>
        <li
          class="ml-1/2"
          :class="{ selected: item.title === selectedTab }"
          v-for="(item, itemIndex) in items"
          :key="itemIndex"
          @click="handleItemTitleClick(item, itemIndex)"
        >
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationBox",

  props: {
    tabIndex: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    items: {
      type: Array,
    },
    selectedTab: {
      type: String,
    },
  },

  methods: {
    handleTitleClick() {
      this.$emit("onTitleClick", this.tabIndex);
    },

    handleItemTitleClick(item, itemIndex) {
      this.$emit("onItemTitleClick", {
        ...item,
        tabIndex: this.tabIndex,
        itemIndex,
      });
    },
  },

  mounted() {},
};
</script>

<style scoped>
.nav__wrapper {
  margin-bottom: 15px;
}

.nav__wrapper h4 {
  margin-bottom: 10px;
  letter-spacing: 2px;
  cursor: pointer;
}

.nav__wrapper li {
  padding: 10px;
  font-size: 0.9rem;
}

.nav__wrapper li {
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav__wrapper li.clicked {
  font-size: 1rem;
  font-weight: 600;
}

.nav__wrapper li.selected,
.nav__wrapper li:hover {
  font-size: 1rem;
  font-weight: 600;
}

.nav__wrapper li span {
  display: inline-block;
  height: 20px;
}
</style>
