import useCopy from "@/composables/useCopy";

const { objectCopier } = useCopy();

/**
 * 이미 클라이언트 레벨에서 보유하고 있는 목록에 대해,
 * 페이징을 처리하는 훅.
 */
export const getListByPage = ({ list, page, take = 5 }) => {
  return {
    data: list.slice((page - 1) * take, page * take),
    pages: Math.ceil(list.length / take),
  };
};

/**
 * ### 페이지네이션을 위한 클래스.
 * @param {Array} list > 페이지네이션을 적용할 리스트.
 * @param {Number} page > 선택할 페이지 (default : 1).
 * @param {Number} take > 한 페이지에 담을 데이터 로우 갯수 (default : 5).
 * @param {Number} divideUnit > 페이지 리스트를 나누는 단위 (default : 5).
 */
export class Pager {
  constructor({ list = [], page = 1, take = 5, divideUnit = 5 }) {
    this.list = list;
    this.take = take;
    this.page = Number(page);
    this.pageIndex = Number(this.page - 1);
    this.divideUnit = Number(divideUnit);

    this.allPages = [];
    this.pagesList = [];
    this.pagesOrder = 1;

    // 클래스 초기화.
    this._init();
  }

  /**
   * ### 페이져 초기화 메소드.
   */
  _init() {
    this._initData();
  }

  /**
   * ### 페이지 데이터 초기화.
   */
  _initData() {
    this._initPages();
    this._initDivide();
  }

  /**
   * ### 페이지를 take 로 나눠 목록화 하는 메소드.
   */
  _initPages() {
    try {
      const tempList = objectCopier(this.list);

      this.allPages = [];
      for (let i = 0; i < Math.ceil(this.list.length / this.take); i++) {
        const temp = [];
        for (let j = 0; j < this.take; j++) {
          const item = tempList.shift();
          if (item) temp.push(item);
        }
        this.allPages.push(temp);
      }
    } catch (e) {
      console.error("_initPages", e.message);
    }
  }

  /**
   * ### 페이지 목록을 DivideUnit 으로 나누는 메소드.
   */
  _initDivide() {
    try {
      const tempAllPages = objectCopier(this.allPages);
      this.pagesList = new Array(
        Math.ceil(tempAllPages.length / this.divideUnit)
      )
        .fill()
        .map(() => tempAllPages.splice(0, this.divideUnit));
    } catch (e) {
      console.error("_initDivide", e.message);
    }
  }

  /**
   * ### 페이지네이션 오브젝트 생성.
   * @returns {Object} > Pager object,
   */
  generate() {
    try {
      const totalPages = this.getTotalPages();
      const totalPagesCount = this.getTotalPagesCount();
      const firstPageRows = this.getFirstPageRows();
      const lastPageRows = this.getLastPageRows();
      const currentPageRows = this.getCurrentPageRows();
      const currentPage = this.page;
      const currentPagesOrder = this.pagesOrder;
      const currentPagesCount = this.getCurrentPagesCount();
      const currentPages = this.getCurrentPages();
      const hasNext = this.hasNext();
      const hasPrevious = this.hasPrevious();
      const take = this.take;
      const divideUnit = this.divideUnit;
      this.getLastPageOfCurrentPages();

      return {
        ok: true,
        totalPages,
        totalPagesCount,
        firstPageRows,
        lastPageRows,
        currentPageRows,
        currentPage,
        currentPages,
        currentPagesOrder,
        take,
        divideUnit,
        currentPagesCount,
        hasNext,
        hasPrevious,
      };
    } catch (e) {
      console.error("generate", e.message);
      return {
        ok: false,
        error: "Something is wrong please check source code.",
      };
    }
  }

  // getter start.

  /**
   * ### 전체 페이지.
   * @returns {Array} > Page object list.
   */
  getTotalPages() {
    return this.allPages || [];
  }

  /**
   * ### 전체 페이지 리스트의 갯수를 구하는 메소드.
   * @returns {number} > 전체 페이지 갯수.
   */
  getTotalPagesCount() {
    return this.getTotalPages()?.length;
  }

  /**
   * ### 현재 페이지 리스트의 갯수를 구하는 메소드.
   * @returns {number} > 현재 페이지 리스트의 갯수.
   */
  getCurrentPagesCount() {
    return this.pagesList[this.pagesOrder - 1]?.length;
  }

