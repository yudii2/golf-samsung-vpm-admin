<template>
  <div class="group-select__container">
    <!-- 셀렉스 박스 -->
    <div class="selector__wrapper round-md" @click="handleSelectorClick">
      <span>{{ currentSelectedGroup }}</span>
      <img :src="arrowUrl" alt="arrow" />
    </div>

    <transition name="fade">
      <!-- 옵션 박스 -->
      <DropDownOptions
        v-if="optionsShown"
        :items="currentGroupNames"
        @onOptionClick="handleOptionClick"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DropDownOptions from "@/components/shared/DropDownOptions.vue";
import { GROUP_CREATE, GROUP_SELECT } from "@/utils/constants";

export default {
  name: "GroupSelect",

  components: {
    DropDownOptions,
  },

  data() {
    return {
      GROUP_SELECT,
      GROUP_CREATE,
      arrowUrl: require("@/assets/images/control/dashboard/ico_select2.png"),
      optionsShown: false,
      selectedGroupName: null,
    };
  },

  computed: {
    currentGroupNames() {
      const names = [
        this.GROUP_SELECT,
        ...this.currentGroups.map((group) => group.groupName),
        this.GROUP_CREATE,
      ];
      return names;
    },

    currentSelectedGroup() {
      return this.lookUpGroup === null
        ? this.selectedGroupName === null
          ? this.GROUP_SELECT
          : this.selectedGroupName
        : this.lookUpGroup.groupName;
    },

    ...mapGetters("control/", {
      currentGroups: "getCurrentGroups",
      lookUpGroup: "currentLookUpGroup",
    }),
  },

  methods: {
    /**
     * ### 옵션 박스 가시성 처리.
     */
    toggleOptionsShow() {
      this.optionsShown = !this.optionsShown;
    },
    optionsHide() {
      this.optionsShown = false;
    },

    // handler
    handleSelectorClick() {
      this.toggleOptionsShow();
    },
    handleOptionClick(groupName) {
      this.selectedGroupName = groupName;
      if (groupName === this.GROUP_CREATE) {
        this.setIsShowingGroupCreateModal(true);
        this.selectedGroupName = this.GROUP_SELECT;
      } else {
        const foundGroup = this.currentGroups.find(
          (group) => group.groupName === groupName
        );
        this.updateLookUpGroup(foundGroup);
      }

      this.optionsHide();
    },

    ...mapActions({
      setIsShowingGroupCreateModal: "updateIsShowingGroupCreateModal",
    }),
    ...mapActions("control/", {
      updateLookUpGroup: "updateLookUpGroup",
    }),
  },

  watch: {
    lookUpGroup(group) {
      if (group === null) this.selectedGroupName = null;
    },
  },
};
</script>

<style scoped>
.group-select__container {
  position: relative;
}

/* selector start */
.selector__wrapper {
  width: 120px;
  height: 35px;
  background-color: var(--primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  transition: all 0.3s ease;
}
.selector__wrapper > span {
  font-size: 0.8rem;
}
/* selector end */

/* options start */
.options__wrapper {
  width: 120px;
  position: absolute;
  top: 45px;
  left: 0;
  background-color: var(--dark);
  border: 1px solid var(--primary);
  z-index: 1;
}
.options__wrapper > li {
  transition: all 0.3s ease;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}
.options__wrapper > li:hover {
  background-color: var(--primary);
}
.options__wrapper > li:first-child:hover {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.options__wrapper > li:last-child:hover {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
/* options end */
</style>
