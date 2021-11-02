import useAuth from "@/api/v1/auth/useAuth.js";
const { getAccessToken } = useAuth();

const useWeather = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/monitor`;

  const getWeather = async () => {
    const uri = `${BASE_URI}/info/weather`;
    const accessToken = getAccessToken();

    return await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .catch((err) => err.message);
  };

  return { getWeather };
};

export default useWeather;
