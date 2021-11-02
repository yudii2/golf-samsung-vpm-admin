import useAuth from "@/api/v1/auth/useAuth";

const useStandardSetting = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`;
  const { getAccessToken, authenticationIsValid } = useAuth();

  /**
   * 진행시간 표준설정 조회
   * @returns {Promise<Response|void>}
   */
  const getStandardSetting = async () => {
    const uri = `${BASE_URI}/round/info/roundTimeStandardSetup-info`;

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
   * 진행시간 표준설정 관리 수정
   * @param standardSetupVOList
   * @returns {Promise<Response|void>}
   */
  const updateStandardSetting = async (body) => {
    const uri = `${BASE_URI}/round/info/roundTimeStandardSetup-info/update`;
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
   * 진행시간 기간별 조회
   * @param visitFromDt
   * @param visitToDt
   * @returns {Promise<Response|void>}
   */
  const getPlayingTime = async ({ visitFromDt, visitToDt }) => {
    const uri = `${BASE_URI}/round/info/roundPlayFromToTime-info?visitFromDt=${visitFromDt}&visitToDt=${visitToDt}`;
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

  return { getStandardSetting, updateStandardSetting, getPlayingTime };
};

export default useStandardSetting;
