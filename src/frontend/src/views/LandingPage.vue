<template>
  <div class="landingPage">
    <LandingWelcome/>
    <LandingHowTo/>
    <RecentAnimalsList/>
    <DevTeam/>
  </div>
</template>

<script>
import LandingWelcome from '../components/landing/LandingWelcome.vue'
import LandingHowTo from '../components/landing/LandingHowTo.vue'
import RecentAnimalsList from '../components/landing/RecentAnimalsList.vue'
import DevTeam from '../components/landing/DevTeam.vue'

export default {
  name: 'LandingPage',
  components: {
    LandingWelcome,
    LandingHowTo,
    RecentAnimalsList,
    DevTeam
  }
}
</script>