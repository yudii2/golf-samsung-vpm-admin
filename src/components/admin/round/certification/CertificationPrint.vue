<template>
  <section class="print_setting print_size_a4_setting">
    <div class="certification_image__wrapper">
      <img class="certification_image" :src="require('@/assets/images/admin/group/certification_ansung.png')">
      <div class="text_container">
        <p class="record_number">No. {{ selectedCertification.recordNo }}</p>
        <p class="certification_name">
          {{ certificateNmByCd(selectedCertification.certificateCd) }}
        </p>
        <template v-if="updatedPlayerName">
          <p class="player_name">
            {{ updatedPlayerName }}
          </p>
        </template>
        <template v-else>
          <p class="player_name">
            {{ selectedCertification.playerNm }}
          </p>
        </template>
        <template v-if="selectedCertification.courseNm !== null">
          <p class="course_info">
            {{
              `${company.name} ${selectedCertification.courseNm}코스 ${selectedCertification.holeNm}`
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
            `${selectedCertification.courseNmEng} Course # ${selectedCertification.holeNm} ${companyNameEnglish}`
          }}
        </p>
        <template v-if="selectedCertification.companionNames !== null && isCheckedCompanion">
          <p class="companion_name" v-if="updatedCompanionNames">
            동반자 :
            {{ updatedCompanionNames }}
          </p>
          <p class="companion_name" v-else>
            동반자 :
            {{ selectedCertification.companionNames }}
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
          {{ parsedRecordDt(selectedCertification.recordDt) }}
        </p>
        <p class="celebration_message">
          행운의
          {{
            certificateNmByCd(selectedCertification.certificateCd)
          }}
          기념을 축하드리며 이 증서를 드립니다.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import DateUtil from "@/utils/datetime/DateUtil";

export default {
  name: "CertificationPrint",

  props: {
    selectedCertification: {
      type: Object,
      required: true
    },
    isCheckedCompanion: {type: Boolean, required: true},
    isCheckedClub: {type: Boolean, required: true},
    updatedPlayerName: {type: String, required: false},
    updatedCompanionNames: {type: String, required: false},
    insertedClubName: {type: String, required: false},
  },

  computed: {
    ...mapGetters("control/", {
      company: "getCompany",
      companyNameEnglish: "getCompanyNameEnglish"
    }),
  },

  methods: {
    certificateNmByCd(certificateCd) {
      switch (certificateCd) {
        case '1' :
          return '이글'
        case '2' :
          return '홀인원'
        case '3' :
          return '알바트로스'
        case '4' :
          return '에이지슈터'
      }
    },

    parsedRecordDt(recordDt) {
      const date = DateUtil.eightToDate(recordDt)
      const {year, month, day} = DateUtil.dateDivider(date)
      return `${year}.${month}.${day}`
    },
  },

}
</script>

<style scoped>
@page {
  size: A4 landscape;
  margin: 0;
}

.print_size_a4_setting {
  max-width: 29.7cm;
  max-height: 21cm;
}

.print_setting {
  position: relative;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
}

/*section {*/
/*  opacity: 1;*/
/*  visibility: visible;*/
/*  right: -20%;*/
/*}*/

.certification_image__wrapper {
  text-align: center;
  position: relative;
}


.certification_image__wrapper .text_container {
  position: absolute;
  top: 90px;
  text-align: center;
  width: 100%;
  height: 100%;
}

.certification_image {
  background-position: 50% top;
  background-repeat: no-repeat;
  background-size: auto 100%;
  text-align: center;
}

.certification_image__wrapper p {
  color: #000;
  line-height: 1;
  font-family: 'NanumSquare', sans-serif;
}

.certification_image__wrapper p.record_number {
  font-size: 22px;
  padding-left: 680px;
  color: #666;
  letter-spacing: 0.5px;
}

.certification_image__wrapper p.certification_name {
  font-weight: 700;
  font-size: 60px;
  color: #216668;
  font-style: italic;
  margin-top: 26px;
}

.certification_image__wrapper p.player_name {
  font-weight: 700;
  font-size: 55px;
  color: #000;
  margin-top: 20px;
}

.certification_image__wrapper p.course_info {
  font-size: 28px;
  color: #fff;
  margin-top: 62px;
}

.certification_image__wrapper p.course_info_english {
  margin-top: 28px;
  font-size: 23px;
  color: #216668;
}

.certification_image__wrapper p.companion_name {
  font-size: 28px;
  margin-top: 50px;
}

.certification_image__wrapper p.club_name {
  font-size: 28px;
  margin-top: 15px;
}

.certification_image__wrapper p.record_date {
  font-size: 28px;
  margin-top: 15px;
}

.certification_image__wrapper p.celebration_message {
  font-size: 32px;
  margin-top: 30px;
  font-weight: 600;
}


</style>
