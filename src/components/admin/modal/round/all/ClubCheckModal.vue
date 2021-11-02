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

export default {
  name: "ClubCheckModal",

  components: { CloseButton, RoundPicture },

  computed: {
    hasPictures() {
      return this.clubCheckImages && this.clubCheckImages.length;
    },

    ...mapGetters("admin/", {
      clubCheckImages: "getSelectedClubCheckImages",
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

    ...mapActions({
      close: "dispatchIsShowingClubCheckModal",
    }),
    ...mapActions("admin/", {
      clearClubCheckImages: "dispatchClubCheckImagesClear",
    }),
  },

  destroyed() {
    this.clearClubCheckImages();
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
  grid-gap: 10px;
  overflow: auto;
}
</style>
