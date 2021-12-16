<template>
  <div class="bg">
    <div class="login">
      <h1>{{ $t("login.title") }}</h1>
      <form v-on:submit.prevent="login">
        <EmailInput
            @valueInput="setEmail"
            :name="'email'"
        />
        <PasswordInput
            @valueInput="setPassowrd"
            :name="'password'"
            :placeholder="$t('account.password')"
        />
        <button type="submit">{{ $t("login.button") }}</button>
      </form>
      <ToastError
          v-if="error"
          :text="error"
          class="toast"
      />
    </div>
  </div>
</template>

<script>
import EmailInput from "../components/inputs/EmailInput";
import PasswordInput from "../components/inputs/PasswordInput";
import ToastError from "../components/toasts/ToastError";

const axios = require('axios');

export default {
  name: "Login",
  components: {ToastError, EmailInput, PasswordInput},
  data() {
    return {
      error: null,
      invalid: null,
      email: "",
      password: "",
      token: null,
    }
  },
  methods: {
    login() {
      axios.post(process.env.VUE_APP_ROOT_API + '/auth/login', {
        email: this.email,
        password: this.password,
      })
      .then(result => {
        this.token = result.data;
        console.log(result.data);
      })
      .catch(error => {
        this.error = error;
      });
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

.toast {
  text-align: center;
}

</style>
