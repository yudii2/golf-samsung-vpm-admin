<template>
  <div
    id="multi_select__container"
    class="ml pointer round-md px py-1/2"
    :class="{ checked: isMultiSelectMode }"
    @click="handleClickToggle"
  >
    <img
      class="multi_select_icon mr-1/2"
      :src="require('@/assets/images/control/dashboard/ico_multi.png')"
      alt=""
    />
    <span class="no-drag" ref="multiSelectText">다중선택</span>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {MAP} from "@/utils/constants";

export default {
  name: "MultiSelect",

  computed: {
    ...mapGetters("control/", {
      isMultiSelectMode: "getIsMultiSelectMode",
      viewType: "getViewType",
    }),
  },

  methods: {
    handleClickToggle() {
      if (this.viewType === MAP) {
        this.toast({
          title: "다중 선택",
          message: "지도 보기에서는 이 기능을 사용할 수 없습니다.",
        });
        return;
      }

      this.toggleMultiSelectMode();
    },

    ...mapActions({
      toast: "toast",
    }),
    ...mapActions("control/", ["toggleMultiSelectMode"]),
  },
};
</script>

<style scoped>
#multi_select__container {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid var(--primary);
  max-width: 115px;
  background-color: var(--dark-green);
}

#multi_select__container.checked {
  background-color: var(--primary);
}

#multi_select__container .multi_select_icon {
  width: 20px;
  height: 25px;
}

#multi_select__container > span {
  min-width: 70px;
  height: 15px;
  line-height: 15px;
  font-size: 0.75rem;
  transition: all 0.3s ease;
}
#multi_select__container.checked span {
  font-size: 0.8rem;
  font-weight: 700;
}

/* media start */
@media screen and (min-width: 1200px) {
  #multi_select__container {
    max-width: 125px;
  }
  #multi_select__container > span {
    font-size: 0.9rem;
  }
  #multi_select__container.checked span {
    font-size: 1rem;
  }
}
/* media end */
</style>
