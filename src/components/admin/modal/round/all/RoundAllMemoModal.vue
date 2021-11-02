<template>
  <div class="backdrop">
    <div id="player_club_memo__container">
      <!-- 모달 닫기 버튼 -->
      <CloseButton @onClose="handleClickClose"/>
      <section id="player_club_memo_wrapper">
        <div class="player_club_memo">
          {{ selectedPlayerClubMemo }}
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CloseButton from "@/components/shared/CloseButton";

export default {
  name: "RoundAllMemoModal",

  components: {CloseButton},

  computed: {
    ...mapGetters("admin/", {
      selectedPlayerClubMemo: "getSelectedPlayerClubMemo"
    })
  },

  methods: {
    handleClickClose() {
      this.clearClubMemoModal(false);
    },
    ...mapActions({
      "clearClubMemoModal": 'dispatchIsShowingClubMemoModal'
    })
  }
}
</script>

<style scoped>
.backdrop {
  z-index: 9999999;
}

#player_club_memo__container {
  width: 35%;
  height: 35%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  padding: 20px;
  border: 1px solid var(--primary);
  border-radius: 20px;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
}

.player_club_memo {
  margin: 0 auto;
  height: 250px;
  overflow-y: scroll;
  font-size: 20px;
  line-height: 28px;
}
</style>
