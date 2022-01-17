<template>
  <div
    id="order-info__container"
    ref="order_container"
    v-if="isOrderModalShown"
  >
    <div class="info_container">
      <!-- 캐디 명 -->
      <div class="order-info-row">
        <div class="order_list_title">주문목록</div>
      </div>

      <div class="order-info-row">
        <template v-for="(order, i) in orderingList">
          <div :key="`${order.itemCd}${i}`">
            {{ order.itemDisplayNm }}
            <!--            <div-->
            <!--              v-for="option in order.simpleSubOrderingVOList"-->
            <!--              :key="option.itemCd"-->
            <!--            >-->
            <!--              - {{ option.itemDisplayNm }}-->
            <!--            </div>-->
            <!--            <div v-if="order.comments">- {{ order.comments }}</div>-->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "OrderInfo",
  computed: {
    orderingList() {
      return this.selectedOrder?.simpleOrderingVOList || [];
    },
    ...mapGetters({
      isOrderModalShown: "getIsShowingOrderInfoModal",
    }),
    ...mapGetters("control/", {
      selectedOrder: "getSelectedOrder",
    }),
  },
  methods: {
    handleMouseEvent(e) {
      try {
        const { innerWidth } = window;
        const moveX =
          e.x > innerWidth - 400
            ? -1 * (innerWidth / 10 / 2) - 80
            : innerWidth / 10 / 5;
        const moveY = e.y > 100 ? -50 : 0;

        let modifiedX = `${e.x + moveX}`;
        let modifiedY = `${e.y + moveY}`;

        this.$refs.order_container.style.transform = `translate(${modifiedX}px, ${modifiedY}px)`;
      } catch (e) {
        console.error(e.message);
      }
    },
    ...mapActions({
      updateIsShowingOrderInfoModal: "updateIsShowingOrderInfoModal",
    }),
  },

  destroyed() {
    window.removeEventListener("mousemove", this.handleMouseEvent, true);
  },
  watch: {
    isOrderModalShown(status) {
      if (status) {
        window.addEventListener("mousemove", this.handleMouseEvent, true);
      } else {
        window.removeEventListener("mousemove", this.handleMouseEvent, true);
      }
    },
  },
};
</script>

<style scoped>
#order-info__container {
  position: absolute;
  top: 0;
  left: 0;
  background-color: tomato;
  z-index: 200;
  background-color: var(--soft-green);
  border-radius: 10px;
  padding: 5px;
}

.order-info-row:nth-child(2) {
  margin: 1px 0;
}
.order-info-row .order_list_title {
  font-weight: bold;
  font-size: 1rem;
}
.order-info-row > div {
  line-height: 22px;
}

/* media start */
@media screen and (width: 1280px) {
  #order-info__container {
    padding: 7px;
  }

  .order-info-row:nth-child(2) {
    margin: 3px 0;
  }
  .order-info-row .order_list_title {
    font-weight: bold;
    font-size: 17px;
  }
}

@media screen and (min-width: 1920px) {
  #order-info__container {
    padding: 10px;
  }

  .order-info-row:nth-child(2) {
    margin: 5px 0;
  }
  .order-info-row .order_list_title {
    font-weight: bold;
    font-size: 17px;
  }
}
</style>
