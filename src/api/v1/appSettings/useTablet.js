import store from "@/store";
import useAuth from "../auth/useAuth";

const { getAccessToken } = useAuth();

const defaultCompanyCd = store.getters["control/getCompanyCode"];
const defaultUseYn = "Y";

export const getTablets = (
  companyCd = defaultCompanyCd,
  useYn = defaultUseYn
) => {
  let uri = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/manage/tablet-info/select`;

  if (companyCd) {
    if (uri.includes("?")) uri = `${uri}&companyCd=${companyCd}`;
    else uri = `${uri}?companyCd=${companyCd}`;
  }

  if (useYn) {
    if (uri.includes("?")) uri = `${uri}&useYn=${useYn}`;
    else uri = `${uri}?useYn=${useYn}`;
  }

  return fetch(uri, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
  })
    .then((res) => res.json())
    .catch((e) => console.error(e.message));
};
