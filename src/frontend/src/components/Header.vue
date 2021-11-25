<template>
  <div class="header">
      <div class="logo">
        <a @click="$router.push('/')">
            <img src="@/assets/images/WIDE_logo.png" alt="logo" >
        </a>
      </div>
      <div class="nav">
       <button @click="$router.push('/')"> {{$t("header.home")}}  </button>
       <button @click="$router.push('/annonces')">  {{$t("header.advert")}} </button>
      </div>
      <div class="account">      
       <button @click="$router.push('/login  ')">  {{$t("header.login")}} </button>
       <button @click="$router.push('/register  ')">  {{$t("header.register")}} </button>
       <div class="locale">
          <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['fr', 'en', 'it', 'de'] }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

button{
  height: 100%;
  padding: 20px;
  font-size: 24px;
  border: none;
  background-color: var(--header-color);
  transition: all .3s;
  color: white;
}

.account button{
  color: darkgrey;
  font-size: 18px;
}

button:hover {
  cursor:pointer;
  background-color: var(--header-selection-color);
}

.header {
  height: 80px;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  display: flex;
  justify-content: space-between;
  background-color: var(--header-color);
}

.logo {
    border-right:solid;
    border-right-color: var(--header-selection-color);
    align-content: flex-start;
    flex: 1;
}

.logo:hover{
  cursor:pointer;
}

.logo img {
    width: 80px;
    height: 80px;
}

.nav {
  display:flex;
  justify-content: right;
  width: 100%;
  flex: 3;
}

.account {
    width: 20%;
    display: flex;
    justify-content: right;
    flex: 2;
}

.account img {
    width: 40x;
    height: 40px;
    margin-right: 40px;
    align-self: center;
}

.locale {
  justify-content: center;
  background-color: var(--header-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.locale select {
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: var(--footer-color);
  padding: 10px;
  margin: 10px;
  background-color: var(--header-color);
}

</style>
