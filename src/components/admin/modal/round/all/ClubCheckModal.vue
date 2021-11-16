<template>
  <div class="backdrop">
    <article id="club_check_modal__container">
      <!-- 모달 닫기 버튼 -->
      <CloseButton @onClose="handleClickClose" />

      <!-- 사진 목록 -->
      <section class="images__container" v-if="hasPictures">
        <div
          class="image_wrapper"
          v-for="(image, idx) in clubCheckImages"
          :key="idx"
        >
          <!-- 사진 컴포넌트 -->
          <RoundPicture
            :pictureId="idx"
            :pictureUrl="image.downUrl"
            @onPictureClick="handleClickDetail"
            @handleMovePictureClick="handleMovePictureClick"
            :type="type"
          />
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CloseButton from "@/components/shared/CloseButton.vue";
import RoundPicture from "@/components/shared/RoundPicture.vue";
import useRound from "@/api/v1/admin/round/useRound";

const { updateRoundPic, getRoundPic } = useRound();
export default {
  name: "ClubCheckModal",

  components: { CloseButton, RoundPicture },

  data() {
    return {
      type: "clubCheck",
    };
  },

  computed: {
    hasPictures() {
      return this.clubCheckImages && this.clubCheckImages.length;
    },

    ...mapGetters("admin/", {
      clubCheckImages: "getSelectedClubCheckImages",
      originalAllRows: "getRoundAllRows",
    }),
  },

  methods: {
    handleClickDetail(pictureId) {
      const { downUrl } = this.clubCheckImages.find(
        (_, idx) => idx === pictureId
      );
      window.open(downUrl, "_blank");
    },

    handleClickClose() {
      this.close(false);
    },

    /**
     * 내장팀 사진 변경
     * 클럽사진 -> 기념사진으로 이동 API 호출.
     * @param pictureId
     * @returns {Promise<void>}
     */
    async handleMovePictureClick(pictureId) {
      const picGubun = "2"; //기념사진으로 이동
      const { fileId, roundId } = this.clubCheckImages.find(
        (_, idx) => idx === pictureId
      );

      const roundPicChangeReq = {
        fileId: fileId,
        picGubun: picGubun,
        roundId: roundId,
      };

      const { status } = await updateRoundPic(roundPicChangeReq);

      if (status !== "OK") return;

      await this.refreshRoundClubPic({ roundId });
    },
    /**
     * 클럽사진 리스트 재조회 API 호출.
     * @param roundId
     * @returns {Promise<void>}
     */
    async refreshRoundClubPic({ roundId }) {
      const picGubun = "1"; //클럽사진 리스트 refresh
      const res = await getRoundPic({ picGubun, roundId });

      const { status } = res;

      if (status !== "OK") return;

      const {
        data: { roundPicList },
      } = res;

      this.updateClubCheckImages(roundPicList);

      const resRoundPicList = await this.refreshRoundPic({ roundId });

      this.refreshRoundAllRows({ roundId }, roundPicList, resRoundPicList);
    },
    /**
     * 기념사진 리스트 재조회 API 호출.
     * (vuex 로 관리하기 위함 : 전체라운드 리스트 업데이트)
     * @param roundId
     * @returns {Promise<*>}
     */
    async refreshRoundPic({ roundId }) {
      const picGubun = "2"; // 기념사진 리스트 refresh
      const res = await getRoundPic({ picGubun, roundId });

      const { status } = res;

      if (status !== "OK") return;

      const {
        data: { roundPicList },
      } = res;

      return roundPicList;
    },
    /**
     * vuex mutations.
     * 전체라운드 값 변경.
     * @param roundId
     * @param roundPicList
     */
    refreshRoundAllRows({ roundId }, roundPicList, resRoundPicList) {
      const foundRow = this.originalAllRows.find(
        (round) => round.roundId === roundId
      );

      foundRow.roundPicClubList = roundPicList;
      foundRow.roundPicVideoList = resRoundPicList;
      this.setRoundAllRows([...this.originalAllRows]);
    },
    ...mapActions({
      close: "dispatchIsShowingClubCheckModal",
    }),
    ...mapActions("admin/", {
      clearClubCheckImages: "dispatchClubCheckImagesClear",
      updateClubCheckImages: "dispatchUpdateClubCheckImages",
      setRoundAllRows: "dispatchSetRoundAllRows",
    }),
  },

  destroyed() {
    this.clearClubCheckImages();
  },

  watch: {
    clubCheckImages(clubCheckImage) {
      if (clubCheckImage.length === 0) {
        this.handleClickClose();
      }
    },
  },
};
</script>

<style scoped>
#club_check_modal__container {
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  padding: 20px;
  border: 1px solid var(--primary);
  border-radius: 20px;
}

.images__container {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;
  overflow: auto;
}
</style>
