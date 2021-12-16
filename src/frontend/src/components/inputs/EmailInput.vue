<template>
  <div class="field">
    <i class="icon fas fa-envelope"></i>
    <FormInput
        @valueInput="sendEvent"
        :defaultValue="''"
        :type="'email'"
        :name="name"
        :placeholder="$t('account.email')"
        :required="true"
        class="input"
    />
  </div>
</template>

<script>
import FormInput from "./FormInput";

export default {
  name: "EmailInput",
  components: {FormInput},
  props: {
    name: String,
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

.field {
  position: relative;
}

.icon {
  position: absolute;
  top: 13px;
  left: 20px;
  color: grey;
}

.icon:active,
.icon:focus,
.icon:hover {
  color: var(--footer-color);
}

</style>