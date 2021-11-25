<template>
  <input v-bind:value="value" v-bind:type="type" class="username" name="username"
         v-bind:placeholder="$t('login.username')" required/>
</template>

<script>
export default {
  name: "UsernameInput",
  props: {
    value: String,
    type: String
  },
}
</script>

<style scoped>

.username {
  background: #fff url('../assets/images/user.png') 20px top no-repeat;
  background-size: 16px 80px;
}

.username:focus {
  background: #fff url('../assets/images/user.png') 20px bottom no-repeat;
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

</style>