<template>
  <div id="second_modal_item" @click="handleClickedMark" v-if="mark">
    <img
      :src="require(`@/assets/images/control/dashboard/${mark.fileName}`)"
      :alt="mark.label"
    />
    <span class="mt-1/2">{{ mark.label }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import useMark from "@/api/v1/monitor/useMark.js";

export default {
  name: "SecondModalItem",
  props: ["mark"],
  methods: {
    async handleClickedMark() {
      this.mark.roundId = this.getSelectedCaddie.data.roundId;
      const combinedData = {
        caddieName: this.getSelectedCaddie.data.caddieName,
        caddieUniqNo: this.getSelectedCaddie.data.caddieUniqNo,
        ...this.mark,
      };

      const { updateMark, deleteMark } = useMark();
      let result;
      let isSameCode = false;
      const isFirstMark = this.mark.type === "first";
      if (isFirstMark) {
        isSameCode = this.getSelectedCaddie.data.mark1 == this.mark.code;
      } else {
        isSameCode = this.getSelectedCaddie.data.mark2 == this.mark.code;
      }

      if (isSameCode) {
        result = await deleteMark(combinedData);
      } else {
        result = await updateMark(combinedData);
      }
      this.updateCaddieStatus(result);
    },
    ...mapActions("control/", {
      updateCaddieStatus: "updateCaddieStatus",
    }),
  },
  computed: {
    ...mapGetters("control/", ["getSelectedCaddie"]),
  },
};
</script>

<style>
#second_modal_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
}
#second_modal_item:hover {
  background-color: var(--primary);
}
#second_modal_item img {
  width: 30px;
}
#second_modal_item span {
  width: calc(100% + 10px);
  text-align: center;
  font-size: 0.7rem;
}

/* media start */
@media screen and (min-width: 1600px) {
  #second_modal_item {
    padding: 10px;
    border-radius: 10px;
  }
  #second_modal_item img {
    width: 45px;
  }
  #second_modal_item span {
    font-size: 0.9rem;
  }
}
/* media end */
</style>
