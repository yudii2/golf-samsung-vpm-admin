<template>
  <nav class="side_navigation__container" @click.stop>
    <section class="contents__container">
      <!-- header -->
      <header class="header">
        <h2 class="store_group_title">Stores</h2>
        <div v-if="isLoading" class="loading">
          <div></div>
        </div>
      </header>

      <!-- store groups -->
      <div v-if="storeGroups.length" class="store_groups__container">
        <!-- list -->
        <div
          v-for="storeGroup in storeGroups"
          :key="storeGroup.storeCd"
          class="store_group__container"
          @click="handleStoreGroupClick(storeGroup.storeType)"
        >
          <!-- 매장명 -->
          <span>{{ storeGroup.storeNm }}</span>

          <!-- 아이콘 -->
          <i
            v-if="storeTypeStatus(storeGroup.storeType)"
            class="fas fa-check"
          ></i>
        </div>
      </div>
      <!-- store groups (empty) -->
      <div class="store_groups__container" v-else>
        <span>No Store</span>
      </div>
    </section>

    <!-- Auto refresh -->
    <RefreshIcon />
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RefreshIcon from "../header/header/RefreshIcon.vue";

export default {
  name: "DashboardMobileSideNavigation",
  components: {
    RefreshIcon,
  },
  props: {
    storeGroups: {
      type: Array,
      require: true,
    },
    selectedStoreType: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      isChanged: false,
    };
  },
  computed: {
    computedSideNavIsOpened() {
      return this.sideNavIsOpened;
    },

    /**
     * ### 현재 스토어 타입과 일치하는지 확인.
     */
    storeTypeStatus() {
      return (storeType) => {
        return this.selectedStoreType === storeType;
      };
    },

    /**
     * ### 좌측(사이드) 네비게이션에서 항목 클릭 시 데이터 로딩 표시.
     */
    isLoading() {
      return this.isChanged && !this.isRefreshing;
    },

    ...mapGetters("control/", {
      isRefreshing: "getIsRefreshing",
    }),
  },
  methods: {
    /**
     * ### 주문 현황 모달창 보이기.
     */
    handleOpenOrderClick() {
      this.setDashboardStoreModal(true);

      this.$emit("updateSideNavIsOpened");
    },

    /**
     * ### 주문 그룹 상태 변경.
     */
    handleStoreGroupClick(storeType) {
      if (!this.isLoading) {
        this.$emit("onStoreGroupClick", storeType);
      }
    },

    ...mapActions({
      setDashboardStoreModal: "updateDashboardStoreModal",
    }),
  },
  watch: {
    selectedStoreType() {
      this.isChanged = true;
    },
    isRefreshing(status) {
      if (!status) this.isChanged = false;
    },
  },
};
</script>

<style scoped>
.side_navigation__container {
  position: absolute;
  top: 0px;
  left: -50%;
  width: 50%;
  background-color: var(--dark);
  z-index: 2;
  height: 100%;
  transition: all 0.3s ease;
  padding: 10px 10px 20px;
}
.side_navigation__container.is\-opened {
  left: 0;
}

/* store roundGroup start */
.contents__container {
  height: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: repeat(10, 1fr);
}

/* header start */
.contents__container .header {
  grid-row: 1/2;
  display: flex;
  align-items: center;
  margin: 15px;
}

/* title start */
.contents__container .header .store_group_title {
  display: inline-block;
  margin-right: 15px;
}
/* title end */

/* loading start */
.loading {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.loading div {
  box-sizing: border-box;
  width: 15px;
  height: 15px;
  border: 3px solid transparent;
  border-left-width: 2px;
  border-top-color: var(--secondary);
  border-radius: 50%;
  animation: spinnerOne 2s infinite linear;
}
/* loading end */

/* header end */

.store_groups__container {
  grid-row: 2/10;
  grid-column: 1/3;
  overflow-y: scroll;
}
.store_group__container {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
/* store roundGroup end */

/* auto refresh start */
.refresh_icon__container {
  position: absolute;
  top: 10px;
  right: 10px;
  transform: scale(0.8);
}
/* auto refresh end */

/* exit start */
.options__container {
  grid-column: 1/3;
  grid-row: 10/11;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  cursor: pointer;
  border-radius: 5px;
}
.options__container:hover {
  background-color: var(--soft-green);
}
.open-order-button,
.exit_button {
  font-weight: 600;
  letter-spacing: 1.5px;
  font-size: 1rem;
}
.exit-icon {
  transform: rotate(180deg);
}
/* exit end */

/* media start */
@media screen and (min-width: 500px) {
  .side_navigation__container {
    left: -40%;
    width: 40%;
  }

  /* auto refresh start */
  .refresh_icon__container {
    transform: scale(0.85);
  }
  /* auto refresh end */
}

@media screen and (min-width: 600px) {
  .side_navigation__container {
    left: -35%;
    width: 35%;
  }

  /* auto refresh start */
  .refresh_icon__container {
    transform: scale(0.87);
  }
  /* auto refresh end */
}

@media screen and (min-width: 800px) {
  .side_navigation__container {
    left: -30%;
    width: 30%;
  }

  /* auto refresh start */
  .refresh_icon__container {
    transform: scale(0.9);
  }
  /* auto refresh end */
}
/* media end */
</style>
