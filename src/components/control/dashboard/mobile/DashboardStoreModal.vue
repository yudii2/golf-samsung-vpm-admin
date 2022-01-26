<template>
  <div class="backdrop" @click.self="handleCloseClick">
    <main id="dashboard_store_modal__container">
      <CloseButton @onClose="handleCloseClick" />

      <!-- header -->
      <header class="header__container">
        <!-- title -->
        <h2 class="header_title">주문 목록</h2>

        <!-- date -->
        <form class="date-range-form">
          <label class="date-range-label" for="date-range-from">
            예약시간설정
          </label>
          <input
            id="date-range-from"
            class="date-range-input input-dark"
            type="number"
            placeholder="0000"
            value="0000"
            v-model="dateFrom"
          />
          <span class="date-range-divider">~</span>
          <input
            class="date-range-input input-dark"
            type="number"
            placeholder="2359"
            value="2359"
            v-model="dateTo"
          />
        </form>
      </header>

      <!-- order list -->
      <section class="order_list_wrapper">
        <table v-if="showingOrders && showingOrders.length">
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="18%" />
            <col width="7%" />
            <col width="15%" />
            <col width="10%" />
            <col width="12%" />
            <col width="12%" />
          </colgroup>

          <!-- header -->
          <thead>
            <tr>
              <th>코스</th>
              <th>시간</th>
              <th>예약자</th>
              <th>주문목록</th>
              <th>수량</th>
              <th>위치정보</th>
              <th>캐디명</th>
              <th>주문상태</th>
              <th>승인</th>
            </tr>
          </thead>

          <!-- body -->
          <tbody>
            <tr v-for="(order, orderIndex) in showingOrders" :key="orderIndex">
              <!-- 예약 코스 -->
              <td>{{ order.bookgCourseNm }}</td>

              <!-- 예약 시간 -->
              <td>{{ order.bookgTime | time }}</td>

              <!-- 예약자명 -->
              <td>{{ order.orderNm }}</td>

              <!-- 주문목록 (개발용) -->
              <td>
                <ul class="order-list__container">
                  <li
                    v-for="(orderItem, orderItemIndex) in complicatedOrders(
                      order.simpleOrderingVOList
                    )"
                    :key="orderItemIndex"
                  >
                    <div class="order-info__container">
                      <!-- 옵션 있는 주문 -->
                      <div
                        class="order-info__wrapper"
                        v-if="hasOptionOrderItemCount(orderItem)"
                      >
                        <span class="order-text"
                          >- {{ orderItemName(orderItem) }}</span
                        >
                      </div>

                      <!-- 옵션 없는 주문 -->
                      <div
                        class="order-info__wrapper mt-1/4"
                        v-if="hasNotOptionOrderItemCount(orderItem)"
                      >
                        <span class="order-text"
                          >- {{ orderItemName(orderItem) }}</span
                        >
                      </div>

                      <!-- 주문 음식 옵션 -->
                      <div
                        class="order-info__wrapper mt-1/4 mb-1/2"
                        v-for="(option, optionIndex) in orderOptions(orderItem)"
                        :key="optionIndex"
                      >
                        <span class="order-option-name ml-1/2">{{
                          option.itemDisplayNm
                        }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </td>

              <!-- 수량 -->
              <td>
                <ul class="order-list__container">
                  <li
                    v-for="(orderItem, orderItemIndex) in complicatedOrders(
                      order.simpleOrderingVOList
                    )"
                    :key="orderItemIndex"
                  >
                    <div class="order-info__container">
                      <!-- 옵션 있는 주문 -->
                      <div
                        class="order-info__wrapper order-count"
                        v-if="hasOptionOrderItemCount(orderItem)"
                      >
                        <span class="order-text">{{
                          hasOptionOrderItemCount(orderItem)
                        }}</span>
                      </div>

                      <!-- 옵션 없는 주문 -->
                      <div
                        class="order-info__wrapper order-count mt-1/4"
                        v-if="hasNotOptionOrderItemCount(orderItem)"
                      >
                        <span class="order-text">{{
                          hasNotOptionOrderItemCount(orderItem)
                        }}</span>
                      </div>

                      <!-- 주문 음식 옵션 -->
                      <div
                        class="order-info__wrapper order-count mt-1/4 mb-1/2"
                        v-for="(option, optionIndex) in orderOptions(orderItem)"
                        :key="optionIndex"
                      >
                        <span class="order-option-name hidden ml-1/2">_</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </td>

              <!-- 코스 정보 -->
              <td>{{ order.curPos }}</td>

              <!-- 캐디명 -->
              <td>{{ order.caddieName }}</td>

              <!-- 주문 상태 -->
              <td>{{ order.stateNm }}</td>

              <!-- 승인 -->
              <td>
                <div class="buttons" v-if="isOrderAcceptable(order.stateCd)">
                  <button
                    @click="handleOrderAcceptClick(order, true)"
                    class="button button-okay"
                  >
                    <i class="fas fa-check-circle fa-lg"></i>
                  </button>
                  <button
                    @click="handleOrderAcceptClick(order, false)"
                    class="button button-nope"
                  >
                    <i class="fas fa-times-circle fa-lg"></i>
                  </button>
                </div>
                <span v-else>{{ getAcceptedMessage(order.stateCd) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty_orders"><span>No Orders...</span></div>
      </section>
    </main>
  </div>
</template>

<script>
import CloseButton from "@/components/shared/CloseButton.vue";
import { mapActions, mapGetters } from "vuex";
import useRestaurant from "@/api/v1/monitor/useRestaurant";
import TimeUtil from "@/utils/datetime/TimeUtil";
import { useInput } from "@/utils/string";
import useDate from "@/composables/useDate";

const { getOrderInfo, orderAccept, orderReject } = useRestaurant();
const { lengthIsInvalid, getValidText } = useInput(4);
const { fourDigitTimeToDate } = useDate();

export default {
  name: "DashboardStoreModal",

  components: {
    CloseButton,
  },

  data() {
    return {
      orders: [],
      storeOrders: [],
      refreshTimer: null,
      dateFrom: "",
      dateTo: "",
    };
  },

  computed: {
    /**
     * ### 주문 항목 오보젝트.
     * @param {object} orderItem > 주문 항목 오브젝트.
     */
    orderItemObject() {
      return (orderItem) => {
        const { value: data } = orderItem.entries().next();
        const [key, value] = data;
        return {
          key,
          value,
        };
      };
    },

    /**
     * ### 주문 항목의 키.
     * @param {object} orderItem > 주문 항목 오브젝트.
     */
    orderItemKey() {
      return (orderItem) => {
        return this.orderItemObject(orderItem)?.key;
      };
    },

    /**
     * ### 주문 항목의 값.
     * @param {object} orderItem > 주문 항목 오브젝트.
     */
    orderItemValue() {
      return (orderItem) => {
        return this.orderItemObject(orderItem)?.value;
      };
    },

    /**
     * ### 주문 항목의 이름.
     * @param {object} orderItem > 주문 항목 오브젝트.
     */
    orderItemName() {
      return (orderItem) => {
        const orderName = this.orderItemObject(orderItem)?.value?.name;
        return orderName;
      };
    },

    /**
     * ### 옵션이 없는 주문 항목의 수량.
     * @param {object} orderItem > 주문 항목 오브젝트.
     */
    hasNotOptionOrderItemCount() {
      return (orderItem) => {
        return this.orderItemObject(orderItem)?.value?.hasNotOptionOrders
          ?.count;
      };
    },

    /**
     * ### 옵션이 있는 주문 항목의 수량.
     * @param {object} orderItem > 주문 항목 오브젝트.
     */
    hasOptionOrderItemCount() {
      return (orderItem) => {
        return this.orderItemObject(orderItem)?.value?.hasOptionOrders?.count;
      };
    },

    /**
     * ### 주문 항목의 옵션 목록.
     * @param {object} orderItem > 주문 항목 오브젝트.
     */
    orderOptions() {
      return (orderItem) => {
        return this.orderItemObject(orderItem)?.value?.hasOptionOrders?.options;
      };
    },

    /**
     * ### 주문 목록을 화면에 뿌리기 쉽도록 파싱.
     */
    complicatedOrders() {
      return (orders) => {
        // 그룹핑 할 키 값 구하기.
        const orderKeys = Array.from(
          new Set(orders.map((order) => order.itemCd))
        );
        // 화면에 표시할 음식 이름 구하기.
        const orderNames = Array.from(
          new Set(orders.map((order) => order.itemDisplayNm))
        );

        const results = [];

        for (const [orderKeyIndex, orderKey] of orderKeys.entries()) {
          const matchedOrders = orders.filter(
            (order) => order.itemCd === orderKey
          );

          // 주문 옵션 여부 필드 추가.
          const parsedMatchedOrders = matchedOrders.map((fItem) => {
            return {
              ...fItem,
              hasOptions: Boolean(fItem.simpleSubOrderingVOList.length),
            };
          });

          // 주문 옵션 여부에 따라 주문 오브젝트를 나눔.
          let hasNotOptionOrders = parsedMatchedOrders.filter(
            (fItem) => !fItem.hasOptions
          );
          let hasOptionOrders = parsedMatchedOrders.filter(
            (fItem) => fItem.hasOptions
          );

          // 옵션 없는 음식 파싱.
          hasNotOptionOrders = hasNotOptionOrders.reduce(
            (previous, _, idx) => {
              const order = previous.order;
              return {
                order,
                count: idx + 1,
              };
            },
            {
              order: hasNotOptionOrders[0] || null,
              count: 0,
            } || {}
          );

          // 옵션 있는 경우 파싱.
          // 옵션 아이템 코드 찾기.
          hasOptionOrders = hasOptionOrders.reduce(
            (previous, current, idx) => {
              const order = previous.order;
              const options = [
                ...previous.options,
                ...current.simpleSubOrderingVOList,
              ];

              return {
                order,
                count: idx + 1,
                options,
              };
            },
            {
              order: hasOptionOrders[0] || null,
              count: 0,
              options: [],
            } || {}
          );

          // 옵션 중복 처리 .
          if (hasOptionOrders.options.length) {
            hasOptionOrders.options = hasOptionOrders.options.reduce(
              (previous, current) => {
                let acc = [...previous];

                // 추가된 옵션이 없는 경우 옵션 추가.
                if (acc.length === 0) {
                  acc.push(current);
                } else {
                  // 추가된 옵션이 있는 경우, 중복되는 항목 존재 여부 확인
                  const foundItem = acc.find(
                    (item) => item.itemCd === current.itemCd
                  );

                  // 중복되는 옵션이 없는 경우 옵션 추가.
                  if (!foundItem) acc = [...acc, current];
                }

                return acc;
              },
              []
            );
          }

          // 주문 Key/Value 구조 형성
          const orderMap = new Map();
          orderMap.set(orderKey, {
            hasNotOptionOrders,
            hasOptionOrders,
            name: orderNames[orderKeyIndex],
          });

          results.push(orderMap);
        }

        return results;
      };
    },

    /**
     * ### 승인 처리(승인/거절) 메시지를 가져옴.
     * @param {(string|number)} stateCode >
     */
    getAcceptedMessage() {
      return (stateCode) => {
        switch (stateCode) {
          case 2:
          case "2":
            return "승인";
          case 9:
          case "9":
            return "거절";
        }
      };
    },

    isSettingTime() {
      return this.dateFrom.length && this.dateTo.length;
    },

    /**
     * ### 주문 처리가 가능한 상태 여부 확인 메소드.
     */
    isOrderAcceptable() {
      return (stateCd) => {
        return stateCd == 1;
      };
    },

    /**
     * ### 주문 데이터 구조를 파싱하는 메소드.
     */
    showingOrders() {
      return this.storeOrders?.length > 0 ? this.storeOrders : this.orders;
    },

    ...mapGetters("control/", {
      selectedStoreType: "getSelectedStoreType",
      isAutoRefreshMode: "getAutoRefreshMode",
    }),
  },

  methods: {
    parseOrders() {
      try {
        // check length.
        const dateFromLengthIsInvalid = lengthIsInvalid(this.dateFrom);
        const dateToLengthIsInvalid = lengthIsInvalid(this.dateTo);

        if (dateFromLengthIsInvalid) {
          this.dateFrom = getValidText(this.dateFrom);
          this.storeOrders = [];
          return;
        }
        if (dateToLengthIsInvalid) {
          this.dateTo = getValidText(this.dateTo);
          this.storeOrders = [];
          return;
        }

        // compare each date.
        const dateFromRes = fourDigitTimeToDate(this.dateFrom);
        const dateToRes = fourDigitTimeToDate(this.dateTo);

        if (dateFromRes.ok && dateToRes.ok) {
          const filteredOrders = this.orders.filter(({ bookgTime }) => {
            const bookgTimeRes = fourDigitTimeToDate(bookgTime);
            if (bookgTimeRes.ok) {
              const _dateFrom = new Date();
              _dateFrom.setHours(dateFromRes.hours);
              _dateFrom.setMinutes(dateFromRes.minutes);
              _dateFrom.setSeconds(0);

              const _dateTo = new Date();
              _dateTo.setHours(dateToRes.hours);
              _dateTo.setMinutes(dateToRes.minutes);
              _dateTo.setSeconds(0);

              const _bookgTime = new Date();
              _bookgTime.setHours(bookgTimeRes.hours);
              _bookgTime.setMinutes(bookgTimeRes.minutes);
              _bookgTime.setSeconds(0);

              return _dateFrom <= _bookgTime && _dateTo >= _bookgTime;
            } else {
              console.error(bookgTimeRes.error);
            }
          });

          this.storeOrders = filteredOrders;
        } else {
          this.storeOrders = [];
        }
      } catch (e) {
        console.error(e.message);
        this.storeOrders = [];
      }
    },
    /**
     * ### 컴포넌트 초기화 메소드.
     */
    init() {
      this.initAutoRefreshMode();
    },

    /**
     * ### 데이터 자동 새로고침 모드(Mode) 초기화 메소드.
     */
    initAutoRefreshMode() {
      if (!this.isAutoRefreshMode) {
        this.toggleAutoRefreshMode();
      } else {
        this.requests();
        this.autoRefreshModeStart();
      }
    },

    /**
     * ### 주문 승인 혹은 거절 API 메소드.
     * @param {boolean} status > true : 주문 승인, false : 주문 거절.
     */
    async handleOrderAcceptClick(order, status) {
      const { orderNo, storeCd } = order;

      // 백엔드 승인/거절 API 받은 후 진행.
      switch (status) {
        // 승인.
        case true:
          await orderAccept({ orderNo, storeCd });
          break;

        // 거절.
        case false:
          await orderReject({ orderNo, storeCd });
          break;
      }

      // 데이터 재요청.
      this.requests();
    },

    /**
     * ### API 요청.
     * - 주문 목록.
     */
    async requests() {
      this.loading = true;
      this.orders = await getOrderInfo(this.selectedStoreType);
      this.parseOrders();
      this.loading = false;
    },

    /**
     * ### 현재 모달 끔.
     */
    handleCloseClick() {
      this.setDashboardStoreModal();
    },

    /**
     * ### 데이터 자동 새로고침 모드 킴.
     */
    autoRefreshModeStart() {
      if (!this.refreshTimer) {
        this.refreshTimer = setInterval(() => {
          this.requests();
        }, Number(process.env.VUE_APP_REFRESH_TIME));
      }
    },

    /**
     * ### 데이터 자동 새로고침 모드 끔.
     */
    autoRefreshModeStop() {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    },

    ...mapActions({
      setDashboardStoreModal: "updateDashboardStoreModal",
    }),
    ...mapActions("control/", {
      toggleAutoRefreshMode: "toggleAutoRefreshMode",
    }),
  },

  created() {
    this.init();
  },

  destroyed() {
    this.autoRefreshModeStop();
  },

  watch: {
    /**
     * ### 예약 시간 설정 text 자릿 수에 대한 유효성 검사 및 데이터 교정.
     */
    dateFrom(text) {
      if (lengthIsInvalid(text)) this.dateFrom = getValidText(text);
    },
    dateTo(text) {
      if (lengthIsInvalid(text)) this.dateTo = getValidText(text);
    },

    isAutoRefreshMode(status) {
      if (status) {
        this.requests();
        this.autoRefreshModeStart();
      } else {
        this.autoRefreshModeStop();
      }
    },
  },

  filters: {
    time(val) {
      return TimeUtil.timeFormatWithChar(val);
    },
  },
};
</script>

<style scoped>
#dashboard_store_modal__container {
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  z-index: 3;

  min-height: 80%;
  min-width: 70%;
  background-color: var(--deep-green);
  border-radius: 15px;
  padding: 10px;
}

/* header start */
.header__container {
  height: 80px;
  position: relative;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__container .header_title {
  margin-left: 25px;
}
.header__container .date-range-form {
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}
.date-range-form .date-range-label {
  margin-right: 10px;
  font-weight: 600;
  font-size: 1rem;
  color: var(--secondary);
}
.date-range-form .date-range-input {
  height: 30px;
  text-align: center;
  letter-spacing: 2px;
}
.date-range-form .date-range-divider {
  color: var(--secondary);
  font-weight: 600;
  font-size: 1.4rem;
  margin: 0px 5px;
}
/* header end */

/* orders table start */
.order_list_wrapper {
  width: 100%;
  max-height: calc(100vh - 250px);
  overflow-y: scroll;
  margin-top: 10px;
  /* padding: 10px; */
}
table {
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  overflow: hidden;
}
table thead {
  position: sticky;
  top: 0;
  background-color: var(--primary);
}
table tbody {
  width: 100%;
  height: 20px;
}
table tbody tr {
  /* border: 1px solid var(--primary); */
  border-bottom: 1px solid var(--primary);
}
table th {
  padding: 10px;
  font-size: 1rem;
}
table td {
  padding: 20px 0px;
  text-align: center;
  font-size: 1rem;
}
.empty_orders {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* orders table end */

.buttons {
  display: flex;
  justify-content: space-around;
}
.buttons.is-order-acceptable > .button {
  color: gray;
}
.button {
  background-color: transparent;
  transition: all 0.3s ease;
}
.button:hover {
  transform: scale(1.05);
}
.button-okay {
  color: var(--primary);
}
.button-nope {
  color: tomato;
}

/* order list start */
.order-list__container {
  display: flex;
  flex-direction: column;
}
.order-info__container {
  padding: 0 15px;
}
.order-info__wrapper {
  display: flex;
  justify-content: space-between;
}
.order-info__wrapper.order-count {
  justify-content: center;
}

.order-option-name {
  font-size: 0.9rem;
}
.order-option-name::after {
  content: "";
}
/* order list end */

/* media start */

/* laptop */
@media screen and (min-width: 1080px) {
  /* table start */
  table th {
    font-size: 1.1rem;
  }
  table td {
    font-size: 1.1rem;
  }
  table td:nth-child(-n + 5) {
    font-size: 1.4rem;
  }
  /* table end */
}

/* desktop */
@media screen and (min-width: 1920px) {
  /* header start */
  .header__container .header_title {
    font-size: 2.2rem;
  }
  /* header end */

  /* table start */
  table th {
    font-size: 1.4rem;
  }
  table td {
    font-size: 1.4rem;
  }
  /* table end */

  .order-text {
    font-size: 1.2rem;
  }
  .order-option-name {
    font-size: 1.2rem;
  }
}

/* media end */
</style>
