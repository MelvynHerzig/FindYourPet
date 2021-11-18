<template>
  <div class="animalAdsList">
    <div class="inner">
      <h1>Annonces récentes :</h1>
      <div class="list">
        <ul>
          <li v-for="animal in this.animals.slice(0,3)" :key="animal.id" style="list-style-type:none">
            <AnimalAd :animal="animal"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

import AnimalAd from "./AnimalAd";

export default {
  name: "AnimalAdsList",
  components: {AnimalAd},
  beforeMount() {
    axios.get(process.env.VUE_APP_ROOT_API + '/animals').then(result => {
      this.animals = result.data;
      console.log(result.data);
    });

  },
  data: function () {
    return {
      animals: []
    }
  },
}
</script>

<style scoped>

h1,
h2,
h3,
h4,
h5,
h6,
p,
li,
button{
  color: black;
}

h1{ 
  text-align: center;
}

.animalAdsList {
  
  background: url("../assets/images/pets.jpg");
  background-attachment:fixed;
  background-repeat: no-repeat;
  background-size: cover;
  margin:auto;
  width: 100%;
  height: 1000px;
  display: flex;
  
}

.list {
  height: 85%;
  overflow: auto;
}

.inner {
  background: var(--transparent-background-color);
  padding: 20px;
  margin: auto;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: solid;
  border-color: var(--transparent-border-color);
  }

</style>
