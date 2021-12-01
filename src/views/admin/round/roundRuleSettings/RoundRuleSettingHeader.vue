<template>
  <header>
    <h2>{{ headerTitle }} 라운드 룰 설정</h2>
    <button class="button-dark ml" @click="$emit('onRollbackClick')">
      되돌리기
    </button>
    <button class="button-dark ml" @click="$emit('onSaveClick')">저장</button>
    <!--    <button-->
    <!--      v-if="hasSelectedRoundGroup"-->
    <!--      class="button-dark ml"-->
    <!--      @click="$emit('releaseGroup')"-->
    <!--    >-->
    <!--      초기화-->
    <!--    </button>-->
    <button class="button-dark ml" @click="$emit('onUpdateClick')">수정하기</button>
    <button class="button-dark ml"
            v-if="hasSelectedRoundGroup"
            @click="$emit('onCancelClick')">취소</button>
    <button class="button-dark ml"
            v-if="hasSelectedRoundGroup"
            @click="$emit('onGoBackListClick')">목록으로</button>
  </header>
</template>

<script>
export default {
  name: "RoundRuleSettingHeader",

  props: {
    headerTitle: {
      type: String,
      require: true,
    },

    hasSelectedRoundGroup: {
      type: Boolean,
      require: true,
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  height: 35px;
}
</style>
