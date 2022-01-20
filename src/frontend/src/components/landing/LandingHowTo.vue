<template>
  <section class="how-to">
    <div class="title">
      <h1> {{$t("howto.title")}} </h1>
    </div>
    <div class="texts">
      <div class="use-case">
        <h2>{{$t("howto.subtitle_announce")}} </h2>
        <div class="steps">
          <div class="step">
            <h3>{{$t("howto.step1")}} </h3>
            <p>{{$t("howto.1_announce")}} </p>
          </div>
          <div class="step">
            <h3>{{$t("howto.step2")}} </h3>
            <p>{{$t("howto.2_announce")}} </p>
          </div>
          <div class="step">
            <h3>{{$t("howto.step3")}} </h3>
            <p>{{$t("howto.3_announce")}} </p>
          </div>
        </div>
      </div>
      <div class="use-case">
        <h2>{{$t("howto.subtitle_adopt")}} </h2>
        <div class="steps">
          <div class="step">
            <h3>{{$t("howto.step1")}} </h3>
            <p>{{$t("howto.1_adopt")}} </p>
          </div>
          <div class="step">
            <h3>{{$t("howto.step2")}} </h3>
            <p>{{$t("howto.2_adopt")}} </p>
          </div>
          <div class="step">
            <h3>{{$t("howto.step3")}} </h3>
            <p>{{$t("howto.3_adopt")}} </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
</script>

<style scoped>  

h2,p {
  color: darkgray;
}

.how-to {
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

.use-case {
  border-radius: 25px;
  width: 35%;
  border: solid;
  border-color:var(--header-selection-color);
  text-align: center;
}

.steps {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.step {
  padding: 10px;
  flex: 1;
}
</style>
