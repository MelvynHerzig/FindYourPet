<template>
  <div class="advert" @click="$router.push(`/adverts/${advert.id}`)">
    <div class="image">
      <img src="images/kitty.jpg" alt="image">
    </div>
    <div class="name">
      <h1>{{ advert.title }}</h1>
      <h3>{{ specie.name }}</h3>
      <h3>{{$t("ad_create." + advert.petGender)}}, {{ $t("animal_ad.age") }}: {{ advert.petAge }}</h3>
    </div>
    <div class="description">
      <p>
        {{ advert.description }}
      </p>
    </div>
    <div class="modification" v-if="isOwner">
      <p>
        <button @click="$router.push('/adverts/${advert.id}/modify')">Modify</button> 
        <button>Delete</button>
      </p>
    </div>
  </div>
</template>

<script>

import { getMemberConnectedId, getSpeciesByIdFromLang } from '../logic/apicalls'

export default {
  name: "AnimalAdvert",
  props: {
    advert: {}
  },
  beforeMount() {
    this.getSpecies();
  },
  watch:{
    '$i18n.locale': function() {
      this.getSpecies()
    }
  },
  data() {
    return {
      specie: {},
    }
  },
  methods: {
    getSpecies(){
      getSpeciesByIdFromLang(this.advert.species.id, this.$root.$i18n.locale).then(result => {
          this.specie = result.data;
      });
    }
    
  },
  computed: {
    isOwner:  function(){
      if (getMemberConnectedId() != null){
       return this.advert.member.id === getMemberConnectedId();
      }
      return false;
    }
  }
}
</script>

<style scoped>

h3, p {
  color: darkgrey;
}

.advert {
  width: 95%;
  height: 100%;
  background-color: var(--header-color);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 30px;
  padding: 10px;
  border-radius: 10px;
  transition: all .3s;
}

.advert:hover {
  cursor: pointer;
  background-color: var(--footer-color);
}

.advert div {
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
  text-align: left;
  padding-left: 20px;
  border: solid;
  border-color: var(--header-selection-color);
  max-width: 75%;
  overflow: auto;
}

.description {
  border-radius: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  min-width: 100px;
  border: solid;
  border-color: var(--header-selection-color);
  flex: 2;
  max-width: 75%;
  overflow: auto;
}

.modification {
  display: flex;
  align-self: center;
}

button {
  display: inline-block;
  padding: 20px;
  margin: 5px;
  letter-spacing: .15rem;
  transition: all .3s;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  border-color:var(--header-color);
}

button:hover {
  cursor:pointer;
  background-color: var(--select-color);
} 

@media screen and (max-width: 1000px) {
  .advert {
    width: 82%;
    height: 100%;
    background-color: var(--header-color);
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 10px;
    transition: all .3s;
  }

  .advert div {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  img {
    width: 160px;
    height: 160px;
    border-radius: 50px;
    align-self: center;
    align-items: center;
    padding-left: 20px;
  }
  
}

</style>
