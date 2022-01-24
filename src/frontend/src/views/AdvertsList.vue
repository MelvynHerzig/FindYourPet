<template>
  <div class="animalsList">
    <section class="filters" id="filters">
      <form v-on:submit.prevent="getFilteredPage()">
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
          <option class="options" disabled hidden value="">{{$t("ad_create.species")}}</option>
          <option class="options" v-for="specie in species" :key="specie.id" v-bind:value="specie.id">
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
    </section>
    <section class="bg">
      <div class="inner">
        <h1 v-if="filteredRequest">{{$t("advertsList.titleFiltered")}}</h1>
        <h1 v-else>{{$t("advertsList.title")}}</h1>
        <div class="list">
          <ul>
            <li v-for="advert in this.adverts" :key="advert.id" style="list-style-type:none">
              <AdvertPreview :advert="advert"/>
            </li>
          </ul>
        </div>
      </div>
      <ToastInfo
          v-if="notFound"
          :text="$t('advertsList.notFound')"
          class="toast"
      />
      <ToastError
          v-if="error"
          :text="error"
          class="toast"
      />
      <div class="page">
        <a v-if="smthToLoad" href="#" @click="getNewPage()">
          <i class="fas fa-spinner"></i>
          {{ $t('advertsList.loadMore') }}
        </a>
        <a href="#filters"><i class="fas fa-arrow-up fa-2x"></i></a>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getPageAdverts,
  getPageFilteredAdverts,
  getAllSpeciesFromLang,
  memberIsConnected,
} from "@/logic/apicalls";
import { manageErrors } from "@/logic/errors"
import ToastError from "../components/toasts/ToastError";
import ToastInfo from "@/components/toasts/ToastInfo";
import AdvertPreview from "../components/AdvertPreview";
import MinimumInput from "../components/inputs/MinimumInput";
import MaximumInput from "../components/inputs/MaximumInput";

export default {
  name: "AdvertsList",
  components: {MaximumInput, MinimumInput, AdvertPreview, ToastError, ToastInfo},
  beforeMount() {
    this.getAdverts();
    this.getSpecies();
  },
  data() {
    return {
      error: null,
      invalidMessage: null,
      notFound: false,
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
    getAdverts() {
      this.resetLogicVariable();
      getPageAdverts(this.actualPage, this.$root.$i18n.locale).then(result => {
        this.adverts = result.data;
        this.filteredRequest = false;
        if(result.data.size() === 0) {
          this.notFound = true;
        }
        if(result.data.size() < 10) {
          this.smthToLoad = false;
        }
      }).catch(error => {
        this.smthToLoad = false;
        this.error = manageErrors(error.message);
      });
    },
    getNewAdverts(page) {
      this.resetPageVariable();
      getPageAdverts(page, this.$root.$i18n.locale).then(result => {
        this.adverts = this.adverts.concat(result.data);
        if(result.data.size() === 0) {
          this.notFound = true;
        }
        if(result.data.size() < 10) {
          this.smthToLoad = false;
        }
      }).catch(error => {
        this.smthToLoad = false;
        this.error = manageErrors(error.message);
      });
    },
    getFilters() {
      let filters = {petMinAge: 0};
      if(this.selectedSpecies != null && this.selectedSpecies !== "") {
        filters.speciesId = this.selectedSpecies;
      }
      if(this.selectedGender != null && this.selectedGender !== "") {
        filters.gender = this.selectedGender;
      }
      if(this.minAge != null) {
        filters.petMinAge = this.minAge;
      }
      if(this.maxAge != null) {
        filters.petMaxAge = this.maxAge;
      }
      if(this.maxDistance != null) {
        filters.radius = this.maxDistance;
      }
      return filters;
    },
    getFilteredPage() {
      this.resetLogicVariable();
      getPageFilteredAdverts(this.actualPage, this.$root.$i18n.locale, this.getFilters()).then(result => {
        this.adverts = result.data;
        this.filteredRequest = true;
        if(result.data.size() === 0) {
          this.notFound = true;
        }
        if(result.data.size() < 10) {
          this.smthToLoad = false;
        }
      }).catch(error => {
        this.smthToLoad = false;
        this.error = manageErrors(error.message);
      });
    },
    getNewFilteredPage(page) {
      this.resetPageVariable();
      getPageFilteredAdverts(page, this.$root.$i18n.locale, {
        speciesId: this.selectedSpecies,
        gender: this.selectedGender,
        petMinAge: this.minAge,
        petMaxAge: this.maxAge,
        radius: this.maxDistance,
      }).then(result => {
        this.adverts = this.adverts.concat(result.data);
        if(result.data.size() === 0) {
          this.notFound = true;
        }
        if(result.data.size() < 10) {
          this.smthToLoad = false;
        }
      }).catch(error => {
        this.smthToLoad = false;
        this.error = manageErrors(error.message);
      });
    },
    getNewPage() {
      this.actualPage++;
      if(this.isAFilterActive()) {
        this.getNewFilteredPage(this.actualPage);
      } else {
        this.getNewAdverts(this.actualPage);
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
    resetLogicVariable() {
      this.actualPage = 1;
      this.adverts = [];
      this.resetPageVariable();
    },
    resetPageVariable() {
      this.smthToLoad = true;
      this.notFound = false;
    }
  },
  watch:{
    '$i18n.locale': function() {
      this.getSpecies();
      if(this.isAFilterActive()) {
        this.getFilteredPage();
      } else {
        this.getAdverts();
      }
    }
  },
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

.bg {
  background: url("../assets/images/dog.jpg") no-repeat fixed center;
  background-size: contain;
  width: 100%;
  height: 100%;
  margin: auto;
  padding-top: 3em;
  padding-bottom: 3em;
  display: flex;
  flex-direction: column;
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

.inner h1 {
  display: flex;
  justify-content: center;
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
  border-radius: 5px;
  width: 100%;
  height: 42px;
}
.dropdown:active,
.dropdown:focus,
.dropdown:hover {
  border: 1px solid var(--footer-color);
}

.options {
  font-family: Georgia, 'Times New Roman', Times, serif;
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

h1,
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
