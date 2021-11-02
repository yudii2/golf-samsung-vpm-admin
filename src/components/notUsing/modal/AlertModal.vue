<template>
  <!-- 모달 > 얼럿 -->
  <section class="te-modal te-alert" v-if="onModal">
    <div class="te-body">
      <div class="te-b-body">
        <div class="te-b-b-body">
          <div class="te-b-b-b-body">
            <div class="te-b-b-b-b-body">
              <div class="module-modalText">
                <div class="mo-body">
                  <div class="mo-item" v-html="modalContent"></div>
                </div>
              </div>
            </div>
            <ul class="te-b-b-b-b-footer">
              <li class="te-strong">
                <button @click="setOffModal(true)">
                  <div class="te-item">확인</div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AlertModal",
  created() {
    this.$EventBus.$on("openAlert", this.setOnModal);
  },
  beforeDestroy() {
    this.$EventBus.$off("openAlert");
  },
  data() {
    return {
      modalContent: null,
      onModal: false,
      resolve: null,
    };
  },
  methods: {
    setOnModal(content, resolve) {
      document.querySelector("body").classList.add("active-modalAlert");
      this.resolve = resolve;
      this.modalContent = content;
      this.onModal = true;
    },
    setOffModal(response) {
      document.querySelector("body").classList.remove("active-modalAlert");
      this.onModal = false;
      this.resolve(response);
    },
  },
};
</script>
