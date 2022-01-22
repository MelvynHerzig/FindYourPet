<template>
  <div class="bg">
    <div class="register">
      <h1 v-if="id">{{ $t("memberUpdate.title") }}</h1>
      <h1 v-else>{{ $t("register.title") }}</h1>
      <form v-on:submit.prevent="submit">
        <div class="field">
          <i class="icon fas fa-user"></i>
          <input
              v-model="firstName"
              type="text"
              name="firstName"
              :placeholder="$t('account.firstName')"
              required="required"
              class="input"
          />
        </div>
        <div class="field">
          <i class="icon fas fa-user"></i>
          <input
              v-model="name"
              type="text"
              name="name"
              :placeholder="$t('account.name')"
              required="required"
              class="input"
          />
        </div>
        <div class="field">
          <i class="icon fas fa-envelope"></i>
          <input
              v-model="email"
              type="email"
              name="email"
              :placeholder="$t('account.email')"
              required="required"
              class="input"
          />
        </div>
        <PasswordInput
            v-if="!id"
            @valueInput="setPassword"
            :name="'password'"
            :placeholder="$t('account.password')"
        />
        <PasswordInput
            v-if="!id"
            @valueInput="setConfirmPassword"
            :name="'confirmPassword'"
            :placeholder="$t('account.confirmPassword')"
        />
        <div class="field">
          <i class="icon fas fa-map-marker-alt"></i>
          <input
              @input="checkLocationInfosIfFilled"
              v-model="address.street"
              type="text"
              name="street"
              :placeholder="$t('account.street')"
              required="required"
              class="input"
          />
        </div>
        <div class="field">
          <i class="icon fas fa-map-marker-alt"></i>
          <input
              @input="checkLocationInfosIfFilled"
              v-model="address.npa"
              type="number"
              name="npa"
              :placeholder="$t('account.npa')"
              required="required"
              class="input"
          />
        </div>
        <div class="field">
          <i class="icon fas fa-map-marker-alt"></i>
          <input
              @input="checkLocationInfosIfFilled"
              v-model="address.city"
              type="text"
              name="city"
              :placeholder="$t('account.city')"
              required="required"
              class="input"
          />
        </div>
        <select v-if="addressToSelect" v-model="address" class="addressSelection">
          <option v-for="addr in this.addressToSelect"
                  :key="addr.address"
                  :value="addr.address"
          >
            {{ this.addressToString(addr.address) }}
          </option>
        </select>
        <div class="field">
          <i class="icon fas fa-phone"></i>
          <input
              v-model="phone"
              type="text"
              name="phone"
              :placeholder="$t('account.phone')"
              required="required"
              class="input"
          />
        </div>
        <button v-if="id" type="submit">{{ $t("memberUpdate.button") }}</button>
        <button v-else type="submit">{{ $t("register.button") }}</button>
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
import PasswordInput from "../components/inputs/PasswordInput";
import ToastError from "@/components/toasts/ToastError";
import {
  register,
  getSwissAdress,
  getMemberByEmail,
  getMemberConnectedEmail,
  updateMemberByEmail
} from "@/logic/apicalls";
import { manageErrors } from "@/logic/errors";
import { ERROR_INVALID_ADDRESS } from "../logic/error-message.ts";

