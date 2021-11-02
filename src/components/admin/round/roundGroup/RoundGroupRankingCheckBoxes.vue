<template>
  <!-- 체크박스 -->
  <div class="ranks__container">
    <ul class="ranks__wrapper">
      <div class="ranks_li__wrapper">
        <li @click="$emit('handleCheckBoxClick', 'newPerio')">
          <div class="checkbox__wrapper">
            <i v-if="isCheckedNewPerio" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">신페리오</span>
        </li>
        <li @click="$emit('handleCheckBoxClick', 'longAndNear')">
          <div class="checkbox__wrapper">
            <i v-if="isCheckedLongAndNear" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">롱/니어</span>
        </li>
      </div>
      <br>
      <div class="ranks_li__wrapper">
        <li @click="$emit('handleCheckBoxClick', 'buddy')">
          <div class="checkbox__wrapper">
            <i v-if="isCheckedBuddy" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">버디</span>
        </li>
        <li @click="$emit('handleCheckBoxClick', 'par')">
          <div class="checkbox__wrapper">
            <i v-if="isCheckedPar" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">파</span>
        </li>
        <li @click="$emit('handleCheckBoxClick', 'oneOver')">
          <div class="checkbox__wrapper">
            <i v-if="isCheckedOneOver" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">보기</span>
        </li>
        <li @click="$emit('handleCheckBoxClick', 'twoOver')">
          <div class="checkbox__wrapper">
            <i v-if="isCheckedTwoOver" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">더블보기</span>
        </li>
        <li @click="$emit('handleCheckBoxClick', 'threeOver')">
          <div class="checkbox__wrapper">
            <i v-if="isCheckedThreeOver" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">트리플보기</span>
        </li>
        <li @click="$emit('handleCheckBoxClick', 'doublePar')">
          <div class="checkbox__wrapper">
            <i v-if="isCheckedDoublePar" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">더블파</span>
        </li>
      </div>
      <br>
      <div class="ranks_li__wrapper">
        <li @click="$emit('handleCheckBoxClick', 'firstSecondGap')">
          <div class="checkbox__wrapper">
            <i v-if="isCheckedFirstSecondGap" class="checker fas fa-check"></i>
          </div>
          <span class="rank no-drag">전후반차</span>
        </li>
        <li @click="$emit('handleCheckBoxClick', 'lucky')">
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
    isCheckedLongAndNear: {type: Boolean, require: true},
    isCheckedBuddy: {type: Boolean, require: true},
    isCheckedPar: {type: Boolean, require: true},
    isCheckedOneOver: {type: Boolean, require: true},
    isCheckedTwoOver: {type: Boolean, require: true},
    isCheckedThreeOver: {type: Boolean, require: true},
    isCheckedDoublePar: {type: Boolean, require: true},
    isCheckedFirstSecondGap: {type: Boolean, require: true},
    isCheckedLucky: {type: Boolean, require: true},
    isCheckedNewPerio: {type: Boolean, require: true},
  },
}
</script>

<style scoped>
.ranks__container {
  margin: 22px 2px;
  font-weight: 800;
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

.ranks__wrapper div.ranks_li__wrapper {
  margin: 10px 0;
}
</style>
