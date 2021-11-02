import router from "@/router";
import store from "@/store";

const useAuth = () => {
  const baseUri = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/auth`;

  const signIn = async (id, password) => {
    const uri = `${baseUri}/issue`;
    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "OK") {
          const {
            data: { accessToken },
          } = res;

          // 세션에 토큰 저장.
          setAccessToken(accessToken);
        }

        return res;
      })
      .catch((err) => console.error(err.message));
  };

  const getAccessToken = () => {
    try {
      return JSON.parse(sessionStorage.getItem("Authorization"));
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const clearAccessToken = () => {
    sessionStorage.removeItem("Authorization");
  };

  const setAccessToken = (token) => {
    sessionStorage.setItem("Authorization", JSON.stringify(token));
  };

  const authorizationIsValid = async () => {
    try {
      const useWeather = (await import("@/api/v1/monitor/useWeather")).default;
      const { getWeather } = useWeather();

      const { status } = await getWeather();
      switch (status) {
        case "FAIL":
          return false;

        default:
          return true;
      }
    } catch (e) {
      return false;
    }
  };

  /**
   * ### 임시로 getWeather 메소드를 이용해서 사용자 인증 유효한지 확인.
   */
  const authenticationIsValid = async (beforeMove = null) => {
    try {
      const useWeather = (await import("@/api/v1/monitor/useWeather")).default;
      const { getWeather } = useWeather();

      const { status } = await getWeather();
      switch (status) {
        case "FAIL":
          // before 함수가 있다면 실행.
          if (beforeMove) await beforeMove();

          // 토스트 메시지 띄우기.
          await store.dispatch("toast", {
            title: "자동 로그아웃",
            message: "다른 기기에서 로그인이 감지되었습니다.",
            duration: 5000,
          });

          // 세션 사용자 토큰 초기화.
          clearAccessToken();

          router.push({ name: "Login" });

          return false;
      }

      return true;
    } catch (e) {
      console.error(e.message);

      return false;
    }
  };

  const changePassword = (id, oldPass, newPass) => {
    const uri = `${baseUri}/changePass`;

    return fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id,
        newPass,
        oldPass,
      }),
    })
      .then((res) => res.json())
      .catch((e) => console.error(e.message));
  };

  return {
    signIn,
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    authenticationIsValid,
    authorizationIsValid,
    changePassword,
  };
};

export default useAuth;
