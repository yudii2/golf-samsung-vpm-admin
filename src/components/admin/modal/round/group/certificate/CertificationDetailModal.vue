<template>
  <div class="backdrop">
    <article id="certification_modal__container">
      <header>
        <div class="buttons">
          <button class="button-dark" @click="handleClickPrint">
            인쇄하기
          </button>
          <button class="button-dark" @click="resetData">
            초기화
          </button>
        </div>
      </header>
      <CloseButton @onClose="handleClickClose"/>
      <section>
        <div class="certification_image__wrapper" ref="certification">
          <img
            class="certification_image"
            :src="
              require('@/assets/images/admin/group/certification_ansung.png')
            "
          />
          <div class="text_container">
            <p class="record_number">No. {{ getSelectedCertification.recordNo }}</p>
            <p class="certification_name">
              {{ certificateNmByCd(getSelectedCertification.certificateCd) }}
            </p>
            <template v-if="updatedPlayerName">
              <p class="player_name">
                {{ updatedPlayerName }}
              </p>
            </template>
            <template v-else>
              <p class="player_name">
                {{ getSelectedCertification.playerNm }}
              </p>
            </template>
            <template v-if="getSelectedCertification.courseNm !== null">
              <p class="course_info">
                {{
                  `${company.name} ${getSelectedCertification.courseNm}코스 ${getSelectedCertification.holeNm}`
                }}
              </p>
            </template>
            <template v-else>
              <p class="course_info">
                {{ company.name }}
              </p>
            </template>
            <p class="course_info_english">
              {{
                `${getSelectedCertification.courseNmEng} Course # ${getSelectedCertification.holeNm} ${companyNameEnglish}`
              }}
            </p>
            <template v-if="getSelectedCertification.companionNames !== null && isCheckedCompanion">
              <p class="companion_name" v-if="updatedCompanionNames">
                동반자 :
                {{ updatedCompanionNames }}
              </p>
              <p class="companion_name" v-else>
                동반자 :
                {{ getSelectedCertification.companionNames }}
              </p>
            </template>
            <template v-else>
              <p class="companion_name"></p>
            </template>
            <p class="club_name" v-if="insertedClubName && isCheckedClub">
              사용클럽 : {{ insertedClubName }}
            </p>
            <p class="record_date">
              기록일 :
              {{ parsedRecordDt(getSelectedCertification.recordDt) }}
            </p>
            <p class="celebration_message">
              행운의
              {{
                certificateNmByCd(getSelectedCertification.certificateCd)
              }}
              기념을 축하드리며 이 증서를 드립니다.
            </p>
          </div>
        </div>
        <div class="input__check_container">
          <div class="input__container">
            <label for="update_name_input" class="update_name_label">이름변경</label>
            <input id="update_name_input"
                   type="text"
                   class="update_input"
                   autocomplete="off"
                   @input="updateTempPlayerName">
            <button class="button-dark save_name_button" @click="updatePlayerName">저장</button>
          </div>
          <div class="input__container">
            <div class="checkbox__wrapper" @click="handleCheckBoxClick('companion')">
              <i class="fas fa-check"
                 :class="{'checker' : isCheckedCompanion}"
              ></i>
            </div>
            <label for="update_companion_input" class="update_companion_label">동반자</label>
            <input id="update_companion_input"
                   type="text"
                   class="update_input"
                   autocomplete="off"
                   @input="updateTempCompanionNames">
            <button class="button-dark save_companion_button" @click="updateCompanionNames">저장</button>
          </div>
          <div class="input__container">
            <div class="checkbox__wrapper" @click="handleCheckBoxClick('club')">
              <i class="fas fa-check"
                 :class="{'checker' : isCheckedClub}"
              ></i>
            </div>
            <label for="insert_club_input">사용클럽</label>
            <input id="insert_club_input"
                   type="text"
                   class="update_input"
                   autocomplete="off"
                   @input="insertTempClubName">
            <button class="button-dark save_club_button" @click="insertClubName">저장</button>
          </div>
        </div>
      </section>
    </article>
    <CertificationPrint
      ref="certification"
      :selectedCertification="getSelectedCertification"
      :isCheckedCompanion="isCheckedCompanion"
      :isCheckedClub="isCheckedClub"
      :updatedPlayerName="updatedPlayerName"
      :updatedCompanionNames="updatedCompanionNames"
      :insertedClubName="insertedClubName"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CloseButton from "@/components/shared/CloseButton";
import useCertificate from "@/api/v1/admin/certificate/useCertificate";
import {print} from "@/composables/usePrinter";
import CertificationPrint from "@/components/admin/round/certification/CertificationPrint";

