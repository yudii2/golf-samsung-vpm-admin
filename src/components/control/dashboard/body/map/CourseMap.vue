<template>
  <div id="course-map__container" ref="courseMapContainer" v-if="imageUrl">
    <img
      :src="imageUrl"
      class="map-image"
      ref="mapImage"
      @load="mapImageLoaded"
    />
  </div>
</template>

<script>
import {
  CADDIE_MARK_CLASS_NAME,
  CADDIE_PLAY_STEP_ABNORMAL,
  CADDIE_PLAY_STEP_FIRST_WAIT,
} from "@/utils/constants";
import { mapActions, mapGetters } from "vuex";
import useCompany from "@/api/v1/monitor/useCompany";
import useCaddie from "@/api/v1/monitor/useCaddie";

const { getCompany } = useCompany();
const { getCaddies } = useCaddie();

export default {
  name: "CourseMap",

  data() {
    return {
      imageUrl: null,
      points: [],
      refreshTimer: null,
    };
  },

  computed: {
    /**
     * ### 현재 캐디 존재 여부.
     */
    hasCaddies() {
      return Boolean(this.caddies && this.caddies.length);
    },

    /**
     * ### 화면에 표시할 캐디 목록.
     * - 스타트 대기 상태가 아닌 경우.
     * - 비정상 카트 상태가 아닌 경우.
     */
    filteredCaddies() {
      return this.caddies.filter((caddie) => {
        const isNotFirstWait = caddie.playStep != CADDIE_PLAY_STEP_FIRST_WAIT;
        const isNotAbnormal = caddie.playStep != CADDIE_PLAY_STEP_ABNORMAL;
        return isNotFirstWait && isNotAbnormal;
      });
    },

    /**
     * ### 캐디 위치 정보 목록.
     * @returns {Object} bookgName : 예약자명, bookgTime : 예약시간, caddieName : 캐디명, cartNumber : 카트번호, points : 현재 캐디 좌표.
     */
    caddiePositionInfo() {
      const positions = this.filteredCaddies.map((caddie) => ({
        bookgName: caddie.bookgName,
        bookgTime: caddie.bookgTime,
        caddieName: caddie.caddieName,
        cartNo: Number(caddie.cartNo),
        points: caddie.points,
        caddieUniqNo: caddie.caddieUniqNo,
        mark1: caddie.mark1,
        groupCd: caddie.groupCd,
        groupNm: caddie.groupNm,
        playerNameVOList: caddie.playerNameVOList,
      }));
      return positions;
    },

    ...mapGetters({
      isDevMode: "getIsDevMode",
    }),
    ...mapGetters("control/", {
      caddies: "currentCaddies",
      findCaddieByCaddieName: "findCaddieByCaddieName",
      isAutoRefreshMode: "getAutoRefreshMode",
      lookUpCaddies: "getLookUpCaddies",
      findGroupColorByCode: "getGroupColorByCode",
      lookUpGroup: "currentLookUpGroup",
    }),
  },

  methods: {
    /**
     * ### 캐디명으로 캐디 마크 엘리먼트 찾는 메소드.
     */
    findMarkAllByCaddieName(caddieName) {
      const marks = Array.from(
        document.querySelectorAll(`.${CADDIE_MARK_CLASS_NAME}`)
      );
      return marks.filter((mark) => mark?.position?.caddieName === caddieName);
    },

    findMarkAllByClassName(className) {
      return Array.from(document.querySelectorAll(className));
    },

    /**
     * ### 컴포넌트 초기화 메소드.
     */
    init() {
      if (!this.isAutoRefreshMode && !this.isDevMode) {
        this.toggleAutoRefreshMode();
      }

      // 이벤트 리스너 설정.
      this.initListeners();
    },

    /**
     * ### 스토어 설정.
     */
    initStores() {
      // 그룹 Null로 초기화.
      this.setLookUpGroup();
    },

    /**
     * ### 스토어 클리어.
     */
    clearStore() {
      this.setLookUpGroup();
    },

    /**
     * ### 이벤트 리스너 초기화.
     */
    initListeners() {
      window.addEventListener("resize", this.handleWindowResize);
    },

    /**
     * ### 이벤트 리스너 클리어.
     */
    clearListeners() {
      window.removeEventListener("resize", this.handleWindowResize);
    },

    autoRefreshModeStart() {
      this.refreshTimer = setInterval(() => {
        this.requests();
      }, Number(process.env.VUE_APP_REFRESH_TIME));
    },
    autoRefreshModeStop() {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
      this.clearAutoRefreshMode();
    },

    /**
     * ### API 요청.
     */
    async requests() {
      await this.requestCompany();
      await getCaddies();
    },

    /**
     * ### 사업장 정보 요청.
     * - 코스의 지도 정보 가져옴.
     */
    async requestCompany() {
      try {
        const {
          status,
          data: { courseMapInfoList },
        } = await getCompany();
        if (status && status === "OK") {
          const [first] = courseMapInfoList;
          if (first) {
            const {
              downUrl,
              ltLatitude,
              ltLongitude,
              rtLatitude,
              rtLongitude,
              rbLatitude,
              rbLongitude,
              lbLatitude,
              lbLongitude,
            } = first;

            this.imageUrl = downUrl;
            this.points = [
              ltLatitude,
              ltLongitude,
              rtLatitude,
              rtLongitude,
              rbLatitude,
              rbLongitude,
              lbLatitude,
              lbLongitude,
            ];
          }
        }
      } catch (e) {
        console.error("사업장 정보를 불러오는 데 실패했습니다.");
      }
    },

    /**
     * ### 캐디 정보 표시 모달 설정 및 표시할 내용 설정.
     */
    setHoveredCaddie(caddie) {
      this.updateIsShowingPlayingCaddieInfoModal(true);
      this.updateHoveredCaddie(caddie);
    },
    /**
     * ### 캐디 정보 표시 모달 초기화.
     */
    clearHoveredCaddie() {
      this.updateIsShowingPlayingCaddieInfoModal(false);
      this.updateHoveredCaddie();
    },

    clearDots() {
      const marks = document.querySelectorAll(`.${CADDIE_MARK_CLASS_NAME}`);
      if (marks && marks.length) {
        const container = this.$refs.courseMapContainer;
        marks.forEach((mark) => container.removeChild(mark));
      }
    },

    /**
     * ### 지도 위에 캐디 위치를 점으로 그리는 메소드.
     */
    drawDots() {
      // 점 클리어.
      this.clearDots();

      this.caddiePositionInfo.forEach((positionInfo) => {
        if (positionInfo.points) {
          const { latitude, longitude } = positionInfo.points;
          const container = this.$refs.courseMapContainer;
          const dot = document.createElement("div");
          const mapImage = this.$refs.mapImage;

          const coordinate = this.pos2Pix(
            this.points,
            latitude,
            longitude,
            mapImage?.clientWidth,
            mapImage?.clientHeight
          );

          // 스타일링.
          dot.classList.add(CADDIE_MARK_CLASS_NAME);

          // 그룹 아이콘 설정.
          const groupColor = this.findGroupColorByCode(positionInfo.groupCd);
          if (groupColor) {
            dot.classList.add(`team-${groupColor}`);
          }

          // 첫/막팀 아이콘 설정.
          if (positionInfo.mark1 == 1) {
            dot.classList.add("first-team");
          } else if (positionInfo.mark1 == 2) {
            dot.classList.add("last-team");
          }

          // 선택된 단체 표시.
          if (positionInfo?.groupCd === this.lookUpGroup?.groupCd) {
            dot.classList.add("heart-beat");
          } else {
            dot.classList.remove("heart-beat");
          }

          // 값 설정.
          dot.style.left = `${coordinate.x - 15}px`;
          dot.style.top = `${coordinate.y - 30}px`;
          dot.position = positionInfo;

          // 이벤트 리스너 설정.
          dot.addEventListener("mouseover", this.handleCaddieNameMouseOver);
          dot.addEventListener("mouseleave", this.handleCaddieNameMouseLeave);
          dot.addEventListener("click", this.handleCaddiePositionClick);

          // 엘리먼트 추가.
          container.appendChild(dot);
        }
      });
    },

    mapImageLoaded() {
      if (!this.hasCaddies) {
        this.drawDots();
      }

      // 스토어 설정.
      this.initStores();
    },

    /**
     * ### 좌표값을 기반으로 지도에 점 찍는 메소드.
     */
    pos2Pix(points, lat, lon, X, Y) {
      // image width / height를 넣어서 조절하면 이미지 크기가 달라져도 ㅇㅋ
      let lats = [];
      let lons = [];
      lats.push(points[0]);
      lats.push(points[2]);
      lats.push(points[4]);
      lats.push(points[6]);
      lons.push(points[1]);
      lons.push(points[3]);
      lons.push(points[5]);
      lons.push(points[7]);
      let x, y;
      let A, B, C, DX1, DX2, DY1, DY2;
      A = lats[3] - lats[0];
      B = lons[0] - lons[3];
      C = -lons[0] * A - B * lats[0];
      DX1 = (A * lon + B * lat + C) / Math.sqrt(A * A + B * B);
      A = lats[2] - lats[1];
      B = lons[1] - lons[2];
      C = -lons[1] * A - B * lats[1];
      DX2 = (A * lon + B * lat + C) / Math.sqrt(A * A + B * B);
      A = lats[1] - lats[0];
      B = lons[0] - lons[1];
      C = -lons[0] * A - B * lats[0];
      DY1 = (A * lon + B * lat + C) / Math.sqrt(A * A + B * B);
      A = lats[2] - lats[3];
      B = lons[3] - lons[2];
      C = -lons[3] * A - B * lats[3];
      DY2 = (A * lon + B * lat + C) / Math.sqrt(A * A + B * B);
      let blnBetweenX;
      blnBetweenX = DX1 * DX2 < 0 ? "Y" : "N";
      if (DX1 < 0) DX1 = -DX1;
      if (DX2 < 0) DX2 = -DX2;
      x = Math.round(
        (X * (blnBetweenX === "N" && DX1 < DX2 ? -DX1 : DX1)) /
        Math.sqrt(
          (lats[1] - lats[0]) * (lats[1] - lats[0]) +
          (lons[1] - lons[0]) * (lons[1] - lons[0])
        )
      );
      y = Math.round(
        (Y * (blnBetweenX === "N" && DY1 < DY2 ? -DY1 : DY1)) /
        Math.sqrt(
          (lats[3] - lats[0]) * (lats[3] - lats[0]) +
          (lons[3] - lons[0]) * (lons[3] - lons[0])
        )
      );
      return {
        x,
        y,
      };
    },

    /**
     * ### 캐디 좌표 마우스 들어갈 때.
     */
    handleCaddieNameMouseOver(e) {
      this.setHoveredCaddie(e.target.position);
    },

    /**
     * ### 캐디 좌표 마우스 나갈 때.
     */
    handleCaddieNameMouseLeave() {
      this.clearHoveredCaddie();
    },

    /**
     * ### 캐디 좌표 마우스 클릭 시.
     */
    handleCaddiePositionClick(e) {
      this.selectCaddie(e.target.position);
      this.setIsShowingMessengerSendModal(true);
    },

    /**
     * ### 화면 리사이즈 이벤트 핸들러.
     */
    handleWindowResize(e) {
      this.drawDots();
    },

    ...mapActions({
      updateIsShowingPlayingCaddieInfoModal:
        "updateIsShowingPlayingCaddieInfoModal",
      setIsShowingMessengerSendModal: "updateIsShowingMessengerSendModal",
    }),
    ...mapActions("control/", {
      updateHoveredCaddie: "updateHoveredCaddie",
      selectCaddie: "addSelectedCaddie",
      toggleAutoRefreshMode: "toggleAutoRefreshMode",
      clearAutoRefreshMode: "clearAutoRefreshMode",
      selectCaddies: "addLookUpCaddies",
      setLookUpGroup: "updateLookUpGroup",
    }),
  },

  created() {
    this.requests();
  },

  mounted() {
    this.init();
  },

  destroyed() {
    this.clearListeners();

    this.autoRefreshModeStop();

    this.clearStore();
  },

  watch: {
    /**
     * ### 자동 새로고침 모드 체킹.
     */
    isAutoRefreshMode(isRunning) {
      if (isRunning) {
        // 데이터 새로고침.
        this.requests();
        // 데이터 새로고침 루핑 시작.
        this.autoRefreshModeStart();
      } else {
        // 데이터 새로고침 루핑 클리어.
        this.autoRefreshModeStop();
      }
    },

    /**
     * ### 캐디 목록.
     */
    caddies(_) {
      // 캐디 점 다시 그리기.
      this.drawDots();
    },

    /**
     * ### 조회중인 캐디.
     * - 내장객 검색,
     * - 캐디명 검색.
     */
    lookUpCaddies(caddies) {
      if (caddies.length) {
        // 찾을 캐디 명 가져오기
        const foundCaddieNames = caddies.map((caddie) => caddie.caddieName);

        foundCaddieNames.forEach((caddieName) => {
          // 찾아진 캐디가 있는 경우.
          if (caddieName) {
            // 마크 목록에서 캐디명이 일치하는 마크 찾기.
            const foundMarks = this.findMarkAllByCaddieName(caddieName);

            // 일치하는 마크에 i-am-here 클래스 추가.
            for (const mark of foundMarks) {
              mark.classList.add("i-am-here");
            }
          }
        });
      } else {
        // 마크 목록에서 i-am-here 클래스를 가지고 있는 엘리멘트 찾기.
        const foundMarks = this.findMarkAllByClassName(".i-am-here");

        // 찾아진 모든 클래스 제거.
        for (const mark of foundMarks) {
          mark.classList.remove("i-am-here");
        }
      }
    },

    /**
     * ### 단체 지정.
     */
    lookUpGroup(group) {
      // 활성화 클래스 초기화.
      const marks = this.findMarkAllByClassName(".heart-beat");
      marks.forEach((mark) => mark.classList.remove("heart-beat"));

      // 선택된 그룹이 존재하는 경우
      if (group) {
        const marks = this.findMarkAllByClassName(`.${CADDIE_MARK_CLASS_NAME}`);

        const filteredMarks = marks.filter(
          (mark) => mark?.position?.groupCd === group.groupCd
        );

        // 활성화 효과 추가.
        filteredMarks.forEach((mark) => {
          mark.classList.add("heart-beat");
        });
      }
    },
  },
};
</script>

<style scoped>
#course-map__container {
  display: inline-block;
  position: relative;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#course-map__container .map-image {
  height: 100%;
  background-position: center;
  background-size: contain;
}

/* media start */
@media screen and (min-width: 1920px) {
  .dot {
    width: 15px;
    height: 15px;
  }
}
/* media end */
</style>
