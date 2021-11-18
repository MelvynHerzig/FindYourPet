<template>
  <div class="landingPage">
    <Landing1/>
    <Landing2/>
    <RecentAnimalsList/>
    <DevTeam/>
  </div>
</template>

<script>
import Landing1 from '../components/Landing_1.vue'
import Landing2 from '../components/Landing_2.vue'
import RecentAnimalsList from '../components/RecentAnimalsList.vue'
import DevTeam from '../components/Dev_team.vue'

export default {
  name: 'App',
  components: {
    Landing1,
    Landing2,
    RecentAnimalsList,
    DevTeam
  }
}
</script>