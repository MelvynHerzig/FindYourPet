<template>
  <div class="field">
    <i class="icon fas fa-user"></i>
    <FormInput
        @valueInput="sendEvent"
        :defaultValue="''"
        :type="'text'"
        :name="name"
        :placeholder="placeholder"
        :required="true"
        class="input"
    />
  </div>
</template>

<script>
import FormInput from "./FormInput";

export default {
  name: "NameInput",
  components: {FormInput},
  props: {
    name: String,
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

.field {
  position: relative;
}

.icon {
  position: absolute;
  top: 13px;
  left: 20px;
  color: grey;
}

</style>