<template>
  <div class="wrapper">
    <input v-bind:value="value" v-on:input="$emit('input', $event.target.value)" v-bind:type="type"
           class="password" name="password" v-bind:placeholder="$t('login.password')" required/>
    <span class="show-btn" v-on:click="showPassword"><i class="fas fa-eye"></i></span><br/>
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
  props: {
    value: String,
    type: String
  },
  methods: function () {
    return {
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

input:active, input:focus {
  border: 1px solid var(--footer-color);
}

.wrapper span{
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: var(--footer-color);
  cursor: pointer;
}
.wrapper input:valid ~ span{
  display: block;
}
.wrapper span i.hide-btn::before{
  content: "\f070";
}

</style>