<template>
  <div class="animalsList">
    <div class="filters">
      <select class="input" v-model="selectedSpecies" required>
        <option disabled hidden value="">{{$t("ad_create.species")}}</option>
        <option v-for="specie in species" :key="specie.id" v-bind:value="specie.id">
          {{ specie.name }}
        </option>
      </select>
      <select class="input" v-model="selectedSex" required>
        <option disabled hidden value="">{{$t("ad_create.sex")}}</option>
        <option value = "male">
          {{$t("ad_create.male")}}
        </option>
        <option value = "female">
          {{$t("ad_create.female")}}
        </option>
      </select>
    </div>
    <div class="inner">
      <div class="list">
        <ul>
          <li v-for="advert in this.adverts" :key="advert.id" style="list-style-type:none">
            <AnimalAdvert :advert="advert"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getPageAdverts, getAllSpecies} from "../logic/apicalls";

import AnimalAdvert from "../components/AnimalAdvert";

export default {
  name: "AnimalsList",
  components: {AnimalAdvert},
  beforeMount() {
    this.getAdverts();
  },
  data: function () {
    return {
      adverts: [],
      species: [],
      selectedSpecies: "",
      selectedSex: "",
    }
  },
  methods: {
    getSpecies() {
      getAllSpecies(this.$root.$i18n.locale).then(result => {
        this.species = result.data;
      });
    },
    getAdverts() {
      getPageAdverts(1).then(result => {
        this.adverts = result.data;
      });
    }
  }
}
</script>

<style scoped>

h1 {
  text-align: center;
}

/*.filters {
  background-color: var(--footer-color);
  position: fixed;
  height: 70%;
  align-self: center;
}*/

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
