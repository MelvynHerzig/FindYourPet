<template>
  <div class="landing2">
    <div class="title">
      <h1> {{$t("howto.title")}} </h1>
    </div>
    <div class="texts">
      <div>
        <h2>{{$t("howto.subtitle_announce")}} </h2>
        <div>
          <div>
            <h3>{{$t("howto.step1")}} </h3>
            <p>{{$t("howto.1_announce")}} </p>
          </div>
          <div>
            <h3>{{$t("howto.step2")}} </h3>
            <p>{{$t("howto.2_announce")}} </p>
          </div>
          <div>
            <h3>{{$t("howto.step3")}} </h3>
            <p>{{$t("howto.3_announce")}} </p>
          </div>
        </div>
      </div>
      <div>
        <h2>{{$t("howto.subtitle_adopt")}} </h2>
        <div>
          <div>
            <h3>{{$t("howto.step1")}} </h3>
            <p>{{$t("howto.1_adopt")}} </p>
          </div>
          <div>
            <h3>{{$t("howto.step2")}} </h3>
            <p>{{$t("howto.2_adopt")}} </p>
          </div>
          <div>
            <h3>{{$t("howto.step3")}} </h3>
            <p>{{$t("howto.3_adopt")}} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  

h2,p {
  color: darkgray;
}


.landing2{
  text-align: center;
  background-color: var(--header-color);
  width: 100%;
  border-color: var(--sub-color);
  padding-bottom: 100px;
}

.title {
    padding: 20px;
}

.texts {
  display: flex;
  justify-content: space-around;
}

.texts > div{
  border-radius: 25px;
  width: 35%;
  border: solid;
  border-color:var(--header-selection-color);
  text-align: center;
}

.texts > div > div {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.texts > div > div div{
  padding: 10px;
  flex: 1;
}
</style>
