<template>
  <div class="devteam">
    <div class = "title">
    <h1>L'équipe Find Your Pet</h1>
    </div>
    <div class="team">
      <Dev url = "images/Berney.png" name= "Alec Berney" />
      <Dev url = "images/Ferrari.png" name= "Teo Ferrari" />
      <Dev url = "images/Forestier.png" name= "Quentin Forestier" />
      <Dev url = "images/Herzig.png" name= "Melvyn Herzig" />  
    </div>
  </div>
</template>

<script>
import Dev from './Dev.vue'

export default {
  name: 'App',
  components: {
    Dev
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.devteam{
  background-color: var(--header-color);
  width: 100%;
  padding-bottom: 60px;
}

.title{
  text-align: center;
  padding : 20px;
}

.team {
  margin: auto;
  padding: 20px;
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: space-around;
  border: solid;
  border-color: var(--header-selection-color);
  border-radius: 10px;
}
</style>
