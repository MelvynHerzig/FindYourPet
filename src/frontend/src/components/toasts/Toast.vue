<template>
  <div class="toast" v-bind:style="style">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    style: String,
    text: String,
  }
}
</script>

<style scoped>

.toast {
  display: inline-block;
  margin: 20px;
  width: 80%;
  height: auto;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 0 20px 0 20px;
}

.toast p {
  text-align: center;
}

</style>