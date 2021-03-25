<template>
  <div>
    <div class="mb-4"><h1>Add Admin User</h1></div>
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-3"
        label="Your firstname:"
        label-for="input-2"
      >
        <b-form-input
          id="input-3"
          v-model="firstName"
          placeholder="Enter firstname"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Your lastname:"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          v-model="lastName"
          placeholder="Enter lastname"
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

      <b-form-group
        id="input-group-2"
        label="Your Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="password"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import service from "../services/SenatorsDataService";
// import router from "../router";
export default {
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (!this.email || !this.password) {
        alert(`Please fill in your ${this.email || this.password}`);
        return;
      }
      const newUser = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      };

      const userLogin = await service.create(newUser);
      console.log("userLogin", userLogin);
      this.email = "";
      this.password = "";
      this.$router.push({ path: "/" });
    },
  },
};
</script>