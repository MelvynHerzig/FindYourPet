<template>
  <div class="toast">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    text: String,
  }
}
</script>

<style scoped>

.toast{
  width: 100%;
  height: 80px;
  background-color: var(--footer-color);
}

.toast p {
  text-align: center;
}

</style>