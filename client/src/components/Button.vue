<template>
  <!-- <button @click="onClick()" :style="{ background: green }" class="btn">
    {{ text }}
  </button> -->
  <!-- <div> -->
  <b-button type="submit" variant="primary">{{ text }}</b-button>
  <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      this.$emit("btn-click");
    },
  },
};
</script>
<style scoped>
.btn {
  background-color: red;
}
</style>