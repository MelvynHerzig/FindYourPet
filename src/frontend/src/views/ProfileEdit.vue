<template>
  <div class="bg">
    <div class="register">
      <h1 v-if="id">{{ $t("memberUpdate.title") }}</h1>
      <h1 v-else>{{ $t("register.title") }}</h1>
      <form v-on:submit.prevent="submit">
        <NameInput
            @valueInput="setFirstName"
            :name="'firstName'"
            :default-value="firstName"
            :placeholder="$t('account.firstName')"
        />
        <NameInput
            @valueInput="setName"
            :name="'name'"
            :default-value="name"
            :placeholder="$t('account.name')"
        />
        <EmailInput
            @valueInput="setEmail"
            :default-value="email"
        />
        <PasswordInput
            v-if="id"
            @valueInput="setPassword"
            :name="'password'"
            :placeholder="$t('account.password')"
        />
        <PasswordInput
            v-if="id"
            @valueInput="setConfirmPassword"
            :name="'confirmPassword'"
            :placeholder="$t('account.confirmPassword')"
        />
        <LocationInput
            @valueInput="setStreet"
            :name="'street'"
            :type="'text'"
            :default-value="address.street"
            :placeholder="$t('account.street')"
        />
        <LocationInput
            @valueInput="setNPA"
            :name="'npa'"
            :type="'number'"
            :default-value="address.npa"
            :placeholder="$t('account.npa')"
        />
        <LocationInput
            @valueInput="setCity"
            :name="'city'"
            :type="'text'"
            :default-value="address.city"
            :placeholder="$t('account.city')"
        />
        <select v-if="addressToSelect" v-model="address" class="addressSelection">
          <option v-for="addr in this.addressToSelect"
                  :key="addr.address"
                  :value="addr.address"
          >
            {{ this.addressToString(addr.address) }}
          </option>
        </select>
        <PhoneInput
            @valueInput="setPhone"
            :name="'phone'"
            :default-value="phone"
            :placeholder="$t('account.phone')"
        />
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
import EmailInput from "../components/inputs/EmailInput";
import PasswordInput from "../components/inputs/PasswordInput";
import NameInput from "../components/inputs/NameInput";
import LocationInput from "../components/inputs/LocationInput";
import PhoneInput from "../components/inputs/PhoneInput";
import ToastError from "@/components/toasts/ToastError";
import {
  register,
  getSwissAdress,
  getMemberByEmail,
  getMemberConnectedEmail,
  updateMemberByEmail, getMemberConnectedId
} from "@/logic/apicalls";
import { manageErrors } from "@/logic/errors";
import { ERROR_INVALID_ADDRESS } from "../logic/error-message.ts";

export default {
  name: "ProfileEdit",
  components: { NameInput, EmailInput, PasswordInput, LocationInput, PhoneInput, ToastError },
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

      /*const passwordValidation =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

      const validPassword = passwordValidation.test(createMemberDto.password);
      if (!validPassword) {
        throw new HttpException(ERROR_INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
      }*/

      if(this.id == null) {
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
        updateMemberByEmail({
          id: getMemberConnectedId(),
          firstname: this.firstName,
          name: this.name,
          email: this.email,
          street: this.address.street,
          NPA: this.address.npa,
          city: this.address.city,
          phone: this.phone,
        }).then(result => {
          if (result.data.success) {
            this.$router.push('/profile');
          } else {
            this.error = result.data.message;
          }
        })
        .catch(error => {
          this.error = manageErrors(error.message);
        });
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
    setFirstName(value) {
      this.firstName = value;
    },
    setName(value) {
      this.name = value;
    },
    setEmail(value) {
      this.email = value;
    },
    setPassword(value) {
      this.password = value;
    },
    setConfirmPassword(value) {
      this.confirmPassword = value;
    },
    setStreet(value) {
      this.address.street = value;
      this.checkLocationInfosIfFilled();
    },
    setNPA(value) {
      this.address.npa = value;
      this.checkLocationInfosIfFilled();
    },
    setCity(value) {
      this.address.city = value;
      this.checkLocationInfosIfFilled();
    },
    setPhone(value) {
      this.phone = value;
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
