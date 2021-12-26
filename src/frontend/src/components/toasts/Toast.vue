<template>
  <div class="toast" v-bind:style="style">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    style: String,
    text: String,
  },
  methods: {
    hide() {
      this.parentElement.style.display='none';
    }
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

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 50px;
  cursor: pointer;
  transition: 0.3s;
  z-index: 1;
}

.closebtn:hover {
  color: var(--footer-color);
}

</style>