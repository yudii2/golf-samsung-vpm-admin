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
        if (authenticationIsValid()) return res.json()
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
        if (authenticationIsValid()) return res.json()
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
        if (authenticationIsValid()) return res.json()
      })
      .catch((err) => console.error(err.message));
  }

  /**
   * 홀아웃 승인 수정
   * @param approveHoleCnt
   * @param roundId
   * @returns {Promise<Response|void>}
   */
  const updateHoleOutApprove = async ({approveHoleCnt, roundId}) => {
    const uri = `${BASE_URI}/round/info/approve-hole-out/update?approveHoleCnt=${approveHoleCnt}&roundId=${roundId}`
    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json()
      })
      .catch((err) => console.error(err.message));
  }

  const getPlayerClubThings = async ({roundId}) => {
    const uri = `${BASE_URI}/round/info/player-club-memo?roundId=${roundId}`
    return await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json()
      })
      .catch((err) => console.error(err.message));

  }


  return {getRound, getRoundDetail, getHoleOutLists, updateHoleOutApprove, getPlayerClubThings};
};

export default useRound;
