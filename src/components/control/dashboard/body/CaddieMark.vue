<template>
  <div id="caddie_mark" v-if="caddie && hasMark">
    <transition name="fade" mode="out-in" appear>
      <img
        v-if="caddie.mark2 == 1"
        :src="require('@/assets/images/control/dashboard/state_vip.png')"
        alt="vip"
        :key="caddie.mark2"
      />
      <img
        v-else-if="caddie.mark2 == 2"
        :src="require('@/assets/images/control/dashboard/state_edu.png')"
        alt="edu"
        :key="caddie.mark2"
      />
      <img
        v-else-if="caddie.mark2 == 3"
        :src="require('@/assets/images/control/dashboard/state_caution.png')"
        alt="caution"
        :key="caddie.mark2"
      />
      <img
        v-else-if="caddie.mark2 == 4"
        :src="require('@/assets/images/control/dashboard/state_work.png')"
        alt="work"
        :key="caddie.mark2"
      />
      <img
        v-else-if="caddie.mark2 == 5"
        :src="require('@/assets/images/control/dashboard/state_holeadd.png')"
        alt="hole add"
        :key="caddie.mark2"
      />
      <img
        v-else-if="caddie.mark2 == 6"
        :src="require('@/assets/images/control/dashboard/state_newcomer.png')"
        alt="hole add"
        :key="caddie.mark2"
      />
      <img
        v-else-if="caddie.mark2 == 7"
        :src="require('@/assets/images/control/dashboard/state_self.png')"
        alt="self"
        :key="caddie.mark2"
      />
      <img
        v-else-if="caddie.mark2 == 8"
        :src="require('@/assets/images/control/dashboard/state_beto.png')"
        alt="beto"
        :key="caddie.mark2"
      />
      <img
        v-else-if="caddie.mark2 == 9"
        :src="require('@/assets/images/control/dashboard/state_food.png')"
        alt="food"
        :key="caddie.mark2"
        @mousemove="showModal(caddie)"
        @mouseleave="closeModal"
        :class="{'order_icon' : addClass}"

      />
    </transition>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CaddieMark",

  props: {
    caddie: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      addClass: false
    }
  },
  computed: {
    hasMark() {
      return this.caddie.mark2 !== null;
    },
    ...mapGetters("control/", {
      getOrder: "getOrderList",
    })
  },

  methods: {
    showModal(caddie) {
      const isOrderableMode = this.$parent?.$parent?.isOrderableMode

      if (isOrderableMode) {
        const {caddieUniqNo} = caddie;
        const selectedOrder = this.getOrder(caddieUniqNo)

        if (selectedOrder) {
          this.addClass = true;
          this.setSelectedOrder(selectedOrder);
          this.updateIsShowingOrderInfoModal(true);
        }
      }
    },
    closeModal() {
      this.updateIsShowingOrderInfoModal(false);
    },
    ...mapActions({
      updateIsShowingOrderInfoModal: "updateIsShowingOrderInfoModal"
    }),
    ...mapActions('control/', {
      setSelectedOrder: "setSelectedOrder",
    })
  }
};
</script>

<style scoped>
#caddie_mark {
  position: absolute;
  left: 50%;
  width: 60px;
  height: 28px;
  transform: translate(-50%, -28px);
  display: flex;
  justify-content: center;
}

#caddie_mark img {
  width: 22px;
  height: 22px;
}

/* media start */
/* tablet */
@media screen and (min-width: 500px) {
  #caddie_mark {
    height: 32px;
    transform: translate(-50%, -32px);
  }

  #caddie_mark img {
    width: 25px;
    height: 25px;
  }
}

/* laptops */
@media screen and (min-width: 720px) {
  #caddie_mark {
    height: 34px;
    transform: translate(-50%, -34px);
  }

  #caddie_mark img {
    width: 28px;
    height: 28px;
  }
}

/* laptops lg */
@media screen and (min-width: 900px) {
  #caddie_mark {
    height: 34px;
    transform: translate(-50%, -34px);
  }

  #caddie_mark img {
    width: 31px;
    height: 31px;
  }
}

/* desktop */
@media screen and (min-width: 1080px) {
  #caddie_mark {
    height: 36px;
    transform: translate(-50%, -32px);
  }

  #caddie_mark img {
    width: 34px;
    height: 34px;
  }

  #caddie_mark .order_icon:hover{
    height: 36px;
    width: 36px;
  }
}

/* desktop lg */
@media screen and (min-width: 1920px) {
  #caddie_mark {
    height: 45px;
    transform: translate(-50%, -35px);
  }

  #caddie_mark img {
    width: 37px;
    height: 37px;
  }
  #caddie_mark .order_icon:hover{
    height: 39px;
    width: 39px;
  }
}

/* media end */
</style>
