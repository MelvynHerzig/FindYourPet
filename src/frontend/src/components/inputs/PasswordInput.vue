<template>
  <div class="field">
    <i class="icon fas fa-key"></i>
    <FormInput
        @valueInput="sendEvent"
        :defaultValue="defaultValue"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :required="true"
        class="input"
    />
    <i class="visible fas" :class = "isVisible ? 'fa-eye' : 'fa-eye-slash'" @click = "makeVisible(), isVisible = !isVisible" ></i>
  </div>
</template>

<script>
import FormInput from "./FormInput";

export default {
  name: "PasswordInput",
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
    makeVisible(){
      if(this.type === "password"){
        this.type = "text";
      } else {
        this.type = "password";
        
      }
    }
  },
   data() {
     return {
      type: "password",
      isVisible: true
     }
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

.visible{
  position: absolute;
  top: 13px;
  right: 20px;
  color: grey;
}

</style>