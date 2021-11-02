import useAuth from "@/api/v1/auth/useAuth";

const useCompany = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`;
  const { getAccessToken } = useAuth();

  const getCompany = async () => {
    const token = getAccessToken();
    const uri = `${BASE_URI}/monitor/info/company`;

    if (token) {
      return await fetch(uri, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.error(err.message));
    }
  };

  const getCoordinateByCompanyCode = ({
    companyCd,
    courseCd,
    holeCd,
    gubun,
  }) => {
    const uri = `${BASE_URI}/manage/course-map-info/select?companyCd=${companyCd}&courseCd=${courseCd}&holeCd=${holeCd}&gubun=${gubun}`;
    return fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e.message));
  };

  return { BASE_URI, getCompany, getCoordinateByCompanyCode };
};

export default useCompany;
