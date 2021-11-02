import useAuth from "../auth/useAuth";

const { getAccessToken } = useAuth();

/**
 * ### 큭정 홀/그린의 테두리 좌표 값을 업데이트 하는 메소드.
 * @param {Object} body >
 * @returns ok : true/false
 */
export const updateCoordinate = (body) => {
  const uri = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/manage/course-map-info/update`;
  return fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
    body: JSON.stringify(body),
  }).catch((e) => console.error(e.message));
};

export const getOtherCoordinates = (
  companyCd,
  courseCd,
  holeCd,
  positionCd
) => {
  let uri = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/manage/course-map-other-info/select`;
  if (companyCd) {
    if (uri.includes("?")) {
      uri = `${uri}&companyCd=${companyCd}`;
    } else {
      uri = `${uri}?companyCd=${companyCd}`;
    }
  }

  if (courseCd) {
    if (uri.includes("?")) {
      uri = `${uri}&courseCd=${courseCd}`;
    } else {
      uri = `${uri}?courseCd=${courseCd}`;
    }
  }

  if (holeCd) {
    if (uri.includes("?")) {
      uri = `${uri}&holeCd=${holeCd}`;
    } else {
      uri = `${uri}?holeCd=${holeCd}`;
    }
  }

  if (positionCd) {
    if (uri.includes("?")) {
      uri = `${uri}&positionCd=${positionCd}`;
    } else {
      uri = `${uri}?positionCd=${positionCd}`;
    }
  }

  return fetch(uri, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
  })
    .then((res) => res.json())
    .catch((e) => console.error(e.message));
};

export const updateOtherCoordinate = (
  companyCd,
  courseCd,
  holeCd,
  positionCd,
  latitude,
  longitude
) => {
  const uri = `${process.env.VUE_APP_BASE_URI_ADMIN}/v1/manage/course-map-other-info/update`;
  return fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
    body: JSON.stringify({
      companyCd,
      courseCd,
      holeCd,
      positionCd,
      latitude,
      longitude,
    }),
  }).catch((e) => console.error(e.message));
};
