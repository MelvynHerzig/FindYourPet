<template>
  <div class="field">
    <i class="fas fa-plus icon"></i>
    <FormInput
        @valueInput="sendEvent"
        :defaultValue="defaultValue"
        :type="'number'"
        :name="name"
        :placeholder="placeholder"
        :required="false"
        class="input"
    />
  </div>
</template>

<script>
import FormInput from "./FormInput";

export default {
  name: "MaximumInput",
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