import roundGroupSample from "@/utils/test/roundSampleForRoundGroup";
import sampleForRoundAll from "@/utils/test/roundSampleForRoundAll";
import rankingSampleForRoundGroup from "@/utils/test/rankingSampleForRoundGroup";
import courseManageSampleRoundGroup from "./courseManageSampleRoundGroup";
import { getListByPage } from "../usePage";

const error = "페이지를 가져오는데 실패했습니다.";

export const getGroupRoundByPage = (page = 1) => {
  try {
    const { data, pages } = getListByPage({
      list: roundGroupSample,
      take: 10,
      page,
    });

    return {
      ok: true,
      data,
      pages,
    };
  } catch (e) {
    return {
      ok: false,
      error,
    };
  }
};

export const getGroupRoundRank = () => {
  return rankingSampleForRoundGroup;
};

export const getCourseManageSampleRoundGroup = () => {
  return courseManageSampleRoundGroup;
};
