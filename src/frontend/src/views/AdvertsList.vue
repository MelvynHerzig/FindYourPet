<template>
  <div class="animalsList">
    <section class="filters" id="filters">
      <form v-on:submit.prevent="getFilteredPage()">
        <div class="field">
          <i class="fas fa-minus icon"></i>
          <input
              v-model="minAge"
              type="number"
              min="0"
              max="1200"
              name="minAge"
              :placeholder="$t('advertsList.minAge')"
              class="input"
          />
        </div>
        <div class="field">
          <i class="fas fa-plus icon"></i>
          <input
              v-model="maxAge"
              type="number"
              min="0"
              max="1200"
              name="maxAge"
              :placeholder="$t('advertsList.maxAge')"
              class="input"
          />
        </div>
        <div class="field" v-if="isConnected() === true">
          <i class="fas fa-plus icon"></i>
          <input
              v-model="maxDistance"
              type="number"
              min="0"
              max="1000000"
              name="maxDistance"
              :placeholder="$t('advertsList.maxDistance')"
              class="input"
          />
        </div>
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
    <ToastError
        v-if="error"
        :text="error"
        class="toast"
    />
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
import {isEmpty, verifyDistance, verifyGender, verifyMaxAge, verifyMinAge} from "@/logic/verify-inputs";

export default {
  name: "AdvertsList",
  components: {AdvertPreview, ToastError, ToastInfo},
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
      })
      .catch(error => {
        this.error = manageErrors(error);
      });
    },
    getAdverts() {
      this.resetLogicVariable();
      getPageAdverts(this.actualPage, this.$root.$i18n.locale).then(result => {
        this.adverts = result.data;
        this.filteredRequest = false;
        if(result.data.length === 0) {
          this.notFound = true;
        }
        if(result.data.length < 10) {
          this.smthToLoad = false;
        }
      }).catch(error => {
        this.smthToLoad = false;
        this.error = manageErrors(error);
      });
    },
    getNewAdverts(page) {
      this.resetPageVariable();
      getPageAdverts(page, this.$root.$i18n.locale).then(result => {
        this.adverts = this.adverts.concat(result.data);
        if(result.data.length === 0) {
          this.notFound = true;
        }
        if(result.data.length < 10) {
          this.smthToLoad = false;
        }
      }).catch(error => {
        this.smthToLoad = false;
        this.error = manageErrors(error);
      });
    },
    getFilters() {
      let filters = {petMinAge: 0};
      if(!isEmpty(this.selectedSpecies)) {
        filters.speciesId = this.selectedSpecies;
      }
      if(!isEmpty(this.selectedGender)) {
        this.error = verifyGender(this.selectedSex);
        if(this.error == null) {
          filters.gender = this.selectedGender;
        }
      }
      if(!isEmpty(this.minAge)) {
        this.error = verifyMinAge(this.minAge);
        if(this.error == null) {
          filters.petMinAge = this.minAge;
        }
      }
      if(!isEmpty(this.maxAge)) {
        this.error = verifyMaxAge(this.maxAge);
        if(this.error == null) {
          filters.petMaxAge = this.maxAge;
        }
      }
      if(!isEmpty(this.maxDistance)) {
        this.error = verifyDistance(this.maxDistance);
        if(this.error == null) {
          filters.radius = this.maxDistance;
        }
      }
      return filters;
    },
    getFilteredPage() {
      this.resetLogicVariable();
      getPageFilteredAdverts(this.actualPage, this.$root.$i18n.locale, this.getFilters()).then(result => {
        this.adverts = result.data;
        this.filteredRequest = true;
        if(result.data.length === 0) {
          this.notFound = true;
        }
        if(result.data.length < 10) {
          this.smthToLoad = false;
        }
      }).catch(error => {
        this.smthToLoad = false;
        this.error = manageErrors(error);
      });
    },
    getNewFilteredPage(page) {
      this.resetPageVariable();
      getPageFilteredAdverts(page, this.$root.$i18n.locale, this.getFilters()).then(result => {
        this.adverts = this.adverts.concat(result.data);
        if(result.data.length === 0) {
          this.notFound = true;
        }
        if(result.data.length < 10) {
          this.smthToLoad = false;
        }
      }).catch(error => {
        this.smthToLoad = false;
        this.error = manageErrors(error);
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

.toast {
  align-self: center;
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

.field {
  position: relative;
}

.icon {
  position: absolute;
  top: 13px;
  left: 20px;
  color: grey;
}

input {
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 14px;
  padding: 0 20px 0 50px;
  outline: none;
}

input:active,
input:focus,
input:hover {
  border: 1px solid var(--footer-color);
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
