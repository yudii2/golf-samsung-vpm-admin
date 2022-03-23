<template>
  <div class="backdrop">
    <article id="caddie_information_modal__container">
      <!-- 모달 닫기 버튼 -->
      <CloseButton @onClose="handleClickClose"/>
      <section>
        <table>
          <thead>
          <tr>

          </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </section>
    </article>
  </div>
</template>

<script>
import CloseButton from "@/components/shared/CloseButton";
import {mapActions} from "vuex";

export default {
  name: "CaddieInformationModal",
  components: {CloseButton},
  methods: {
    handleClickClose() {
      this.clearCaddieInformationModal(false)
    },
    ...mapActions({
      clearCaddieInformationModal: "dispatchIsShowingCaddieInformationModal",

    })
  },

}
</script>

<style scoped>
#caddie_information_modal__container {
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  padding: 20px;
  border: 1px solid var(--primary);
  border-radius: 20px;
}
#club_things_modal__container * {
  color: var(--secondary);
}
</style>
