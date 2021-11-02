import useAuth from "@/api/v1/auth/useAuth";

const useCertificate = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`
  const {getAccessToken, authenticationIsValid} = useAuth();

  /**
   * 증명서발급 조회
   * @param recordDt
   * @returns {Promise<any>}
   */
  const getCertification = async ({recordDt}) => {
    let uri = `${BASE_URI}/round/info/certificate-info?recordDt=${recordDt}`

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

  /**
   * 증명서발급 수정
   * @param roundId
   * @param playerId
   * @param certificateCd
   * @returns {Promise<any>}
   */
  const updateCertification = async ({roundId, playerId, certificateCd}) => {
    const uri = `${BASE_URI}/round/info/certificate-info/update?certificateCd=${certificateCd}&playerId=${playerId}&roundId=${roundId}`

    return await fetch(uri, {
      method: 'POST',
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

  return {getCertification, updateCertification}
}


export default useCertificate;
