<template>
  <div class="ad-edit">
    <form v-on:submit.prevent="submit">
      <input class="title-input" type="text" v-model="title" v-bind:placeholder="$t('ad_create.title')" required>
        <div class="info">
          <div class="short">
            <div class="preview">
              <img v-if="image" :src="url" />
            </div>
            <input type="file" class="img-input" accept="image/gif, image/jpeg, image/png" @change="Preview_image" :required = "image == null ? true : false"/>
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
import {createAdvert, updateAdvert, getAdvertById, getAllSpeciesFromLang, getMemberConnectedId, addFile, getFileById  } from "@/logic/apicalls";
import {manageErrors} from "@/logic/errors";
import {isEmpty, verifyAge, verifyGender, verifyImage} from "@/logic/verify-inputs";
import ToastError from "../components/toasts/ToastError";

export default {
  name: "AdvertEdit",
  components: {ToastError},
  beforeMount(){
    if(this.$route.params.id != null) {
      getAdvertById(this.$route.params.id, this.$root.$i18n.locale).then(result =>{
          if(result.data.member.id === getMemberConnectedId()) {
            this.id = result.data.id;
            this.selectedSpecies = result.data.species.id
            this.selectedSex = result.data.petGender
            this.age = result.data.petAge
            this.description = result.data.description
            this.title = result.data.title;
            this.imageId = result.data.imageId
            getFileById(this.imageId).then(response => {
              const blob = new Blob([response.data]);
              this.image = blob;
              this.url = URL.createObjectURL(blob);
            })
            .catch(() => {
              this.url = "../images/default_advert_image.png";
            });
        } else {
          this.$router.push("/profile")
        }
      })
      .catch(error => {
        this.error = manageErrors(error);
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
      description: null,
      imageChanged: false
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
    Preview_image(event) {
      this.imageChanged = true;
      this.image = event.target.files[0]
      this.url= URL.createObjectURL(this.image)
    },
    submit() {
      this.error = this.verifyInfos();
      if(this.error != null) {
        return;
      }
      if(this.id == null) {
        createAdvert({
          title: this.title,
          description: this.description,
          petAge: this.age,
          petGender: this.selectedSex,
          speciesId: this.selectedSpecies
        })
        .then(response => {
            this.id = response.data.id;
            addFile(this.id, this.image)
            .then(()=>{
              this.$router.push('/profile')
            })
            .catch(error =>{
              this.error = manageErrors(error);
            });
        })
        .catch(error => {
          this.error = manageErrors(error);
        });
      } else {
        updateAdvert({
          id: this.id,
          title: this.title,
          description: this.description,
          petAge: this.age,
          imageId: this.imageId,
          petGender: this.selectedSex,
          speciesId: this.selectedSpecies
        })
        .then(()=> {
          if(this.imageChanged){
            addFile(this.id, this.image)
            .then(()=>{
              this.$router.push('/profile');
            })
            .catch(error =>{
              this.error = manageErrors(error);
            });
          } else {
            this.$router.push('/profile');
          }
        })
        .catch(error => {
          this.error = manageErrors(error);
        });
      }
    },
    verifyInfos() {
      let message = null;

      message = this.verifyEmptyFields();
      if(message != null) {
        return message;
      }

      message = verifyImage(this.image, this.imageChanged);
      if(message != null) {
        return message;
      }

      message = verifyGender(this.selectedSex);
      if(message != null) {
        return message;
      }

      message = verifyAge(this.age);
      if(message != null) {
        return message;
      }

      return message;
    },
    verifyEmptyFields() {
      let field = null;
      if(isEmpty(this.title)) {
        field = this.$t('ad_create.title');
      }
      if(isEmpty(this.selectedSpecies)) {
        field = this.$t('ad_create.species');
      }
      if(isEmpty(this.selectedSex)) {
        field = this.$t('ad_create.sex');
      }
      if(isEmpty(this.age)) {
        field = this.$t('ad_create.age');
      }
      if(isEmpty(this.description)) {
        field = this.$t('ad_create.description');
      }
      if(field != null) {
        return `${field} ${this.$t('errors.empty')}`;
      } else {
        return null;
      }
    },
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
  background: url("../assets/images/mouse.jpg");
  background-attachment:fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
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
  height: 575px;
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
  width: 400px;
  height: 400px;
}

.preview img {
  width: 400px;
  height: 400px;
  align-self: center;
  border-radius: 50px;
  object-fit: cover;
}

.toast {
  align-self: center;
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

@media screen and (max-width: 600px) {
  .preview img {
    width: 160px;
    height: 160px;
    border-radius: 50px;
  }

  .preview {
    width: 160px;
    height: 160px;
}
}

</style>
