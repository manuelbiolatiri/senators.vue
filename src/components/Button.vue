<template>
  <button @click="onClick()" :style="{ background: green }" class="btn">
    {{ text }}
  </button>
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