<template>
  <input
      v-model="inputValue"
      @input="handle"
      v-bind:type="type"
      v-bind:name="name"
      v-bind:placeholder="placeholder"
      v-bind:required="required"
      class="input"
  />
</template>

<script>
export default {
  name: "FormInput",
  data() {
    return {
      inputValue: this.defaultValue,
    }
  },
  props: {
    type: String,
    name: String,
    defaultValue: String,
    placeholder: String,
    required: Boolean,
  },
  methods: {
    handle() {
      this.$emit('valueInput', this.inputValue);
    }
  }
}
</script>

<style scoped>

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