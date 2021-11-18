<template>
  <div class="ad">
    <div class="image">
      <img src="images/kitty.jpg" alt="image">
    </div>
    <div class="name">
      <h1>{{animal.name}}</h1>
      <h3>{{animal.type}}</h3>
    </div>
    <div class = "description">
      <h2>
        Petit chat cherche maison
      </h2>
      <p>
        Mon petit chat cherche une nouvelle maison car je n'ai plus les moyens de m'en occuper. 
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimalAd",
  props: {
    animal: {}
  }
}
</script>

<style scoped>

h3  ,p {
  color: darkgrey;
}

.ad{
  width: 90%;
  height: 160px;
  background-color: var(--header-color);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 30px;
  border-radius: 10px;
  transition: all .3s;
}

.ad:hover {
 background-color: var(--footer-color);
 }


.ad div {
  margin-right: 20px;
  margin-left: 20px;
}

img{
  width: 160px;
  height: 160px;
  align-self: center;
  border-radius: 50px;
}

.name{
  
  border-radius: 10px;
  flex: 1;
  width: 100px;
  text-align: left;
  padding-left: 20px;
  border: solid;
  border-color: var(--header-selection-color);
  
}

.description{
  
  border-radius: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  border: solid;
  border-color: var(--header-selection-color);
  flex: 2;
  overflow:hidden;
}

</style>
