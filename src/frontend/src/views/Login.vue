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
import { login } from "../logic/apicalls";
import { manageErrors } from "../logic/errors";
import EmailInput from "../components/inputs/EmailInput";
import PasswordInput from "../components/inputs/PasswordInput";
import ToastError from "../components/toasts/ToastError";

export default {
  name: "Login",
  components: {ToastError, EmailInput, PasswordInput},
  data() {
    return {
      error: null,
      invalid: null,
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      this.error = this.verifyInfos();
      if(this.error != null) {
        return;
      }
      login({
        email: this.email,
        password: this.password,
      })
      .then(() => {
        this.$store.commit('connect');
        this.$router.push('/profile');
      })
      .catch(error => {
        this.error = manageErrors(error.message);
      });
    },
    setEmail(value) {
      this.email = value;
    },
    setPassowrd(value) {
      this.password = value;
    },
    verifyInfos() {
      let message = null;

      if(this.email === "") {
        return `${this.$t('account.email')} ${this.$t('errors.empty')}`;
      }
      if(this.password === "") {
        return `${this.$t('account.password')} ${this.$t('errors.empty')}`;
      }

      message = this.verifyEmail();
      if(message != null) {
        return message;
      }

      message = this.verifyPassword();
      if(message != null) {
        return message;
      }

      return message;
    },
    verifyPassword() {
      const Validation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
      const valid = Validation.test(this.password);
      if (!valid) {
        return this.$t('errors.passwordNotCorrect');
      } else {
        return null;
      }
    },
    verifyEmail() {
      const Validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
      const valid = Validation.test(this.email);
      if (!valid) {
        return this.$t('errors.emailNotCorrect');
      } else {
        return null;
      }
    },
  },
}
</script>

<style scoped>

.bg {
  background: url("../assets/images/bunny.jpg") no-repeat fixed center;
  background-size: contain;
  width: 100%;
  height: 66vh;
  margin: auto;
  padding-top: 3em;
  padding-bottom: 3em;
  display: flex;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
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

h1,
button {
  color: black;
}

h1 {
  text-align: center;
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

</style>
