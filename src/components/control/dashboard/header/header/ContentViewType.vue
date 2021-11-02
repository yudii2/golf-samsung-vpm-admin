<template>
  <div class="content_view_type">
    <div class="content_view_type__container">
      <input
        id="content_view_type__course"
        type="radio"
        :value="COURSE"
        @click="updateViewType(COURSE)"
        :checked="viewType === COURSE"
      />
      <label for="content_view_type__course" class="pointer no-drag"
        >코스별</label
      >
    </div>
    <div class="content_view_type__container">
      <input
        id="content_view_type__map"
        type="radio"
        :value="MAP"
        @click="updateViewType(MAP)"
        :checked="viewType === MAP"
      />
      <label for="content_view_type__map" class="pointer no-drag">지도별</label>
    </div>
  </div>
</template>

<script>
import { COURSE, MAP } from "@/utils/constants";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ContentViewType",
  data() {
    return {
      MAP,
      COURSE,
    };
  },
  destroyed() {
    this.updateViewType(COURSE);
  },
  methods: {
    ...mapActions("control/", {
      updateViewType: "updateViewType",
    }),
  },
  computed: {
    ...mapGetters("control/", {
      viewType: "getViewType",
    }),
  },
};
</script>

<style scoped>
.content_view_type {
  display: flex;
  align-items: center;
}

.content_view_type__container {
  position: relative;
  height: 100%;
}
.content_view_type__container label {
  height: 100%;
  min-width: 65px;
  line-height: 22px;
  display: inline-block;
  border: 1px solid var(--primary);
  padding: 6px 12px;
  transition: all 0.3s ease;
  font-size: 0.75rem;
  text-align: center;
  background-color: var(--dark-green);
}
.content_view_type__container input:checked + label {
  background-color: var(--primary);
  font-weight: 700;
  font-size: 0.8rem;
}

.content_view_type__container:first-child > label {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right: 1px solid var(--primary);
}

.content_view_type__container:last-child > label {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-left: none;
}

/* media start */
@media screen and (min-width: 1200px) {
  .content_view_type__container label {
    font-size: 0.9rem;
  }
  .content_view_type__container input:checked + label {
    font-size: 1rem;
  }
}
/* media end */
</style>
