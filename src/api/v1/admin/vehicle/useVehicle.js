import useAuth from "../../auth/useAuth";

const useVehicle = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/monitor/round`;
  const { getAccessToken } = useAuth();

  /**
   * ### 차량 정보 목록 조회.
   * @returns {Array} 리스트 타입의 차량 정보.
   */
  const list = async () => {
    const uri = `${BASE_URI}/carPos-info`;
    const Authorization = getAccessToken();

    if (Authorization) {
      return await fetch(uri, {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      })
        .then((res) => res.json())
        .catch((e) => console.error(e.message));
    }
    return null;
  };

  /**
   * ### 차량 정보 등록.
   */
  const create = async (vehicleNumber, vehicleArea) => {
    const uri = `${BASE_URI}/carPos`;
    const Authorization = getAccessToken();

    const carPosReqVOList = [
      {
        carNo: vehicleNumber,
        carPosInfo: vehicleArea,
      },
    ];

    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
      body: JSON.stringify({ carPosReqVOList }),
    })
      .then((res) => res.json())
      .catch((e) => console.error(e.message));
  };

  /**
   * ### 차량 정보 삭제
   */
  const remove = async (seqNo) => {
    if (!seqNo) {
      return {
        status: "FAIL",
      };
    }

    const uri = `${BASE_URI}/carPosDel/${seqNo}`;
    const Authorization = getAccessToken();

    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
      body: JSON.stringify({
        seqNo,
      }),
    })
      .then((res) => res.json())
      .catch((e) => console.error(e.message));
  };

  return {
    list,
    create,
    remove,
  };
};

export default useVehicle;
