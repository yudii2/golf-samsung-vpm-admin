<template>
  <nav class="nav__container">
    <!-- 라운드 관리 -->
    <div class="nav round">
      <h4 @click="updateContentView({ title: 'round', subtitle: 1 })">
        라운드 관리
      </h4>
      <ul>
        <li
          @click="updateContentView({ title: 'round', subtitle: 1 })"
          :class="{ clicked: isMe('round', 1) }"
        >
          <span>전체 라운드</span>
        </li>
        <li
          @click="updateContentView({ title: 'round', subtitle: 2 })"
          :class="{ clicked: isMe('round', 2) }"
        >
          <span>단체 라운드</span>
        </li>
        <li
          @click="updateContentView({title : 'round', subtitle : 3})"
          :class="{ clicked: isMe('round', 3) }"
        >
          <span>전체 골프장 설정</span>
        </li>
        <li
          @click="updateContentView({ title: 'round', subtitle: 4 })"
          :class="{ clicked: isMe('round', 4) }"
        >
          <span>증명서 발급</span>
        </li>
        <li
          @click="updateContentView({ title: 'round', subtitle: 5 })"
          :class="{ clicked: isMe('round', 5) }"
        >
          <span>홀아웃 승인</span>
        </li>
      </ul>
    </div>

    <!-- 관제 관리 -->
    <div class="nav monitor">
      <h4 @click="updateContentView({ title: 'monitor', subtitle: 1 })">
        관제 관리
      </h4>
      <ul>
        <li
          @click="updateContentView({ title: 'monitor', subtitle: 1 })"
          :class="{ clicked: isMe('monitor', 1) }"
        >
          <span>진행시간 표준설정</span>
        </li>
        <li
          @click="updateContentView({ title: 'monitor', subtitle: 2 })"
          :class="{ clicked: isMe('monitor', 2) }"
        >
          <span>진행시간 실시간</span>
        </li>
        <li
          @click="updateContentView({ title: 'monitor', subtitle: 3 })"
          :class="{ clicked: isMe('monitor', 3) }"
        >
          <span>진행시간 조회</span>
        </li>
        <li
          @click="updateContentView({ title: 'monitor', subtitle: 4 })"
          :class="{ clicked: isMe('monitor', 4) }"
        >
          <span>진행시간 통계</span>
        </li>
      </ul>
    </div>

    <!-- 차량 관리 -->
    <div class="nav vehicle">
      <h4 @click="updateContentView({ title: 'vehicle', subtitle: 1 })">
        차량 관리
      </h4>

      <ul>
        <li
          @click="updateContentView({ title: 'vehicle', subtitle: 1 })"
          :class="{ clicked: isMe('vehicle', 1) }"
        >
          <span>차량 등록/조회</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RoundNavigation",

  methods: {
    ...mapActions("admin/", {
      updateContentView: "dispatchContentView",
      clearRoundRuleSettingInfo: 'updateRoundRuleSettingInfo',
      updateSelectedRoundGroupName: "dispatchSetSelectedRoundGroupName",
      updateSelectedRoundGroupVisitDt: "dispatchSetSelectedRoundGroupVisitDt",
    }),
  },
  computed: {
    isMe() {
      return (title, i) => {
        const {groupNm} = this.selectedRoundGroup || {};
        if (groupNm) {
          return false;
        } else {
          return title === this.viewTitle && i === this.viewSubTitle;
        }
      }
    },
    ...mapGetters("admin/", {
      viewTitle: "getSelectedContentViewTitle",
      viewSubTitle: "getSelectedContentViewSubtitle",
      selectedRoundGroup: "getSelectedRoundGroup",
      selectedRoundGroupName: "getSelectedRoundGroupName",
      selectedRoundGroupVisitDt: "getSelectedRoundGroupVisitDt",

    }),
  },
  watch: {
    viewSubTitle() {
      this.clearRoundRuleSettingInfo();
      // this.updateSelectedRoundGroupVisitDt();
      // this.updateSelectedRoundGroupName();
    },
    viewTitle() {
      this.clearRoundRuleSettingInfo();
      // this.updateSelectedRoundGroupVisitDt();
      // this.updateSelectedRoundGroupName();
    }
  }
};
</script>

<style scoped>
.nav__container {
  padding: 15px;
}

.nav__container .nav {
  margin-bottom: 15px;
}

.nav__container .nav h4 {
  margin-bottom: 10px;
  letter-spacing: 2px;
  cursor: pointer;
}

.nav__container .nav li {
  padding: 10px;
  font-size: 0.9rem;
}

.nav__container .nav li {
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav__container .nav li.clicked {
  font-size: 1rem;
  font-weight: 600;
}

.nav__container .nav li:hover {
  font-size: 1rem;
  font-weight: 600;
}

.nav__container .nav li span {
  display: inline-block;
  height: 20px;
}
</style>
