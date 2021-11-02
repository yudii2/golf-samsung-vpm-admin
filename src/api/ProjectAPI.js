import axios from "axios";
import router from "@/router";
import store from "@/store";

import {
  issueAuthorization,
  removeAuthorization,
} from "@/api/v1/auth/Authorization";

import {
  fetchSampleList,
  fetchSample,
  createSample,
  patchSample,
  deleteSample,
} from "@/api/v1/sample/Sample";

import { fetchInvalidUrl } from "@/api/v1/test/ErrorTest";

import { getAccessToken } from "@/utils/session/SessionUtil";
import { compactObjectValues } from "@/utils/ObjectUtil";

import BadRequestError from "@/error/BadRequestError";
import ForbiddenError from "@/error/ForbiddenError";
import NotFoundError from "@/error/NotFoundError";
import UnauthorizedError from "@/error/UnauthorizedError";
import InternalServerError from "@/error/InternalServerError";
import APIError from "@/error/APIError";
import NetworkError from "@/error/NetworkError";

// http.interceptors.request.use 에서 token check를 bypass 할 URL 목록
// 여기에 등록된 URL 이 외의 API들은 accessToken, refreshToken 둘 중 하나만 없어도 로그인 화면으로 redirect 시킨다
const tokenCheckBypassUrls = ["/auth/issue"];

export const API_STATUS_CODE_MESSAGES = {
  ID_PASSWORD_MISMATCH: "아이디 또는 패스워드를 잘못 입력하셨습니다.",
  INVALID_AUTH_CUSTOM_ERROR: "권한 처리 중 오류가 발생하였습니다.",
  NO_AUTH: "권한이 없습니다.",
  FRONT_LOCK:
    "현재 프론트 정산 중입니다. 프론트에 연락 후 LOCK 해제 요청바랍니다.",
  CHECK_OUT_COMPLETE: "현재 체크아웃이 완료되었습니다.",
  PAY_COMPLETE: "현재 정산 완료된 전표입니다.",
  PART_PAY_COMPLETE: "현재 부분 정산 완료된 전표입니다.",
  PAY_DIVIDE_COMPLETE: "현재 분할 처리 완료된 전표입니다.",
  PAYER_CHANGE_COMPLETE: "현재 지불자 변경 처리 완료된 전표입니다.",
  PAYMENT_UNCORRECTABLE:
    "해당 전표는 [지불자 변경] 또는 [분할 처리] 및 [정산]이 완료된 전표라 추가/수정이 불가능합니다.",
  NOT_FOUND_TEAM_INFO_DATA: "해당 팀 정보가 존재하지 않습니다.",
  NO_REQUIRED_DATA: "필수 데이터가 존재하지 않습니다.",
  INPUT_DATA_INVALID: "입력 데이터가 올바르지 않습니다.",
  FAULT_STATUS_DIV: "상태 체크 구분이 잘못되었습니다.",
  ALREADY_TABLE_USING: "상태 체크 구분이 잘못되었습니다.",
};

class ProjectAPI {
  constructor() {
    const http = axios.create({
      baseURL: `${process.env.VUE_APP_API_HOST}`,
      timeout: Number(process.env.VUE_APP_API_TIMEOUT),
    });
    http.interceptors.request.use(
      (config) => {
        const accessToken = getAccessToken();

        if (!tokenCheckBypassUrls.includes(config.url) && !accessToken) {
          router.push({ path: "/login" });
          throw new axios.Cancel();
        }

        if (accessToken) {
          config.headers["Authorization"] = accessToken;
        }

        // loader on
        store._vm.$EventBus.$emit("loaderOn");

        switch (config.method) {
          case "get":
            if (config.params) {
              config.params = compactObjectValues(
                JSON.parse(JSON.stringify(config.params)),
                true,
                false
              );
            }
            break;
          case "post":
          case "put":
          case "patch":
          case "delete":
            if (config.data) {
              config.data = compactObjectValues(
                JSON.parse(JSON.stringify(config.data)),
                false,
                true
              );
            }
            break;
        }

        return config;
      },
      (error) => {
        // loader off
        store._vm.$EventBus.$emit("loaderOff");

        return Promise.reject(error);
      }
    );
    http.interceptors.response.use(
      (response) => {
        // loader off
        store._vm.$EventBus.$emit("loaderOff");

        // status에 해당하는 에러 메시지가 API_STATUS_CODE_MESSAGES 에 정의된 경우
        if (API_STATUS_CODE_MESSAGES[response?.data?.status]) {
          throw new APIError(API_STATUS_CODE_MESSAGES[response.data.status]);
        }

        const { data } = response;

        return data;
      },
      async (error) => {
        // loader off
        store._vm.$EventBus.$emit("loaderOff");

        // network error - timeout 또는 서버가 내려간 경우 등
        if (error.response?.status === 408 || error.code === "ECONNABORTED") {
          throw new NetworkError("서버 요청에 실패하였습니다");
        }

        const { response } = error;
        if (!response) {
          return Promise.reject(error);
        }

        // 에러 메시지 정의된 경우
        if (API_STATUS_CODE_MESSAGES[response?.data?.status]) {
          // status에 해당하는 에러 메시지가 API_STATUS_CODE_MESSAGES 에 정의된 경우
          throw new APIError(API_STATUS_CODE_MESSAGES[response.data.status]);
        } else if (response?.data?.status === "CONFIRM") {
          // status가 confirm인 경우 - info 메시지 출력
          throw new APIError(response.data.data, true);
        } else if (response?.data?.status === "SESSION_EXPIRED") {
          throw new APIError(response.data.data, false, response?.data?.status);
        } else if (typeof response?.data?.data === "string") {
          // status.data에 에러 메시지가 있는 경우
          throw new APIError(response.data.data);
        }

        // 에러 메시지 없는 경우
        switch (response.status) {
          case 400:
            throw new BadRequestError(response.data);
          case 401:
            throw new UnauthorizedError(response.data);
          case 403:
            throw new ForbiddenError(response.data);
          case 404:
            throw new NotFoundError(response.data);
          case 500:
            throw new InternalServerError(response.data);
        }

        return Promise.reject(error);
      }
    );

    this.http = http;
  }

  async login(email, password) {
    const data = await issueAuthorization.apply(this, [email, password]);

    return data;
  }

  async logout() {
    await removeAuthorization.apply(this);
  }

  // sample
  async fetchSampleList(name) {
    const { data: sampleList } = await fetchSampleList.apply(this, [name]);

    return sampleList;
  }
  async fetchSample(id) {
    const { data: sample } = await fetchSample.apply(this, [id]);

    return sample;
  }
  async createSample(sampleData) {
    const { data: sample } = await createSample.apply(this, [sampleData]);

    return sample;
  }
  async patchSample(id, sampleData) {
    const { data: sample } = await patchSample.apply(this, [id, sampleData]);

    return sample;
  }
  async deleteSample(id) {
    await deleteSample.apply(this, [id]);
  }

  // error test
  async fetchInvalidUrl() {
    await fetchInvalidUrl.apply(this, []);
  }
}

for (const key of Object.getOwnPropertyNames(ProjectAPI.prototype)) {
  switch (key) {
    case "constructor":
    case "login":
    case "logout":
      continue;
  }

  ProjectAPI.prototype[key] = (function (originPromise) {
    return async function () {
      try {
        return await originPromise.apply(this, arguments);
      } catch (e) {
        if (e instanceof UnauthorizedError) {
          router.push({ path: "/login" });
        }

        throw e;
      }
    };
  })(ProjectAPI.prototype[key]);
}

export default new ProjectAPI();
