<template>
  <div class="inner">
    <h1>{{ $t('profile.advertsTitle') }}</h1>
    <div class="list">
      <ul>
        <li v-for="advert in this.adverts" :key="advert.id" style="list-style-type:none">
          <AnimalAdvert :advert="advert"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AnimalAdvert from "@/components/AnimalAdvert";

export default {
  name: "ProfileAdverts",
  components: {AnimalAdvert},
  props: {
    adverts: null
  }
}
</script>

<style scoped>

.inner {
  background: var(--transparent-background-color);
  padding: 20px;
  margin: auto auto 3em auto;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: solid;
  border-color: var(--transparent-border-color);
}

h1 {
  color: black;
}

.inner h1 {
  display: flex;
  justify-content: center;
}

</style>