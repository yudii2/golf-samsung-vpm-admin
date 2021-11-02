import useAuth from "@/api/v1/auth/useAuth.js";
import store from "@/store/index.js";

const useGroup = () => {
  const BASE_URI = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1`;
  const { getAccessToken } = useAuth();

  const createGroup = async (groupNm) => {
    const uri = `${BASE_URI}/control/info/group`;
    return fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify({ groupNm }),
    })
      .then((res) => res.json())
      .catch((e) => console.error(e.message));
  };

  const getGroups = async () => {
    const uri = `${BASE_URI}/monitor/info/group`;
    return await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && json.status === "OK") {
          store.dispatch("control/updateGroups", json.data.companyGroupVOList);
          return json;
        }
        throw new Error("Failed get groups.");
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * ### 단체의 색상을 변경하는 API를 호출하는 넘.
   * @param {Object} groupInfo > 단체 정보 오브젝트.
   * 업데이트 시 스토어도 적용하도록 설계됨.
   */
  const updateGroupColor = async (groupInfo) => {
    const uri = `${BASE_URI}/control/info/group-name`;
    return await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify(groupInfo),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && json.status === "OK") {
          store.dispatch(
            "control/updateSelectedGroupColorCode",
            groupInfo.groupColor
          );

          return "Success update roundGroup color.";
        }
        throw new Error("Failed update roundGroup color.");
      })
      .catch((err) => console.error(err.message));
  };

  /**
   * ### 단체명 변경하는 넘.
   * @param {String} groupCd > 단체 코드.
   * @param {String} groupName > 변경할 단체 명.
   * @returns
   */
  const updateGroupName = (groupCd, groupName) => {
    const uri = `${BASE_URI}/control/info/group-name`;
    return fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify({
        groupCd,
        groupName,
      }),
    })
      .then((res) => res.json())
      .catch((e) => console.error(e.message));
  };

  return { createGroup, getGroups, updateGroupColor, updateGroupName };
};

export default useGroup;
