<template>
  <div class="header">
    <a class="logo" @click="$router.push('/')">
      <img src="@/assets/images/WIDE_logo.png" alt="logo" >
    </a>
    <div class="link" id="links">
      <div class="nav">
        <router-link to="/"> <button @click="displayMenu()"> {{$t("header.home")}} </button> </router-link>
        <router-link to="/adverts"> <button @click="displayMenu()"> {{$t("header.advert")}} </button> </router-link>
      </div>
      <div v-if="isConnected" class="account">
        <router-link to="/profile"> <button @click="$router.push('/profile'), displayMenu()" > {{$t("header.profile")}} </button> </router-link>
        <router-link to="/adverts/create"> <button @click="$router.push('/adverts/create'), displayMenu()"> {{$t("header.advertCreation")}} </button> </router-link>
        <button @click="disconnectMember(), displayMenu()"> {{$t("header.disconnect")}} </button>
      </div>
      <div v-else class="account">
        <router-link to="/login"> <button @click="$router.push('/login'), displayMenu()"> {{$t("header.login")}} </button> </router-link>
        <router-link to="/register"> <button @click="$router.push('/register'), displayMenu()"> {{$t("header.register")}} </button> </router-link>
      </div>
    </div>
    <div>
      <div class="locale">
        <select v-model="$i18n.locale" value = "$i18n.locale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
            {{ lang }}
          </option>
        </select>
      </div>
      <a class="hamburger-icon" @click="displayMenu">
        <i class="fa fa-bars fa-2x"></i>
      </a>
    </div>
  </div>
</template>

<script>
import {destroyMemberToken} from '@/logic/apicalls';

export default {
  name: 'locale-changer',
  data () {
    return {
      langs: ['fr', 'en', 'it', 'de'],
    }
  },
  methods: {
    displayMenu() {
      const link = document.getElementById('links');
      if(window.innerWidth < 1100){
        if (link.style.display === "flex") {
          link.style.display = null;
        }
        else {
          link.style.display = "flex";
        }
      }
    },
    disconnectMember() {
      destroyMemberToken();
      this.$store.commit('disconnect');
      this.$router.push('/login');
    },
  },
  computed: {
    isConnected() {
      return this.$store.getters.isConnected;
    },
  },
}
</script>

<style scoped>

.header {
  overflow: hidden;
  position: fixed;
  background-color: var(--header-color);
  width: 100%;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}

.header a:hover {
  background-color: var(--header-selection-color);
}

.link {
  display: flex;
  flex-direction: row;
}

.logo {
    border-right:solid;
    border-right-color: var(--header-selection-color);
    align-content: flex-start;
}

.logo:hover{
  cursor:pointer;
}

.logo img {
    width: 80px;
    height: 80px;
    margin: 5px;
}

.nav {
  display:flex;
  flex-direction: row;
}

.account {
  display: flex;
  flex-direction: row;
}

.account button {
  color: darkgrey;
  font-size: 18px;
}

.locale {
  background-color: var(--header-color);
  display: block;
  position: absolute;
  right: 5px;
  top: 20px;
}

.locale select {
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: var(--footer-color);
  padding: 10px;
  margin: 10px;
  background-color: var(--header-color);
}

.hamburger-icon {
  display: none;
}

button {
  height: 100%;
  padding: 20px;
  font-size: 24px;
  border: none;
  background-color: var(--header-color);
  transition: all .3s;
  color: white;
}

button:hover {
  cursor:pointer;
  background-color: var(--header-selection-color);
}

@media screen and (max-width: 1100px) {
  .link {
    display: none;
    flex-direction: column;
  }

  .nav {
    display:flex;
    flex-direction: column;
  }

  .account {
    display: flex;
    flex-direction: column;
  }

  .locale {
    background-color: var(--header-color);
    display: block;
    position: absolute;
    right: 5px;
    top: 40px;
  }

  .hamburger-icon {
    color: white;
    background: var(--header-color);
    display: block;
    position: absolute;
    right: 30px;
    top: 10px;
  }
}

</style>
