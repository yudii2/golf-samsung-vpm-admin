import useAuth from "@/api/v1/auth/useAuth";

const useCaddie = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`;

  const {getAccessToken, authenticationIsValid} = useAuth();

  /**
   * 캐디 정보 조회
   * @return {Promise<Response|void>}
   */
  const getCaddieInfo = async (caddieName, lastTelNo) => {
    let uri = `${BASE_URI}/manage/caddie-info/select`;
    if (caddieName) uri += `&caddieName=${caddieName}`;
    if (lastTelNo) uri += `&lastTelNo=${lastTelNo}`


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
  }

  /**
   * 캐디 정보 수정
   * @return {Promise<Response|void>}
   */
  const updateCaddieInfo = async () => {
    const uri = `${BASE_URI}/manage/caddie-info/update`;

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
  }

  /**
   * 캐디 정보 초기화 (홀인원과 데이터 맞추기)
   * @param companyCd
   * @return {Promise<Response|void>}
   */
  const initCaddieInfo = async (companyCd) => {
    const uri = `${BASE_URI}/manage/caddie-info/insert?companyCd=${companyCd}`;

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
  }


  return {
    getCaddieInfo,
    updateCaddieInfo,
    initCaddieInfo
  }
}

export default useCaddie;
