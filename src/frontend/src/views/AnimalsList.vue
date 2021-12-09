<template>
  <div class="animalsList">
    <div class="filters">
      C'est ici que les filtres irons
    </div>
    <div class="inner">
      <div class="list">
        <ul>
          <li v-for="advert in this.adverts" :key="advert.id" style="list-style-type:none">
            <AnimalAd :advert="advert"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

import AnimalAd from "../components/AnimalAd";

export default {
  name: "AnimalAdsList",
  components: {AnimalAd},
  beforeMount() {
    axios.get(process.env.VUE_APP_ROOT_API + '/adverts').then(result => {
      this.adverts = result.data;
      console.log(result.data);
    });

  },
  data: function () {
    return {
      adverts: []
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

.filter {
  background-color: var(--footer-color);
  position: fixed;
  height: 70%;
  align-self: center;
}

.animalsList {
  background-color: var(--header-selection-color);
  width: 100%;  
  display: flex;
  justify-content: right;
}

.inner {
  background: var(--transparent-background-color);
  width: 80%;
  border: solid;
  border-color: var(--transparent-border-color);
  }

</style>
