<template>
  <div class="animalsList">
    <div class="filters" id="filters">
      <form v-on:submit.prevent="filter">
        <MinimumInput
            @valueInput="setMinAge"
            :name="'minAge'"
            :placeholder="'minimum age'"
            class="input"
        />
        <MaximumInput
            @valueInput="setMaxAge"
            :name="'maxAge'"
            :placeholder="'distance maximum'"
            class="input"
        />
        <MaximumInput
            @valueInput="setMaxAge"
            :name="'maxDistance'"
            :placeholder="'maximum age'"
            class="input"
        />
        <select class="dropdown" v-model="selectedSpecies" required>
          <option disabled hidden value="">{{$t("ad_create.species")}}</option>
          <option v-for="specie in species" :key="specie.id" v-bind:value="specie.id">
            {{ specie.name }}
          </option>
        </select>
        <select class="dropdown" v-model="selectedSex" required>
          <option disabled hidden value="">{{$t("ad_create.sex")}}</option>
          <option value = "male">
            {{$t("ad_create.male")}}
          </option>
          <option value = "female">
            {{$t("ad_create.female")}}
          </option>
        </select>
        <button>Filter</button>
      </form>
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
    <a href="#filters">Back to top</a>
  </div>
</template>

<script>
import {getPageAdverts, getAllSpecies} from "../logic/apicalls";

import AnimalAdvert from "../components/AnimalAdvert";
import MinimumInput from "../components/inputs/MinimumInput";
import MaximumInput from "../components/inputs/MaximumInput";

export default {
  name: "AnimalsList",
  components: {MaximumInput, MinimumInput, AnimalAdvert},
  beforeMount() {
    this.getAdverts();
    this.getSpecies();
  },
  data() {
    return {
      adverts: [],
      species: [],
      selectedSpecies: "",
      selectedSex: "",
      minAge: null,
      maxAge: null,
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
    },
    filter() {
      getPageAdverts(1).then(result => {
        this.adverts = result.data;
      });
    },
    setMinAge(value) {
      this.minAge = value;
    },
    setMaxAge(value) {
      this.maxAge = value;
    },
  }
}
</script>

<style scoped>

.animalsList {
  padding-top: 10px;
}

.filters {
  background-color: var(--footer-color);
  width: 100%;
  margin-bottom: 3em;
}

.filters form {
  padding-top: 2em;
  padding-right: 25%;
  padding-left: 25%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.animalsList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.inner {
  background: var(--transparent-background-color);
  padding: 20px;
  margin: auto auto 3em;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: solid;
  border-color: var(--transparent-border-color);
}

.list {
}

button {
  display: inline-block;
  padding: 20px;
  margin: 30px;
  letter-spacing: .15rem;
  transition: all .3s;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  border-color: var(--header-color);
}

button:hover {
  cursor: pointer;
  background-color: var(--select-color);
}

.dropdown {
  justify-content: center;
  margin-bottom: 20px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  border-radius: 5px;
  width: 100%;
  height: 42px;
}
.dropdown:active,
.dropdown:focus,
.dropdown:hover {
  border: 1px solid var(--footer-color);
  background-color: transparent;
}

</style>
