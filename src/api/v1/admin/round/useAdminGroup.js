import useAuth from "@/api/v1/auth/useAuth";

const useAdminGroup = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`;
  const { getAccessToken, authenticationIsValid } = useAuth();

  /**
   * ### 단체 라운드 조회
   * @param groupNm
   * @param visitDt
   */
  const getGroup = ({ visitDt, groupNm }) => {
    let uri = `${BASE_URI}/round/info/roundGroup-info`;
    if (visitDt) {
      if (uri.includes("?")) uri = `${uri}&visitDt=${visitDt}`;
      else uri = `${uri}?visitDt=${visitDt}`;
    }

    if (groupNm) {
      if (uri.includes("?")) uri = `${uri}&groupNm=${groupNm}`;
      else uri = `${uri}?groupNm=${groupNm}`;
    }

    return fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json();
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * 단체 스코어 조회
   * @param groupCd
   * @param visitDt
   * @returns {Promise<Response|void>}
   */
  const getGroupScoreDetail = async ({ groupCd, visitDt }) => {
    const uri = `${BASE_URI}/round/info/roundGroup-score?groupCd=${groupCd}&visitDt=${visitDt}`;
    return await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json();
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * 단체 핸디모드 설정
   * @param groupCd
   * @param visitDt
   * @returns {Promise<Response|void>}
   */
  const updateGroupHandyModeAsYes = async ({ groupCd, visitDt }) => {
    const uri = `${BASE_URI}/round/info/roundGroup-game?groupCd=${groupCd}&visitDt=${visitDt}`;
    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json();
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * ### 시상설정 조회
   * @param {String} visitDt > 조회 날짜.
   * @param {String} groupCd > 단체 이름.
   * @returns {Promise<Response|void>}
   */
  const getAwardInfo = ({ visitDt = "00000000", groupCd }) => {
    let uri = `${BASE_URI}/round/info/award-info`;

    if (visitDt) {
      if (uri.includes("?")) uri = `${uri}&visitDt=${visitDt}`;
      else uri = `${uri}?visitDt=${visitDt}`;
    }

    if (groupCd) {
      if (uri.includes("?")) uri = `${uri}&groupCd=${groupCd}`;
      else uri = `${uri}?groupCd=${groupCd}`;
    }

    return fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json();
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * 시상설정 수정
   * @param roundAwardListVO
   * @returns {Promise<Response|void>}
   */
  const updateAwardInfo = async (body) => {
    const uri = `${BASE_URI}/round/info/award-info/update`;
    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json();
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * 단체 스코어 시상 조회
   * @param groupCd
   * @param visitDt
   * @returns {Promise<Response|void>}
   */
  const getRankList = async ({ groupCd, visitDt }) => {
    const uri = `${BASE_URI}/round/info/roundGroup-rank?groupCd=${groupCd}&visitDt=${visitDt}`;
    return await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json();
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * 단체 라운드 랭킹 초기화
   * @param groupCd
   * @param visitDt
   * @returns {Promise<Response|void>}
   */
  const resetRank = async ({ groupCd, visitDt }) => {
    const uri = `${BASE_URI}/round/info/roundGroup-rank/init?groupCd=${groupCd}&visitDt=${visitDt}`;
    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json();
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * 단체 라운드 랭킹 수정
   * @param groupCd
   * @param visitDt
   * @param playerGroupScoreRankReq
   * @returns {Promise<Response|void>}
   */
  const updateRank = async ({ groupCd, visitDt }, playerGroupScoreRankReq) => {
    const uri = `${BASE_URI}/round/info/roundGroup-rank/update?groupCd=${groupCd}&visitDt=${visitDt}`;
    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify(playerGroupScoreRankReq),
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json();
      })
      .catch((err) => console.error(err.message));
  };

  return {
    getGroup,
    getGroupScoreDetail,
    updateGroupHandyModeAsYes,
    getAwardInfo,
    updateAwardInfo,
    getRankList,
    resetRank,
    updateRank,
  };
};

export default useAdminGroup;
