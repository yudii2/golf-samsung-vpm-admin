<template>
  <div class="backdrop">
    <article id="club_things_modal__container">
      <!-- 모달 닫기 버튼 -->
      <CloseButton @onClose="handleClickClose"/>
      <section id="club_things_tables">
        <table>
          <thead>
          <tr>
            <th>Player</th>
            <th>클럽명</th>
            <th>브랜드명</th>
            <th>커버유무</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(player) in selectedClubThings">
            <tr v-for="(thing, i) in player.roundPlayerClubVOList" :key="`${player.playerId}${i}`">
              <td :rowspan="player.roundPlayerClubVOList.length" v-if="i===0">
                <p>
                  {{ player.name }}
                </p>
                <button class="button-dark"
                        v-if="player.roundPlayerMemoVOList.length > 0"
                        @click="handleClickMemo(getPlayerMemo(player))"
                >
                  메모
                </button>
              </td>
              <td>{{ thing.clubNm }}</td>
              <td>{{ thing.brandNmKor }}</td>
              <td>{{ thing.coverYn }}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </section>
    </article>
  </div>
</template>

<script>
import CloseButton from "@/components/shared/CloseButton";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ClubThingsModal",

  components: {CloseButton},

  computed: {
    ...mapGetters("admin", {
      selectedClubThings: "getSelectedClubThings",
    })
  },

  methods: {
    /**
     * 플레이어 클럽메모 조회.
     * @param player
     * @returns {*}
     */
    getPlayerMemo(player) {
      return player?.roundPlayerMemoVOList[0]?.memo
    },
    handleClickMemo(memo) {
      this.updateSelectedPlayerClubMemo(memo);
      this.updateIsShowingClubMemoModal(true);
    },
    handleClickClose() {
      this.clearClubThingsModal(false);
    },
    ...mapActions("admin/", {
      updateSelectedPlayerClubMemo: "dispatchUpdateSelectedPlayerClubMemo"
    }),
    ...mapActions({
      clearClubThingsModal: "dispatchIsShowingClubThingsModal",
      updateIsShowingClubMemoModal: 'dispatchIsShowingClubMemoModal'
    }),
  },
}
</script>

<style scoped>
#club_things_modal__container {
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

#club_things_modal__container #club_things_tables {
  grid-column: 1/13;
  overflow-y: scroll;
  text-align: center;
  height: 90%;
  margin: 0 auto;
  margin-top: 20px;
}

#club_things_modal__container #club_things_tables table {
  width: 100%;
  border: 1px solid var(--primary);
}

#club_things_modal__container #club_things_tables table th,
#club_things_modal__container #club_things_tables table td {
  padding: 10px;
  border: 1px solid var(--primary);
}

#club_things_tables .button-dark {
  margin-top: 10px;
}
</style>
