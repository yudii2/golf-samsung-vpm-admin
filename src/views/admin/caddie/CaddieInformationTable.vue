<template>
  <div class="table__wrapper">
    <table>
      <thead>
      <tr>
        <th>No</th>
        <th>캐디번호</th>
        <th>캐디이름</th>
        <th>핸드폰번호</th>
        <th>카트번호</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(caddie,i) in rows" :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ caddie.caddieUniqNo }}</td>
        <td>{{ caddie.caddieName }}</td>
        <td>
          <template v-if="isUpdatable">
            <input
              type="text"
              class="update_input"
              :value="caddie.mobileNo"
            />
          </template>
          <template v-else>
            {{ caddie.mobileNo }}
          </template>
        </td>
        <td>
          <template v-if="isUpdatable">
            <input
              type="text"
              class="update_input"
              :value="caddie.cartNo"
            />
          </template>
          <template v-else>
            {{ caddie.cartNo }}
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CaddieInformationTable",
  props: {
    isUpdatable: {
      type: Boolean,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.table__wrapper {
  height: 725px;
  overflow-y: scroll;
  text-align: center;
  table-layout: fixed;
  word-break: keep-all;
}

table {
  width: 100%;
  text-align: center;
}

table tbody:hover {
  background-color: var(--deep-green);
}

table th {
  height: 50px;
  padding: 0.25rem;
  background-color: var(--soft-green);
  border: 1px solid var(--deep-green);
}

table td {
  height: 50px;
  padding: 0.5rem;
  border: 1px solid var(--soft-green);
  font-size: 0.9rem;
}

.update_input {
  width: 30%;
  background-color: transparent;
  color: var(--secondary);
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--primary);
}

@media (height: 1080px) {
  .table__wrapper {
    height: 720px;
    overflow-y: scroll;
    text-align: center;
    margin-top: 15px;
  }
}


</style>
