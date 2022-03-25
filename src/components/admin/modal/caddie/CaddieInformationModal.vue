<template>
  <div class="backdrop">
    <article id="caddie_information_modal__container">
      <!-- 모달 닫기 버튼 -->
      <CloseButton @onClose="handleClickClose"/>
      <section>
        <p class="caddie_info_title">캐디 정보</p>
        <table>
          <tr>
            <th>캐디번호</th>
            <td>{{ getCaddieUniqNo }}</td>
          </tr>
          <tr>
            <th>캐디이름</th>
            <td>{{ getCaddieName }}</td>
          </tr>
          <tr>
            <th>핸드폰번호</th>
            <td>
              <input
                type="text"
                class="update_input"
                maxlength="11"
                placeholder="- 없이 입력해주세요."
                :value="getCaddieMobileNo"
                oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                @input="changeCaddieMobileNo"
              />
            </td>
          </tr>
          <tr>
            <th>카트번호</th>
            <td>
              <input
                type="text"
                class="update_input"
                :value="getCaddieCartNo"
                maxlength="10"
                oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                @input="changeCaddieCartNo"
              />
            </td>
          </tr>
        </table>
        <p class="error_message">{{ errorMessage }}</p>
        <div class="buttons__wrapper">
          <button class="button-dark ml" @click="handleClickClose">취소</button>
          <button class="button-dark ml" @click="handleClickUpdate">수정</button>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import CloseButton from "@/components/shared/CloseButton";
import {mapActions, mapGetters} from "vuex";
import useCaddie from "@/api/v1/admin/caddie/useCaddie";

const {updateCaddieInfo} = useCaddie()

export default {
  name: "CaddieInformationModal",
  components: {CloseButton},
  data() {
    return {
      caddieInfoReq: '',
      newCaddieCartNo: '',
      newCaddieMobileNo: '',
      errorMessage: '',

    }
  },
  methods: {
    handleClickClose() {
      this.$EventBus.$emit('needFetch')
      this.updateSelectedCaddieInformation(null);
      this.clearCaddieInformationModal(false)
    },
    changeCaddieCartNo(e) {
      this.newCaddieCartNo = e.target.value
    },
    changeCaddieMobileNo(e) {
      this.newCaddieMobileNo = e.target.value
    },
    async handleClickUpdate() {
      if (!this.getCaddieMobileNo && !this.newCaddieMobileNo) {
        this.toast({title: '캐디 정보 수정', message: '휴대전화는 필수값입니다.'});
        return;
      }

      if (!this.getCaddieCartNo && !this.newCaddieCartNo) {
        this.toast({title: '캐디 정보 수정', message: '카트번호는 필수값입니다.'});
        return;
      }

      if (this.newCaddieMobileNo) {
        if (!this.validateMobileNo()) return;
      }

      const res = await updateCaddieInfo({
        ...this.selectedCaddieInformation,
        'cartNo': this.newCaddieCartNo ? this.newCaddieCartNo : this.getCaddieCartNo,
        'mobileNo': this.newCaddieMobileNo ? this.newCaddieMobileNo : this.getCaddieMobileNo,
      })

      const {status, data} = res;
      if (status !== 'OK') {
        const errorMessage = data.errorMessage || ''
        this.toast({title: '캐디 정보 수정', message: `${errorMessage}`});
        return;
      }

      this.handleClickClose();
      this.toastMessage();

    },
    validateMobileNo() {
      if (this.newCaddieMobileNo.length !== 11) {
        this.errorMessage = '전화번호는 11자리 숫자만 가능합니다.';
        setTimeout(() => {
          this.errorMessage = ''
        }, 3000)
        return false;
      }

      return true;
    },
    toastMessage() {
      this.toast({title: '캐디 정보 수정', message: '수정되었습니다.'})
    },
    ...mapActions({
      clearCaddieInformationModal: "dispatchIsShowingCaddieInformationModal",
      toast: "toast",
    }),
    ...mapActions("admin/", {
      updateSelectedCaddieInformation: "dispatchUpdateSelectedCaddieInformation",
    })
  },
  computed: {
    getCaddieName() {
      return this.selectedCaddieInformation?.caddieName || ""
    },
    getCaddieUniqNo() {
      return this.selectedCaddieInformation?.caddieUniqNo || ''
    },
    getCaddieCartNo() {
      return this.selectedCaddieInformation?.cartNo || ''
    },
    getCaddieMobileNo() {
      return this.selectedCaddieInformation?.mobileNo || ''
    },
    ...mapGetters('admin/', {
      selectedCaddieInformation: "getSelectedCaddieInformation",
    })
  },


}
</script>

<style scoped>
#caddie_information_modal__container {
  width: 30%;
  height: 36%;
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

#caddie_information_modal__container section {
  width: 100%;
}

.caddie_info_title {
  font-size: 23px;
  font-weight: 700;
}

table {
  display: inline-block;
  border-collapse: separate;
  border-spacing: 0 20px;
  padding: 25px 7px 0 7px;
  font-size: 20px;

}

table tr th {
  text-align: left;
  width: 30%;
  border-right: 1px solid var(--primary);
}

table tr td {
  text-align: center;
  width: 50%;
  padding-left: 20px;
}

input::placeholder {
  font-size: 17px;
}

.update_input {
  width: 100%;
  height: 30px;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
}

.error_message {
  font-size: 17px;
  color: tomato;
  text-align: center;
  height: 30px;
}

.buttons__wrapper {
  text-align: right;
}

</style>
