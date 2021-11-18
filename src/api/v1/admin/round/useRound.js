import useAuth from "@/api/v1/auth/useAuth";

const useRound = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`;
  const {getAccessToken, authenticationIsValid} = useAuth();

  /**
   * 전체라운드 조회
   * @param visitDt
   * @param groupNm
   * @param playerNames
   * @param caddieNm
   * @returns {Promise<Response|void>}
   */
  const getRound = async ({visitDt, groupNm, playerNames, caddieNm}) => {
    let uri = `${BASE_URI}/round/info/round-info?visitDt=${visitDt}`;
    if (groupNm) uri += `&groupNm=${groupNm}`;
    if (playerNames) uri += `&playerNames=${playerNames}`;
    if (caddieNm) uri += `&caddieNm=${caddieNm}`;

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
   * 전체 라운드 스코어 조회
   * @param paramRoundId
   * @returns {Promise<Response|void>}
   */
  const getRoundDetail = async ({paramRoundId}) => {
    const uri = `${BASE_URI}/round/info/round-detail?roundId=${paramRoundId}`;
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
   * 홀아웃 승인 조회
   * @returns {Promise<Response|void>}
   */
  const getHoleOutLists = async () => {
    const uri = `${BASE_URI}/round/info/approval-holeOut`;
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
   * 홀아웃 승인 수정
   * @param approveHoleCnt
   * @param roundId
   * @returns {Promise<Response|void>}
   */
  const updateHoleOutApprove = async ({approveHoleCnt, roundId}) => {
    const uri = `${BASE_URI}/round/info/approve-hole-out/update?approveHoleCnt=${approveHoleCnt}&roundId=${roundId}`;
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
   * 내장객 클럽, 메모 조회
   * @param roundId
   * @returns {Promise<Response|void>}
   */
  const getPlayerClubThings = async ({roundId}) => {
    const uri = `${BASE_URI}/round/info/player-club-memo?roundId=${roundId}`;
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
   * 클럽사진, 기념사진 이동
   * @param roundPicChangeReq
   * @returns {Promise<Response|void>}
   */
  const updateRoundPic = async (roundPicChangeReq) => {
    const uri = `${BASE_URI}/round/change-roundPic/update`;
    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify(roundPicChangeReq),
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json();
      })
      .catch((err) => console.error(err.message));
  };

  const getRoundPic = async ({picGubun, roundId}) => {
    const uri = `${BASE_URI}/round/info/roundPic?picGubun=${picGubun}&roundId=${roundId}`;
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

  const updateRoundScore = async ({roundId}, playerScoreReq) => {
    const uri = `${BASE_URI}/round/info/round-score/update/${roundId}`
    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify(playerScoreReq)
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json();
      })
      .catch((err) => console.error(err.message))
  }

  return {
    getRound,
    getRoundDetail,
    getHoleOutLists,
    updateHoleOutApprove,
    getPlayerClubThings,
    updateRoundPic,
    getRoundPic,
    updateRoundScore
  };
};

export default useRound;
