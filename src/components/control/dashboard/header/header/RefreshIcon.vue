<template>
  <div class="refresh_icon__container" ref="iconContainer">
    <div class="refresh_icon">
      <div class="spinner" @click="handleRefreshClick">
        <img
          :src="require('@/assets/images/control/dashboard/ico_refresh.png')"
          class="pointer"
          :class="{ running: getAutoRefreshMode }"
        />
        <transition name="fade">
          <div v-if="getAutoRefreshMode"></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RefreshIcon",
  methods: {
    async handleRefreshClick() {
      if (!this.getIsRefreshing) {
        this.toggleAutoRefreshMode();
      }
      // note. 테스트 용도 지우지 마세요.
      // const { init } = useData();
      // await init();
    },
    ...mapActions("control/", {
      toggleAutoRefreshMode: "toggleAutoRefreshMode",
    }),
  },
  computed: {
    ...mapGetters("control/", {
      getAutoRefreshMode: "getAutoRefreshMode",
      getIsRefreshing: "getIsRefreshing",
    }),
  },
};
</script>

<style scoped>
.refresh_icon__container {
  width: 35px;
  height: 35px;
}
.refresh_icon {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}
.refresh_icon:hover {
  transform: scale(1.1);
}

.refresh_icon img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 33px;
  height: 33px;
  background: #39b7a4;
  padding: 5px;
  border-radius: 50%;
  border: none;
}

.refresh_icon .spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  cursor: pointer;
  z-index: 1;
}
</style>
