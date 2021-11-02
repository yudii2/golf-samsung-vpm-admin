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

export default {
  name: "PicturesModal",

  components: {CloseButton, RoundPicture},

  computed: {
    hasPictures() {
      return this.pictures && this.pictures.length;
    },

    ...mapGetters("admin/", {
      pictures: "getSelectedPictures",
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

    ...mapActions({
      clearPicturesModal: "updateIsShowingPicturesModal",
    }),

    ...mapActions("admin/", {
      clearPictures: "dispatchClearPictures",
    }),
  },

  destroyed() {
    this.clearPictures();
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
  grid-gap: 10px;
  overflow: auto;
}
</style>
