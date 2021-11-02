import { API_ERROR_500_MESSAGE, API_ERROR_OTHERS } from "@/utils/constants";
import useAuth from "../auth/useAuth";

const { getAccessToken } = useAuth();
const baseUri = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/monitor/restaurant`;

/**
 * ### 주문 관련 API.
 * - Base Resource URI : /admin/v1/monitor/restaurant
 */
const useRestaurant = () => {
  /**
   * ### 직원의 사업장 별 매장 그룹군 목록을 가져옴.
   * @returns {Array} 매장 목록을 반환.
   */
  const getStoreGroup = async () => {
    try {
      const uri = `${baseUri}/storeGroup`;
      const accessToken = getAccessToken();

      const { status, data } = await fetch(uri, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
        .then((res) => {
          if (res.ok && res.status === 200) return res.json();
        })
        .catch((err) => console.error(err.message));

      if (status === "OK") {
        return data;
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  /**
   * ### 매장 타입 코드를 가지고 주문 목록을 가져오는 메소드.
   * @param {string} storeType > 매장 타입 코드.
   */
  const getOrderInfo = async (storeType) => {
    try {
      if (!storeType) return [];

      const uri = `${baseUri}/order-info?storeType=${storeType}`;
      const accessToken = getAccessToken();

      return await fetch(uri, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
        .then((res) => {
          const { ok, status } = res;
          if (ok && status === 200) return res.json();
          else if (status === 500) throw new Error(API_ERROR_500_MESSAGE);
          else throw new Error(API_ERROR_OTHERS);
        })
        .then(({ status, data: { caddieOrderingVOList } }) => {
          if (status === "OK") return caddieOrderingVOList || [];
          else throw new Error("Failed getOrderInfo.");
        })
        .catch((err) => console.error(err.message));
    } catch (e) {
      console.error("getOrderInfo", e.message);
    }
  };

  /**
   * ### 주문 승인 메소드 (상태 코드 승인 : 2).
   * @param {String} orderNo > 주문 번호.
   * @param {String} storeCd > 매장 코드.
   */
  const orderAccept = async ({ orderNo, storeCd }) => {
    const stateCd = String(2);
    return await _orderProcessing({
      orderNo,
      stateCd,
      storeCd,
    });
  };

  /**
   * ### 주문 거절 메소드 (상태 코드 취소 : 9).
   * @param {String} orderNo > 주문 번호.
   * @param {String} storeCd > 매장 코드.
   */
  const orderReject = async ({ orderNo, storeCd }) => {
    const stateCd = String(9);
    return await _orderProcessing({
      orderNo,
      stateCd,
      storeCd,
    });
  };

  /**
   * ### 주문 승인/거절 메소드 (상태 코드 승인 : 2, 취소 : 9).
   */
  const _orderProcessing = async ({ orderNo, stateCd, storeCd }) => {
    try {
      const uri = `${baseUri}/accept-order`;
      const accessToken = getAccessToken();

      return fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          orderNo,
          stateCd,
          storeCd,
        }),
      })
        .then((res) => {
          const { ok, status } = res;
          if (ok && status === 200) return res.json();
          else if (status === 500) throw new Error(API_ERROR_500_MESSAGE);
          else throw new Error(API_ERROR_OTHERS);
        })
        .catch((error) => console.error(error.message));
    } catch (e) {
      console.error("_orderProcessing", e.message);
    }
  };

  return {
    getStoreGroup,
    getOrderInfo,
    orderAccept,
    orderReject,
  };
};

export default useRestaurant;
