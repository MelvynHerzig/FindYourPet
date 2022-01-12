<template>
  <div class="dev-team">
    <div class = "title">
    <h1>{{$t("dev_team.title")}}</h1>
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
  name: 'DevTeam',
  components: {
    Dev
  }
}
</script>

<style scoped>

.dev-team {
  background-color: var(--header-color);
  width: 100%;
  padding-bottom: 60px;
}

.title {
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
  flex-wrap: wrap;
  border: solid;
  border-color: var(--header-selection-color);
  border-radius: 10px;
}

</style>
