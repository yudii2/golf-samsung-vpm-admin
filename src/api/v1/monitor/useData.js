import store from "@/store/index.js";
import useCompany from "@/api/v1/monitor/useCompany.js";
import useCaddie from "@/api/v1/monitor/useCaddie.js";
import useGroup from "@/api/v1/monitor/useGroup.js";
import useMessage from "@/api/v1/monitor/useMessage.js";
import useAuth from "../auth/useAuth";
const { authenticationIsValid } = useAuth();
const { getMessages } = useMessage();
const { getCaddies } = useCaddie();
const { getCompany } = useCompany();
const { getGroups } = useGroup();

/*
 * useData 함수의 경우 순서가 중요합니다.
 * 필수 : getGroupInfo 는 getCaddiesInfo 보다 먼저 실행되야 합니다.
 */
const useData = () => {
  const init = async () => {
    // 데이터 새로고침 중인지 확인.
    const isNotRefreshing = !store.getters["control/getIsRefreshing"];
    // 사용자 인증 유효한지 확인.
    const authIsValid = await authenticationIsValid();
    if (authIsValid && isNotRefreshing) {
      await store.dispatch("control/updateIsRefreshing", true);
      await getCompanyInfo();
      await getGroupInfo();
      await getCaddiesInfo();
      await store.dispatch("control/combineCompanyAndCaddies");
      await store.dispatch("control/updateIsRefreshing", false);
      await getMessageInfo();
    }
  };

  const initForDashboard = async () => {
    // 데이터 새로고침 중인지 확인.
    const isNotRefreshing = !store.getters["control/getIsRefreshing"];
    // 사용자 인증 유효한지 확인.
    const authIsValid = await authenticationIsValid();
    if (authIsValid && isNotRefreshing) {
      await store.dispatch("control/updateIsRefreshing", true);
      await getCompanyInfo();
      await getGroupInfo();
      await getCaddiesInfo();
      await store.dispatch("control/combineCompanyAndCaddies");
      await store.dispatch("control/updateIsRefreshing", false);
    }
  };

  const initForMessenger = async () => {
    // 데이터 새로고침 중인지 확인.
    const isNotRefreshing = !store.getters["control/getIsRefreshing"];
    // 사용자 인증 유효한지 확인.
    const authIsValid = await authenticationIsValid();
    if (authIsValid && isNotRefreshing) {
      await getMessageInfo();
    }
  };

  const getCompanyInfo = async () => {
    const res = await getCompany();
    if (res && res.status === "OK") {
      store.dispatch("control/updateCompany", res.data);
    }
  };

  const getCaddiesInfo = async () => {
    await getCaddies();
  };

  const getMessageInfo = async () => {
    const messages = await getMessages();

    store.dispatch("control/updateMessages", messages);
  };

  const getGroupInfo = async () => {
    await getGroups();
  };

  return { init, initForDashboard, initForMessenger };
};

export default useData;
