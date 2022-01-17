<template>
  <div class="animalsList">
    <div class="filters" id="filters">
      <form v-on:submit.prevent="filter">
        <MinimumInput
            @valueInput="setMinAge"
            :name="'minAge'"
            :placeholder="$t('advertsList.minAge')"
            class="input"
        />
        <MaximumInput
            @valueInput="setMaxAge"
            :name="'maxAge'"
            :placeholder="$t('advertsList.maxAge')"
            class="input"
        />
        <MaximumInput
            v-if="isConnected() === true"
            @valueInput="setMaxDistance"
            :name="'maxDistance'"
            :placeholder="$t('advertsList.maxDistance')"
            class="input"
        />
        <select class="dropdown" v-model="selectedSpecies">
          <option disabled hidden value="">{{$t("ad_create.species")}}</option>
          <option v-for="specie in species" :key="specie.id" v-bind:value="specie.id">
            {{ specie.name }}
          </option>
        </select>
        <select class="dropdown" v-model="selectedGender">
          <option disabled hidden value="">{{$t("ad_create.sex")}}</option>
          <option value = "male">
            {{ $t("ad_create.male") }}
          </option>
          <option value = "female">
            {{ $t("ad_create.female") }}
          </option>
        </select>
        <button type="submit">{{ $t('advertsList.filterButton') }}</button>
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
    <div class="page">
      <a v-if="smthToLoad===true" href="#" @click="getPage(actualPage+1)">
        <i class="fas fa-spinner"></i>
        {{ $t('advertsList.loadMore') }}
      </a>
      <a href="#filters"><i class="fas fa-arrow-up fa-2x"></i></a>
    </div>
    <ToastError
        v-if="error"
        :text="error"
        class="toast"
    />
  </div>
</template>

<script>
import {getPageAdverts, getPageFilteredAdverts, getAllSpeciesFromLang, memberIsConnected} from "../logic/apicalls";
import { manageErrors } from "../logic/errors"
import ToastError from "../components/toasts/ToastError";
import AnimalAdvert from "../components/AnimalAdvert";
import MinimumInput from "../components/inputs/MinimumInput";
import MaximumInput from "../components/inputs/MaximumInput";

export default {
  name: "AdvertsList",
  components: {MaximumInput, MinimumInput, AnimalAdvert, ToastError},
  beforeMount() {
    this.getAdverts(this.actualPage);
    this.getSpecies();
  },
  data() {
    return {
      error: null,
      invalidMessage: null,
      adverts: [],
      species: [],
      selectedSpecies: "",
      selectedGender: "",
      minAge: null,
      maxAge: null,
      maxDistance: null,
      actualPage: 1,
      smthToLoad: true,
      filteredRequest: false,
    }
  },
  methods: {
    getSpecies() {
      getAllSpeciesFromLang(this.$root.$i18n.locale).then(result => {
        this.species = result.data;
      });
    },
    getAdverts(page) {
      getPageAdverts(page,this.$root.$i18n.locale).then(result => {
        if(result !== null) {
          if(!this.filteredRequest) {
            this.adverts = this.adverts.concat(result.data);
          } else {
            this.adverts = result.data;
            this.filteredRequest = false;
          }
        } else {
          this.smthToLoad = false;
        }
      }).catch(error => {
        this.error = manageErrors(error.message);
      });
    },
    filter(page) {
      getPageFilteredAdverts(page, this.$root.$i18n.locale, {
        speciesId: this.selectedSpecies,
        gender: this.selectedGender,
        petMinAge: this.minAge,
        petMaxAge: this.maxAge,
        radius: this.maxDistance,
      }).then(result => {
        if(result !== null) {
          if(this.filteredRequest) {
            this.adverts = this.adverts.concat(result.data);
          } else {
            this.adverts = result.data;
            this.filteredRequest = true;
          }
        } else {
          this.smthToLoad = false;
        }
      }).catch(error => {
        this.error = manageErrors(error.message);
      });
    },
    getPage(page) {
      this.actualPage = page;
      if(this.isAFilterActive()) {
        this.filter(this.actualPage);
      } else {
        this.getAdverts(this.actualPage);
      }
    },
    setMinAge(value) {
      if(value >= 0) {
        this.minAge = value;
      }
    },
    setMaxAge(value) {
      if(value > 1) {
        this.maxAge = value;
      }
    },
    setMaxDistance(value) {
      if(value >= 1) {
        this.maxDistance = value;
      }
    },
    isAFilterActive() {
      return this.selectedSpecies !== ""
          || this.selectedGender !== ""
          || this.minAge !== null
          || this.maxAge !== null
          || this.maxDistance !== null;
    },
    isConnected() {
      return memberIsConnected();
    },
  }
}
</script>

<style scoped>

.animalsList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

.inner {
  background: var(--transparent-background-color);
  padding: 20px;
  margin: auto auto 3em auto;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: solid;
  border-color: var(--transparent-border-color);
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
}

.page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 40%;
  padding-left: 40%;
  margin-bottom: 3em;
}

p {
  color: black;
}

@media screen and (max-width: 600px) {
  .inner {
    background: var(--transparent-background-color);
    margin: auto auto 3em auto;
    width: 80%;
    height: 80%;
    border-radius: 10px;
    border: solid;
    border-color: var(--transparent-border-color);
  }

  .page {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 10%;
    padding-left: 10%;
    margin-bottom: 3em;
  }
}

</style>
