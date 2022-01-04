<template>
  <div class="advert">
    <div class="inner">
      <h1>{{advert.title}}</h1>
      <div class="info">
        <div class="short">
          <img src="..\..\public\images\kitty.jpg" alt="image">
          <h2>{{species.name}}</h2>
          <h3>{{$t("ad_create." + advert.petGender)}}, {{advert.petAge}} {{$t("ad.years")}}</h3>
        </div>
        <div class="description">
          <p>
           {{advert.description}}
          </p>
        </div>
      </div>
      <div class="contact">
      <h2> {{$t("ad.contact")}} </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { getAdvertById, getSpeciesById } from "../logic/apicalls";

export default {
  name: "Advert",
  beforeMount() {
    getAdvertById(this.$route.params.id).then(result => {
      this.advert = result.data;
      getSpeciesById(this.advert.speciesId, this.$root.$i18n.locale).then(result => {
        this.species = result.data;
      });
    });
  },
  watch:{
    '$i18n.locale': function() {
      this.getSpecies();
    }
  },
  data: function () {
    return {
      advert: {},
      species: {}
    }
  },
  methods: {
    getSpecies(){
      getSpeciesById(this.advert.speciesId, this.$root.$i18n.locale).then(result => {
          this.species = result.data;
      });
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

.advert{
  background: url("../assets/images/test.jpg");
  background-attachment:fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  margin: auto;
  display: flex;
}

.inner {
  background: var(--transparent-background-color);
  padding: 20px;
  margin: auto;
  margin-top: 50px;
  margin-block: 50px;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  text-align: center;
  border: solid;
  border-color: var(--transparent-border-color);
}

.info {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.short {
  flex: 2;
  margin: 10px;
}

.description {
  flex: 3;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: solid;
  border-color: var(--transparent-border-color);
  max-width: 95%;
  overflow: auto;
}

img{
  width: 200px;
  height: 200px;
  align-self: center;
  border-radius: 50px;

}
</style>