export default {
  name: "CertificationDetailModal",

  components: {CertificationPrint, CloseButton},

  data() {
    return {
      isCheckedCompanion: true,
      isCheckedClub: false,
      updatedTempPlayerName: '',
      updatedPlayerName: '',
      updatedTempCompanionNames: '',
      updatedCompanionNames: '',
      insertedTempClubName: '',
      insertedClubName: '',

    }
  },

  computed: {
    ...mapGetters("admin/", {
      getSelectedCertification: "getSelectedCertification",
    }),
    ...mapGetters("control/", {
      company: "getCompany",
      companyNameEnglish: "getCompanyNameEnglish",
    }),
  },

  methods: {
    handleClickClose() {
      this.close(false);
    },

    /**
     * certicicateCd 에 따라 증명서 이름 리턴하는 메소드.
     * @param certificateCd
     * @returns {string}
     */
    certificateNmByCd(certificateCd) {
      switch (certificateCd) {
        case "1":
          return "이글";
        case "2":
          return "홀인원";
        case "3":
          return "알바트로스";
        case "4":
          return "에이지슈터";
      }
    },

    /**
     * 초기화버튼.
     * 데이터를 초기값으로 셋팅해주는 메소드.
     */
    resetData() {
      this.isCheckedCompanion = true;
      this.isCheckedClub = false;
      this.updatedTempPlayerName = '';
      this.updatedPlayerName = '';
      this.updatedTempCompanionNames = '';
      this.updatedCompanionNames = '';
      this.insertedTempClubName = '';
      this.insertedClubName = '';
      const inputBox = document.getElementsByClassName('update_input')
      for (let i = 0; i < inputBox.length; i++) {
        inputBox[i].value = '';
      }
    },

    async handleClickPrint() {
      const certification = this.$refs.certification.$el;

      print({
        targetElement: certification,
      });
    },

    /**
     * 기록일 파싱.
     * input YYYYMMDD
     * output YYYY.MM.DD
     * @param recordDt
     * @returns {string}
     */
    parsedRecordDt(recordDt) {
      let year = recordDt.substring(0, 4);
      let month = recordDt.substring(4, 6);
      let day = recordDt.substring(6, 8);
      return `${year}.${month}.${day}`;
    },

    /**
     * 체크박스 해제 유무.
     * @param type
     * @returns {boolean}
     */
    handleCheckBoxClick(type) {
      switch (type) {
        case 'companion':
          return this.isCheckedCompanion = !this.isCheckedCompanion;
        case 'club':
          return this.isCheckedClub = !this.isCheckedClub;
      }
    },

    /**
     * 이름변경 input 메소드.
     * 임시변수(updatedTempPlayerName)에 할당했다가 저장버튼 눌렀을 시 set 해주기 위함으로 사용.
     * @param e
     */
    updateTempPlayerName(e) {
      this.updatedTempPlayerName = e.target.value
    },
    /**
     * 이름변경 저장버튼 눌렀을 시 실행되는 메소드.
     *  임시변수(updatedTempPlayerName)에 할당되었던 값을 updatedPlayerName 에 재할당.
     */
    updatePlayerName() {
      this.updatedPlayerName = this.updatedTempPlayerName;
    },
    /**
     * 동반자 변경 input 메소드.
     * 임시변수(updatedTempCompanionNames)에 할당했다가 저장버튼 눌렀을 시 set 해주기 위함으로 사용.
     * @param e
     */
    updateTempCompanionNames(e) {
      this.updatedTempCompanionNames = e.target.value
    },
    /**
     * 동반자 변경 저장 버튼 눌렀을 시 실행되는 메소드.
     * 임시변수(updatedTempCompanionNames)에 할당되었던 값을 updatedCompanionNames 에 재할당.
     */
    updateCompanionNames() {
      this.updatedCompanionNames = this.updatedTempCompanionNames;
    },
    /**
     * 사용클럽 input 메소드.
     * 임시변수(insertedTempClubName)에 할당했다가 저장버튼 눌렀을 시 set 해주기 위함으로 사용.
     * @param e
     */
    insertTempClubName(e) {
      this.insertedTempClubName = e.target.value;
    },
    /**
     * 사용클럽 저장 버튼 눌렀을 시 실행되는 메소드.
     * 임시변수(insertClubName)에 할당되었던 값을 insertedClubName 에 재할당.
     *
     * 사용클럽체크에 체크 안되어있으면 체크되게함.
     */
    insertClubName() {
      if (!this.isCheckedClub) {
        this.isCheckedClub = true;
      }
      this.insertedClubName = this.insertedTempClubName;
    },

    ...mapActions({
      close: "updateIsShowingCertificationDetailModal",
      toastPreparing: "toastPreparing",
    }),
  },
};
</script>

<style scoped>
#certification_modal__container {
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

#certification_modal__container section {
  width: 100%;
  height: 80%;
  margin-top: 50px;
}

#certification_modal__container section .input__check_container {
  width: 30%;
  position: absolute;
  top: 20%;
  left: 67%;
}

#certification_modal__container .certification_image__wrapper {
  height: 100%;
  width: 60%;
  position: relative;
  margin-left: 5%;
}

#certification_modal__container .certification_image__wrapper .text_container {
  position: absolute;
  top: 87px;
  text-align: center;
  width: 100%;
}

