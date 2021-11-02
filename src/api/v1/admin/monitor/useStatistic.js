import useAuth from "@/api/v1/auth/useAuth";

const useStatistic = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`;
  const {getAccessToken, authenticationIsValid} = useAuth();

  /**
   * 진행시간 통계
   * @param visitFromDt
   * @param visitToDt
   * @returns {Promise<Response|void>}
   */
  const getStatistics = async ({visitFromDt, visitToDt}) => {
    const uri = `${BASE_URI}/round/info/roundPlayTime-statistics?visitFromDt=${visitFromDt}&visitToDt=${visitToDt}`

    return await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      }
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json()
      })
      .catch((err) => console.error(err.message));
  }

  return {getStatistics}
}

export default useStatistic;
