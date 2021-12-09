<template>
  <div class="landing1">
    <div class="inner">
      <img src="../assets/images/findyourpet_logo.png"/>
      <h1>{{$t("landing.welcome")}}</h1>
      <p>{{$t("landing.description")}}</p>
      <button @click="$router.push('/annonces')">{{$t("landing.see")}}</button>
      <button> {{$t("landing.create")}} </button>
    </div>
  </div>
</template>

<script>
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  

h1,
h2,
h3,
h4,
h5,
h6,
p,
li,
button{
  color: black;
}

button {
  display: inline-block;
  padding: 20px;
  margin: 30px;
  letter-spacing: .15rem;
  transition: all .3s;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  border-color:var(--header-color);
}

button:hover{
  cursor:pointer;
  background-color: var(--select-color);
}

.landing1{
  background: url("../assets/images/test.jpg");
  background-attachment:fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 600px;
  margin: auto;
  display: flex;
}

.inner {
  background: var(--transparent-background-color);
  padding: 20px;
  margin: auto;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  text-align: center;
  border: solid;
  border-color: var(--transparent-border-color);
}
</style>
