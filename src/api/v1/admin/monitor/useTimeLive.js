import useAuth from "@/api/v1/auth/useAuth";

const useTimeLive = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`;
  const {getAccessToken, authenticationIsValid} = useAuth();

  /**
   * 진행시간 실시간 조회
   * @returns {Promise<Response|void>}
   */
  const getRoundPlayRealTime = async () => {
    const uri = `${BASE_URI}/round/info/roundPlayRealTime-info`

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

  return {getRoundPlayRealTime}
}

export default useTimeLive;
