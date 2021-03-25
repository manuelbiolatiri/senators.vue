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
            <!-- <li :key="item.id" v-for="item in items"> -->
            <b-button mr-5 variant="primary" @click="updateItem(data.item.id)"
              >Update</b-button
            >
            <b-button variant="danger" @click="deleteItem(data.item.id)"
              >Delete</b-button
            >
            <!-- </li> -->
          </template>
        </b-table>
        <template class="m-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </template>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import senators from "../services/SenatorsDataService";
import cogoToast from "cogo-toast";

export default {
  props: {
    id: {
      type: Number,
    },
  },
  data() {
    return {
      filter: "",
      perPage: 7,
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
      const { error, data } = await senators.getAll();
      console.log("itemmm", await data);
      if (error) {
        cogoToast.error("Error fetching senators!");
      } else {
        cogoToast.success("Senators fetched successfully!");
        this.items = data;
      }
    },
    async deleteItem(id) {
      console.log("iddddddddd", id);
      const { error } = senators.delete(id);
      if (error) {
        cogoToast.error("Error deleting senator!");
      } else {
        // this.$router.push({ path: "/" });
        cogoToast.success("Senators deleted successfully!");
        window.location.reload();
      }
    },
    updateItem(id) {
      console.log("iddddddddd", id);
      this.$router.push(`/senators/${id}`);
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>