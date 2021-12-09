<template>
  <div class="bg">
    <div class="login">
      <h1>{{ $t("login.title") }}</h1>
      <form v-on:submit.prevent="login">
        <EmailInput @valueInput="setEmail" />
        <PasswordInput @valueInput="setPassowrd" />
        <button type="submit">{{ $t("login.button") }}</button>
      </form>
      <div v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

const axios = require('axios');

export default {
  name: "Login",
  components: {EmailInput, PasswordInput},
  data() {
    return {
      error: null,
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      console.log("username sent: " + this.email);
      console.log("password sent: " + this.password);
      axios.post(process.env.VUE_APP_ROOT_API + '/auth/login', {
        email: this.email,
        password: this.password
      })
      .then(result => {
        this.error = result.data;
        console.log(result.data);
      })
    },
    setEmail(value) {
      this.email = value;
    },
    setPassowrd(value) {
      this.password = value;
    },
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
button {
  color: black;
}

h1 {
  text-align: center;
}

.login {
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

button {
  display: inline-block;
  padding: 20px;
  margin: 30px;
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

.bg {
  background: url("../assets/images/dogs.jpg") no-repeat fixed center;
  background-size: contain;
  width: 100%;
  height: 600px;
  margin: auto;
  display: flex;
}

</style>
