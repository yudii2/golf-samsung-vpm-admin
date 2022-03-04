import http from "@/utils/http";
import DateUtil from "@/utils/datetime/DateUtil";

/**
 * 진행시간 평가 조회.
 * @param params
 * @return {Promise<AxiosResponse<any>>}
 */
const now = new Date();
const {year, month, day} = DateUtil.dateDivider(now);
const visitDt = year + month + day;

export function fetchReport({visitFromDt = visitDt, visitToDt = visitDt}) {
  return http.get('/v1/round/info/roundPlayFromToTimeB-info', {params: {visitFromDt, visitToDt}});
}

export default {
  fetchReport
}

