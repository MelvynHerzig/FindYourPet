<template>
  <div class="bg">
    <div class="register">
      <h1>{{ $t("register.title") }}</h1>
      <form v-on:submit.prevent="register">
        <NameInput
            @valueInput="setFirstName"
            :name="'firstName'"
            :placeholder="$t('account.firstName')"
        />
        <NameInput
            @valueInput="setName"
            :name="'name'"
            :placeholder="$t('account.name')"
        />
        <EmailInput
            @valueInput="setEmail"
        />
        <PasswordInput
            @valueInput="setPassowrd"
            :name="'password'"
            :placeholder="$t('account.password')"
        />
        <PasswordInput
            @valueInput="setConfirmPassword"
            :name="'confirmPassword'"
            :placeholder="$t('account.confirmPassword')"
        />
        <LocationInput
            @valueInput="setStreet"
            :name="'street'"
            :type="'text'"
            :placeholder="$t('account.street')"
        />
        <LocationInput
            @valueInput="setNPA"
            :name="'npa'"
            :type="'number'"
            :placeholder="$t('account.npa')"
        />
        <LocationInput
            @valueInput="setCity"
            :name="'city'"
            :type="'text'"
            :placeholder="$t('account.city')"
        />
        <PhoneInput
            @valueInput="setPhone"
            :name="'phone'"
            :placeholder="$t('account.phone')"
        />
        <button type="submit">{{ $t("register.button") }}</button>
      </form>
      <div v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import EmailInput from "../components/inputs/EmailInput";
import PasswordInput from "../components/inputs/PasswordInput";
import NameInput from "../components/inputs/NameInput";
import LocationInput from "../components/inputs/LocationInput";
import PhoneInput from "../components/inputs/PhoneInput";

const axios = require('axios');

export default {
  name: "Register",
  components: {NameInput, EmailInput, PasswordInput, LocationInput, PhoneInput},
  data() {
    return {
      error: null,
      firstName: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      street: "",
      npa: 0,
      city: "",
      phone: 0,
    }
  },
  methods: {
    register() {
      axios.post(process.env.VUE_APP_ROOT_API + '/auth/register', {
        firstname: this.firstname,
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        street: this.street,
        NPA: this.npa,
        city: this.city,
        phone: this.phone,
      })
      .then(result => {
        console.log(result.data);
      })
      .catch(error => {
        this.error = error;
      });
    },
    setFirstName(value) {
      this.firstName = value;
    },
    setName(value) {
      this.name = value;
    },
    setEmail(value) {
      this.email = value;
    },
    setPassowrd(value) {
      this.password = value;
    },
    setConfirmPassword(value) {
      this.confirmPassword = value;
    },
    setStreet(value) {
      this.street = value;
    },
    setNPA(value) {
      this.npa = value;
    },
    setCity(value) {
      this.city = value;
    },
    setPhone(value) {
      this.phone = value;
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

.register {
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
  height: 900px;
  margin: auto;
  display: flex;
}

</style>
