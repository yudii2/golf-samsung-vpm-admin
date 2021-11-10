<template>
  <!-- 체크박스 -->
  <div class="ranks__container">
    <ul class="ranks__wrapper">
      <div class="ranks_li__wrapper">
        <li
          @click="
            $emit('handleCheckBoxClick', {
              type: 'newPerio',
              status: isCheckedNewPerio,
            })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedNewPerio" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">신페리오</span>
        </li>
        <li
          @click="
            $emit('handleCheckBoxClick', {
              type: 'longAndNear',
              status: isCheckedLongAndNear,
            })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedLongAndNear" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">롱/니어</span>
        </li>
        <li
          @click="
            $emit('handleCheckBoxClick', {
              type: 'firstSecond',
              status: isCheckedFirstSecond,
            })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedFirstSecond" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">전/후반</span>
        </li>
      </div>
      <br />
      <div class="ranks_li__wrapper">
        <li
          @click="
            $emit('handleCheckBoxClick', {
              type: 'buddy',
              status: isCheckedBuddy,
            })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedBuddy" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">버디</span>
        </li>
        <li
          @click="
            $emit('handleCheckBoxClick', { type: 'par', status: isCheckedPar })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedPar" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">파</span>
        </li>
        <li
          @click="
            $emit('handleCheckBoxClick', {
              type: 'oneOver',
              status: isCheckedOneOver,
            })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedOneOver" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">보기</span>
        </li>
        <li
          @click="
            $emit('handleCheckBoxClick', {
              type: 'twoOver',
              status: isCheckedTwoOver,
            })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedTwoOver" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">더블보기</span>
        </li>
        <li
          @click="
            $emit('handleCheckBoxClick', {
              type: 'threeOver',
              status: isCheckedThreeOver,
            })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedThreeOver" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">트리플보기</span>
        </li>
        <li
          @click="
            $emit('handleCheckBoxClick', {
              type: 'doublePar',
              status: isCheckedDoublePar,
            })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedDoublePar" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">더블파</span>
        </li>
      </div>
      <br />
      <div class="ranks_li__wrapper">
        <li
          @click="
            $emit('handleCheckBoxClick', {
              type: 'firstSecondGap',
              status: isCheckedFirstSecondGap,
            })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedFirstSecondGap" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">전후반차</span>
        </li>
        <li
          @click="
            $emit('handleCheckBoxClick', {
              type: 'lucky',
              status: isCheckedLucky,
            })
          "
        >
          <div class="checkbox__wrapper">
            <i v-if="isCheckedLucky" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">행운상</span>
        </li>
      </div>
    </ul>
  </div>
  <!-- //체크박스 -->
</template>

<script>
export default {
  name: "RoundGroupRankingCheckBoxes",

  props: {
    isCheckedLongAndNear: { type: Boolean, require: true },
    isCheckedBuddy: { type: Boolean, require: true },
    isCheckedPar: { type: Boolean, require: true },
    isCheckedOneOver: { type: Boolean, require: true },
    isCheckedTwoOver: { type: Boolean, require: true },
    isCheckedThreeOver: { type: Boolean, require: true },
    isCheckedDoublePar: { type: Boolean, require: true },
    isCheckedFirstSecondGap: { type: Boolean, require: true },
    isCheckedLucky: { type: Boolean, require: true },
    isCheckedNewPerio: { type: Boolean, require: true },
    isCheckedFirstSecond: { type: Boolean, require: true },
  },
};
</script>

<style scoped>
.ranks__container {
  font-weight: 800;
  display: flex;
}

.ranks__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.ranks__wrapper .checkbox__wrapper {
  position: absolute;
  color: tomato;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 5px;
}

.ranks__wrapper li {
  align-items: center;
  cursor: pointer;
  float: left;
}

.ranks__wrapper li .rank {
  margin: 0 30px;
  font-size: 1rem;
}

.ranks__wrapper li .checker {
  margin-left: 2px;
}
</style>
