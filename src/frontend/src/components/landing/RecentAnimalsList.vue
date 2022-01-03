<template>
  <div class="animalAdsList">
    <div class="inner">
      <h1>{{$t("recent.title")}}</h1>
      <div class="list">
        <ul>
          <li v-for="advert in this.adverts.slice(0,3)" :key="advert.id" style="list-style-type:none">
            <AnimalAd :advert="advert"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllAdverts } from "../../logic/apicalls";

import AnimalAd from "../AnimalAd";

export default {
  name: "AnimalAdsList",
  components: {AnimalAd},
  beforeMount() {
    getAllAdverts().then(result => {
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

.animalAdsList {

  background: url("../../assets/images/pets.jpg");
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
