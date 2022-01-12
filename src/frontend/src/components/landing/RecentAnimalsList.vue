<template>
  <div class="animalAdsList">
    <div class="inner">
      <h1>{{$t("recent.title")}}</h1>
      <div class="list">
        <ul>
          <li v-for="advert in this.adverts.slice(0,3)" :key="advert.id" style="list-style-type:none">
            <AnimalAdvert :advert="advert"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecentAdverts } from "../../logic/apicalls";

import AnimalAdvert from "../AnimalAdvert";

export default {
  name: "RecentAnimalsList",
  components: { AnimalAdvert },
  beforeMount() {
    getRecentAdverts().then(result => {
      this.adverts = result.data;
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

h1 {
  color: black;
  text-align: center;
}

.animalAdsList {
<<<<<<< HEAD:src/frontend/src/components/landing/RecentAnimalsList.vue

=======
>>>>>>> origin/develop:src/frontend/src/components/RecentAnimalsList.vue
  background: url("../../assets/images/pets.jpg");
  background-attachment:fixed;
  background-repeat: no-repeat;
  background-size: cover;
  margin:auto;
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 3em;
  padding-bottom: 3em;
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
