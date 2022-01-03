<template>
<div>
<img :src="url" alt = "image">
<p>{{name}}</p>
</div>
</template>

<script>
export default {
  name: 'Dev',
  props: {
    url: String,
    name: Text
  }
}
</script>

<style scoped>
div{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}
img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
}
</style>
