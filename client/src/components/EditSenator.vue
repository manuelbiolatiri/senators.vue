<template>
  <div>
    <div class="mb-4">
      <h1>Edit Senator {{ senator.name }}</h1>
    </div>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="senator.name"
          type="name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="senator.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Phone:" label-for="input-2">
        <b-form-input
          id="input-3"
          v-model="senator.phoneNumber"
          placeholder="Enter phone no"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Your State" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="senator.state"
          placeholder="Enter lastname"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Update</b-button>
    </b-form>
  </div>
</template>

<script>
import service from "../services/SenatorsDataService";
// import router from "../router";
export default {
  data() {
    return {
      name: "",
      email: "",
      phoneNumber: "",
      state: "",
      senator: this.senator,
    };
  },
  mounted() {
    this.getASenator(this.$route.params.id);
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();

      const editSenator = {
        email: this.email,
        name: this.name,
        phoneNumber: this.phoneNumber,
        state: this.state,
      };

      const result = await service.update(this.$route.params.id, editSenator);
      console.log("senatorLogin", result);
      this.$router.push({ path: "/" });
    },
    async getASenator(id) {
      console.log("idddd", id);
      const res = await service.get(id);
      console.log("dataaaaaa", res);

      this.senator = await res;
    },
  },
};
</script>