export default {
  name: "ProfileEdit",
  components: { PasswordInput, ToastError },
  data() {
    return {
      error: null,
      id: null,
      firstName: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: {
        street: null,
        npa: null,
        city: null,
      },
      phone: "",
      addressToSelect: null,
    }
  },
  methods: {
    async submit() {
      if(this.id == null) {
        this.error = this.verifyRegisterInfos();
        if(this.error != null) {
          return;
        }
        register({
          firstname: this.firstName,
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          street: this.address.street,
          NPA: this.address.npa,
          city: this.address.city,
          phone: this.phone,
        }).then(result => {
          if (result.data.success) {
            this.$router.push('/login');
          } else {
            this.error = result.data.message;
          }
        })
        .catch(error => {
          this.error = manageErrors(error.message);
        });
      } else {
        this.error = this.verifyModifyInfos();
        if(this.error != null) {
          return;
        }
        updateMemberByEmail({
          id: this.id,
          firstname: this.firstName,
          name: this.name,
          email: this.email,
          street: this.address.street,
          NPA: this.address.npa,
          city: this.address.city,
          phone: this.phone,
        }).then( () => {
          this.$router.push('/profile');
        })
        .catch(error => {
          this.error = manageErrors(error.message);
        });
      }
    },
    verifyRegisterInfos() {
      let message = this.verifyModifyInfos();
      if(message != null) {
        return message;
      }

      if(this.password === "") {
        return `${this.$t('account.password')} ${this.$t('errors.empty')}`;
      }
      if(this.confirmPassword === "") {
        return `${this.$t('account.confirmPassword')} ${this.$t('errors.empty')}`;
      }

      message = this.verifyPassword();
      if(message != null) {
        return message;
      }

      if(this.password !== this.confirmPassword) {
        return this.$t('errors.passwordConfirmation');
      }
      
      return message;
    },
    verifyModifyInfos() {
      let message = null;

      message = this.verifyEmptyFields();
      if(message != null) {
        return message;
      }

      message = this.verifyEmail();
      if(message != null) {
        return message;
      }

      this.verifyAddress();

      message = this.verifyPhone();
      if(message != null) {
        return message;
      }

      return message;
    },
    verifyEmptyFields() {
      let field = null;
      if(this.firstName === "") {
        field = this.$t('account.firstName');
      }
      if(this.name === "") {
        field = this.$t('account.name');
      }
      if(this.email === "") {
        field = this.$t('account.email');
      }
      if(this.phone === "") {
        field = this.$t('account.phone');
      }
      if(field != null) {
        return `${field} ${this.$t('errors.empty')}`;
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
    verifyPhone() {
      const Validation = /^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/gm;
      const valid = Validation.test(this.phone);
      if (!valid) {
        return this.$t('errors.phoneNotCorrect');
      } else {
        return null;
      }
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
    async verifyAddress() {
      let foundAddress = await getSwissAdress(this.addressToString(this.address));

      if (foundAddress.length === 0) {
        this.error = manageErrors(ERROR_INVALID_ADDRESS);
      }

      // parse results
      if (foundAddress.length > 1) {
        this.addressToSelect = [];
        for (let result of foundAddress) {
          this.addressToSelect.push({
            address: this.parseAddress(result.attrs.label)
          });
        }
      }
    },
    checkLocationInfosIfFilled() {
      if (this.address.city !== null && this.address.street != null && this.address.npa != null) {
        this.verifyAddress()
      }
    },
    setPassword(value) {
      this.password = value;
    },
    setConfirmPassword(value) {
      this.confirmPassword = value;
    },
    parseAddress(addressInString) {
      let tokens = addressInString.split('<b>');
      let tokensbis = tokens[1].split(' ');
      let npa = tokensbis[0];
      let city = tokensbis.slice(1).toString().replace(',', ' ').replace('</b>', '').trim();
      return {
        street: tokens[0].trim(),
        npa: parseInt(npa),
        city: city,
      }
    },
    addressToString(address) {
      return `${address.street} ${address.npa} ${address.city}`;
    }
  },
  beforeMount() {
    if(this.$route.params.email != null) {
      getMemberByEmail(this.$route.params.email).then(result =>  {
        if(result.data.email === getMemberConnectedEmail()) {
          this.id = result.data.id;
          this.firstName = result.data.firstname;
          this.name = result.data.name;
          this.email = result.data.email;
          this.address.street = result.data.street;
          this.address.npa = result.data.NPA;
          this.address.city = result.data.city;
          this.phone = result.data.phone;
        }
      });
    }
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

.bg {
  background: url("../assets/images/dogs.jpg") no-repeat fixed center;
  background-size: contain;
  width: 100%;
  height: 1000px;
  margin: auto;
  display: flex;
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

.field {
  position: relative;
}

.icon {
  position: absolute;
  top: 13px;
  left: 20px;
  color: grey;
}

input {
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 14px;
  padding: 0 20px 0 50px;
  outline: none;
}

input:active,
input:focus,
input:hover {
  border: 1px solid var(--footer-color);
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

.addressSelection {
  justify-content: center;
  margin-bottom: 20px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  border-radius: 5px;
  width: 100%;
  height: 42px;
}
.addressSelection:active,
.addressSelection:focus,
.addressSelection:hover {
  border: 1px solid var(--footer-color);
}

</style>