  /**
   * ### 현재 페이지.
   */
  getCurrentPage() {
    return this.page;
  }

  /**
   * ### 현재 페이지 인덱스.
   */
  getCurrentPageIndex() {
    return this.pageIndex;
  }

  /**
   * ### 현재 페이지에 목록 대한 페이지 번호 목록을 구하는 메소드.
   * @returns {Array} > 현재 페이지에 대한 페이지 번호 목록.
   */
  getCurrentPages() {
    const firstPageNumber = this.getFirstPageOfCurrentPages();

    const pages = [];
    for (let i = 0; i < this.getCurrentPagesCount(); i++) {
      pages.push(i + firstPageNumber);
    }
    return pages;
  }

  /**
   * ### 현재 페이지 목록에 대한 첫 번째 페이지 번호를 구하는 메소드.
   * @returns {number} > 현제 페이지 목록의 첫 번째 페이지 번호.
   */
  getFirstPageOfCurrentPages() {
    return (this.pagesOrder - 1) * this.divideUnit + 1;
  }

  /**
   * ### 현재 페이지 목록에 대한 마지막 페이지 번호를 구하는 메소드.
   * @returns {number} > 현제 페이지 목록의 마지막 페이지 번호.
   */
  getLastPageOfCurrentPages() {
    // const currentPagesCount = this.getCurrentPagesCount();
    // console.info(currentPagesCount);
    this.pagesList[this.pagesOrder - 1];
  }

  /**
   * ### 첫 번째 페이지 목록의 첫 번째 페이지의 로우 데이터를 구하는 메소드.
   * @returns {Array} > 가장 첫 번째 페이지의 로우 데이터.
   */
  getFirstPageRows() {
    return this.getTotalPagesCount() ? this.allPages[0] : null;
  }

  getPagesOrderIndex() {
    return this.pagesOrder - 1;
  }

  /**
   * ### 현재 페이지 목록의 로우 데이터를 구하는 메소드.
   * @returns {Array} > 현재 설정된 페이지에 기반한 로우 데이터.
   */
  getCurrentPageRows() {
    return [...(this.allPages[this.getCurrentPageIndex()] || [])];
  }

  /**
   * ### 마지막 페이지 목록의 마지막 페이지의 로우 데이터를 구하는 메소드.
   * @returns {Array} > 가장 마지막 페이지의 로우 데이터.
   */
  getLastPageRows() {
    const totalPagesCount = this.getTotalPagesCount();
    const firstPages = this.getFirstPageRows();
    return totalPagesCount > 1
      ? this.allPages[totalPagesCount - 1]
      : firstPages;
  }
  // getter end.

  // setter start.
  setCurrentPage(page) {
    this.page = page;
    this.pageIndex = Number(this.page - 1);
  }

  // setter end.

  /**
   * ### 이전 페이지 목록의 존재 여부를 확인하는 메소드.
   * @returns {boolean} 이전 페이지 존재 여부
   */
  hasPrevious() {
    return this.pagesOrder > 1;
  }

  /**
   * ### 이전 페이지 목록의 존재 여부를 확인하는 메소드.
   * @returns {boolean} 이전 페이지 존재 여부
   */
  hasNext() {
    const totalPagesCount = this.getTotalPagesCount();
    return this.pagesOrder * this.divideUnit < totalPagesCount;
  }

  /**
   * ### 선택한 패이지에 대한 데이터를 반환.
   * @param {Number} page > 사용자가 클릭한 페이지 숫자.
   * @returns {Array} rows > 리스트 타입의 로우 데이터.
   */
  getPageRowsByPage(page = this.page) {
    return this.allPages[page - 1];
  }

  nextPage() {
    this.page++;
    return {
      rows: this.getPageRowsByPage(),
    };
  }

  previousPage() {
    this.page--;
    return {
      rows: this.getPageRowsByPage(),
    };
  }

  nextPages() {
    this.pagesOrder++;
    this.page = this.getFirstPageOfCurrentPages();

    // re-generate.
    return this.generate();
  }

  previousPages() {
    this.pagesOrder--;
    this.page = this.getFirstPageOfCurrentPages();

    // re-generate.
    return this.generate();
  }
}
