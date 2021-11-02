<template>
  <!-- 모달 > 주말추첨예약 취소 -->
  <section class="te-modal te-weekendCancel" v-if="onModal">
    <div class="te-body">
      <div class="te-b-body">
        <div class="te-b-b-body">
          <div class="te-b-b-b-body">
            <div class="te-b-b-b-b-header">
              <div class="te-item">{{ modalInfo.title }}</div>
              <i @click="setOffModal(false)"></i>
            </div>
            <div class="te-b-b-b-b-body">
              <div class="module-modalInformation">
                <div class="mo-body">
                  <ul class="mo-b-body">
                    <li v-for="(content, i) in modalInfo.contents" :key="i">
                      <div class="mo-b-b-header">
                        <div class="mo-item">{{ content.header }}</div>
                      </div>
                      <div class="mo-b-b-body">
                        <div
                          class="mo-item"
                          v-if="content.isSaturday || content.isSunday"
                        >
                          <b
                            :class="{
                              'color-saturday': content.isSaturday,
                              'color-sunday': content.isSunday,
                            }"
                            >{{ content.body }}</b
                          >
                        </div>
                        <div class="mo-item" v-else>
                          {{ content.body }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <ul class="te-b-b-b-b-footer">
              <li>
                <button @click="setOffModal(false)">
                  <div class="te-item">닫기</div>
                </button>
              </li>
              <li class="te-strong">
                <button @click="setOffModal(true)">
                  <div class="te-item">예약취소</div>
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
  name: "WeekendCancelModal",
  created() {
    this.$EventBus.$on("openWeekendCancel", this.setOnModal);
  },
  beforeDestroy() {
    this.$EventBus.$off("openWeekendCancel");
  },
  data() {
    return {
      modalInfo: null,
      onModal: false,
      resolve: null,
    };
  },
  methods: {
    setOnModal(info, resolve) {
      document.querySelector("body").classList.add("active-modalWeekendCancel");
      this.resolve = resolve;
      this.modalInfo = info;
      this.onModal = true;
    },
    setOffModal(response) {
      document
        .querySelector("body")
        .classList.remove("active-modalWeekendCancel");
      this.onModal = false;
      this.resolve(response);
    },
  },
};
</script>
