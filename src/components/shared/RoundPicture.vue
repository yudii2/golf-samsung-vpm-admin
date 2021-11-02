<template>
  <div class="round-picture__container" v-if="pictureUrl">
    <!-- 이미지 소스 -->
    <img class="picture" :src="pictureUrl" />

    <!-- 옵션 -->
    <div class="picture-detail__wrapper">
      <span class="pointer" @click="handleDetailClick">자세히 보기</span>
    </div>
  </div>
</template>

<script>
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
  },

  methods: {
    handleDetailClick() {
      this.$emit("onPictureClick", this.pictureId);
    },
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
</style>
