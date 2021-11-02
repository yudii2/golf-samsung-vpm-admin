import ProjectAPI from "@/api/ProjectAPI";
import {
  clearLoginEmail,
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
  saveLoginEmail,
  setHasCipherDataGet,
  SESSION_SHARING_MODES,
} from "@/utils/session/SessionUtil";

import router from "@/router";
import store from "@/store";

class ProjectService {
  #api;

  constructor(api) {
    this.#api = api;
  }

  hasSession() {
    return !!getAccessToken();
  }

  async login(
    email,
    password,
    {
      sessionSharingMode = SESSION_SHARING_MODES.STAND_ALONE,
      keepLoginEmail = false,
    }
  ) {
    const { data } = await this.#api.login(email, password);

    saveAccessToken(data.accessToken, sessionSharingMode);
    if (keepLoginEmail) {
      saveLoginEmail(email);
    } else {
      clearLoginEmail();
    }

    // Sample store 삭제
    store.commit("CLEAR_SAMPLE_ALL");

    // 암호화 조회 권한
    setHasCipherDataGet(data.hasCipherAuthority);
  }

  async logout() {
    try {
      await this.#api.logout();
    } finally {
      removeAccessToken();
      store.commit("CLEAR_ALL");

      if (router.currentRoute.name !== "login") {
        router.push({ path: "/login" });
      }
    }
  }

  // sample
  async fetchSampleList(name) {
    return await this.#api.fetchSampleList(name);
  }
  async fetchSample(id) {
    return await this.#api.fetchSample(id);
  }
  async createSample(sample) {
    return await this.#api.createSample(sample);
  }
  async patchSample(id, sample) {
    return await this.#api.patchSample(id, sample);
  }
  async deleteSample(id) {
    return await this.#api.deleteSample(id);
  }

  // error test
  async fetchInvalidUrl() {
    return await this.#api.fetchInvalidUrl();
  }
}

export default new ProjectService(ProjectAPI);
