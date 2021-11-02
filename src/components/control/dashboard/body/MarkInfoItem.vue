<template>
  <div class="mark_info__item">
    <img
      :src="require(`@/assets/images/control/dashboard/${iconName}`)"
      alt="image"
    />
    <span class="mt-1/4 no-drag">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: "MarkInfoItem",
  props: ["iconName", "label"],
};
</script>

<style scoped>
.mark_info__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}
.mark_info__item img {
  width: 30px;
  height: 30px;
}
.mark_info__item span {
  font-size: 0.6rem;
  font-weight: bold;
  color: white;
}

/* media start */
/* laptops 1080 width */
@media screen and (min-width: 1080px) {
  .mark_info__item img {
    width: 40px;
    height: 40px;
  }
  .mark_info__item span {
    font-size: 0.9rem;
  }
}
/* desktop */
@media screen and (min-width: 1920px) {
  .mark_info__item img {
    width: 55px;
    height: 55px;
  }
  .mark_info__item span {
    font-size: 1rem;
  }
}
/* media end */
</style>
