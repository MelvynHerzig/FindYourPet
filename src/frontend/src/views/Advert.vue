<template>
  <div class="advert">
    <div class="inner">
      <h1>{{advert.title}}</h1>
      <div class="info">
        <div class="short">
          <img :src="image" alt="image">
          <h2>{{advert.species.name}}</h2>  
          <h3>{{$t("ad_create." + advert.petGender)}}, {{advert.petAge}} {{$t("ad.years")}}</h3>
        </div>
        <div class="description">
          <p>
           {{advert.description}}
          </p>
        </div>
      </div>
      <div v-if="isConnected">
      <h2> {{$t("ad.contact")}} </h2>
        <div class = "contact">
          <h3> {{advert.member.firstname}} {{advert.member.name}} </h3>
          <h3> {{advert.member.email}}  </h3>
          <h3> {{advert.member.phone}} </h3>
          <div class="distance" v-if="isConnected">
          <h3>
            {{ $t("animal_ad.distance") }}
          </h3>
          <h2>
            {{Math.floor(advert.distance)}} Km
          </h2>
        </div>
        </div>
        
      </div>
      <div class="modification" v-if="isOwner">
        <p>
          <button @click="$router.push(`/adverts/${advert.id}/modify`)">{{ $t("animal_ad.modify") }}</button> 
          <button @click="deleteButtonClicked">{{ $t("animal_ad.delete") }}</button>
        </p>
      </div>
    </div>
    <ToastError
        v-if="error"
        :text="error"
    />
  </div>
</template>

<script>
import {getAdvertById, getMemberConnectedId, memberIsConnected, deleteAdvert, getFileById} from "@/logic/apicalls";
import { manageErrors } from "@/logic/errors";
import ToastError from "@/components/toasts/ToastError";

export default {
  name: "Advert",
  components: {ToastError},
  beforeMount() {
    getAdvertById(this.$route.params.id, this.$root.$i18n.locale).then(result => {
      this.advert = result.data;
      getFileById(this.advert.imageId).then(response => {
        const blob = new Blob([response.data]);
        this.image = URL.createObjectURL(blob);
      })
      .catch(error => {
        this.image = "../images/default_advert_image.png";
        this.error = manageErrors(error);
      })
    })
    .catch(error => {
      this.error = manageErrors(error);
    });
  },
  watch:{
    '$i18n.locale': function() {
      getAdvertById(this.$route.params.id, this.$root.$i18n.locale).then(result => {
      this.advert = result.data;
      })
      .catch(error => {
        this.error = manageErrors(error);
      });
    }
  },
  methods : {
    deleteButtonClicked(){
      if(this.isOwner){
        deleteAdvert(this.advert.id).catch(error => {
          this.error = manageErrors(error);
        });
        this.$router.push('/profile')
      } 
    }
  },
  computed:{
    isConnected:  function(){
     return memberIsConnected();
    },
    isOwner:  function(){
      if (getMemberConnectedId() != null){
       return this.advert.member.id === getMemberConnectedId();
      }
      return false
    }
  },
  data: function () {
    return {
      advert: {},
      image: null,
      error: null,
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
  background: url("../assets/images/fish.jpg");
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

.description, .contact{
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
  width: 400px;
  height: 400px;
  align-self: center;
  border-radius: 50px;

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

@media screen and (max-width: 600px) {
  img {
    width: 160px;
    height: 160px;
    border-radius: 50px;
  }
}
</style>
