import useAuth from "@/api/v1/auth/useAuth";

const useSMS = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`;
  const {getAccessToken, authenticationIsValid} = useAuth();

  /**
   * 고객 스코어 전송
   * @param mobileNo
   * @param playerId
   * @returns {Promise<Response|void>}
   */
  const sendPlayerScore = async ({mobileNo, playerId}) => {
    const uri = `${BASE_URI}/round/send/player-score?mobileNo=${mobileNo}&playerId=${playerId}`;
    return await fetch(uri, {
      method: 'POST',
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
   * 고객 핸드폰번호 수정
   * @param playerInfo
   * @returns {Promise<Response|void>}
   */
  const updatePlayerMobileNo = async (playerInfo) => {
    const uri = `${BASE_URI}/round/info/player-mobileNo/update`
    return await fetch(uri, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify(playerInfo)
    })
      .then((res) => {
        if (authenticationIsValid()) return res.json()
      })
      .catch((err) => console.error(err.message));

  }

  return {sendPlayerScore, updatePlayerMobileNo};

}
export default useSMS;
