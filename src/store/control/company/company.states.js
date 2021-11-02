import {
  COMPANY_CODE_DEFAULT_VALUE,
  COMPANY_NAME_DEFAULT_VALUE,
} from "@/utils/constants";

export default {
  company: {
    code: COMPANY_CODE_DEFAULT_VALUE,
    name: COMPANY_NAME_DEFAULT_VALUE,
    courses: [],
    isLoading: false,
  },
  selectedCaddieInCompany: null,
  tempCourses: [],
  companyNameEnglish: "",
};
