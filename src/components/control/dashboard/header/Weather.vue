<template>
  <div class="weather p">
    <div class="temperature">
      <span class="ico"></span>
      <img
        :src="require('@/assets/images/control/dashboard/ico_temperature.png')"
        alt=""
      />
      <p class="ml-1/2">{{ currentWeather.temperature }}<span>℃</span></p>
    </div>
    <div class="humidity mt">
      <div>
        <img
          :src="require('@/assets/images/control/dashboard/ico_humidity.png')"
          alt="humidity"
        />
        <span class="ico ml-1/2">습도</span>
      </div>
      <p class="mt-1/2">{{ currentWeather.humidity }}<span>%</span></p>
    </div>
    <div>
      <img :src="currentWeather.weatherImage" alt="weather image" />
      <span class="mt-1/2 no-pointer">{{ currentWeather.weatherText }}</span>
    </div>
  </div>
</template>

<script>
import useWeather from "@/api/v1/monitor/useWeather.js";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Weather",
  computed: {
    ...mapState("control/", {
      weather: (state) => state.weather,
    }),
    ...mapGetters("control/", ["currentWeather"]),
  },
};
</script>

<style>
.weather {
  position: relative;
  border: 1px solid var(--primary);
  border-radius: 20px;
  color: var(--secondary);
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  height: 230px;
}
.weather > div:last-child {
  grid-column: 2/3;
  grid-row: 1/3;
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather > div:last-child > img {
  width: 90px;
  height: 90px;
}

.temperature {
  display: flex;
  align-self: center;
}
.temperature > img {
  width: 15px;
  height: 26px;
}

.humidity {
  align-items: center;
  align-self: center;
}
.humidity > div:first-child {
  display: flex;
  align-items: center;
}
.humidity > img {
  width: 18px;
  height: 20px;
}
.weather .temperature p {
  font-size: 68px;
  font-family: "NanumSquare", sans-serif;
  line-height: 1;
  letter-spacing: -5px;
}
.weather .temperature p span {
  font-size: 40px;
  vertical-align: top;
}
.weather .humidity p {
  font-size: 24px;
  font-family: "NanumSquare", sans-serif;
  font-weight: 700;
  margin-left: 22px;
}
.weather .humidity p span {
  font-weight: 400;
  font-size: 20px;
}
</style>
