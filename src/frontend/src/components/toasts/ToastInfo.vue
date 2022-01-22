<template>
  <div class="toast">
    <Toast
        :text="text"
        :style="'background-color: #F1BE48'"
    />
  </div>
</template>

<script>
import Toast from "./Toast";
export default {
  name: "ToastError",
  components: {Toast},
  props: {
    text: String,
  },
}
</script>

<style scoped>

</style>