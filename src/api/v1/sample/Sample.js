export const PATH_SAMPLE = `/sample`;

export function fetchSampleList(name) {
  return this.http.get(`${PATH_SAMPLE}`, {
    params: {
      name: name,
    },
  });
}

export function fetchSample(id) {
  return this.http.get(`${PATH_SAMPLE}/${id}`);
}

export function createSample(sampleData) {
  return this.http.post(PATH_SAMPLE, sampleData);
}

export function patchSample(id, sampleData) {
  return this.http.patch(`${PATH_SAMPLE}/${id}`, sampleData);
}

export function deleteSample(id) {
  return this.http.delete(`${PATH_SAMPLE}/${id}`);
}
