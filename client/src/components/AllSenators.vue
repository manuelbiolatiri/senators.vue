<template>
  <div>
    <div class="mb-4"><h1>All Senators</h1></div>
    <b-row class="mb-3"> </b-row>
    <b-row>
      <b-col>
        <b-row class="mb-3">
          <b-col md="3">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-table
          striped
          hover
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
        >
          <template v-slot:cell(actions)="data">
            <b-button mr-5 variant="primary" @click="updateItem(data.id)"
              >Update</b-button
            >
            <b-button variant="danger" @click="deleteItem(data.id)"
              >Delete</b-button
            >
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import senators from "../services/SenatorsDataService";
const getAll = senators.getAll;
console.log("getAll getAll", getAll);
export default {
  props: ["itemss"],
  data() {
    return {
      filter: "",
      perPage: 2,
      currentPage: 1,
      fields: ["id", "name", "email", "phoneNumber", "state", "actions"],
      items: this.item,
    };
  },
  watch: {
    id: "getAllSenators",
  },
  mounted() {
    this.getAllSenators();
  },
  methods: {
    async getAllSenators() {
      const item = await senators.getAll;
      this.items = item;
    },
    deleteItem(id) {
      console.log("iddddddddd", id);
      const index = this.items.indexOf((x) => x.id === id);
      this.items.splice(index, 1);
    },
    updateItem(id) {
      console.log("iddddddddd", id);
      const index = this.items.indexOf((x) => x.id === id);
      this.items.splice(index, 1);
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>