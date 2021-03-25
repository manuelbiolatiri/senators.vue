<template>
  <div>
    <div class="mb-4"><h1>Add a Senator</h1></div>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-2" label="Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Phone:" label-for="input-2">
        <b-form-input
          id="input-3"
          v-model="phoneNumber"
          placeholder="Enter phone no"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="State:" label-for="input-4">
        <!-- <b-form-select :state="state" :states="states"></b-form-select> -->
        <!-- <select v-model="states">
          <option :key="item.id" v-for="item in items"></option>
        </select> -->

        <b-form-input
          id="input-4"
          v-model="state"
          placeholder="Enter state"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import service from "../services/SenatorsDataService";

export default {
  data() {
    return {
      email: "",
      password: "",
      phoneNumber: "",
      state: null,
      states: this.states,
    };
  },
  mounted() {
    this.getStates();
    console.log("this.states", this.states);
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const newSenator = {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        state: this.state,
      };

      const create = await service.createSenator(newSenator);
      console.log("userLogin", create);
      this.$router.push({ path: "/" });
    },
    async getStates() {
      const item = await service.getAllStates();
      console.log("this.states", await item);

      this.states = await item;
    },
  },
};
</script>