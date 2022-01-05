<template>
  <section class="main">
    <div class="bgProfile">
      <div class="profileInfo">
        <h1>{{ $t('profile.profileInfos') }}</h1>
        <div class="infos">
          <p><i class="icon fas fa-user"></i>  {{ member.firstname }}</p>
          <p><i class="icon fas fa-user"></i>  {{ member.name }}</p>
          <p><i class="icon fas fa-envelope"></i>  {{ member.email }}</p>
          <p><i class="icon fas fa-map-marker-alt"></i>  {{ member.street }}</p>
          <p><i class="icon fas fa-map-marker-alt"></i>  {{ member.NPA }}</p>
          <p><i class="icon fas fa-map-marker-alt"></i>  {{ member.city }}</p>
          <p><i class="icon fas fa-phone"></i>  {{ member.phone }}</p>
          <button type="submit">{{ $t('profile.modifyButton') }}</button>
        </div>
      </div>
    </div>
    <div class="inner">
      <h1>{{ $t('profile.advertsTitle') }}</h1>
      <div class="list">
        <ul>
          <li v-for="advert in this.member.adverts" :key="advert.id" style="list-style-type:none">
            <AnimalAdvert :advert="advert"/>
          </li>
        </ul>
      </div>
    </div>

  </section>
</template>

<script>
import { getMemberByEmail } from "../logic/apicalls";
import AnimalAdvert from "../components/AnimalAdvert";

export default {
  name: "Profile",
  components: {AnimalAdvert},
  data() {
    return {
      error: null,
      member: {
        firstname: "Alec",
        name: "Berney",
        email: "beral@sevjnet.ch",
        street: "Rue du Village 28",
        NPA: "1347",
        city: "Le Solliat",
        phone: "078 837 77 18",
        adverts: [
          {
            title: "Balou",
            petAge: 16,
            description: "Ceci est une annonce fictive teste présente en attendant l'api"
          },
          {
            title: "Tiki",
            petAge: 7,
            description: "Ceci est une annonce fictive teste présente en attendant l'api"
          },
        ]
      },
    }
  },
  methods: {
    getActualMember() {
      getMemberByEmail(this.member.email).then(result => { // TODO récupérer celle du token
        this.member = result.data;
      }).catch(error => {
        this.error = error;
      });
    }
  },
  mounted() {
    this.getActualMember();
  }
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

.profileInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--transparent-background-color);
  padding: 20px;
  margin: auto;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  text-align: center;
  border: solid;
  border-color: var(--transparent-border-color);
}

.infos {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.inner {
  background: var(--transparent-background-color);
  padding: 20px;
  margin: auto auto 3em auto;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: solid;
  border-color: var(--transparent-border-color);
}

.inner h1 {
  display: flex;
  justify-content: center;
}

h1,
button,
p {
  color: black;
}

button {
  display: inline-block;
  padding: 20px;
  margin: 30px 30px 30px 0;
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
