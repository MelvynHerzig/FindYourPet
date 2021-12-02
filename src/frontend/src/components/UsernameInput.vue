<template>
  <FormInput
      @valueInput="sendEvent"
      :defaultValue="''"
      :type="text"
      :name="username"
      :placeholder="$t('login.username')"
      :required="true"
      class="username"
  />
</template>

<script>
import FormInput from "./FormInput";

export default {
  name: "UsernameInput",
  components: {FormInput},
  props: {
    defaultValue: String,
  },
  methods: {
    sendEvent(value) {
      this.$emit('valueInput', value);
    },
  }
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

</style>