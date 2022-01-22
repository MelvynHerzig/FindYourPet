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
  props: [
    'type',
    'name',
    'defaultValue',
    'placeholder',
    'required'
  ],
  data() {
    return {
      inputValue: null,
    }
  },
  methods: {
    handle() {
      this.$emit('valueInput', this.inputValue);
    }
  },
  beforeMount() {
    this.inputValue = this.defaultValue;
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

input:active,
input:focus,
input:hover {
  border: 1px solid var(--footer-color);
}

</style>