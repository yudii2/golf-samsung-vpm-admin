<template>
  <div class="hole_body" v-if="courses.length">
    <div
      class="hole_body__course"
      v-for="(course, courseIndex) in courses"
      :key="courseIndex"
    >
      <Holes :course="course" />
    </div>
  </div>
  <div class="hole_body" v-else>
    <span v-if="isRefreshing" class="text-center">{{ MESSAGE_LOADING }}</span>
    <span v-else class="text-center">No Course Hole Information</span>
  </div>
</template>

<script>
import Holes from "@/components/control/dashboard/body/Holes.vue";
import { mapGetters } from "vuex";
import { MESSAGE_LOADING } from "@/utils/constants";

export default {
  name: "HoleTitles",
  props: {
    courses: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      MESSAGE_LOADING,
    };
  },
  components: {
    Holes,
  },
  computed: {
    ...mapGetters("control/", {
      isRefreshing: "getIsRefreshing",
    }),
  },
};
</script>

<style scoped>
.hole_body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--deep-green);
}

.hole_body > span {
  align-self: center;
  font-size: 3rem;
  font-weight: 600;
}

.hole_body__course {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}
</style>
