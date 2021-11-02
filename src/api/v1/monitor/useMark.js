import useAuth from "@/api/v1/auth/useAuth.js";

const useMark = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/control/assign/mark`;
  const { getAccessToken } = useAuth();
  const accessToken = getAccessToken();

  const updateMark = async (params) => {
    if (params.type === "first") {
      return { ...(await updateFirstMark(params)), data: params };
    } else if (params.type === "second") {
      return { ...(await updateSecondMark(params)), data: params };
    }
    return null;
  };

  const updateFirstMark = async (params) => {
    return await fetch(BASE_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        mark1Cd: params.code,
        roundId: params.roundId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === "OK") {
          return {
            action: {
              command: "update",
              markType: "first",
            },
          };
        }
        throw new Error("Failed update first mark.");
      })
      .catch((err) => console.error(err.message));
  };

  const updateSecondMark = async (params) => {
    return await fetch(BASE_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        mark2Cd: params.code,
        roundId: params.roundId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === "OK") {
          return {
            action: {
              command: "update",
              markType: "second",
            },
          };
        }
        throw new Error("Failed update second mark.");
      })
      .catch((err) => console.error(err.message));
  };

  const deleteMark = async (params) => {
    const isFirstMark = params.type === "first";
    if (isFirstMark) {
      return {
        ...(await deleteFirstMark(params)),
        data: params,
      };
    } else {
      return {
        ...(await deleteSecondMark(params)),
        data: params,
      };
    }
  };

  const deleteFirstMark = async (params) => {
    return await fetch(BASE_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        mark1Cd: 0,
        roundId: params.roundId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === "OK") {
          return {
            action: {
              command: "delete",
              markType: "first",
            },
          };
        }
        throw new Error("Failed delete first mark.");
      })
      .catch((err) => console.error(err.message));
  };

  const deleteSecondMark = async (params) => {
    return await fetch(BASE_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        mark2Cd: 0,
        roundId: params.roundId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === "OK") {
          return {
            action: {
              command: "delete",
              markType: "second",
            },
          };
        }
        throw new Error("Failed delete second mark.");
      })
      .catch((err) => console.error(err.message));
  };

  return { updateMark, deleteMark };
};

export default useMark;
