<template>
  <div class="inner">
    <h1>{{ $t('profile.advertsTitle') }}</h1>
    <div class="list">
      <ul>
        <li v-for="advert in this.adverts" :key="advert.id" style="list-style-type:none">
          <AdvertPreview :advert="advert"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AdvertPreview from "@/components/AdvertPreview";

export default {
  name: "ProfileAdverts",
  components: {AdvertPreview},
  props: {
    adverts: []
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