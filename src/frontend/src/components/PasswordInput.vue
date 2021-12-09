<template>
  <div class="globalInput">
    <FormInput
        @valueInput="sendEvent"
        :defaultValue="''"
        :type="password"
        :name="password"
        :placeholder="placeholder"
        :required="true"
        class="password"
    />
  </div>
</template>

<script>
import FormInput from "./FormInput";

export default {
  name: "PasswordInput",
  components: {FormInput},
  props: {
    defaultValue: String,
    placeholder: String,
  },
  methods: {
    sendEvent(value) {
      this.$emit('valueInput', value);
    },
  },
}
</script>

<style scoped>

.password {
  background: #fff url('../assets/images/password.png') 20px top no-repeat;
  background-size: 16px 80px;
}

.password:focus {
  background: #fff url('../assets/images/password.png') 20px bottom no-repeat;
  background-size: 16px 80px;
}

.globalInput {
  position: relative;
}

.globalInput i{
  position: absolute;
  left: 600px;
  top: 40px;
  color: black;
}

</style>