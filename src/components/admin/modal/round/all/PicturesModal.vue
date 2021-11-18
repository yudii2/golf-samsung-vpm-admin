<template>
  <div class="backdrop">
    <article id="pictures-modal__container">
      <!-- 모달 닫기 버튼 -->
      <CloseButton @onClose="handleClickClose"/>

      <!-- 사진 목록 -->
      <section class="images__container" v-if="hasPictures">
        <div
          class="image__wrapper"
          v-for="(picture, idx) in pictures"
          :key="idx"
        >
          <!-- 사진 컴포넌트 -->
          <RoundPicture
            :pictureId="idx"
            :pictureUrl="picture.downUrl"
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
import {mapActions, mapGetters} from "vuex";
import CloseButton from "@/components/shared/CloseButton";
import RoundPicture from "@/components/shared/RoundPicture.vue";
import useRound from "@/api/v1/admin/round/useRound";

const {updateRoundPic, getRoundPic} = useRound();
export default {
  name: "PicturesModal",

  components: {CloseButton, RoundPicture},

  data() {
    return {
      type: "pictures",
    };
  },

  computed: {
    hasPictures() {
      return this.pictures && this.pictures.length;
    },

    ...mapGetters("admin/", {
      pictures: "getSelectedPictures",
      originalAllRows: "getRoundAllRows",
    }),
  },

  methods: {
    handleClickClose() {
      this.clearPicturesModal(false);
    },

    handleClickDetail(pictureId) {
      const {downUrl} = this.pictures.find((_, idx) => idx === pictureId);
      window.open(downUrl, "_blank");
    },

    /**
     * 내장팀 사진 변경
     * 기념사진 -> 클럽사진으로 이동하는 APi 호출.
     * @param pictureId
     * @returns {Promise<void>}
     */
    async handleMovePictureClick(pictureId) {
      const picGubun = "1"; //기념사진에서 클럽사진으로 이동
      const {fileId, roundId} = this.pictures.find(
        (_, idx) => idx === pictureId
      );

      const roundPicChangeReq = {
        fileId: fileId,
        picGubun: picGubun,
        roundId: roundId,
      };

      const {status} = await updateRoundPic(roundPicChangeReq);

      if (status !== "OK") return;
      await this.refreshRoundPic({roundId});
    },
    /**
     * 기념사진 리스트 재조회 API 호출.
     * @param roundId
     * @returns {Promise<void>}
     */
    async refreshRoundPic({roundId}) {
      const picGubun = "2"; //기념사진 리스트 refresh
      const res = await getRoundPic({picGubun, roundId});

      const {status} = res;

      if (status !== "OK") return;

      const {
        data: {roundPicList},
      } = res;

      this.updatePictures(roundPicList);

      const resClubRoundPicList = await this.refreshRoundClubPic({roundId});

      this.refreshRoundAllRows({roundId}, roundPicList, resClubRoundPicList);
    },
    /**
     *
     * 클럽사진 리스트 재조회 API 호출.
     * (vuex로 관리하기 위함 : 전체라운드 리스트 업데이트)
     * @param roundId
     * @returns {Promise<*>}
     */
    async refreshRoundClubPic({roundId}) {
      const picGubun = "1"; // 클럽사진 리스트 refresh
      const res = await getRoundPic({picGubun, roundId});

      const {status} = res;

      if (status !== "OK") return;

      const {
        data: {roundPicList},
      } = res;

      return roundPicList;
    },
    /**
     * vuex mutations.
     * 전체 라운드 값 변경.
     * @param roundId
     * @param roundPicList
     * @param resClubRoundPicList
     */
    refreshRoundAllRows({roundId}, roundPicList, resClubRoundPicList) {
      const foundRow = this.originalAllRows.find(
        (round) => round.roundId === roundId
      );

      foundRow.roundPicVideoList = roundPicList;
      foundRow.roundPicClubList = resClubRoundPicList;
      this.setRoundAllRows([...this.originalAllRows]);
    },
    ...mapActions({
      clearPicturesModal: "updateIsShowingPicturesModal",
    }),
    ...mapActions("admin/", {
      clearPictures: "dispatchClearPictures",
      updatePictures: "dispatchUpdatePictures",
      setRoundAllRows: "dispatchSetRoundAllRows",
    }),
  },

  destroyed() {
    this.clearPictures();
  },
  watch: {
    pictures(picture) {
      if (picture.length === 0) {
        this.handleClickClose();
      }
    },
  },
};
</script>

<style scoped>
#pictures-modal__container {
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