#certification_modal__container .certification_image {
  background-position: 50% top;
  background-repeat: no-repeat;
  background-size: auto 100%;
  text-align: center;
}

#certification_modal__container .certification_image__wrapper p {
  color: #000;
  line-height: 1;
  font-family: "NanumSquare", sans-serif;
}

#certification_modal__container .certification_image__wrapper p.record_number {
  font-size: 13px;
  padding-left: 380px;
  color: #666;
  letter-spacing: 0.5px;
  margin-top: -32px;
}

#certification_modal__container .certification_image__wrapper p.certification_name {
  font-weight: 700;
  font-size: 36px;
  color: #216668;
  font-style: italic;
  margin-top: -11px;
}

#certification_modal__container .certification_image__wrapper p.player_name {
  font-weight: 700;
  font-size: 37px;
  color: #000;
  margin-top: 18px;
}

#certification_modal__container .certification_image__wrapper p.course_info {
  font-size: 20px;
  color: #fff;
  margin-top: 25px;
}

#certification_modal__container .certification_image__wrapper p.course_info_english {
  font-size: 19px;
  margin-top: 7px;
  color: #216668;
}

#certification_modal__container .certification_image__wrapper p.companion_name {
  font-size: 17px;
  margin-top: 6px;
  height: 15px;
}

#certification_modal__container .certification_image__wrapper p.club_name {
  font-size: 17px;
  margin-top: 10px;
}

#certification_modal__container .certification_image__wrapper p.record_date {
  font-size: 17px;
  margin-top: 10px;
}

#certification_modal__container .certification_image__wrapper p.celebration_message {
  font-size: 19px;
  margin-top: 15px;
  font-weight: 600;
}

#certification_modal__container .buttons > button {
  margin: 0 7px;
}

.input__container {
  margin-bottom: 20px;
  font-size: 18px;
}

.input__container .checkbox__wrapper {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 5px;
  display: inline-block;
  margin-right: 10px;
}

.input__container .checker {
  margin-left: 2px;
  color: tomato;
}

.input__container .update_input {
  width: 120px;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
  margin-left: 10px;
  position: relative;
}

.input__container .save_name_button {
  font-size: 13px;
  margin-left: 6%;
  position: absolute;
  top: -11px;
}

.input__container .save_companion_button {
  font-size: 13px;
  margin-left: 6%;
}

.input__container .save_club_button {
  font-size: 13px;
  margin-left: 5%;
}

.input__container .update_name_label {
  margin-left: 25px;
}

.input__container .update_companion_label {
  margin-right: 14px;
}

@media (width: 1920px) and (max-height: 1080px) {
  #certification_modal__container .certification_image__wrapper {
    height: 100%;
    width: 56%;
    position: relative;
    margin-left: 5%;
  }

  #certification_modal__container .buttons {
    font-size: 20px;
  }

  #certification_modal__container .certification_image__wrapper p.record_number {
    font-size: 20px;
    padding-left: 517px;
    color: #666;
    letter-spacing: 0.5px;
    margin-top: -32px;
  }

  #certification_modal__container .certification_image__wrapper p.certification_name {
    font-weight: 700;
    font-size: 45px;
    color: #216668;
    font-style: italic;
    margin-top: 40px;
  }

  #certification_modal__container .certification_image__wrapper p.player_name {
    font-weight: 700;
    font-size: 47px;
    color: #000;
    margin-top: 19px;
  }

  #certification_modal__container .certification_image__wrapper p.course_info {
    font-size: 26px;
    color: #fff;
    margin-top: 24px;
  }

  #certification_modal__container .certification_image__wrapper p.course_info_english {
    font-size: 26px;
    margin-top: 12px;
    color: #216668;
  }

  #certification_modal__container .certification_image__wrapper p.companion_name {
    font-size: 25px;
    margin-top: 8px;
    height: 15px;
  }

  #certification_modal__container .certification_image__wrapper p.club_name {
    font-size: 25px;
    margin-top: 23px;
  }

  #certification_modal__container .certification_image__wrapper p.record_date {
    font-size: 25px;
    margin-top: 15px;
  }

  #certification_modal__container .certification_image__wrapper p.celebration_message {
    font-size: 27px;
    margin-top: 23px;
    font-weight: 600;
  }

  .input__container {
    margin-bottom: 20px;
    font-size: 24px;
  }

  .input__container .update_input {
    width: 200px;
    background-color: transparent;
    color: var(--secondary);
    text-align: center;
    border: none;
    border-bottom: 1px solid var(--primary);
    margin-left: 10px;
    position: relative;
  }

  .input__container .checkbox__wrapper {
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 5px;
    display: inline-block;
    margin-right: 10px;
  }

  .input__container .save_name_button {
    font-size: 20px;
    margin-left: 6%;
    position: absolute;
    top: -11px;
  }

  .input__container .save_companion_button {
    font-size: 20px;
    margin-left: 6%;
  }

  .input__container .save_club_button {
    font-size: 20px;
    margin-left: 4%;
  }
}

</style>
