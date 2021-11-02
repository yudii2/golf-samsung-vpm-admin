export default {
  /**
   * ### 사업장 정보 업데이트 하는 메소드.
   * @param {Object} companyInfo > 새로운 사업장 정보.
   */
  updateCompany({ commit }, companyInfo) {
    commit("UPDATE_COMPANY", companyInfo);
  },

  /**
   * ### 사업장 코드 업데이트.
   * @param {string} companyCode > 사업장 코드.
   */
  updateCompanyCode({ commit }, companyCode) {
    commit("UPDATE_COMPANY_CODE", companyCode);
  },

  /**
   * ### 사업장 명 업데이트.
   * @param {string} companyName > 사업장 명.
   */
  updateCompanyName({ commit }, companyName) {
    commit("UPDATE_COMPANY_NAME", companyName);
  },

  /**
   * 새로고침 후 페이크 데이터 저장.
   * - 페이크 데이터는 새로고침 시 데이터가 비어있는 경우 화면에 표시.
   */
  updateTempCaddies({ commit }) {
    commit("UPDATE_TEMP_CADDIES");
  },

  /**
   * ### Company state 안에 있는 caddie 데이터 변경.
   * - 데이터 변경은 currentSelectedCaddie 데이터를 기반으로 적용.
   */
  updateCaddieInCompanyState({ commit, getters }) {
    const sourceCaddie = getters.getSelectedCaddie.data;
    commit("UPDATE_CADDIE_IN_COMPANY", sourceCaddie);
  },

  async combineCompanyAndCaddies({ commit }) {
    await commit("COMBINE_COMPANY_AND_CADDIES");
    await commit("UPDATE_TEMP_CADDIES");
  },
};
