<template>
  <div
    id="toast"
    :class="{ blink: runBlink(toastInfo.animation) }"
    @click="$emit('onClick')"
    ref="toast"
  >
    <h2 v-if="toastInfo.title">{{ toastInfo.title }}</h2>
    <p>
      <span v-html="toastInfo.message"></span>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ANIMATION_BLINK } from "@/utils/constants";

export default {
  name: "Toast",
  props: {
    toastInfo: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      ANIMATION_BLINK,
    };
  },
  computed: {
    runBlink() {
      return (animation) => {
        return animation === ANIMATION_BLINK;
      };
    },
    ...mapGetters({
      // toastInfo: "getToast",
      getToastIsShowing: "getToastIsShowing",
    }),
  },
  methods: {
    ...mapActions({
      updateToastElement: "updateToastElement",
    }),
  },
  mounted() {
    this.updateToastElement(this.$refs.toast);
  },
};
</script>

<style scoped>
#toast {
  width: 300px;
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: var(--soft-green);
  color: var(--secondary);
  padding: 12px 17px;
  border-radius: 5px;
  animation: toast-wobble 0.5s ease;
  z-index: 2;
  cursor: pointer;

  transition: all 0.3s ease;
}

#toast.blink {
  animation: heart-beat 0.5s ease-in;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

#toast > h2 {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

#toast ::v-deep mark {
  color: var(--secondary);
  background-color: transparent;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-position: under;
}

/* animation start */
@keyframes toast-wobble {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
}

@keyframes heart-beat {
  from {
    opacity: 1;
    transform: scale(1.05);
  }
  to {
    opacity: 0.75;
    transform: scale(1);
  }
}
/* animation end */
</style>
