<template>
  <div class="round-picture__container" v-if="pictureUrl">
    <!-- 이미지 소스 -->
    <img class="picture" :src="pictureUrl" />

    <!-- 옵션 -->
    <div class="picture-detail__wrapper">
      <span class="pointer" @click="handleDetailClick">자세히 보기</span>
      <span class="pointer move_picture" @click="handleMovePictureClick"
        >{{ type === "pictures" ? "클럽사진" : "기념사진" }}으로 이동</span
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RoundPicture",

  props: {
    pictureId: {
      type: Number,
      require: true,
    },

    pictureUrl: {
      type: String,
      require: true,
    },

    type: {
      type: String,
      require: true,
    },
  },

  methods: {
    handleDetailClick() {
      this.$emit("onPictureClick", this.pictureId);
    },
    handleMovePictureClick() {
      //NOTE : 클럽사진 picGubun="1" , 기념사진 picGubun="2"
      this.$emit("handleMovePictureClick", this.pictureId);
    },
    ...mapActions({
      toastPreparing: "toastPreparing",
    }),
  },
};
</script>

<style scoped>
.picture {
  max-height: 300px;
  background-position: center;
  background-size: cover;
}

.picture-detail__wrapper {
  background-color: var(--soft-green);
  padding: 10px 15px;
}

.picture-detail__wrapper span {
  transition: color 0.3s ease;
}

.picture-detail__wrapper span:hover {
  color: gold;
}

.picture-detail__wrapper span:nth-child(2) {
  float: right;
}
</style>
