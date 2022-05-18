<template>
  <div class="backdrop">
    <article id="etiquette-modal__container">
      <!-- 모달 닫기 버튼 -->
      <CloseButton @onClose="handleClickClose"/>
      <section id="etiquette_table">
        <table>
          <thead>
          <tr>
            <th>Player</th>
            <th>서명일시</th>
            <th>서명이미지</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(player, i) in etiquetteList" :key="`${player.playerId}${i}`">
            <td>{{ player.name }}</td>
            <td>{{ player.uploadDt }}</td>
            <td>
              <img :src="player.downUrl" alt="" @click="handleDetailClick(player.downUrl)">
            </td>
          </tr>
          </tbody>
        </table>
      </section>


    </article>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CloseButton from "@/components/shared/CloseButton";

export default {
  name: "RoundAllEtiquetteModal",
  components: {CloseButton},
  methods: {
    handleClickClose() {
      this.clearEtiquetteModal(false);
    },
    handleDetailClick(downUrl) {
      window.open(downUrl, "_blank");
    },
    ...mapActions({
      clearEtiquetteModal: "dispatchIsShowingEtiquetteModal",
    })
  },
  computed: {
    hasPictures() {
      return this.etiquetteList && !!this.etiquetteList.length
    },
    ...mapGetters("admin/", {
      etiquetteList: "getEtiquettePictures"
    })
  }
}
</script>

<style scoped>
#etiquette-modal__container {
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

#etiquette-modal__container #etiquette_table {
  grid-column: 1/13;
  overflow-y: scroll;
  text-align: center;
  height: 90%;
  margin: 0 auto;
  margin-top: 20px;
}

#etiquette-modal__container #etiquette_table table {
  width: 100%;
  border: 1px solid var(--primary);
}

#etiquette-modal__container #etiquette_table table th,
#etiquette-modal__container #etiquette_table table td {
  padding: 10px;
  border: 1px solid var(--primary);
}

#etiquette-modal__container #etiquette_table table td:last-child {
  width: 50%;
}

#etiquette-modal__container #etiquette_table table td > img{
  cursor: pointer;
  width: 50%
}

</style>
