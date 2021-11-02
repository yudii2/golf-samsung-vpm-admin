import useAuth from "@/api/v1/auth/useAuth.js";
import store from "@/store/index.js";
import { getNextHoleCode } from "@/utils/caddies/caddieUtils";
import { STORE_TYPE_START } from "@/utils/constants";

const useCaddie = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI}/v1`;
  const BASE_ADMIN_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`;

  const { getAccessToken } = useAuth();

  /**
   * ### 캐디 정보를 조회.
   * @returns {Array} [Caddie] > 캐디 목록.
   */
  const getCaddies = async (storeType = STORE_TYPE_START) => {
    const uri = `${BASE_ADMIN_URI}/monitor/info/round-caddie?type=${storeType}`;

    const accessToken = getAccessToken();

    return await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .then(async (json) => {
        if (json && json.status === "OK") {
          store.dispatch(
            "control/updateCaddies",
            json.data.caddieRoundInfoVOList
          );
          return json;
        }
        throw new Error("Failed get caddies.");
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * ### 특정 라운드의 단체를 지정.
   * @param {object} > groupInfo - The roundGroup info for data update.
   * @param {string} > groupInfo.groupCd - Group code about roundGroup.
   * @param {string} > groupInfo.groupName - Group name about roundGroup.
   * @param {string} > groupInfo.roundId - Round id about roundGroup.
   */
  const updateCaddieGroup = async (groupInfo) => {
    const uri = `${BASE_ADMIN_URI}/control/assign/group`;
    const accessToken = getAccessToken();
    return fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(groupInfo),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && json.status === "OK") {
          store.dispatch("control/updateCaddieColorCode", groupInfo);
          return "Success update caddie roundGroup";
        }
        throw new Error("Failed update caddie roundGroup");
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * ### 특정 캐디의 경기 관련 시간 정보를 가져옴.
   */
  const getCaddieRoundTime = async (roundId) => {
    const uri = `${BASE_ADMIN_URI}/monitor/info/round-time?roundId=${roundId}`;
    const accessToken = getAccessToken();
    return await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && json.status === "OK") {
          return json.data;
        }
        throw new Error("Failed get caddie roundAll time.");
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * ### 특정 캐디의 데이터 접근 토큰 발행.
   */
  const initCaddie = async (caddieData) => {
    const uri = `${BASE_URI}/auth/issue`;
    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(caddieData),
    })
      .then((res) => {
        console.info(`Success init caddie -> caddieUniqNo:${caddieData.caddieUniqNo}
        companyCd:${caddieData.companyCd}
        uuid:${caddieData.uuid}`);
        return res.json();
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * ### 특정 캐디를 각각의 홀에 라운딩 배치.
   */
  const setCaddie = async (caddieData) => {
    const uri = `${BASE_URI}/round`;
    const res = await initCaddie(caddieData);
    if (res !== undefined && res.status === "OK") {
      sessionStorage.setItem(
        `authentication_caddie_${caddieData.caddieUniqNo}`,
        JSON.stringify(res.data.accessToken)
      );
      await fetch(uri, {
        headers: {
          Accept: "application/json",
          Authorization: res.data.accessToken,
        },
      })
        .then((res) => {
          console.info(`Success set caddie -> caddieUniqNo:${caddieData.caddieUniqNo}
        companyCd:${caddieData.companyCd}
        uuid:${caddieData.uuid}`);
          return res.json();
        })
        .catch((err) => console.error(err.message));
    } else {
      const {
        data: { errorCode, errorMessage },
      } = res;
      console.error(`[${errorCode}] ${errorMessage}`);
    }
  };

  /**
   * ### 특정 캐디의 해당 홀 게임 시작.
   */
  const holeGameStart = async (caddie) => {
    const { currHoleCd, startTeeYn } = caddie;
    const nextHoleCode = getNextHoleCode(currHoleCd, startTeeYn);

    const uri = `${BASE_URI}/test/course-hole-play?courseCd=${
      caddie.currCourseCd
    }&holeCd=${nextHoleCode}&roundId=${
      caddie.roundId
    }&roundOrder=${++caddie.currHoleIndex}`;

    const rowData = sessionStorage.getItem(
      `authentication_caddie_${caddie.caddieUniqNo}`
    );
    if (rowData !== undefined) {
      const accessToken = JSON.parse(rowData);
      return await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
        .then((res) => res.json())
        .then(getCaddies())
        .catch((err) => console.error(err.message));
    }
  };

  /**
   * ### 특정 캐디의 해당 홀 게임 종료.
   */
  const holeGameDone = async (caddie) => {
    const uri = `${BASE_URI}/test/course-hole-finish?courseCd=${caddie.currCourseCd}&holeCd=${caddie.currHoleCd}&roundId=${caddie.roundId}`;
    const rowData = sessionStorage.getItem(
      `authentication_caddie_${caddie.caddieUniqNo}`
    );
    if (rowData !== undefined) {
      const accessToken = JSON.parse(rowData);

      return await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
        .then((res) => res.json())
        .then(getCaddies())
        .catch((err) => console.error(err.message));
    }
  };

  return {
    getCaddies,
    setCaddie,
    holeGameStart,
    holeGameDone,
    updateCaddieGroup,
    getCaddieRoundTime,
  };
};

export default useCaddie;
