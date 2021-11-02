import useAuth from "../auth/useAuth";

const useCompetition = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/manage`;
  const { getAccessToken } = useAuth();

  /**
   * ### 대회 목록을 가져오는 넘.
   * @param {String} startDt > 조회 시작일 (Not required).
   * @param {String} endDt > 조회 종료일 (Not required).
   * @returns 대회 목록 오브젝트 반환.
   */
  const getCompetitions = (startDt, endDt) => {
    let uri = `${BASE_URI}/competition-master/select`;

    if (startDt) {
      if (uri.includes("?")) {
        uri = `${uri}&startDt=${startDt}`;
      } else {
        uri = `${uri}?startDt=${startDt}`;
      }
    }

    if (endDt) {
      if (uri.includes("?")) {
        uri = `${uri}&endDt=${endDt}`;
      } else {
        uri = `${uri}?endDt=${endDt}`;
      }
    }

    return fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e.message));
  };

  /**
   * ### 대회 참가자 목록을 가져오는 넘.
   * @param {String} competitionId > 대회 Id.
   * @returns 참가자 목록 오브젝트 반환.
   */
  const getParticipantsByCompetitionId = (competitionId) => {
    let uri = `${BASE_URI}/competition-cust/select`;
    if (competitionId) {
      uri = `${uri}?competitionId=${competitionId}`;
    }

    return fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e.message));
  };

  /**
   * ### 대회 생성하는 API를 호출하는 메소드.
   * @param {String} competitionNm > 대회 이름.
   * @param {String} startDt > 대회 시작일.
   * @param {String} endDt > 대회 종료일.
   * @param {String} gubun > 대회 공개/비공개 구분.
   * @param {String} remarks > 비고.
   */
  const createCompetition = (competitionNm, startDt, endDt, gubun, remarks) => {
    let uri = `${BASE_URI}/competition-master/insert`;
    return fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify({
        competitionNm,
        startDt,
        endDt,
        gubun,
        remarks,
      }),
    }).catch((e) => console.error(e.message));
  };

  return {
    getCompetitions,
    getParticipantsByCompetitionId,
    createCompetition,
  };
};

export default useCompetition;
