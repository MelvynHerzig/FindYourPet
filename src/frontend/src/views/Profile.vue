<template>
  <section v-if="member" class="main">
    <div class="bgProfile">
      <ProfileInfos :member="member" />
      <ToastError
          v-if="profileError"
          :text="profileError"
          class="toast"
      />
    </div>
    <div class="bgProfile">
      <ProfileAdverts :adverts="adverts" />
      <ToastInfo
          v-if="advertsError"
          :text="advertsError"
          class="toast"
      />
    </div>
  </section>
</template>

<script>
import {getMemberByEmail, getMemberConnectedEmail, getAdvertsByMember} from "@/logic/apicalls";
import ProfileInfos from "@/components/profile/ProfileInfos";
import ProfileAdverts from "@/components/profile/ProfileAdverts";
import ToastInfo from "@/components/toasts/ToastInfo";
import ToastError from "@/components/toasts/ToastError";

export default {
  name: "Profile",
  components: {ToastError, ProfileAdverts, ProfileInfos, ToastInfo},
  data() {
    return {
      profileError: null,
      advertsError: null,
      member: null,
      adverts: []
    }
  },
  methods: {
    getActualMember() {
      getMemberByEmail(getMemberConnectedEmail()).then(result => {
        this.member = result.data;
        this.getMembersAdverts() 
      }).catch(error => {
        this.profileError = error;
      });
    },
    getMembersAdverts() {
      getAdvertsByMember(this.member.id,this.$root.$i18n.locale).then(result => {
        this.adverts = result.data;
      }).catch(error => {
        this.advertsError = error;
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
  background: url("../assets/images/parrot.jpg") no-repeat fixed center;
  background-size: contain;
  width: 100%;
  height: 100%;
  padding-bottom: 3em;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.toast {
  align-self: center;
}

</style>
