<template>
  <section v-if="member" class="main">
    <div class="bgProfile">
      <ProfileInfos :member="member" />
    </div>
    <div class="bgProfile">
      <ProfileAdverts :member="member.adverts" />
    </div>
  </section>
</template>

<script>
import {getMemberByEmail, getMemberConnectedEmail } from "@/logic/apicalls";
import ProfileInfos from "@/components/profile/ProfileInfos";
import ProfileAdverts from "@/components/profile/ProfileAdverts";

export default {
  name: "Profile",
  components: {ProfileAdverts, ProfileInfos},
  data() {
    return {
      error: null,
      member: null,
    }
  },
  methods: {
    getActualMember() {
      getMemberByEmail(getMemberConnectedEmail()).then(result => {
        this.member = result.data;
      }).catch(error => {
        this.error = error;
      });
    }
  },
  beforeMount() {
    this.getActualMember();
  },
}
</script>

<style scoped>

.main {
  padding-top: 3em;
}

.bgProfile {
  background: url("../assets/images/pets.jpg") no-repeat fixed center;
  background-size: contain;
  width: 100%;
  height: 100%;
  padding-bottom: 3em;
  margin: auto;
  display: flex;
}

</style>
