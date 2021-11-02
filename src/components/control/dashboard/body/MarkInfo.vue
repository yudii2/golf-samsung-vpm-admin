<template>
  <main id="mark_info" :class="{ open: getShowMarkInfo }">
    <!-- header -->
    <header class="ml" @click="handleClickHeader" ref="markInfoHeader">
      <span>Info</span>
      <img
        class="arrow_icon"
        :class="{ top: !getShowMarkInfo }"
        :src="require('@/assets/images/control/dashboard/ico_down.png')"
        alt=""
      />
    </header>

    <!-- body -->
    <article>
      <section class="mark_info__seconds">
        <MarkInfoItem iconName="state_vip.png" label="VIP" />
        <MarkInfoItem iconName="state_edu.png" label="교육" />
        <MarkInfoItem iconName="state_caution.png" label="주의" />
        <MarkInfoItem iconName="state_work.png" label="업무" />
        <MarkInfoItem iconName="state_holeadd.png" label="9홀 추가" />
        <MarkInfoItem iconName="state_newcomer.png" label="신입" />
        <MarkInfoItem iconName="state_self.png" label="셀프" />
        <MarkInfoItem iconName="state_beto.png" label="베토" />
        <MarkInfoItem iconName="state_food.png" label="식사주문" />
      </section>
      <section class="mark_info__people">
        <MarkInfoItem iconName="state_people2.png" label="2인" />
        <MarkInfoItem iconName="state_people3.png" label="3인" />
      </section>
      <section>
        <MarkInfoItem iconName="state_last.png" label="막팀" />
        <MarkInfoItem iconName="state_first.png" label="첫팀" />
      </section>
      <section>
        <MarkInfoItem iconName="state_team1.png" label="던체1팀" />
        <MarkInfoItem iconName="state_team2.png" label="던체2팀" />
        <MarkInfoItem iconName="state_team3.png" label="던체3팀" />
        <MarkInfoItem iconName="state_team4.png" label="던체4팀" />
        <MarkInfoItem iconName="state_team5.png" label="던체5팀" />
      </section>
    </article>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import MarkInfoItem from "@/components/control/dashboard/body/MarkInfoItem.vue";

export default {
  name: "MarkInfo",
  components: { MarkInfoItem },
  methods: {
    handleClickHeader() {
      this.toggleShowMarkInfo();
    },
    ...mapMutations("control/", ["toggleShowMarkInfo"]),
  },
  computed: {
    ...mapGetters("control/", ["getShowMarkInfo"]),
  },
};
</script>

<style scoped>
#mark_info {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -145px;
  height: 145px;
  transition: all 0.3s ease;
  z-index: 1;
}

#mark_info.open {
  bottom: -65px;
}

/* header start */
#mark_info header {
  position: absolute;
  top: -25px;
  width: 100px;
  height: 25px;
  background-color: tomato;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
#mark_info header span {
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: capitalize;
  color: white;
  letter-spacing: 1.5px;
}
#mark_info header img {
  width: 15px;
  height: 8px;
  transition: all 1s ease;
}
#mark_info header img.top {
  transform: rotateX(-180deg);
}
/* header end */

#mark_info article {
  height: 80px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#mark_info article section {
  display: flex;
}

/* media start */
@media screen and (min-width: 1080px) {
  #mark_info {
    height: 175px;
    bottom: -175px;
  }

  /* header start */
  #mark_info header {
    top: -30px;
    height: 30px;
    width: 110px;
  }
  #mark_info header span {
    font-size: 1rem;
  }
  /* header end */
  #mark_info header img {
    width: 20px;
    height: 13px;
  }
  #mark_info article {
    height: 110px;
  }
}
@media screen and (min-width: 1920px) {
  #mark_info {
    height: 195px;
    bottom: -195px;
  }

  #mark_info.open {
    bottom: -65px;
  }

  /* header start */
  #mark_info header {
    top: -45px;
    height: 45px;
    width: 120px;
  }
  #mark_info header span {
    font-size: 1.3rem;
  }
  /* header end */
  #mark_info header img {
    width: 23px;
    height: 16px;
  }
  #mark_info article {
    height: 130px;
  }
}
/* media end */
</style>
