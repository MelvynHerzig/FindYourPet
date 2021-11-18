<template>
  <div class="hello">
    <img :src="url" alt="image">
  </div>
</template>

<script>
//const axios = require('axios');


export default {
  name: 'HelloWorld',
  props: {
    url: String
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div {
  background-color: #FAE5DC;
  width: 80%;
  height: 600px;
  margin: auto;
  margin-top: 80px;
  overflow: auto;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b9  83;
}
</style>
