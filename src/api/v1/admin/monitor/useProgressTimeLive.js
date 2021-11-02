import { progressTimeLiveData } from "@/api/v1/admin/monitor/sampleDatas";
import { getListByPage } from "@/utils/usePage";

export const getLiveDataByPage = page => {
  const res = getListByPage({
    list: progressTimeLiveData,
    page,
  });
  return {
    data: res.data,
    pages: res.pages,
  };
};
