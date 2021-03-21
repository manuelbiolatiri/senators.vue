<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button mr-5 variant="primary" @click="updateItem(data.item.id)"
          >Update</b-button
        >
        <b-button variant="danger" @click="deleteItem(data.item.id)"
          >Delete</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
import senators from "../services/SenatorsDataService";
const getAll = senators.getAll;
console.log("getAll getAll", getAll);
export default {
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: ["firstName", "lastName", "state", "actions"],
      items: [
        {
          isActive: true,
          state: 40,
          firstName: "Dickerson",
          lastName: "Macdonald",
        },
        { isActive: false, state: 21, firstName: "Larsen", lastName: "Shaw" },
        {
          isActive: false,
          state: 89,
          firstName: "Geneva",
          lastName: "Wilson",
        },
        { isActive: true, state: 38, firstName: "Jami", lastName: "Carney" },
      ],
    };
  },
  methods: {
    deleteItem(id) {
      const index = this.items.indexOf((x) => x.id === id);
      this.items.splice(index, 1);
    },
    updateItem(id) {
      const index = this.items.indexOf((x) => x.id === id);
      this.items.splice(index, 1);
    },
  },
};
</script>