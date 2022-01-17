<template>
  <div class="ad-edit">
    <form v-on:submit.prevent="submit">
      <input class="title-input" type="text" v-model="title" v-bind:placeholder="$t('ad_create.title')" required>
        <div class="info">
          <div class="short">
            <div class="preview">
              <img v-if="image" :src="url" />
            </div>
            <input type="file" class="img-input" accept="image/gif, image/jpeg, image/png" @change="Preview_image" required/>
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
            <div>
            <input class="input" type="number" min="0" max = "200" required
                   v-model="age"
                   v-bind:placeholder="$t('ad_create.age')"
            />
            </div>
          </div>
          <div>
          <div class="description">
            <textarea class="input" required
                      v-model="description"
                      v-bind:placeholder="$t('ad_create.description')"
            />
          </div>
        <button type="submit">{{ $t("ad_create.button") }}</button>
          </div>
        </div>
    </form>
    <ToastError
          v-if="error"
          :text="error"
          class="toast"
      />
  </div>
</template>

<script>
import {createAdvert, updateAdvert, getAdvertById, getAllSpeciesFromLang, getMemberConnectedId  } from "../logic/apicalls";
import { manageErrors } from "../logic/errors";
import ToastError from "../components/toasts/ToastError";

export default {
  name: "AdvertCreation",
  components: {ToastError},
  beforeMount(){
    if(this.$route.params.id != null){
      getAdvertById(this.$route.params.id, this.$root.$i18n.locale).then(result =>{
          if(result.data.member.id == getMemberConnectedId()){
          this.id = result.data.id; 
          this.selectedSpecies = result.data.species.id
          this.selectedSex = result.data.petGender
          this.age = result.data.petAge
          this.description = result.data.description
          this.title = result.data.title;
        } else{
          this.$router.push("/profile")
        }
      });
    }
  },
  mounted() {
    this.getSpecies();
  },
  watch:{
    '$i18n.locale': function() {
      this.getSpecies();
    }
  },
  data() {
    return {
      id: null,
      error: null,
      species: [],
      selectedSpecies: "",
      selectedSex: "",
      age: null,
      url: null,
      image: null,
      title: null,
      description: null
    } 
  },
  methods: {
    getSpecies() {
      getAllSpeciesFromLang(this.$root.$i18n.locale).then(result => {
        this.species = result.data;
      });
    },
    Preview_image(event) {
      this.image = event.target.files[0]
      this.url= URL.createObjectURL(this.image)
    },
    submit() {
      if(this.id == null){
      createAdvert({
        title: this.title,
        description: this.description,
        petAge: this.age,
        imagePath: "/",
        //memberId: getMemberConnectedId(), TODO
        petGender: this.selectedSex,
        speciesId: this.selectedSpecies
      }) .then(() => {
            this.$router.push('/profile')
          })
          .catch(error => {
            this.error = manageErrors(error.message);
          });
      }
      else{ 
        updateAdvert({
        id: this.id,
        title: this.title,
        description: this.description,
        petAge: this.age,
        //memberId: getMemberConnectedId(), TODO
        petGender: this.selectedSex,
        speciesId: this.selectedSpecies
      }) .then(() => {
            this.$router.push('/profile')
          })
          .catch(error => {
            this.error = manageErrors(error.message);
          });
      }
    },
    getMemberConnected() {
      return getMemberConnectedId;
    }
  }
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

.ad-edit{
  background: url("../assets/images/test.jpg");
  background-attachment:fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  margin: auto;
  display: flex;
}

form {
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

.input, .img-input, .title-input{
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
}

.input:active, .input:focus, .img-input:active, .img-input:focus , .title-input:active, .title-input:focus {
  border: 1px solid var(--footer-color);
}

.title-input{
  font-size: 32px;
  width: 80%;
  text-align: center;

}

.info {
  display: flex;
  flex-direction : column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.short {
  height: 375px;
  flex: 2;
  margin: 10px;
  justify-items: left;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.description {
  flex: 3;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: solid;
  border-color: var(--transparent-border-color);
  resize: none;
}

.description textarea{
  width:  calc(30vw - 20px);
  height: calc(20vh - 20px);
  resize: none;
}

.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
}

.preview img {
  width: 200px;
  height: 200px;
  align-self: center;
  border-radius: 50px;
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


</style>
