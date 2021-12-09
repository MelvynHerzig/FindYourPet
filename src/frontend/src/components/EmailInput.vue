<template>
  <FormInput
      @valueInput="sendEvent"
      :defaultValue="''"
      :type="email"
      :name="email"
      :placeholder="$t('account.email')"
      :required="true"
      class="email"
  />
</template>

<script>
import FormInput from "./FormInput";

export default {
  name: "EmailInput",
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

.email {
  background: #fff url('../assets/images/user.png') 20px top no-repeat;
  background-size: 16px 80px;
}

.email:focus {
  background: #fff url('../assets/images/user.png') 20px bottom no-repeat;
  background-size: 16px 80px;
}

</style>