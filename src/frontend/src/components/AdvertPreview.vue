<template>
  <div class="advert" @click="$router.push(`/adverts/${advert.id}`)">
    <div class="image">
      <img :src="image" alt="image">
    </div>
    <div class = "info">
        <h1>{{ textLimit(advert.title, 45, "...") }}</h1>
        <div class= "text">
          <div class="name">
            <h3>{{ specie.name }}</h3>
            <h3>{{$t("ad_create." + advert.petGender)}}, {{ $t("animal_ad.age") }}: {{ advert.petAge }}</h3>
          </div>
          <div class="description">
            <p>
              {{ textLimit(advert.description, 200, "...") }}
            </p>
          </div>
          </div>
    </div>
    <div class="mod" v-if="isOwner">
      <h3>{{ $t("animal_ad.your_ad") }}</h3>
      <div class="modification" >
        <p>
          <button @click="modifyButtonClicked">{{ $t("animal_ad.modify") }}</button> 
          <button @click="deleteButtonClicked">{{ $t("animal_ad.delete") }}</button>
        </p>
      </div>
    </div>
    <div class="distance" v-if="isConnected">
      <h3>
        {{ $t("animal_ad.distance") }}
      </h3>
      <h2>
        {{Math.floor(advert.distance)}} Km
      </h2>
    </div>
    <ToastError
        v-if="error"
        :text="error"
    />
  </div>
</template>

<script>

import {
  deleteAdvert,
  getMemberConnectedId,
  getSpeciesByIdFromLang,
  getFileById
} from '@/logic/apicalls'
import {manageErrors} from "@/logic/errors";
import ToastError from "@/components/toasts/ToastError";

export default {
  name: "AdvertPreview",
  components: {ToastError},
  props: {
    advert: {}
  },
  beforeMount() {
    this.getSpecies();
    getFileById(this.advert.imageId).then(response => {
      const blob = new Blob([response.data]);
      this.image = URL.createObjectURL(blob);
    })
    .catch(error =>{
      this.image = "../images/default_advert_image.png";
      this.error = manageErrors(error);
    })
  },
  watch:{
    '$i18n.locale': function() {
      this.getSpecies()
    }
  },
  data() {
    return {
      specie: {},
      image: null,
      error: null,
    }
  },
  methods: {
    getSpecies(){
      getSpeciesByIdFromLang(this.advert.species.id, this.$root.$i18n.locale).then(result => {
        this.specie = result.data;
      })
      .catch(error => {
        this.error = manageErrors(error);
      });
    },
    modifyButtonClicked(event){
      event.stopPropagation();
      this.$router.push(`/adverts/${this.advert.id}/modify`)
    },
    deleteButtonClicked(event){
      event.stopPropagation();
      if(this.isOwner){
        deleteAdvert(this.advert.id).catch(error => {
          this.error = manageErrors(error);
        });
        window.location.reload();
      } 
    },
    getImg(){
      return this.image;
    },
    textLimit(text, stop, clamp) {
        return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
    }
  },
  computed: {
    isOwner: function () {
      if (getMemberConnectedId() != null) {
        return this.advert.member.id === getMemberConnectedId();
      }
      return false;
    },
    isConnected: function () {
      if (getMemberConnectedId() != null) {
        return this.advert.member.id !== getMemberConnectedId();
      }
      return false;
    }
  }
}
</script>

<style scoped>

h1{
  margin: 2px;
  margin-bottom: 15px;
  padding-left: 20px;
}

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
  margin-right: 10px;
  margin-left: 10px;
}

.image{
  display: flex;
  justify-content: center;
}

img {  
  object-fit: cover;
  width: 160px;
  height: 160px;
  align-self: center;
  border-radius: 50px;
}

.info{
  flex: 3;
}

.text{
  display: flex;
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
  padding: 10px 20px;
  min-width: 100px;
  border: solid;
  border-color: var(--header-selection-color);
  flex: 2;
  max-width: 75%;
  overflow: auto;
}

.mod{
  text-align: center;
}

.modification {
  display: flex;
  align-self: center;
}

.distance {
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  align-self: center;
  text-align: center;
  width: 120px;
  height: 80px;
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

  .text{
    display: flex;
    flex-direction: column;
    min-width: 0px;
    align-items: center;
  }

  .advert div {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  img {
    width: 160px;
    height: 160px;
    border-radius: 50px;
  }
}

</style>
