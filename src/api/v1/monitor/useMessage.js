import useAuth from "@/api/v1/auth/useAuth.js";
import useDate from "@/composables/useDate.js";

const { changeDateFormatByChar } = useDate();
const { getAccessToken } = useAuth();

const useMessage = () => {
  const BASE_ADMIN_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/monitor/message`;

  /**
   * ### 메시지 가져오기.
   * @param {Number} gubun > 메시지 구분 (1: 송신, 2: 수신, 3: 전체).
   * @param {Number} maxCount > 메시지 최대 개수.
   * @param {String} startDt > 조회 시작 일자.
   * @param {String} endDt > 조회 종료 일자.
   */
  const getMessages = async (
    gubun = 3,
    maxCount = 100,
    startDt = changeDateFormatByChar(new Date(), "-"),
    endDt = changeDateFormatByChar(new Date(), "-")
  ) => {
    try {
      const uri = `${BASE_ADMIN_URI}/history?startDt=${startDt}&endDt=${endDt}&gubun=${gubun}&maxCount=${maxCount}`;
      return await fetch(uri, {
        headers: {
          "Content-Type": "application/json",
          Authorization: getAccessToken(),
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json && json.status === "OK") {
            return json.data.messageHisVOList;
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (e) {
      console.error(e.message);
    }
  };

  /**
   * ### 메시지 태그 가져오기.
   */
  const getMessageTags = async () => {
    const uri = `${BASE_ADMIN_URI}/quick`;
    return await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && json.status === "OK") {
          return json.data.messageInfoVOList;
        }
        throw new Error("Failed get message tags.");
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * ### 메시지 보내기.
   */
  const sendMessage = async (caddieReqList, message, groupName) => {
    try {
      const uri = `${BASE_ADMIN_URI}/send`;

      return await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAccessToken(),
        },
        body: JSON.stringify({
          caddieReqList,
          groupName,
          message,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json && json.status === "OK") {
            return json;
          }
          throw new Error("Failed send message");
        })
        .catch((err) => console.error(err.message));
    } catch (e) {
      console.error(e.message);
    }
  };

  return { getMessages, getMessageTags, sendMessage };
};

export default useMessage;
