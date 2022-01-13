<template>
  <div class="ad" @click="$router.push('/adverts/' + advert.id)">
    <div class="image">
      <img src="images/kitty.jpg" alt="image">
    </div>
    <div class="name">
      <h1>{{ advert.title }}</h1>
      <h3>{{ specie.name }}</h3>
      <h3>{{ $t("animal_ad.age") }}: {{ advert.petAge }}</h3>
    </div>
    <div class="description">
      <p>
        {{ advert.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { getSpeciesById } from '../logic/apicalls'

export default {
  name: "AnimalAd",
  props: {
    advert: {}
  },
  beforeMount() {
    getSpeciesById(this.advert.speciesId).then(result => {
      this.specie = result.data;
    });

  },
  data: function () {
    return {
      specie: {}
    }
  },
}
</script>

<style scoped>

h3, p {
  color: darkgrey;
}

.ad {
  width: 90%;
  height: 160px;
  background-color: var(--header-color);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 30px;
  border-radius: 10px;
  transition: all .3s;
}

.ad:hover {
  cursor: pointer;
  background-color: var(--footer-color);
}


.ad div {
  margin-right: 20px;
  margin-left: 20px;
}

img {
  width: 160px;
  height: 160px;
  align-self: center;
  border-radius: 50px;
}

.name {

  border-radius: 10px;
  flex: 1;
  width: 100px;
  text-align: left;
  padding-left: 20px;
  border: solid;
  border-color: var(--header-selection-color);

}

.description {

  border-radius: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  border: solid;
  border-color: var(--header-selection-color);
  flex: 2;
  overflow: hidden;
}

</style>
