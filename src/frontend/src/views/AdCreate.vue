<template>
  <div class="ad-edit">
    <form @submit.prevent = "submitForm">
       <FormInput
      @valueInput="sendEvent"
      :defaultValue="''"
      :type="text"
      :name="title"
      :placeholder="$t('ad_create.title')"
      :required="true"
      class="title-input"
/>
        <div class="info">
          <div class="short">
            <img src="..\..\public\images\kitty.jpg" alt="image">
            <div>
            <select v-model="selected">
              <option v-for="specie in species" :key="specie.id" v-bind:value="specie.name">
                {{ specie.name }}
              </option>
            </select>
            </div>
            <input type="number" v-model="age" placeholder="Age" min="0">
          </div>
          <div class="description">
        <textarea class="description-input" v-model="description" placeholder="Description" cols="90" rows="10"/>
          </div>
        </div>
    </form>
  </div>
</template>

<script>
import FormInput from '../components/FormInput.vue';

const axios = require('axios');

export default {
  components: { FormInput },
  name: "AdCreate",
  beforeMount() {
    axios.get(process.env.VUE_APP_ROOT_API + '/species/' + this.$root.$i18n.locale).then(result => {
      this.species = result.data;
      console.log(result.data);
    });
    
  },
  data: function () {
    return {
      specie: []
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

input{
  border-radius: 5px;
  border: 1px solid #ccc;
}

input:active, input:focus {
  border: 1px solid var(--footer-color);
}

.title-input{
  font-size: 32px;
  width: 80%;
  text-align: center;
}

.description-input{
  resize: none;
}

.info {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.short {
  flex: 2;
  margin: 10px;
  justify-items: left;
}

.description {
  flex: 3;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: solid;
  border-color: var(--transparent-border-color);
}

img{
  width: 200px;
  height: 200px;
  align-self: center;
  border-radius: 50px;
  
}
</style>
