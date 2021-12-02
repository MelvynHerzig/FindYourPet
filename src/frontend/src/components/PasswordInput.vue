<template>
  <div class="wrapper">
    <FormInput
        @valueInput="sendEvent"
        :defaultValue="''"
        :type="password"
        :name="password"
        :placeholder="$t('login.password')"
        :required="true"
        class="password"
    />
    <!-- <span class="show-btn" v-show="false" v-on:click="showPassword"><i class="fas fa-eye"></i></span><br/>-->
  </div>
</template>

<script>
import FormInput from "./FormInput";

export default {
  name: "PasswordInput",
  components: {FormInput},
  props: {
    defaultValue: String,
  },
  methods: {
    sendEvent(value) {
      this.$emit('valueInput', value);
    },
    showPassword: function (event) {
      console.log(event);
      /*if(event.type === "password"){
        event.currentTarget = "text";
        showBtn.classList.add("hide-btn");
      }else{
        passField.type = "password";
        showBtn.classList.remove("hide-btn");
      }*/
    }
  },
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

.password {
  background: #fff url('../assets/images/password.png') 20px top no-repeat;
  background-size: 16px 80px;
}

.password:focus {
  background: #fff url('../assets/images/password.png') 20px bottom no-repeat;
  background-size: 16px 80px;
}

.wrapper span {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: var(--footer-color);
  cursor: pointer;
}

.wrapper input:valid ~ span {
  display: block;
}

.wrapper span i.hide-btn::before {
  content: "\f070";
}

</style>