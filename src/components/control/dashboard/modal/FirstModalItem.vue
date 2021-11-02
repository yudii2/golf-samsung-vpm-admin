<template>
  <div id="first_modal_item" @click="handleClickGroupIcon" v-if="group">
    <img
      class="mark_icon"
      :src="groupColor"
      :alt="group.groupName"
      ref="firstModalItemImage"
    />
    <span class="mt-1/2">{{ group.groupName }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FirstModalItem",

  props: {
    group: {
      type: Object,
    },
  },

  data() {
    return {
      defaultTeamColorImagePath: require("@/assets/images/control/dashboard/state_people.png"),
    };
  },

  computed: {
    hasGroupColor() {
      return Object.prototype.hasOwnProperty.call(this.group, "groupColor");
    },

    teamColorImagePath() {
      return require(`@/assets/images/control/dashboard/state_team${this.group.groupColor}.png`);
    },

    groupColor() {
      if (this.hasGroupColor) {
        return this.teamColorImagePath;
      } else {
        return this.defaultTeamColorImagePath;
      }
    },

    ...mapGetters("control/", {
      getSelectedGroup: "getCurrentSelectedGroup",
      selectedCaddie: "getSelectedCaddie",
    }),
  },

  methods: {
    handleClickGroupIcon() {
      const mark = this.$refs.firstModalItemImage;
      const rect = mark.getBoundingClientRect();

      this.$emit("onClick", {
        data: this.group,
        position: {
          iconX: rect.x,
          iconY: rect.y,
        },
      });

      return;

      if (!this.getSelectedGroup) {
        this.updateSelectedGroup({
          data: this.group,
          position: {
            iconX: rect.x,
            iconY: rect.y,
          },
        });
        return;
      }

      const isSameGroup =
        this.getSelectedGroup.data.groupCd === this.group.groupCd;

      if (isSameGroup) {
        this.updateSelectedGroup(null);
      } else {
        this.updateSelectedGroup({
          data: this.group,
          position: {
            iconX: rect.x,
            iconY: rect.y,
          },
        });
      }
    },

    ...mapActions("control/", {
      updateSelectedGroup: "updateCurrentSelectedGroup",
    }),
  },

  mounted() {},
};
</script>

<style scoped>
#first_modal_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
}
#first_modal_item:hover {
  background-color: var(--primary);
}
/* roundGroup icon start */
#first_modal_item .mark_icon {
  width: 30px;
}
/* roundGroup icon end */

/* roundGroup text start */
#first_modal_item span {
  width: calc(100% + 10px);
  text-align: center;
  font-size: 0.7rem;
}
/* roundGroup text end */

/* media start */
@media screen and (min-width: 1600px) {
  #first_modal_item {
    padding: 10px;
    border-radius: 10px;
  }
  #first_modal_item .mark_icon {
    width: 45px;
  }
  #first_modal_item span {
    font-size: 0.9rem;
  }
}
/* media end */
</style>
